import React, { useState, useEffect } from 'react';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboardPage from './AdminDashboardPage';

const AdminPage = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin_token');
    if (stored) setToken(stored);
  }, []);

  const handleLogin = (t) => setToken(t);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  if (!token) return <AdminLoginPage onLogin={handleLogin} />;
  return <AdminDashboardPage token={token} onLogout={handleLogout} />;
};

export default AdminPage;
