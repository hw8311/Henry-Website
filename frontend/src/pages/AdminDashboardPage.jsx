import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBar,
  Envelope,
  FileArrowDown,
  Eye,
  CheckCircle,
  Clock,
  CircleNotch,
  SignOut,
  ArrowClockwise,
  X,
} from '@phosphor-icons/react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const statusConfig = {
  new: { label: 'Neu', color: 'text-gold', bg: 'bg-gold/10 border-gold/30' },
  in_progress: { label: 'In Bearbeitung', color: 'text-violet', bg: 'bg-violet/10 border-violet/30' },
  done: { label: 'Erledigt', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/30' },
};

const StatCard = ({ icon: Icon, label, value, accent = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-6 border ${accent ? 'border-gold/30 bg-gold/5' : 'border-white/5 bg-navy-light/50'}`}
  >
    <Icon size={24} weight="light" className={accent ? 'text-gold mb-3' : 'text-muted-gray mb-3'} />
    <p className="text-3xl font-display text-offwhite mb-1" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>{value}</p>
    <p className="text-sm text-muted-gray">{label}</p>
  </motion.div>
);

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.new;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border ${cfg.bg} ${cfg.color}`}>
      {status === 'new' && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
      {cfg.label}
    </span>
  );
};

const AdminDashboardPage = ({ token, onLogout }) => {
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, contactsRes, leadsRes] = await Promise.all([
        axios.get(`${API}/admin/stats`, { headers }),
        axios.get(`${API}/admin/contacts`, { headers }),
        axios.get(`${API}/admin/leads`, { headers }),
      ]);
      setStats(statsRes.data);
      setContacts(contactsRes.data);
      setLeads(leadsRes.data);
    } catch (err) {
      if (err.response?.status === 401) onLogout();
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${API}/admin/contacts/${id}`, { status: newStatus }, { headers });
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
      if (selectedContact?.id === id) setSelectedContact((prev) => ({ ...prev, status: newStatus }));
      fetchData();
    } catch (err) {
      if (err.response?.status === 401) onLogout();
    }
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <CircleNotch size={32} className="text-gold animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Übersicht', icon: ChartBar },
    { id: 'contacts', label: `Anfragen (${stats?.contacts?.new || 0})`, icon: Envelope },
    { id: 'leads', label: 'Downloads', icon: FileArrowDown },
  ];

  return (
    <div className="min-h-screen bg-navy" data-testid="admin-dashboard">
      {/* Header */}
      <header className="border-b border-white/5 bg-navy-light/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="heading-display text-lg text-offwhite">Dashboard</span>
            <span className="label-mono text-gold text-[10px]">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 text-muted-gray hover:text-gold transition-colors"
              title="Aktualisieren"
              data-testid="admin-refresh-btn"
            >
              <ArrowClockwise size={18} />
            </button>
            <button
              onClick={onLogout}
              className="p-2 text-muted-gray hover:text-red-400 transition-colors"
              title="Abmelden"
              data-testid="admin-logout-btn"
            >
              <SignOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white/5">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                data-testid={`admin-tab-${t.id}`}
                className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors border-b-2 -mb-px ${
                  tab === t.id
                    ? 'text-gold border-gold'
                    : 'text-muted-gray border-transparent hover:text-offwhite'
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {tab === 'overview' && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard icon={Envelope} label="Neue Anfragen" value={stats.contacts.new} accent />
              <StatCard icon={Clock} label="In Bearbeitung" value={stats.contacts.in_progress} />
              <StatCard icon={CheckCircle} label="Erledigt" value={stats.contacts.done} />
              <StatCard icon={FileArrowDown} label="Downloads" value={stats.leads.total} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-6 border border-white/5 bg-navy-light/30">
                <p className="text-sm text-muted-gray mb-1">Letzte 30 Tage</p>
                <p className="text-2xl font-display text-offwhite">{stats.last_30_days.contacts} <span className="text-sm text-muted-gray">Anfragen</span></p>
              </div>
              <div className="p-6 border border-white/5 bg-navy-light/30">
                <p className="text-sm text-muted-gray mb-1">Letzte 30 Tage</p>
                <p className="text-2xl font-display text-offwhite">{stats.last_30_days.leads} <span className="text-sm text-muted-gray">Downloads</span></p>
              </div>
            </div>

            {/* Recent contacts preview */}
            <h3 className="font-display text-lg text-offwhite mb-4">Neueste Anfragen</h3>
            <div className="space-y-2">
              {contacts.slice(0, 5).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-4 border border-white/5 bg-navy-light/20 hover:border-gold/20 transition-colors cursor-pointer"
                  onClick={() => { setSelectedContact(c); }}
                  data-testid={`contact-preview-${c.id}`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <StatusBadge status={c.status} />
                    <div className="min-w-0">
                      <p className="text-offwhite text-sm font-medium truncate">{c.name}</p>
                      <p className="text-muted-gray text-xs truncate">{c.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-gray flex-shrink-0 ml-4">{formatDate(c.created_at)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contacts Tab */}
        {tab === 'contacts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-2">
              {contacts.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-4 border border-white/5 bg-navy-light/20 hover:border-gold/20 transition-colors cursor-pointer group"
                  onClick={() => setSelectedContact(c)}
                  data-testid={`contact-row-${c.id}`}
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <StatusBadge status={c.status} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-offwhite text-sm font-medium">{c.name}</p>
                        {c.company && <span className="text-xs text-muted-gray">({c.company})</span>}
                      </div>
                      <p className="text-muted-gray text-xs truncate max-w-md">{c.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className="text-xs text-muted-gray">{formatDate(c.created_at)}</span>
                    <Eye size={16} className="text-muted-gray group-hover:text-gold transition-colors" />
                  </div>
                </div>
              ))}
              {contacts.length === 0 && (
                <p className="text-muted-gray text-center py-12">Keine Anfragen vorhanden.</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Leads Tab */}
        {tab === 'leads' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-2">
              {leads.map((l, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border border-white/5 bg-navy-light/20"
                  data-testid={`lead-row-${i}`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <FileArrowDown size={20} className="text-gold flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-offwhite text-sm">{l.email}</p>
                      {l.name && <p className="text-muted-gray text-xs">{l.name}{l.company ? ` - ${l.company}` : ''}</p>}
                    </div>
                  </div>
                  <span className="text-xs text-muted-gray flex-shrink-0 ml-4">{formatDate(l.created_at)}</span>
                </div>
              ))}
              {leads.length === 0 && (
                <p className="text-muted-gray text-center py-12">Keine Downloads vorhanden.</p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Contact Detail Modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-sm p-6"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-navy-light border border-white/10 w-full max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              data-testid="contact-detail-modal"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div>
                  <h2 className="font-display text-xl text-offwhite">{selectedContact.name}</h2>
                  <p className="text-muted-gray text-sm mt-1">{selectedContact.email}</p>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-2 text-muted-gray hover:text-offwhite transition-colors"
                  data-testid="close-modal-btn"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 space-y-6">
                {selectedContact.company && (
                  <div>
                    <p className="label-mono text-muted-gray text-[10px] mb-1">Unternehmen</p>
                    <p className="text-offwhite">{selectedContact.company}</p>
                  </div>
                )}

                <div>
                  <p className="label-mono text-muted-gray text-[10px] mb-1">Nachricht</p>
                  <p className="text-offwhite leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                </div>

                <div>
                  <p className="label-mono text-muted-gray text-[10px] mb-1">Eingegangen</p>
                  <p className="text-offwhite text-sm">{formatDate(selectedContact.created_at)}</p>
                </div>

                {/* Status controls */}
                <div>
                  <p className="label-mono text-muted-gray text-[10px] mb-3">Status ändern</p>
                  <div className="flex gap-2">
                    {Object.entries(statusConfig).map(([key, cfg]) => (
                      <button
                        key={key}
                        onClick={() => updateStatus(selectedContact.id, key)}
                        data-testid={`status-btn-${key}`}
                        className={`px-3 py-2 text-xs border transition-all ${
                          selectedContact.status === key
                            ? `${cfg.bg} ${cfg.color}`
                            : 'border-white/10 text-muted-gray hover:border-white/20 hover:text-offwhite'
                        }`}
                      >
                        {cfg.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardPage;
