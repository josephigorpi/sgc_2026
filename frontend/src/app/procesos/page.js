
'use client';
import Sidebar from '@/components/Layout/Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GitBranch, Plus, Download, ChevronRight, Layers } from 'lucide-react';

// Definir colores para cada tipo de macroproceso
const COLORES_MACROPROCESO = {
  estrategico: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
    badge: 'bg-purple-600',
    hover: 'hover:bg-purple-50'
  },
  misional: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-300',
    badge: 'bg-amber-600',
    hover: 'hover:bg-amber-50'
  },
  apoyo: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    border: 'border-emerald-300',
    badge: 'bg-emerald-600',
    hover: 'hover:bg-emerald-50'
  },
  evaluacion: {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    border: 'border-rose-300',
    badge: 'bg-rose-600',
    hover: 'hover:bg-rose-50'
  }
};

// Etiquetas legibles para los tipos
const TIPO_LABEL = {
  estrategico: 'Estratégico',
  misional: 'Misional',
  apoyo: 'Apoyo',
  evaluacion: 'Evaluación'
};

export default function ProcesosPage() {
  const [macroprocesos, setMacroprocesos] = useState([]);
  const [procesos, setProcesos] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [procesoSel, setProcesoSel] = useState(null);
  const [mostrarFormProc, setMostrarFormProc] = useState(false);
  const [nuevoProceso, setNuevoProceso] = useState({ codigo: '', nombre: '', objetivo: '', macroproceso_id: '', responsable_id: '' });

  useEffect(() => { cargarDatos(); }, []);

  const cargarDatos = async () => {
    try {
      const [mp, pr] = await Promise.all([
        axios.get('/api/v1/macroprocesos'),
        axios.get('/api/v1/procesos'),
      ]);
      setMacroprocesos(mp.data);
      setProcesos(pr.data);
    } catch (err) {
      // Demo data
      setMacroprocesos([
        { id: '1', codigo: 'MP-01', nombre: 'Direccionamiento Estratégico', tipo: 'estrategico' },
        { id: '2', codigo: 'MP-02', nombre: 'Formación Profesional', tipo: 'misional' },
        { id: '3', codigo: 'MP-03', nombre: 'Gestión Administrativa', tipo: 'apoyo' },
        { id: '4', codigo: 'MP-04', nombre: 'Aseguramiento de la Calidad', tipo: 'evaluacion' },
      ]);
      setProcesos([
        { id: '1', codigo: 'P-01', nombre: 'Planificación Curricular', objetivo: 'Diseñar planes de estudio', macroproceso_id: '2', estado: 'activo' },
        { id: '2', codigo: 'P-02', nombre: 'Gestión de Docencia', objetivo: 'Ejecutar actividades académicas', macroproceso_id: '2', estado: 'activo' },
        { id: '3', codigo: 'P-03', nombre: 'Evaluación Institucional', objetivo: 'Medir desempeño institucional', macroproceso_id: '4', estado: 'activo' },
      ]);
    }
  };

  // Función para obtener el color de un macroproceso por su ID
  const getColorMacroproceso = (macroprocesoId) => {
    const macro = macroprocesos.find(m => m.id === macroprocesoId);
    if (!macro || !macro.tipo) return COLORES_MACROPROCESO.apoyo;
    return COLORES_MACROPROCESO[macro.tipo] || COLORES_MACROPROCESO.apoyo;
  };

  // Función para obtener el nombre del macroproceso por su ID
  const getNombreMacroproceso = (macroprocesoId) => {
    const macro = macroprocesos.find(m => m.id === macroprocesoId);
    return macro ? macro.nombre : 'Sin macroproceso';
  };

  // Función para obtener el tipo del macroproceso por su ID
  const getTipoMacroproceso = (macroprocesoId) => {
    const macro = macroprocesos.find(m => m.id === macroprocesoId);
    return macro ? macro.tipo : null;
  };

  const verActividades = async (proceso) => {
    setProcesoSel(proceso);
    try {
      const { data } = await axios.get(`/api/v1/procesos/${proceso.id}/actividades`);
      setActividades(data);
    } catch (err) {
      setActividades([
        { id: '1', codigo: 'A-01', nombre: 'Elaboración de sílabo', secuencia: 1, descripcion: 'Redactar sílabo del curso' },
        { id: '2', codigo: 'A-02', nombre: 'Ejecución de clases', secuencia: 2, descripcion: 'Desarrollar sesiones de aprendizaje' },
      ]);
    }
  };

  const handleCrearProceso = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/procesos', nuevoProceso);
      setMostrarFormProc(false);
      cargarDatos();
    } catch (err) {
      alert('Error al crear proceso');
    }
  };

  const descargarReporte = async () => {
    try {
      const response = await axios.get('/api/v1/procesos/reporte', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'mapa-procesos.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert('Error al generar PDF');
    }
  };

  // Agrupar procesos por macroproceso para mejor visualización
  const procesosAgrupados = macroprocesos.map(macro => ({
    ...macro,
    procesos: procesos.filter(p => p.macroproceso_id === macro.id)
  }));

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <GitBranch /> Mapa de Procesos
          </h2>
          <div className="flex gap-3">
            <button onClick={descargarReporte} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800">
              <Download size={18} /> Reporte PDF
            </button>
            <button onClick={() => setMostrarFormProc(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={18} /> Nuevo Proceso
            </button>
          </div>
        </div>

        {mostrarFormProc && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h3 className="font-semibold mb-4">Registrar Nuevo Proceso</h3>
            <form onSubmit={handleCrearProceso} className="grid grid-cols-3 gap-4">
              <input 
                placeholder="Código" 
                className="px-3 py-2 border rounded-lg" 
                value={nuevoProceso.codigo} 
                onChange={e => setNuevoProceso({...nuevoProceso, codigo: e.target.value})} 
                required 
              />
              <input 
                placeholder="Nombre" 
                className="px-3 py-2 border rounded-lg" 
                value={nuevoProceso.nombre} 
                onChange={e => setNuevoProceso({...nuevoProceso, nombre: e.target.value})} 
                required 
              />
              <div className="relative">
                <select 
                  className="w-full px-3 py-2 border rounded-lg appearance-none"
                  value={nuevoProceso.macroproceso_id} 
                  onChange={e => setNuevoProceso({...nuevoProceso, macroproceso_id: e.target.value})} 
                  required
                >
                  <option value="">Seleccionar Macroproceso</option>
                  {macroprocesos.map(mp => {
                    const colores = COLORES_MACROPROCESO[mp.tipo] || COLORES_MACROPROCESO.apoyo;
                    return (
                      <option key={mp.id} value={mp.id} className={colores.bg}>
                        {mp.nombre} ({TIPO_LABEL[mp.tipo] || mp.tipo})
                      </option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <Layers size={18} />
                </div>
              </div>
              <input 
                placeholder="Objetivo" 
                className="col-span-2 px-3 py-2 border rounded-lg" 
                value={nuevoProceso.objetivo} 
                onChange={e => setNuevoProceso({...nuevoProceso, objetivo: e.target.value})} 
              />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Guardar
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              Procesos Institucionales
            </div>
            <div className="divide-y divide-slate-200">
              {macroprocesos.map(macro => {
                const colores = COLORES_MACROPROCESO[macro.tipo] || COLORES_MACROPROCESO.apoyo;
                const procesosDelMacro = procesos.filter(p => p.macroproceso_id === macro.id);
                
                if (procesosDelMacro.length === 0) return null;
                
                return (
                  <div key={macro.id}>
                    {/* Cabecera del macroproceso con color */}
                    <div className={`px-4 py-2 ${colores.bg} ${colores.text} border-b border-slate-200 flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{macro.codigo}</span>
                        <span className="text-sm">{macro.nombre}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${colores.badge} text-white`}>
                        {TIPO_LABEL[macro.tipo] || macro.tipo}
                      </span>
                    </div>
                    
                    {/* Procesos de este macroproceso */}
                    {procesosDelMacro.map(p => (
                      <div 
                        key={p.id} 
                        className={`p-4 cursor-pointer flex justify-between items-center ${colores.hover}`}
                        onClick={() => verActividades(p)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-slate-900">{p.codigo} - {p.nombre}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${colores.bg} ${colores.text}`}>
                              {macro.codigo}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{p.objetivo}</p>
                        </div>
                        <ChevronRight size={18} className="text-slate-400 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                );
              })}
              
              {/* Procesos sin macroproceso */}
              {procesos.filter(p => !p.macroproceso_id).length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-slate-100 text-slate-600 border-b border-slate-200 flex items-center justify-between">
                    <span className="font-semibold">Sin macroproceso asignado</span>
                  </div>
                  {procesos.filter(p => !p.macroproceso_id).map(p => (
                    <div 
                      key={p.id} 
                      className="p-4 cursor-pointer flex justify-between items-center hover:bg-slate-50"
                      onClick={() => verActividades(p)}
                    >
                      <div>
                        <p className="font-medium text-slate-900">{p.codigo} - {p.nombre}</p>
                        <p className="text-xs text-slate-500">{p.objetivo}</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              {procesoSel ? (
                <div className="flex items-center justify-between">
                  <span>Actividades: {procesoSel.nombre}</span>
                  {procesoSel.macroproceso_id && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      COLORES_MACROPROCESO[getTipoMacroproceso(procesoSel.macroproceso_id)]?.bg || 'bg-slate-100'
                    } ${
                      COLORES_MACROPROCESO[getTipoMacroproceso(procesoSel.macroproceso_id)]?.text || 'text-slate-600'
                    }`}>
                      {getNombreMacroproceso(procesoSel.macroproceso_id)}
                    </span>
                  )}
                </div>
              ) : 'Seleccione un proceso'}
            </div>
            <div className="divide-y divide-slate-200">
              {actividades.map((a, i) => {
                // Obtener el color del macroproceso del proceso seleccionado
                const colores = procesoSel?.macroproceso_id 
                  ? getColorMacroproceso(procesoSel.macroproceso_id)
                  : COLORES_MACROPROCESO.apoyo;
                  
                return (
                  <div key={a.id} className={`p-4 flex gap-3 ${colores.hover}`}>
                    <span className={`flex-shrink-0 w-8 h-8 ${colores.bg} ${colores.text} rounded-full flex items-center justify-center font-bold text-sm`}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900">{a.codigo} - {a.nombre}</p>
                      <p className="text-sm text-slate-600">{a.descripcion}</p>
                    </div>
                  </div>
                );
              })}
              {actividades.length === 0 && (
                <p className="p-8 text-center text-slate-400 text-sm">No hay actividades registradas</p>
              )}
            </div>
          </div>
        </div>

        {/* Leyenda de colores */}
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Tipos de Macroprocesos</h4>
          <div className="flex flex-wrap gap-4">
            {Object.entries(COLORES_MACROPROCESO).map(([tipo, colores]) => (
              <div key={tipo} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded ${colores.bg} border ${colores.border}`}></span>
                <span className={`text-sm ${colores.text}`}>
                  {TIPO_LABEL[tipo] || tipo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}