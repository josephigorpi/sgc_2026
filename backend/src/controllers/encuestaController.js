
import { Encuesta, PreguntaEncuesta, RespuestaEncuesta } from '../models/index.js';

export const listarEncuestas = async (req, res) => {
  try {
    const encuestas = await Encuesta.findAll();
    res.json(encuestas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const crearEncuesta = async (req, res) => {
  try {
    const { preguntas, ...datosEncuesta } = req.body;
    const encuesta = await Encuesta.create({ ...datosEncuesta, creado_por: req.usuario.id });
    if (preguntas?.length) {
      await PreguntaEncuesta.bulkCreate(preguntas.map((p, i) => ({ ...p, encuesta_id: encuesta.id, orden: i + 1 })));
    }
    res.status(201).json(encuesta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const enviarRespuesta = async (req, res) => {
  try {
    const { encuesta_id, respuestas } = req.body;
    const usuarioId = req.usuario.id;
    await RespuestaEncuesta.bulkCreate(respuestas.map(r => ({
      encuesta_id,
      pregunta_id: r.pregunta_id,
      usuario_id: usuarioId,
      valor_texto: r.valor_texto,
      valor_numerico: r.valor_numerico,
    })));
    res.json({ mensaje: 'Respuestas registradas correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};