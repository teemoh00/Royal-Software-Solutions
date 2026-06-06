import { useState, useEffect } from 'react';
import {
    FileText, DollarSign, Download, CreditCard, CheckCircle,
    Clock, AlertCircle, Calendar, Filter, Search, RefreshCw,
    Smartphone, Globe, ChevronDown
} from 'lucide-react';
import { apiClient } from '../services/apiClient';

const mockInvoices = [
    {
        id: 'INV-2026-001',
        subject: 'ERP Customization - Deposit (50%)',
        date: '2026-05-01',
        due: '2026-05-20',
        total: 4500.00,
        status: 'unpaid',
        items: [
            { description: 'ERP Development - Phase 1', qty: 1, rate: 4000.00, amount: 4000.00 },
            { description: 'Project Setup & Configuration', qty: 1, rate: 500.00, amount: 500.00 }
        ]
    },
    {
        id: 'INV-2026-002',
        subject: 'Domain & Cloud Hosting (Annual)',
        date: '2026-04-15',
        due: '2026-05-01',
        total: 250.00,
        status: 'paid',
        paidOn: '2026-04-29',
        items: [
            { description: '.co.ke Domain Registration', qty: 1, rate: 50.00, amount: 50.00 },
            { description: 'VPS Cloud Hosting - Annual', qty: 1, rate: 200.00, amount: 200.00 }
        ]
    },
    {
        id: 'INV-2026-003',
        subject: 'Website Redesign - Initial Deposit',
        date: '2026-05-10',
        due: '2026-06-01',
        total: 1800.00,
        status: 'unpaid',
        items: [
            { description: 'UI/UX Design', qty: 1, rate: 800.00, amount: 800.00 },
            { description: 'Frontend Development', qty: 1, rate: 1000.00, amount: 1000.00 }
        ]
    }
];

const statusConfig = {
    paid: { bg: '#ecfdf5', color: '#10b981', label: 'PAID', icon: <CheckCircle size={14} /> },
    unpaid: { bg: '#fee2e2', color: '#ef4444', label: 'UNPAID', icon: <AlertCircle size={14} /> },
    pending: { bg: '#fef3c7', color: '#f59e0b', label: 'PENDING', icon: <Clock size={14} /> }
};

const ClientBilling = () => {
    const [invoices, setInvoices] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedInvoice, setExpandedInvoice] = useState(null);
    const [paymentModal, setPaymentModal] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setInvoices(mockInvoices);
    }, []);

    const filteredInvoices = invoices.filter(inv => {
        const matchesFilter = filter === 'all' || inv.status === filter;
        const matchesSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalDue = invoices.filter(i => i.status === 'unpaid').reduce((s, i) => s + i.total, 0);
    const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
    const totalBilled = invoices.reduce((s, i) => s + i.total, 0);

    const handlePayment = (method) => {
        alert(`Initiating ${method} payment for Invoice ${paymentModal?.id}: $${paymentModal?.total.toFixed(2)}\n\nThis would connect to ${method === 'mpesa' ? 'Safaricom M-Pesa' : 'Stripe'} payment gateway.`);
        setPaymentModal(null);
    };

    return (
        <div style={{ padding: '20px' }} className="animations-fade-in">
            {/* Header */}
            <div style={{ marginBottom: '25px' }}>
                <h1 style={{ margin: '0 0 8px', fontSize: '26px', fontWeight: 800, color: '#1e293b', fontFamily: 'Outfit, sans-serif' }}>
                    Billing & Invoices
                </h1>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                    View, download, and settle your outstanding invoices.
                </p>
            </div>

            {/* Summary KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                <SummaryCard label="Outstanding Balance" value={`$${totalDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} color="#ef4444" icon={<AlertCircle size={20} />} />
                <SummaryCard label="Total Paid" value={`$${totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} color="#10b981" icon={<CheckCircle size={20} />} />
                <SummaryCard label="Total Billed" value={`$${totalBilled.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} color="#1b6b6b" icon={<DollarSign size={20} />} />
                <SummaryCard label="Invoices Count" value={`${invoices.length}`} color="#C89B2A" icon={<FileText size={20} />} />
            </div>

            {/* Filters & Search */}
            <div className="portal-content-card" style={{ padding: '15px 20px', background: 'white', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', flex: 1, minWidth: '200px' }}>
                    <Search size={15} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search by invoice ID or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: '#1e293b', width: '100%' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['all', 'unpaid', 'paid', 'pending'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '7px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                                background: filter === f ? '#0f2d37' : '#f1f5f9',
                                color: filter === f ? 'white' : '#64748b'
                            }}
                        >
                            {f.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Invoice List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {filteredInvoices.length === 0 ? (
                    <div style={{ padding: '50px', textAlign: 'center', background: 'white', borderRadius: '15px', color: '#94a3b8' }}>
                        <FileText size={40} style={{ margin: '0 auto 15px', display: 'block' }} />
                        <p>No invoices match your search.</p>
                    </div>
                ) : filteredInvoices.map(inv => {
                    const conf = statusConfig[inv.status] || statusConfig['pending'];
                    const isExpanded = expandedInvoice === inv.id;

                    return (
                        <div key={inv.id} className="portal-content-card" style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                            {/* Invoice Row */}
                            <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', cursor: 'pointer' }} onClick={() => setExpandedInvoice(isExpanded ? null : inv.id)}>

                                {/* Icon */}
                                <div style={{ padding: '10px', borderRadius: '10px', background: conf.bg, color: conf.color, flexShrink: 0 }}>
                                    <FileText size={20} />
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                                        <span style={{ fontWeight: 700, fontSize: '15px', color: '#1e293b' }}>{inv.id}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 800, background: conf.bg, color: conf.color }}>
                                            {conf.icon} {conf.label}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#475569', fontWeight: 500, marginBottom: '3px' }}>{inv.subject}</div>
                                    <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#94a3b8' }}>
                                        <span><Calendar size={11} style={{ display: 'inline', marginRight: '3px' }} />Issued: {inv.date}</span>
                                        <span><Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />Due: {inv.due}</span>
                                        {inv.paidOn && <span><CheckCircle size={11} style={{ display: 'inline', marginRight: '3px', color: '#10b981' }} />Paid: {inv.paidOn}</span>}
                                    </div>
                                </div>

                                {/* Amount & Action */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                                    <span style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>${inv.total.toFixed(2)}</span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {inv.status === 'unpaid' && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setPaymentModal(inv); }}
                                                className="btn-primary"
                                                style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}
                                            >
                                                <CreditCard size={13} /> Pay Now
                                            </button>
                                        )}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); alert(`Downloading ${inv.id}.pdf`); }}
                                            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}
                                        >
                                            <Download size={13} /> PDF
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Line Items */}
                            {isExpanded && (
                                <div style={{ borderTop: '1px solid #f1f5f9', padding: '18px 22px' }}>
                                    <h4 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Invoice Line Items</h4>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                                <th style={{ textAlign: 'left', padding: '8px 0', color: '#94a3b8', fontWeight: 600 }}>Description</th>
                                                <th style={{ textAlign: 'center', padding: '8px', color: '#94a3b8', fontWeight: 600 }}>Qty</th>
                                                <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 600 }}>Rate</th>
                                                <th style={{ textAlign: 'right', padding: '8px 0', color: '#94a3b8', fontWeight: 600 }}>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(inv.items || []).map((item, i) => (
                                                <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                                                    <td style={{ padding: '10px 0', color: '#1e293b' }}>{item.description}</td>
                                                    <td style={{ padding: '10px 8px', textAlign: 'center', color: '#64748b' }}>{item.qty}</td>
                                                    <td style={{ padding: '10px 8px', textAlign: 'right', color: '#64748b' }}>${item.rate.toFixed(2)}</td>
                                                    <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 600, color: '#1e293b' }}>${item.amount.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={3} style={{ padding: '12px 0 0', textAlign: 'right', fontWeight: 700, fontSize: '15px', color: '#1e293b' }}>TOTAL:</td>
                                                <td style={{ padding: '12px 0 0', textAlign: 'right', fontWeight: 800, fontSize: '18px', color: '#1b6b6b' }}>${inv.total.toFixed(2)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Payment Method Modal */}
            {paymentModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', borderRadius: '20px', padding: '35px', width: '100%', maxWidth: '420px', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
                        <h3 style={{ margin: '0 0 8px', fontFamily: 'Outfit, sans-serif', fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>Choose Payment Method</h3>
                        <p style={{ margin: '0 0 25px', color: '#64748b', fontSize: '13px' }}>
                            Paying <strong>{paymentModal.id}</strong> — Total: <strong style={{ color: '#ef4444' }}>${paymentModal.total.toFixed(2)}</strong>
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button
                                onClick={() => handlePayment('mpesa')}
                                style={{ padding: '16px 20px', borderRadius: '12px', border: '2px solid #15803d', background: '#f0fdf4', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}
                            >
                                <div style={{ padding: '8px', background: '#15803d', borderRadius: '8px', color: 'white' }}>
                                    <Smartphone size={22} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: '#15803d', fontSize: '14px' }}>M-Pesa (Safaricom)</div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>Pay via mobile money — instant</div>
                                </div>
                            </button>

                            <button
                                onClick={() => handlePayment('stripe')}
                                style={{ padding: '16px 20px', borderRadius: '12px', border: '2px solid #6366f1', background: '#f5f3ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}
                            >
                                <div style={{ padding: '8px', background: '#6366f1', borderRadius: '8px', color: 'white' }}>
                                    <Globe size={22} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: '#6366f1', fontSize: '14px' }}>Card / Stripe</div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>Visa, Mastercard, or any card</div>
                                </div>
                            </button>
                        </div>

                        <button
                            onClick={() => setPaymentModal(null)}
                            style={{ marginTop: '20px', width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const SummaryCard = ({ label, value, color, icon }) => (
    <div className="portal-content-card" style={{ padding: '18px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ padding: '10px', borderRadius: '10px', background: `${color}15`, color }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '21px', fontWeight: 800, color: '#1e293b' }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{label}</div>
        </div>
    </div>
);

export default ClientBilling;
