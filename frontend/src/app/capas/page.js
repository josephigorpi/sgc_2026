'use client';
import Sidebar from '@/components/Layout/Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, CheckCircle, Clock, AlertTriangle, Plus, Download, User, Calendar, Tag, X } from 'lucide-react';

// Mapeo de colores por estado para las tarjetas
const COLORES_ESTADO = {
  registrada: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-700',
    badge: 'bg-slate-100 text-slate-700',
    icon: <Clock className="text-slate-500" size={16} />
  },
  en_implementacion: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
    icon: <Clock className="text-amber-500" size={16} />
  },
  implementada: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
    icon: <CheckCircle className="text-blue-500" size={16} />
  },
  verificada: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    badge: 'bg-indigo-100 text-indigo-700',
    icon: <CheckCircle className="text-indigo-500" size={16} />
  },
  cerrada: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
    icon: <CheckCircle className="text-emerald-500" size={16} />
  },
  rechazada: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-700',
    icon: <AlertTriangle className="text-red-500" size={16} />
  }
};

// Etiquetas legibles para los estados
const ETIQUETA_ESTADO = {
  registrada: 'Registrada',
  en_implementacion: 'En Implementación',
  implementada: 'Implementada',
  verificada: 'Verificada',
  cerrada: 'Cerrada',
  rechazada: 'Rechazada'
};

// Mapeo de colores por tipo
const COLORES_TIPO = {
  correctiva: 'bg-red-100 text-red-700',
  preventiva: 'bg-blue-100 text-blue-700',
  mejora: 'bg-purple-100 text-purple-700'
};

const ETIQUETA_TIPO = {
  correctiva: 'Correctiva',
  preventiva: 'Preventiva',
  mejora: 'Mejora'
};

// Mapeo de colores por efectividad
const COLORES_EFECTIVIDAD = {
  efectiva: 'bg-emerald-100 text-emerald-700',
  parcial: 'bg-amber-100 text-amber-700',
  no_efectiva: 'bg-red-100 text-red-700',
  pendiente: 'bg-slate-100 text-slate-700'
};

export default function CapasPage() {
  const [capas, setCapas] = useState([]);
  const [nuevaCapa, setNuevaCapa] = useState({ 
    codigo: '', 
    tipo: 'correctiva', 
    descripcion: '', 
    accion_propuesta: '', 
    responsable_id: '' 
  });
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    cargarCapas();
  }, []);

  const cargarCapas = async () => {
    try {
      const { data } = await axios.get('/api/v1/capas');
      setCapas(data);
    } catch (err) {
      // Datos de demostración con más variedad de estados
      setCapas([
        { 
          id: '1', 
          codigo: 'CAPA-2024-001', 
          tipo: 'correctiva', 
          descripcion: 'Retraso en entrega de sílabos', 
          accion_propuesta: 'Implementar sistema de seguimiento',
          estado: 'en_implementacion', 
          efectividad: 'pendiente', 
          'responsable.nombres': 'Juan Pérez',
          fecha_implementacion: '2024-06-15',
          creado_en: '2024-06-01'
        },
        { 
          id: '2', 
          codigo: 'CAPA-2024-002', 
          tipo: 'preventiva', 
          descripcion: 'Capacitación en normativa ISO', 
          accion_propuesta: 'Programar talleres trimestrales',
          estado: 'implementada', 
          efectividad: 'efectiva', 
          'responsable.nombres': 'María López',
          fecha_implementacion: '2024-05-20',
          creado_en: '2024-05-01'
        },
        { 
          id: '3', 
          codigo: 'CAPA-2024-003', 
          tipo: 'mejora', 
          descripcion: 'Optimización de procesos administrativos', 
          accion_propuesta: 'Digitalizar flujos de trabajo',
          estado: 'registrada', 
          efectividad: 'pendiente', 
          'responsable.nombres': 'Carlos Ramírez',
          creado_en: '2024-06-10'
        },
        { 
          id: '4', 
          codigo: 'CAPA-2024-004', 
          tipo: 'correctiva', 
          descripcion: 'Incumplimiento de plazos en evaluación docente', 
          accion_propuesta: 'Revisar y ajustar cronograma',
          estado: 'cerrada', 
          efectividad: 'efectiva', 
          'responsable.nombres': 'Ana Torres',
          fecha_implementacion: '2024-05-30',
          creado_en: '2024-05-15'
        },
        { 
          id: '5', 
          codigo: 'CAPA-2024-005', 
          tipo: 'preventiva', 
          descripcion: 'Actualización de manuales de procedimiento', 
          accion_propuesta: 'Revisión anual de documentos',
          estado: 'rechazada', 
          efectividad: 'no_efectiva', 
          'responsable.nombres': 'Luis Fernández',
          creado_en: '2024-06-05'
        },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/capas', nuevaCapa);
      cargarCapas();
      setNuevaCapa({ 
        codigo: '', 
        tipo: 'correctiva', 
        descripcion: '', 
        accion_propuesta: '', 
        responsable_id: '' 
      });
      setMostrarForm(false);
    } catch (err) {
      alert('Error al registrar CAPA');
    }
  };

  // Función para formatear fechas
  const formatearFecha = (fecha) => {
    if (!fecha) return 'No definida';
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Agrupar CAPAs por estado
  const capasPorEstado = capas.reduce((acc, capa) => {
    const estado = capa.estado || 'registrada';
    if (!acc[estado]) acc[estado] = [];
    acc[estado].push(capa);
    return acc;
  }, {});

  // Orden de los estados para las columnas
  const ordenEstados = ['registrada', 'en_implementacion', 'implementada', 'verificada', 'cerrada', 'rechazada'];

  // Contar total de CAPAs
  const totalCapas = capas.length;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert /> Acciones Correctivas y Preventivas (CAPA)
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {totalCapas} CAPAs registradas en total
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setMostrarForm(!mostrarForm)} 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {mostrarForm ? <X size={18} /> : <Plus size={18} />}
              {mostrarForm ? 'Cancelar' : 'Nueva CAPA'}
            </button>
          </div>
        </div>

        {/* Formulario de creación */}
        {mostrarForm && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus size={20} className="text-blue-600" />
              Registrar Nueva CAPA
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Código</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={nuevaCapa.codigo}
                  onChange={(e) => setNuevaCapa({ ...nuevaCapa, codigo: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={nuevaCapa.tipo}
                  onChange={(e) => setNuevaCapa({ ...nuevaCapa, tipo: e.target.value })}
                >
                  <option value="correctiva">Correctiva</option>
                  <option value="preventiva">Preventiva</option>
                  <option value="mejora">Mejora</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  value={nuevaCapa.descripcion}
                  onChange={(e) => setNuevaCapa({ ...nuevaCapa, descripcion: e.target.value })}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Acción Propuesta</label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  value={nuevaCapa.accion_propuesta}
                  onChange={(e) => setNuevaCapa({ ...nuevaCapa, accion_propuesta: e.target.value })}
                  required
                />
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
                  Registrar CAPA
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tablero Kanban */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[800px]">
            {ordenEstados.map(estado => {
              const capasDelEstado = capasPorEstado[estado] || [];
              const colores = COLORES_ESTADO[estado] || COLORES_ESTADO.registrada;
              
              return (
                <div key={estado} className="flex-1 min-w-[200px]">
                  {/* Cabecera de columna */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colores.badge}`}>
                        {ETIQUETA_ESTADO[estado] || estado}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {capasDelEstado.length}
                      </span>
                    </div>
                  </div>

                  {/* Contenedor de tarjetas */}
                  <div className={`rounded-lg border ${colores.border} min-h-[200px] p-3 ${colores.bg}`}>
                    {capasDelEstado.length === 0 ? (
                      <div className="flex items-center justify-center h-32 text-sm text-slate-400">
                        No hay CAPAs en este estado
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {capasDelEstado.map((capa) => (
                          <div 
                            key={capa.id} 
                            className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow"
                          >
                            {/* Encabezado de tarjeta */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 text-sm">
                                  {capa.codigo}
                                </p>
                              </div>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${COLORES_TIPO[capa.tipo] || 'bg-slate-100 text-slate-700'} flex-shrink-0 ml-2`}>
                                {ETIQUETA_TIPO[capa.tipo] || capa.tipo}
                              </span>
                            </div>

                            {/* Descripción */}
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                              {capa.descripcion}
                            </p>

                            {/* Acción propuesta */}
                            {capa.accion_propuesta && (
                              <div className="text-xs text-slate-500 mb-3 bg-slate-50 rounded p-2">
                                <span className="font-medium">Acción:</span> {capa.accion_propuesta}
                              </div>
                            )}

                            {/* Metadatos */}
                            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <User size={12} />
                                {capa['responsable.nombres'] || 'Sin asignar'}
                              </span>
                              {capa.fecha_implementacion && (
                                <span className="flex items-center gap-1">
                                  <Calendar size={12} />
                                  {formatearFecha(capa.fecha_implementacion)}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Tag size={12} />
                                <span className={`px-1.5 py-0.5 rounded-full text-xs ${COLORES_EFECTIVIDAD[capa.efectividad] || 'bg-slate-100 text-slate-700'}`}>
                                  {capa.efectividad || 'Pendiente'}
                                </span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leyenda de tipos */}
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Tipos de CAPA</h4>
          <div className="flex flex-wrap gap-4">
            {Object.entries(COLORES_TIPO).map(([tipo, color]) => (
              <div key={tipo} className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${color}`}>
                  {ETIQUETA_TIPO[tipo] || tipo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}