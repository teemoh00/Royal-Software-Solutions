import { useState, useEffect } from 'react';
import {
    Headset, Plus, Send, CheckCircle, Clock, AlertCircle,
    MessageSquare, Search, ChevronDown, RefreshCw, Tag,
    AlertTriangle, X, Paperclip
} from 'lucide-react';
import { apiClient } from '../services/apiClient';

const mockTickets = [
    {
        id: 'TK-2026-041',
        subject: 'ERP login issue after password reset',
        category: 'Technical Support',
        priority: 'High',
        status: 'open',
        createdAt: '2026-05-23',
        lastUpdate: '2026-05-24',
        messages: [
            { sender: 'Client', text: 'I am unable to log in after resetting my password. The system shows "Invalid Credentials" even with the new password.', time: '2026-05-23 09:15' },
            { sender: 'Support Agent', text: 'Thank you for reporting this. Our team has investigated and found a cache issue. Please clear your browser cookies and try again. If the issue persists, we will escalate.', time: '2026-05-24 11:30' }
        ]
    },
    {
        id: 'TK-2026-039',
        subject: 'Invoice download button not working on mobile',
        category: 'Bug Report',
        priority: 'Medium',
        status: 'in_progress',
        createdAt: '2026-05-20',
        lastUpdate: '2026-05-22',
        messages: [
            { sender: 'Client', text: 'The PDF download button for invoices does not respond when I tap it on my mobile browser (Chrome on Android).', time: '2026-05-20 14:00' },
            { sender: 'Support Agent', text: 'We have reproduced the issue and logged it as a bug. A fix is being deployed in the next update scheduled for May 28.', time: '2026-05-22 10:20' }
        ]
    },
    {
        id: 'TK-2026-035',
        subject: 'Request for additional user account access',
        category: 'Account Management',
        priority: 'Low',
        status: 'resolved',
        createdAt: '2026-05-10',
        lastUpdate: '2026-05-12',
        messages: [
            { sender: 'Client', text: 'We need to add one more user from our finance team to access the portal billing section only.', time: '2026-05-10 08:00' },
            { sender: 'Support Agent', text: 'The additional user account has been created and access granted. Please check your inbox for the invitation email.', time: '2026-05-12 16:45' }
        ]
    }
];

const priorityConfig = {
    High: { bg: '#fee2e2', color: '#dc2626' },
    Medium: { bg: '#fef3c7', color: '#d97706' },
    Low: { bg: '#f0fdf4', color: '#16a34a' }
};

const statusConfig = {
    open: { label: 'OPEN', bg: '#fee2e2', color: '#dc2626', icon: <AlertCircle size={14} /> },
    in_progress: { label: 'IN PROGRESS', bg: '#eff6ff', color: '#3b82f6', icon: <Clock size={14} /> },
    resolved: { label: 'RESOLVED', bg: '#ecfdf5', color: '#10b981', icon: <CheckCircle size={14} /> },
    closed: { label: 'CLOSED', bg: '#f1f5f9', color: '#94a3b8', icon: <CheckCircle size={14} /> }
};

const CATEGORIES = ['Technical Support', 'Bug Report', 'Account Management', 'Billing Query', 'Feature Request', 'General Inquiry'];
const PRIORITIES = ['Low', 'Medium', 'High'];

const ClientSupport = () => {
    const [tickets, setTickets] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewTicketForm, setShowNewTicketForm] = useState(false);
    const [activeTicket, setActiveTicket] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [formData, setFormData] = useState({ subject: '', category: '', priority: 'Medium', description: '' });
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        setTickets(mockTickets);
    }, []);

    const filteredTickets = tickets.filter(t => {
        const matchFilter = filter === 'all' || t.status === filter;
        const matchSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchFilter && matchSearch;
    });

    const handleNewTicket = async (e) => {
        e.preventDefault();
        if (!formData.subject || !formData.category || !formData.description) return;
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 1000));
        const newTicket = {
            id: `TK-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
            subject: formData.subject,
            category: formData.category,
            priority: formData.priority,
            status: 'open',
            createdAt: new Date().toISOString().split('T')[0],
            lastUpdate: new Date().toISOString().split('T')[0],
            messages: [{ sender: 'Client', text: formData.description, time: new Date().toLocaleString() }]
        };
        setTickets(prev => [newTicket, ...prev]);
        setFormData({ subject: '', category: '', priority: 'Medium', description: '' });
        setShowNewTicketForm(false);
        setSubmitting(false);
        setSuccessMsg(`Ticket ${newTicket.id} created! Our team will respond within 24 hours.`);
        setTimeout(() => setSuccessMsg(''), 5000);
    };

    const handleReply = () => {
        if (!replyText.trim() || !activeTicket) return;
        const updated = tickets.map(t => {
            if (t.id === activeTicket.id) {
                return {
                    ...t,
                    messages: [...t.messages, { sender: 'Client', text: replyText, time: new Date().toLocaleString() }],
                    lastUpdate: new Date().toISOString().split('T')[0]
                };
            }
            return t;
        });
        setTickets(updated);
        setActiveTicket(prev => ({
            ...prev,
            messages: [...prev.messages, { sender: 'Client', text: replyText, time: new Date().toLocaleString() }]
        }));
        setReplyText('');
    };

    return (
        <div style={{ padding: '20px' }} className="animations-fade-in">

            {/* Success Notification */}
            {successMsg && (
                <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', color: '#065f46', padding: '12px 18px', borderRadius: '10px', marginBottom: '20px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={16} color="#10b981" /> {successMsg}
                </div>
            )}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                    <h1 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: 800, color: '#1e293b', fontFamily: 'Outfit, sans-serif' }}>
                        Support Desk
                    </h1>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                        Track and manage your support requests with our team.
                    </p>
                </div>
                <button
                    onClick={() => { setShowNewTicketForm(true); setActiveTicket(null); }}
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '14px' }}
                >
                    <Plus size={16} /> New Ticket
                </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '25px' }}>
                {[
                    { label: 'Total Tickets', value: tickets.length, color: '#1b6b6b', icon: <Headset size={18} /> },
                    { label: 'Open', value: tickets.filter(t => t.status === 'open').length, color: '#ef4444', icon: <AlertCircle size={18} /> },
                    { label: 'In Progress', value: tickets.filter(t => t.status === 'in_progress').length, color: '#3b82f6', icon: <Clock size={18} /> },
                    { label: 'Resolved', value: tickets.filter(t => t.status === 'resolved').length, color: '#10b981', icon: <CheckCircle size={18} /> }
                ].map(s => (
                    <div key={s.label} className="portal-content-card" style={{ padding: '16px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '8px', borderRadius: '8px', background: `${s.color}15`, color: s.color }}>
                            {s.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>{s.value}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: activeTicket ? '1fr 1.2fr' : '1fr', gap: '20px' }} className="form-grid-responsive">
                {/* Left Panel: Ticket List */}
                <div>
                    {/* New Ticket Form */}
                    {showNewTicketForm && (
                        <div className="portal-content-card" style={{ background: 'white', borderRadius: '16px', padding: '22px', marginBottom: '20px', border: '2px solid #C89B2A' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>New Support Request</h3>
                                <button onClick={() => setShowNewTicketForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleNewTicket} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <input
                                    type="text"
                                    placeholder="Brief summary of the issue *"
                                    value={formData.subject}
                                    onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                                    required
                                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', outline: 'none' }}
                                />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                                        required
                                        style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', outline: 'none' }}
                                    >
                                        <option value="">Category *</option>
                                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                    <select
                                        value={formData.priority}
                                        onChange={e => setFormData(p => ({ ...p, priority: e.target.value }))}
                                        style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', outline: 'none' }}
                                    >
                                        {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                                    </select>
                                </div>
                                <textarea
                                    placeholder="Describe your issue in detail... *"
                                    value={formData.description}
                                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                                    required
                                    rows={4}
                                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                                />
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-primary"
                                    style={{ padding: '11px', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                >
                                    {submitting ? <><RefreshCw size={15} className="spin" /> Submitting...</> : <><Send size={15} /> Submit Ticket</>}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Filter & Search Bar */}
                    <div className="portal-content-card" style={{ background: 'white', borderRadius: '12px', padding: '12px 16px', marginBottom: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '7px 12px', borderRadius: '8px', minWidth: '160px' }}>
                            <Search size={14} color="#94a3b8" />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: '#1e293b', width: '100%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {[{ key: 'all', label: 'All' }, { key: 'open', label: 'Open' }, { key: 'in_progress', label: 'Active' }, { key: 'resolved', label: 'Done' }].map(f => (
                                <button key={f.key} onClick={() => setFilter(f.key)} style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 600, background: filter === f.key ? '#0f2d37' : '#f1f5f9', color: filter === f.key ? 'white' : '#64748b' }}>
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ticket Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {filteredTickets.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center', background: 'white', borderRadius: '12px', color: '#94a3b8' }}>
                                <Headset size={35} style={{ margin: '0 auto 12px', display: 'block' }} />
                                <p style={{ margin: 0, fontSize: '14px' }}>No tickets found.</p>
                            </div>
                        ) : filteredTickets.map(ticket => {
                            const sConf = statusConfig[ticket.status] || statusConfig['open'];
                            const pConf = priorityConfig[ticket.priority] || priorityConfig['Low'];
                            const isSelected = activeTicket?.id === ticket.id;

                            return (
                                <div
                                    key={ticket.id}
                                    className="portal-content-card"
                                    onClick={() => { setActiveTicket(ticket); setShowNewTicketForm(false); }}
                                    style={{
                                        background: 'white', borderRadius: '12px', padding: '16px 18px', cursor: 'pointer',
                                        border: isSelected ? '2px solid #C89B2A' : '2px solid transparent',
                                        boxShadow: isSelected ? '0 4px 20px rgba(200,155,42,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                        <div>
                                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#C89B2A' }}>{ticket.id}</span>
                                            <h4 style={{ margin: '3px 0', fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{ticket.subject}</h4>
                                        </div>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, background: sConf.bg, color: sConf.color, flexShrink: 0, marginLeft: '10px' }}>
                                            {sConf.icon} {sConf.label}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#64748b' }}>
                                                {ticket.category}
                                            </span>
                                            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: pConf.bg, color: pConf.color, fontWeight: 700 }}>
                                                {ticket.priority}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Updated: {ticket.lastUpdate}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Panel: Ticket Thread */}
                {activeTicket && (
                    <div className="portal-content-card" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '600px' }}>
                        {/* Thread Header */}
                        <div style={{ padding: '18px 22px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#C89B2A', fontWeight: 700, marginBottom: '4px' }}>{activeTicket.id}</div>
                                    <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>{activeTicket.subject}</h3>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {(() => {
                                            const sConf = statusConfig[activeTicket.status] || statusConfig['open'];
                                            return <span style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 700, background: sConf.bg, color: sConf.color }}>{sConf.icon} {sConf.label}</span>;
                                        })()}
                                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#64748b' }}>{activeTicket.category}</span>
                                    </div>
                                </div>
                                <button onClick={() => setActiveTicket(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}>
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Message Thread */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {activeTicket.messages.map((msg, idx) => {
                                const isClient = msg.sender === 'Client';
                                return (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isClient ? 'flex-end' : 'flex-start' }}>
                                        <span style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>{msg.sender} • {msg.time}</span>
                                        <div style={{
                                            maxWidth: '80%', padding: '12px 15px', borderRadius: isClient ? '14px 14px 0 14px' : '14px 14px 14px 0',
                                            background: isClient ? 'linear-gradient(135deg, #0f2d37, #1b6b6b)' : '#f1f5f9',
                                            color: isClient ? 'white' : '#1e293b', fontSize: '13px', lineHeight: 1.5
                                        }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Reply Box */}
                        {activeTicket.status !== 'resolved' && activeTicket.status !== 'closed' && (
                            <div style={{ padding: '14px 18px', borderTop: '1px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                                    <textarea
                                        placeholder="Type your reply..."
                                        value={replyText}
                                        onChange={e => setReplyText(e.target.value)}
                                        rows={2}
                                        style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', resize: 'none', fontFamily: 'inherit', color: '#1e293b' }}
                                    />
                                    <button
                                        onClick={handleReply}
                                        disabled={!replyText.trim()}
                                        className="btn-primary"
                                        style={{ padding: '10px 16px', borderRadius: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, opacity: replyText.trim() ? 1 : 0.5 }}
                                    >
                                        <Send size={15} /> Send
                                    </button>
                                </div>
                            </div>
                        )}
                        {(activeTicket.status === 'resolved' || activeTicket.status === 'closed') && (
                            <div style={{ padding: '14px 18px', borderTop: '1px solid #f1f5f9', textAlign: 'center', color: '#10b981', fontSize: '13px', fontWeight: 600 }}>
                                <CheckCircle size={14} style={{ display: 'inline', marginRight: '5px' }} />
                                This ticket has been resolved.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientSupport;
