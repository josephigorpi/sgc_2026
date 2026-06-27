'use client';
import Sidebar from '@/components/Layout/Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FileText, Download, Plus, Search, X, 
  ExternalLink, File, FileImage, FileSpreadsheet, 
  FileIcon as FilePdf, FileArchive, Eye, Calendar,
  Hash, Tag, Layers
} from 'lucide-react';

// Componente Modal
const ModalDocumento = ({ documento, onClose, onDescargar, onAbrirNueva }) => {
  if (!documento) return null;

  // Determinar el tipo de archivo basado en la extensión o URL
  const obtenerTipoArchivo = (url) => {
    if (!url) return null;
    const extension = url.split('.').pop()?.toLowerCase();
    const tipos = {
      'pdf': 'pdf',
      'png': 'imagen',
      'jpg': 'imagen',
      'jpeg': 'imagen',
      'webp': 'imagen',
      'gif': 'imagen',
      'svg': 'imagen',
      'doc': 'word',
      'docx': 'word',
      'xls': 'excel',
      'xlsx': 'excel',
      'ppt': 'powerpoint',
      'pptx': 'powerpoint'
    };
    return tipos[extension] || 'desconocido';
  };

  const tipoArchivo = obtenerTipoArchivo(documento.archivo_url);
  const esPDF = tipoArchivo === 'pdf';
  const esImagen = tipoArchivo === 'imagen';
  const esWord = tipoArchivo === 'word';
  const esExcel = tipoArchivo === 'excel';
  const esPowerPoint = tipoArchivo === 'powerpoint';
  const tieneArchivo = documento.archivo_url && documento.archivo_url.trim() !== '';

  // Renderizar icono según tipo de archivo
  const renderIconoArchivo = () => {
    if (!tieneArchivo) return <File className="w-16 h-16 text-slate-300" />;
    if (esPDF) return <FilePdf className="w-16 h-16 text-red-500" />;
    if (esImagen) return <FileImage className="w-16 h-16 text-purple-500" />;
    if (esWord) return <FileText className="w-16 h-16 text-blue-500" />;
    if (esExcel) return <FileSpreadsheet className="w-16 h-16 text-emerald-500" />;
    if (esPowerPoint) return <FileArchive className="w-16 h-16 text-orange-500" />;
    return <File className="w-16 h-16 text-slate-400" />;
  };

  // Renderizar vista previa del documento
  const renderVistaPrevia = () => {
    if (!tieneArchivo) {
      return (
        <div className="flex flex-col items-center justify-center h-96 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
          <File className="w-20 h-20 text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">Vista previa no disponible</p>
          <p className="text-sm text-slate-400 mt-1">Este documento no tiene archivo adjunto</p>
        </div>
      );
    }

    if (esPDF) {
      return (
        <iframe
          src={documento.archivo_url}
          className="w-full h-[500px] rounded-lg border border-slate-200"
          title={`Vista previa de ${documento.codigo}`}
        />
      );
    }

    if (esImagen) {
      return (
        <div className="flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200 p-4">
          <img
            src={documento.archivo_url}
            alt={documento.titulo}
            className="max-h-[500px] w-auto object-contain rounded-lg"
          />
        </div>
      );
    }

    // Para Word, Excel, PowerPoint y otros
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
        {renderIconoArchivo()}
        <p className="text-slate-700 font-medium mt-4">
          {esWord ? 'Documento de Word' :
           esExcel ? 'Hoja de Cálculo de Excel' :
           esPowerPoint ? 'Presentación de PowerPoint' :
           'Archivo'}
        </p>
        <p className="text-sm text-slate-500 mt-1">
          {documento.archivo_url?.split('/').pop() || 'archivo'}
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => window.open(documento.archivo_url, '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ExternalLink size={16} />
            Abrir
          </button>
          <button
            onClick={() => onDescargar(documento.archivo_url)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Download size={16} />
            Descargar
          </button>
        </div>
      </div>
    );
  };

  // Formatear fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return 'No definida';
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Obtener color de estado
  const colorEstado = (estado) => {
    const colores = {
      aprobado: 'bg-emerald-100 text-emerald-700',
      en_revision: 'bg-amber-100 text-amber-700',
      borrador: 'bg-slate-100 text-slate-700',
      obsoleto: 'bg-red-100 text-red-700',
      archivado: 'bg-gray-100 text-gray-700'
    };
    return colores[estado] || colores.borrador;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header del Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-slate-900 truncate">
                {documento.titulo}
              </h3>
              <div className="flex items-center gap-3 text-sm text-slate-500 mt-0.5">
                <span className="font-mono">{documento.codigo}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorEstado(documento.estado)}`}>
                  {documento.estado || 'Borrador'}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1">
                  <Layers size={14} />
                  v{documento.version_actual || 1}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onAbrirNueva(documento.archivo_url)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
              title="Abrir en nueva pestaña"
            >
              <ExternalLink size={18} />
            </button>
            <button
              onClick={() => onDescargar(documento.archivo_url)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
              title="Descargar archivo"
            >
              <Download size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
              title="Cerrar"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Hash size={14} />
                Código
              </div>
              <p className="text-sm font-medium text-slate-900 font-mono">{documento.codigo}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Tag size={14} />
                Estado
              </div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colorEstado(documento.estado)}`}>
                {documento.estado || 'Borrador'}
              </span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Layers size={14} />
                Versión
              </div>
              <p className="text-sm font-medium text-slate-900">v{documento.version_actual || 1}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Calendar size={14} />
                Fecha de creación
              </div>
              <p className="text-sm font-medium text-slate-900">{formatearFecha(documento.creado_en)}</p>
            </div>
          </div>

          {/* Vista previa */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Vista previa</h4>
            {renderVistaPrevia()}
          </div>

          {/* Información adicional si existe */}
          {documento.descripcion && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Descripción</h4>
              <p className="text-sm text-slate-600">{documento.descripcion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente Principal
export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);

  useEffect(() => {
    cargarDocumentos();
  }, []);

  const cargarDocumentos = async () => {
    try {
      const { data } = await axios.get('/api/v1/documentos');
      setDocumentos(data);
    } catch (err) {
      // Datos de demostración con archivos de ejemplo
      setDocumentos([
        { 
          id: '1', 
          codigo: 'POL-001', 
          titulo: 'Política de Calidad Institucional', 
          estado: 'aprobado', 
          version_actual: 3, 
          creado_en: '2024-01-15',
          archivo_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          descripcion: 'Documento que establece los lineamientos de calidad para la institución'
        },
        { 
          id: '2', 
          codigo: 'MAN-002', 
          titulo: 'Manual de Gestión de Procesos', 
          estado: 'en_revision', 
          version_actual: 2, 
          creado_en: '2024-02-20',
          archivo_url: null,
          descripcion: 'Manual que describe todos los procesos institucionales'
        },
        { 
          id: '3', 
          codigo: 'PRO-003', 
          titulo: 'Procedimiento de Evaluación Docente', 
          estado: 'aprobado', 
          version_actual: 1, 
          creado_en: '2024-03-10',
          archivo_url: 'https://via.placeholder.com/800x600.png',
          descripcion: 'Procedimiento para la evaluación del desempeño docente'
        },
      ]);
    }
  };

  const descargarReporte = async () => {
    try {
      const response = await axios.get('/api/v1/documentos/reporte', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte-documentos.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert('Error al generar PDF');
    }
  };

  const abrirModal = (documento) => {
    setDocumentoSeleccionado(documento);
    setModalAbierto(true);
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setDocumentoSeleccionado(null);
    document.body.style.overflow = 'unset';
  };

  const handleDescargar = (url) => {
    if (!url) {
      alert('Este documento no tiene archivo adjunto para descargar');
      return;
    }
    
    try {
      // Intentar descargar directamente si es una URL de archivo
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = url.split('/').pop() || 'documento';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      // Si falla, abrir en nueva pestaña
      window.open(url, '_blank');
    }
  };

  const handleAbrirNueva = (url) => {
    if (!url) {
      alert('Este documento no tiene archivo adjunto para abrir');
      return;
    }
    window.open(url, '_blank');
  };

  const filtrados = documentos.filter(d =>
    d.titulo?.toLowerCase().includes(filtro.toLowerCase()) ||
    d.codigo?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Gestión Documental</h2>
            <p className="text-sm text-slate-500 mt-1">
              {filtrados.length} documentos encontrados
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={descargarReporte} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors">
              <Download size={18} /> Reporte PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={18} /> Nuevo Documento
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Buscar por código o título..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Versión</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtrados.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 font-mono">{doc.codigo}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{doc.titulo}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        doc.estado === 'aprobado' ? 'bg-emerald-100 text-emerald-700' :
                        doc.estado === 'en_revision' ? 'bg-amber-100 text-amber-700' :
                        doc.estado === 'obsoleto' ? 'bg-red-100 text-red-700' :
                        doc.estado === 'archivado' ? 'bg-gray-100 text-gray-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {doc.estado || 'Borrador'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">v{doc.version_actual || 1}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {doc.creado_en ? new Date(doc.creado_en).toLocaleDateString('es-ES') : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => abrirModal(doc)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        <Eye size={16} />
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalAbierto && documentoSeleccionado && (
        <ModalDocumento
          documento={documentoSeleccionado}
          onClose={cerrarModal}
          onDescargar={handleDescargar}
          onAbrirNueva={handleAbrirNueva}
        />
      )}
    </div>
  );
}