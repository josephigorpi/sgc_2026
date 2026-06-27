
'use client';

import Sidebar from '@/components/Layout/Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, AlertTriangle, ClipboardCheck, TrendingUp, Calendar, Users, CheckCircle2, Clock } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/v1/dashboard');
        setStats(data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Datos para gráficos
  const documentosPorEstadoData = stats?.documentos?.porEstado?.map(d => ({ name: d.estado, value: d.count })) || [];
  const riesgosPorNivelData = stats?.riesgos?.porNivel ? [
    { name: 'Bajo', value: stats.riesgos.porNivel.bajo },
    { name: 'Medio', value: stats.riesgos.porNivel.medio },
    { name: 'Alto', value: stats.riesgos.porNivel.alto },
    { name: 'Crítico', value: stats.riesgos.porNivel.critico }
  ] : [];
  const capasData = [
    { name: 'Abiertas', value: stats?.capas?.abiertas || 0 },
    { name: 'Cerradas', value: stats?.capas?.cerradas || 0 },
    { name: 'Vencidas', value: stats?.capas?.vencidas || 0 }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Ejecutivo</h1>
        <p className="text-gray-500">Resumen general del Sistema de Gestión de Calidad</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Documentos Vigentes</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats?.documentos?.total || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Próximos a vencer: {stats?.documentos?.proximosVencer || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Riesgos Críticos</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{stats?.riesgos?.criticos || 0}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Total riesgos: {stats?.riesgos?.total || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">CAPAs Pendientes</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{stats?.capas?.abiertas || 0}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <ClipboardCheck className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Vencidas: {stats?.capas?.vencidas || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Indicadores Cumplidos</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats?.indicadores?.cumplidos || 0}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Total indicadores: {stats?.indicadores?.total || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Auditorías del Año</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{stats?.auditorias?.anio || 0}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Hallazgos abiertos: {stats?.auditorias?.hallazgosAbiertos || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Satisfacción Promedio</p>
              <p className="text-3xl font-bold text-teal-600 mt-1">{stats?.encuestas?.satisfaccionPromedio || 0}%</p>
            </div>
            <div className="p-3 bg-teal-100 rounded-full">
              <Users className="h-6 w-6 text-teal-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Respuestas: {stats?.encuestas?.respuestas || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Procesos Registrados</p>
              <p className="text-3xl font-bold text-indigo-600 mt-1">{stats?.procesos?.total || 0}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Encuestas Creadas</p>
              <p className="text-3xl font-bold text-pink-600 mt-1">{stats?.encuestas?.total || 0}</p>
            </div>
            <div className="p-3 bg-pink-100 rounded-full">
              <Clock className="h-6 w-6 text-pink-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documentos por Estado - Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Documentos por Estado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={documentosPorEstadoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Riesgos por Nivel - Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Riesgos por Nivel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riesgosPorNivelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {riesgosPorNivelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* CAPAs - Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de CAPAs</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={capasData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      </main>
    </div>
  );
};

export default DashboardPage;
