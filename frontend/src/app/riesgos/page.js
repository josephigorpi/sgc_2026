'use client';
import Sidebar from '@/components/Layout/Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Activity, Plus, Download, AlertTriangle, 
  X, Info, Maximize2, Minimize2, Eye
} from 'lucide-react';

// Mapeo de colores por nivel de riesgo
const COLORES_NIVEL = {
  bajo: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-500',
    hover: 'hover:bg-emerald-100'
  },
  medio: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-500',
    hover: 'hover:bg-amber-100'
  },
  alto: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    badge: 'bg-orange-100 text-orange-700',
    dot: 'bg-orange-500',
    hover: 'hover:bg-orange-100'
  },
  critico: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-700',
    dot: 'bg-red-500',
    hover: 'hover:bg-red-100'
  }
};

// Mapeo de colores por categoría
const COLORES_CATEGORIA = {
  estrategico: 'bg-purple-100 text-purple-700',
  operativo: 'bg-blue-100 text-blue-700',
  academico: 'bg-indigo-100 text-indigo-700',
  financiero: 'bg-emerald-100 text-emerald-700',
  legal: 'bg-rose-100 text-rose-700',
  tecnologico: 'bg-cyan-100 text-cyan-700',
  reputacional: 'bg-amber-100 text-amber-700'
};

const ETIQUETA_CATEGORIA = {
  estrategico: 'Estratégico',
  operativo: 'Operativo',
  academico: 'Académico',
  financiero: 'Financiero',
  legal: 'Legal',
  tecnologico: 'Tecnológico',
  reputacional: 'Reputacional'
};

// Etiquetas para niveles
const ETIQUETA_NIVEL = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
  critico: 'Crítico'
};

export default function RiesgosPage() {
  const [riesgos, setRiesgos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [riesgoSeleccionado, setRiesgoSeleccionado] = useState(null);
  const [mostrarPanel, setMostrarPanel] = useState(false);
  const [vistaMatriz, setVistaMatriz] = useState(true);
  
  const [nuevoRiesgo, setNuevoRiesgo] = useState({ 
    codigo: '', 
    nombre: '', 
    descripcion: '', 
    categoria: 'operativo', 
    probabilidad: 3, 
    impacto: 3, 
    proceso_id: '' 
  });

  useEffect(() => { cargarRiesgos(); }, []);

  const cargarRiesgos = async () => {
    try {
      const { data } = await axios.get('/api/v1/riesgos');
      setRiesgos(data);
    } catch (err) {
      // Datos de demostración con más variedad
      setRiesgos([
        { 
          id: '1', 
          codigo: 'R-2024-01', 
          nombre: 'Deserción estudiantil elevada', 
          descripcion: 'Aumento en la tasa de abandono de estudios',
          categoria: 'academico', 
          probabilidad: 4, 
          impacto: 5, 
          estado: 'activo',
          proceso_id: '1'
        },
        { 
          id: '2', 
          codigo: 'R-2024-02', 
          nombre: 'Falla en infraestructura digital', 
          descripcion: 'Posibles interrupciones en plataformas educativas',
          categoria: 'tecnologico', 
          probabilidad: 3, 
          impacto: 4, 
          estado: 'activo',
          proceso_id: '2'
        },
        { 
          id: '3', 
          codigo: 'R-2024-03', 
          nombre: 'Reducción de presupuesto', 
          descripcion: 'Posible recorte en asignación de recursos',
          categoria: 'financiero', 
          probabilidad: 2, 
          impacto: 5, 
          estado: 'activo',
          proceso_id: '3'
        },
        { 
          id: '4', 
          codigo: 'R-2024-04', 
          nombre: 'Cambios en normativa educativa', 
          descripcion: 'Actualizaciones en requisitos de acreditación',
          categoria: 'legal', 
          probabilidad: 2, 
          impacto: 3, 
          estado: 'activo',
          proceso_id: '4'
        },
        { 
          id: '5', 
          codigo: 'R-2024-05', 
          nombre: 'Baja satisfacción estudiantil', 
          descripcion: 'Disminución en encuestas de satisfacción',
          categoria: 'reputacional', 
          probabilidad: 3, 
          impacto: 3, 
          estado: 'activo',
          proceso_id: '5'
        },
        { 
          id: '6', 
          codigo: 'R-2024-06', 
          nombre: 'Fuga de talento docente', 
          descripcion: 'Salida de personal calificado',
          categoria: 'operativo', 
          probabilidad: 1, 
          impacto: 4, 
          estado: 'activo',
          proceso_id: '6'
        }
      ]);
    }
  };

  const calcularNivel = (p, i) => {
    const val = p * i;
    if (val <= 4) return { label: 'bajo', color: 'bg-green-100 text-green-700' };
    if (val <= 9) return { label: 'medio', color: 'bg-amber-100 text-amber-700' };
    if (val <= 14) return { label: 'alto', color: 'bg-orange-100 text-orange-700' };
    return { label: 'critico', color: 'bg-red-100 text-red-700' };
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/riesgos', nuevoRiesgo);
      setMostrarForm(false);
      setNuevoRiesgo({ 
        codigo: '', 
        nombre: '', 
        descripcion: '', 
        categoria: 'operativo', 
        probabilidad: 3, 
        impacto: 3, 
        proceso_id: '' 
      });
      cargarRiesgos();
    } catch (err) { alert('Error al registrar riesgo'); }
  };

  const descargarReporte = async () => {
    try {
      const response = await axios.get('/api/v1/riesgos/reporte', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'riesgos.pdf');
      link.click();
    } catch (err) { alert('Error al generar PDF'); }
  };

  const seleccionarRiesgo = (riesgo) => {
    setRiesgoSeleccionado(riesgo);
    setMostrarPanel(true);
  };

  const cerrarPanel = () => {
    setMostrarPanel(false);
    setRiesgoSeleccionado(null);
  };

  // Construir la matriz 5x5
  const construirMatriz = () => {
    const matriz = [];
    // Impacto en columnas (1-5), Probabilidad en filas (1-5)
    for (let prob = 5; prob >= 1; prob--) {
      const fila = [];
      for (let imp = 1; imp <= 5; imp++) {
        const riesgosEnCelda = riesgos.filter(
          r => r.probabilidad === prob && r.impacto === imp
        );
        const nivel = calcularNivel(prob, imp);
        fila.push({
          probabilidad: prob,
          impacto: imp,
          riesgos: riesgosEnCelda,
          nivel: nivel
        });
      }
      matriz.push(fila);
    }
    return matriz;
  };

  const matriz = construirMatriz();

  // Obtener estadísticas
  const totalRiesgos = riesgos.length;
  const riesgosPorNivel = riesgos.reduce((acc, r) => {
    const nivel = calcularNivel(r.probabilidad, r.impacto).label;
    acc[nivel] = (acc[nivel] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Activity /> Gestión de Riesgos
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {totalRiesgos} riesgos identificados
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setVistaMatriz(!vistaMatriz)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {vistaMatriz ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              {vistaMatriz ? 'Ver Listado' : 'Ver Matriz'}
            </button>
            <button 
              onClick={descargarReporte} 
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Download size={18} /> Reporte PDF
            </button>
            <button 
              onClick={() => setMostrarForm(!mostrarForm)} 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {mostrarForm ? <X size={18} /> : <Plus size={18} />}
              {mostrarForm ? 'Cancelar' : 'Nuevo Riesgo'}
            </button>
          </div>
        </div>

        {/* Formulario de creación */}
        {mostrarForm && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus size={20} className="text-blue-600" />
              Registrar Nuevo Riesgo
            </h3>
            <form onSubmit={handleCrear} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Código</label>
                <input 
                  placeholder="Ej: R-2024-001" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  value={nuevoRiesgo.codigo} 
                  onChange={e => setNuevoRiesgo({...nuevoRiesgo, codigo: e.target.value})} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                <input 
                  placeholder="Nombre del riesgo" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  value={nuevoRiesgo.nombre} 
                  onChange={e => setNuevoRiesgo({...nuevoRiesgo, nombre: e.target.value})} 
                  required 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                <textarea 
                  placeholder="Descripción detallada del riesgo" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  rows={2}
                  value={nuevoRiesgo.descripcion} 
                  onChange={e => setNuevoRiesgo({...nuevoRiesgo, descripcion: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  value={nuevoRiesgo.categoria} 
                  onChange={e => setNuevoRiesgo({...nuevoRiesgo, categoria: e.target.value})}
                >
                  {['estrategico', 'operativo', 'academico', 'financiero', 'legal', 'tecnologico', 'reputacional'].map(c => (
                    <option key={c} value={c}>{ETIQUETA_CATEGORIA[c]}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Probabilidad (1-5)</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      className="flex-1" 
                      value={nuevoRiesgo.probabilidad} 
                      onChange={e => setNuevoRiesgo({...nuevoRiesgo, probabilidad: parseInt(e.target.value)})} 
                    />
                    <span className="text-lg font-bold text-blue-600 w-8 text-center">
                      {nuevoRiesgo.probabilidad}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Impacto (1-5)</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      className="flex-1" 
                      value={nuevoRiesgo.impacto} 
                      onChange={e => setNuevoRiesgo({...nuevoRiesgo, impacto: parseInt(e.target.value)})} 
                    />
                    <span className="text-lg font-bold text-red-600 w-8 text-center">
                      {nuevoRiesgo.impacto}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex justify-end gap-3 pt-2 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setMostrarForm(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Registrar Riesgo
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Panel de Detalle del Riesgo */}
        {mostrarPanel && riesgoSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Detalle del Riesgo</h3>
                <button 
                  onClick={cerrarPanel}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-slate-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-slate-500 font-mono">{riesgoSeleccionado.codigo}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{riesgoSeleccionado.nombre}</p>
                    {riesgoSeleccionado.descripcion && (
                      <p className="text-slate-600 mt-2">{riesgoSeleccionado.descripcion}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    COLORES_NIVEL[calcularNivel(riesgoSeleccionado.probabilidad, riesgoSeleccionado.impacto).label]?.badge || 'bg-slate-100'
                  }`}>
                    {ETIQUETA_NIVEL[calcularNivel(riesgoSeleccionado.probabilidad, riesgoSeleccionado.impacto).label]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-500">Probabilidad</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className={`w-3 h-3 rounded-full ${i <= riesgoSeleccionado.probabilidad ? 'bg-blue-600' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                      <span className="font-bold text-blue-600">{riesgoSeleccionado.probabilidad}/5</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-500">Impacto</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className={`w-3 h-3 rounded-full ${i <= riesgoSeleccionado.impacto ? 'bg-red-500' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                      <span className="font-bold text-red-600">{riesgoSeleccionado.impacto}/5</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 col-span-2">
                    <p className="text-sm text-slate-500">Categoría</p>
                    <span className={`mt-1 inline-block px-3 py-1 rounded-full text-sm ${COLORES_CATEGORIA[riesgoSeleccionado.categoria] || 'bg-slate-100'}`}>
                      {ETIQUETA_CATEGORIA[riesgoSeleccionado.categoria] || riesgoSeleccionado.categoria}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vista de Matriz de Riesgos */}
        {vistaMatriz ? (
          <>
            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {['critico', 'alto', 'medio', 'bajo'].map(nivel => {
                const count = riesgosPorNivel[nivel] || 0;
                const colores = COLORES_NIVEL[nivel];
                return (
                  <div key={nivel} className={`bg-white rounded-xl shadow-sm border ${colores?.border || 'border-slate-200'} p-4`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${colores?.text || 'text-slate-700'}`}>
                        {ETIQUETA_NIVEL[nivel]}
                      </span>
                      <span className={`text-2xl font-bold ${colores?.text || 'text-slate-700'}`}>
                        {count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Matriz 5x5 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-semibold text-slate-700">Matriz de Riesgos (Probabilidad vs Impacto)</h3>
                <p className="text-xs text-slate-500 mt-1">Haz clic en un marcador para ver los detalles del riesgo</p>
              </div>
              
              <div className="overflow-x-auto p-4">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-6 gap-1">
                    {/* Encabezados de impacto */}
                    <div className="col-span-1"></div>
                    {[1, 2, 3, 4, 5].map(imp => (
                      <div key={`imp-${imp}`} className="text-center text-xs font-semibold text-slate-500 py-2 bg-slate-50 rounded">
                        Imp {imp}
                      </div>
                    ))}
                    
                    {/* Filas de la matriz */}
                    {matriz.map((fila, idx) => (
                      <>
                        <div key={`label-${idx}`} className="flex items-center justify-center text-xs font-semibold text-slate-500 bg-slate-50 rounded">
                          Prob {fila[0].probabilidad}
                        </div>
                        {fila.map((celda) => {
                          const colores = COLORES_NIVEL[celda.nivel.label];
                          const tieneRiesgos = celda.riesgos.length > 0;
                          
                          return (
                            <div 
                              key={`${celda.probabilidad}-${celda.impacto}`}
                              className={`aspect-square border rounded-lg p-1 transition-colors ${
                                colores?.border || 'border-slate-200'
                              } ${
                                tieneRiesgos ? `${colores?.bg || 'bg-slate-50'} cursor-pointer hover:shadow-md` : 'bg-slate-50'
                              }`}
                              onClick={() => tieneRiesgos && seleccionarRiesgo(celda.riesgos[0])}
                            >
                              {tieneRiesgos ? (
                                <div className="h-full flex flex-col items-center justify-center gap-0.5">
                                  <div className={`w-2 h-2 rounded-full ${colores?.dot || 'bg-slate-400'}`}></div>
                                  <span className="text-[8px] font-bold text-slate-600">
                                    {celda.riesgos.length}
                                  </span>
                                </div>
                              ) : (
                                <div className="h-full flex items-center justify-center">
                                  <span className="text-[8px] text-slate-300">•</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leyenda de niveles */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap gap-4">
                {['bajo', 'medio', 'alto', 'critico'].map(nivel => {
                  const colores = COLORES_NIVEL[nivel];
                  return (
                    <div key={nivel} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${colores?.dot || 'bg-slate-400'}`}></div>
                      <span className={`text-xs ${colores?.text || 'text-slate-700'}`}>
                        {ETIQUETA_NIVEL[nivel]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Vista de Listado (original mejorado) */
          <div className="grid grid-cols-2 gap-6">
            {riesgos.map(r => {
              const nivel = calcularNivel(r.probabilidad, r.impacto);
              const colores = COLORES_NIVEL[nivel.label];
              return (
                <div 
                  key={r.id} 
                  className={`bg-white p-6 rounded-xl shadow-sm border ${colores?.border || 'border-slate-200'} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => seleccionarRiesgo(r)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs text-slate-500 font-mono">{r.codigo}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${COLORES_CATEGORIA[r.categoria] || 'bg-slate-100 text-slate-700'}`}>
                          {ETIQUETA_CATEGORIA[r.categoria] || r.categoria}
                        </span>
                      </div>
                      <p className="font-semibold text-slate-900 mt-1">{r.nombre}</p>
                      {r.descripcion && (
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{r.descripcion}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ml-2 flex-shrink-0 ${colores?.badge || 'bg-slate-100'}`}>
                      {ETIQUETA_NIVEL[nivel.label]}
                    </span>
                  </div>
                  <div className="flex gap-6 text-sm text-slate-600 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Probabilidad:</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i <= r.probabilidad ? 'bg-blue-600' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Impacto:</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i <= r.impacto ? 'bg-red-500' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}