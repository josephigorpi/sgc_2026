
import { Documento, Proceso, Riesgo, Capa, PlanAuditoria, Hallazgo, Indicador, MedicionIndicador, Encuesta, RespuestaEncuesta } from '../models/index.js';
import { Op } from 'sequelize';

export const getDashboardStats = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    // Documentos
    const totalDocumentos = await Documento.count();
    const documentosPorEstado = await Documento.findAll({
      attributes: ['estado', [Documento.sequelize.fn('COUNT', Documento.sequelize.col('id')), 'count']],
      group: ['estado']
    });
    const documentosProximosVencer = await Documento.count({
      where: {
        fecha_vigencia: {
          [Op.between]: [new Date(), new Date(new Date().setMonth(new Date().getMonth() + 3))]
        }
      }
    });

    // Procesos
    const totalProcesos = await Proceso.count();

    // Riesgos
    const totalRiesgos = await Riesgo.count();
    const riesgosPorNivel = await Riesgo.findAll({
      attributes: ['probabilidad', 'impacto']
    });
    // Calcular nivel de riesgo (bajo, medio, alto, crítico)
    const riesgoNivelCount = { bajo: 0, medio: 0, alto: 0, critico: 0 };
    riesgosPorNivel.forEach(r => {
      const score = r.probabilidad * r.impacto;
      if (score <= 4) riesgoNivelCount.bajo++;
      else if (score <= 9) riesgoNivelCount.medio++;
      else if (score <= 14) riesgoNivelCount.alto++;
      else riesgoNivelCount.critico++;
    });
    const riesgosCriticos = riesgoNivelCount.critico;

    // CAPAs
    const capasAbiertas = await Capa.count({ where: { estado: { [Op.notIn]: ['cerrada', 'completada'] } } });
    const capasCerradas = await Capa.count({ where: { estado: { [Op.in]: ['cerrada', 'completada'] } } });
    const capasVencidas = await Capa.count({
      where: {
        fecha_implementacion: { [Op.lt]: new Date() },
        estado: { [Op.notIn]: ['cerrada', 'completada'] }
      }
    });

    // Auditorías
    const auditoriasAnio = await PlanAuditoria.count({
      where: {
        fecha_programada: {
          [Op.between]: [new Date(currentYear, 0, 1), new Date(currentYear, 11, 31)]
        }
      }
    });
    const hallazgosAbiertos = await Hallazgo.count({ where: { estado: { [Op.notIn]: ['cerrado', 'resuelto'] } } });

    // Indicadores
    const totalIndicadores = await Indicador.count();
    const indicadoresCumplidos = await MedicionIndicador.count({
      where: {
        cumplimiento: { [Op.gte]: 100 }
      }
    });

    // Encuestas
    const totalEncuestas = await Encuesta.count();
    const totalRespuestas = await RespuestaEncuesta.count();
    // Calcular satisfacción promedio (si hay respuestas numéricas)
    const respuestasNumericas = await RespuestaEncuesta.findAll({
      attributes: ['valor_numerico'],
      where: { valor_numerico: { [Op.not]: null } }
    });
    const satisfaccionPromedio = respuestasNumericas.length > 0 
      ? respuestasNumericas.reduce((sum, r) => sum + parseFloat(r.valor_numerico), 0) / respuestasNumericas.length 
      : 0;

    res.json({
      documentos: {
        total: totalDocumentos,
        porEstado: documentosPorEstado.map(d => ({ estado: d.estado, count: d.dataValues.count })),
        proximosVencer: documentosProximosVencer
      },
      procesos: {
        total: totalProcesos
      },
      riesgos: {
        total: totalRiesgos,
        porNivel: riesgoNivelCount,
        criticos: riesgosCriticos
      },
      capas: {
        abiertas: capasAbiertas,
        cerradas: capasCerradas,
        vencidas: capasVencidas
      },
      auditorias: {
        anio: auditoriasAnio,
        hallazgosAbiertos: hallazgosAbiertos
      },
      indicadores: {
        total: totalIndicadores,
        cumplidos: indicadoresCumplidos
      },
      encuestas: {
        total: totalEncuestas,
        respuestas: totalRespuestas,
        satisfaccionPromedio: satisfaccionPromedio.toFixed(2)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
