import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CircleNotch, WarningCircle } from '@phosphor-icons/react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminLoginPage = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/login`, { password });
      localStorage.setItem('admin_token', res.data.token);
      onLogin(res.data.token);
    } catch {
      setError('Falsches Passwort');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <ShieldCheck size={48} weight="thin" className="text-gold mx-auto mb-4" />
          <h1 className="heading-display text-2xl text-offwhite" data-testid="admin-login-title">Admin</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" data-testid="admin-login-form">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
              className="input-minimal text-center"
              data-testid="admin-password-input"
              autoFocus
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-red-400 text-sm"
              data-testid="admin-login-error"
            >
              <WarningCircle size={16} />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-primary w-full flex items-center justify-center gap-2"
            data-testid="admin-login-button"
          >
            {loading ? <CircleNotch size={18} className="animate-spin" /> : 'Anmelden'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
