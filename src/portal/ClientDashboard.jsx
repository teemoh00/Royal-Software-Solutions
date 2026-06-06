import React, { useState, useEffect } from 'react';
import {
    Briefcase, DollarSign, Headset, Calendar, Download, Plus, CheckCircle,
    Clock, AlertCircle, FileText, ExternalLink, ShieldCheck, Mail, Phone
} from 'lucide-react';
import { apiClient } from '../services/apiClient';
import { useCompany } from '../services/CompanyContext';

const ClientDashboard = () => {
    const { company } = useCompany();
    const [clientName, setClientName] = useState('Valued Client');
    const [projects, setProjects] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [invoices, setInvoices] = useState([
        { id: 'INV-2026-001', subject: 'ERP Customization - Deposit', date: '2026-05-20', due: '2026-06-05', total: 4500.00, status: 'unpaid' },
        { id: 'INV-2026-002', subject: 'Domain & Cloud Hosting Renewal', date: '2026-05-15', due: '2026-05-30', total: 250.00, status: 'paid' }
    ]);

    useEffect(() => {
        const user = apiClient.auth.getCurrentUser();
        if (user) {
            const name = user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username;
            setClientName(name);
        }

        // Load project fallbacks or live list
        setProjects(apiClient.projects.list());

        // Load ticket fallbacks or live list
        setTickets(apiClient.tickets.list());
    }, []);

    // Calculate totals
    const unpaidInvoices = invoices.filter(inv => inv.status === 'unpaid');
    const totalBalance = unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0);

    const handlePayInvoice = (id, amount) => {
        alert(`Initializing secure payment of $${amount.toFixed(2)} for Invoice ${id} via Stripe / M-Pesa...`);
    };

    return (
        <div style={{ padding: '20px', background: 'var(--body-bg)', minHeight: '100vh', width: '100%' }} className="animations-fade-in">
            {/* Premium Gold Welcome Banners */}
            <div className="portal-content-card" style={{
                padding: '25px', 
                background: 'linear-gradient(135deg, #0f2d37 0%, #1b6b6b 100%)', 
                color: 'white', 
                borderRadius: '15px', 
                marginBottom: '30px',
                borderLeft: '5px solid #C89B2A',
                boxShadow: '0 8px 30px rgba(15, 45, 55, 0.15)'
            }}>
                <h1 style={{ fontSize: '26px', margin: '0 0 10px 0', fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
                    Welcome back, {clientName}.
                </h1>
                <p style={{ margin: '0 0 5px 0', opacity: 0.9, fontSize: '14px' }}>
                    {company.name} • Access code sessions: Active • Secure Client Hub
                </p>
                <div style={{ display: 'flex', gap: '15px', marginTop: '15px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '20px' }}>
                        <ShieldCheck size={14} color="#C89B2A" /> Account: Premium SLA
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '20px' }}>
                        <Calendar size={14} color="#C89B2A" /> Account Manager: Alex Smith
                    </div>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <KpiCard title="My Projects" value={projects.length.toString()} trend="Active workstreams" icon={<Briefcase size={22} />} color="#1b6b6b" />
                <KpiCard title="Balance Due" value={`$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} trend="Payable invoices" icon={<DollarSign size={22} />} color="#ef4444" />
                <KpiCard title="Tickets Filed" value={tickets.length.toString()} trend="Support desk" icon={<Headset size={22} />} color="#C89B2A" />
                <KpiCard title="Total Invoiced" value={`$${invoices.reduce((sum, inv) => sum + inv.total, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} trend="All-time bills" icon={<FileText size={22} />} color="#3b82f6" />
            </div>

            {/* Main Details Split Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr', gap: '25px' }} className="form-grid-responsive">
                
                {/* Left Side: Projects & Assets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    
                    {/* Projects Milestone Track */}
                    <div className="portal-content-card" style={{ padding: '25px', background: 'white', borderRadius: '15px' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>Active Project Tracks</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {projects.map((proj) => (
                                <div key={proj.id} style={{ padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <div>
                                            <span style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>{proj.name}</span>
                                            <div style={{ fontSize: '11px', color: '#64748b' }}>Client: {proj.client} • Manager: {proj.manager}</div>
                                        </div>
                                        <span style={{
                                            padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 700,
                                            background: proj.status === 'completed' ? '#ecfdf5' : '#eff6ff',
                                            color: proj.status === 'completed' ? '#10b981' : '#3b82f6'
                                        }}>{proj.status.toUpperCase()}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '3px', fontSize: '12px', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#64748b' }}>Milestone progress</span>
                                        <span style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{proj.progress}%</span>
                                    </div>
                                    <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${proj.progress}%`, background: 'linear-gradient(90deg, #1b6b6b 0%, #C89B2A 100%)' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shared Resource Files */}
                    <div className="portal-content-card" style={{ padding: '25px', background: 'white', borderRadius: '15px' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>Shared Documents Locker</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }} className="form-grid-responsive">
                            <div style={{ padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px', textAlign: 'center' }}>
                                <FileText size={30} style={{ color: '#C89B2A', margin: '0 auto 10px auto' }} />
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Service_Agreement.pdf</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>Signed SLA • 1.2 MB</div>
                                <button className="btn-outline btn-sm" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Download size={12} /> Download</button>
                            </div>
                            <div style={{ padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px', textAlign: 'center' }}>
                                <FileText size={30} style={{ color: '#1b6b6b', margin: '0 auto 10px auto' }} />
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>System_Architecture.pdf</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>Tech Specs • 4.5 MB</div>
                                <button className="btn-outline btn-sm" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Download size={12} /> Download</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Billing & Support Desk */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    
                    {/* Unpaid & Current Invoices */}
                    <div className="portal-content-card" style={{ padding: '25px', background: 'white', borderRadius: '15px' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>Invoices & Payments</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {invoices.map((inv) => (
                                <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>{inv.id}</span>
                                            <span style={{
                                                padding: '2px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: 700,
                                                background: inv.status === 'paid' ? '#ecfdf5' : '#fee2e2',
                                                color: inv.status === 'paid' ? '#10b981' : '#ef4444'
                                            }}>{inv.status.toUpperCase()}</span>
                                        </div>
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', margin: '4px 0' }}>{inv.subject}</span>
                                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Due Date: {inv.due}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e293b', marginBottom: '8px' }}>${inv.total.toFixed(2)}</div>
                                        {inv.status === 'unpaid' && (
                                            <button 
                                                onClick={() => handlePayInvoice(inv.id, inv.total)}
                                                className="btn-primary" 
                                                style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '6px', fontWeight: 600 }}
                                            >
                                                Pay Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Support Ticket Desk Status */}
                    <div className="portal-content-card" style={{ padding: '25px', background: 'white', borderRadius: '15px' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>Support Ticket Logs</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {tickets.map((t, idx) => (
                                <div key={idx} style={{ padding: '12px', border: '1px solid #f1f5f9', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <strong style={{ fontSize: '13px', color: '#1b6b6b' }}>{t.id} - {t.subject}</strong>
                                        <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '12px', background: t.priority === 'High' ? '#fee2e2' : '#f3f4f6', color: t.priority === 'High' ? '#dc2626' : '#4b5563' }}>{t.priority}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                                        <span>Submited on ERP Support Desk</span>
                                        <span style={{ color: t.status === 'Open' ? '#ef4444' : t.status === 'Resolved' ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>{t.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const KpiCard = ({ title, value, trend, icon, color }) => (
    <div className="portal-content-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', borderRadius: '15px' }}>
        <div>
            <h4 style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>{title}</h4>
            <h2 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>{value}</h2>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{trend}</span>
        </div>
        <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: `${color}12`, color: color }}>
            {icon}
        </div>
    </div>
);

export default ClientDashboard;
