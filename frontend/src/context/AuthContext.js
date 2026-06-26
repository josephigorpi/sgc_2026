
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('sgc_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/v1/auth/perfil')
        .then(({ data }) => setUsuario(data))
        .catch(() => logout())
        .finally(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, []);

  const login = async (correo, contrasena) => {
    const { data } = await axios.post('/api/v1/auth/login', { correo, contrasena });
    localStorage.setItem('sgc_token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setUsuario(data.usuario);
    return data.usuario;
  };

  const register = async (usuarioData) => {
    const { data } = await axios.post('/api/v1/auth/registrar', usuarioData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('sgc_token');
    delete axios.defaults.headers.common['Authorization'];
    setUsuario(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, register, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);