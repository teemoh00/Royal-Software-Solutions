import { useState } from 'react';
import {
    Search, Filter, Plus, Users, Building, MonitorSmartphone,
    TrendingUp, DollarSign, Target, Briefcase, ChevronRight,
    MoreVertical, FileText, Download, Mail, Phone, Calendar,
    Clock, CheckCircle, AlertCircle, PieChart as PieChartIcon,
    BarChart, ExternalLink, UserPlus, Zap, MessageSquare,
    ArrowUpRight, ArrowDownRight, Layout
} from 'lucide-react';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, BarChart as RechartsBarChart,
    Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

// Dummy Data
const pipelineStages = [
    { id: 'new', label: 'New Lead', color: '#64748b' },
    { id: 'contacted', label: 'Initial Contact', color: '#3b82f6' },
    { id: 'qualified', label: 'Qualified', color: '#8b5cf6' },
    { id: 'proposal', label: 'Proposal Sent', color: '#f59e0b' },
    { id: 'negotiation', label: 'Negotiation', color: '#ec4899' },
    { id: 'won', label: 'Deal Won', color: '#10b981' },
    { id: 'lost', label: 'Deal Lost', color: '#ef4444' }
];

const leadsData = [
    { id: 'LD-101', name: 'John Peterson', company: 'Global Tech', source: 'Website', status: 'Qualified', value: '$12,500', agent: 'Alex Smith', date: '2026-03-01' },
    { id: 'LD-102', name: 'Sarah Wilson', company: 'Apex Corp', source: 'Referral', status: 'New', value: '$8,200', agent: 'Maria Garcia', date: '2026-03-05' },
    { id: 'LD-103', name: 'Michael Ross', company: 'Ross & Co', source: 'Social Media', status: 'Contacted', value: '$15,000', agent: 'Alex Smith', date: '2026-03-07' },
];

const dealsData = [
    { id: 'DL-501', name: 'ERP Implementation', client: 'Global Tech', value: '$45,000', stage: 'negotiation', agent: 'Alex Smith', probability: '75%', date: '2026-04-15' },
    { id: 'DL-502', name: 'CRM Customization', client: 'Apex Corp', value: '$12,000', stage: 'qualified', agent: 'Maria Garcia', probability: '40%', date: '2026-03-30' },
    { id: 'DL-503', name: 'Cloud Migration', client: 'Nexus Systems', value: '$85,000', stage: 'proposal', agent: 'Alex Smith', probability: '60%', date: '2026-05-10' },
    { id: 'DL-504', name: 'Legacy Support', client: 'Old Guard Inc', value: '$5,000', stage: 'won', agent: 'David Kim', probability: '100%', date: '2026-02-28' },
];

const quotationsData = [
    { id: 'QT-2026-001', client: 'Global Tech', date: '2026-03-05', expiry: '2026-04-05', total: '$12,500', status: 'Sent' },
    { id: 'QT-2026-002', client: 'Apex Corp', date: '2026-03-07', expiry: '2026-04-07', total: '$8,200', status: 'Accepted' },
    { id: 'QT-2026-003', client: 'Ross & Co', date: '2026-03-08', expiry: '2026-04-08', total: '$15,000', status: 'Draft' },
];

const activitiesData = [
    { id: 1, type: 'Call', client: 'Global Tech', agent: 'Alex Smith', date: '2026-03-09', time: '10:30 AM', notes: 'Discussed ERP requirements.' },
    { id: 2, type: 'Meeting', client: 'Apex Corp', agent: 'Maria Garcia', date: '2026-03-09', time: '02:00 PM', notes: 'Proposal presentation.' },
    { id: 3, type: 'Email', client: 'Nexus Systems', agent: 'Alex Smith', date: '2026-03-08', time: '04:45 PM', notes: 'Sent follow-up email.' },
];

const dashboardStats = [
    { label: 'Total Leads', value: '482', trend: '+12%', icon: <Users size={20} />, color: '#6366f1' },
    { label: 'Active Deals', value: '34', trend: '+5%', icon: <Target size={20} />, color: '#8b5cf6' },
    { label: 'Won Deals', value: '18', trend: '+2%', icon: <CheckCircle size={20} />, color: '#10b981' },
    { label: 'Revenue', value: '$124.5k', trend: '+18%', icon: <DollarSign size={20} />, color: '#0ea5e9' },
];

const SalesManagement = () => {
    const [view, setView] = useState('dashboard'); // dashboard, leads, pipeline, deals, quotations, activities, reports, documents
    const [userRole, setUserRole] = useState('Sales Manager'); // Admin, Sales Manager, Sales Agent

    return (
        <div className="sales-main-container portal-module animations-fade-in">
            <style>{`
                .sales-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
                .sales-charts-grid { display: grid; grid-template-columns: 2fr 1fr; }
                .sales-reports-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
                .sales-docs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

                @media (max-width: 1024px) {
                    .sales-charts-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .sales-header-section {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 15px;
                    }
                    .sales-sub-nav {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100% !important;
                        background: rgba(255, 255, 255, 0.95) !important;
                        backdrop-filter: blur(10px);
                        padding: 12px 10px !important;
                        box-shadow: 0 -8px 25px rgba(0,0,0,0.1) !important;
                        z-index: 1000;
                        border-radius: 20px 20px 0 0 !important;
                        display: flex !important;
                        justify-content: flex-start !important;
                        gap: 5px !important;
                        margin-bottom: 0 !important;
                        border-bottom: none !important;
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                    }
                    .sales-sub-nav::-webkit-scrollbar { display: none; }
                    
                    .sales-sub-nav button {
                        flex: 0 0 auto;
                        flex-direction: column;
                        padding: 8px 12px !important;
                        font-size: 10px !important;
                        background: transparent !important;
                        color: #64748b !important;
                        min-width: 70px;
                        gap: 2px !important;
                    }
                    .sales-sub-nav button.active-sales-btn {
                        color: #6366f1 !important;
                    }
                    .sales-sub-nav button svg {
                        width: 20px !important;
                        height: 20px !important;
                    }
                    .sales-main-container {
                        padding-bottom: 90px !important;
                    }
                    .sales-stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .leads-header {
                        flex-direction: column;
                        align-items: stretch !important;
                    }
                    .leads-actions {
                        flex-direction: column;
                    }
                    .search-container {
                        width: 100% !important;
                    }
                    .search-container input {
                        width: 100% !important;
                    }
                }

                @media (max-width: 640px) {
                    .sales-header-section h2 {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
            {/* Header */}
            <div className="sales-header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>Sales Management</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Welcome back, {userRole}. Here is your sales pipeline overview.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 600, background: 'white' }}
                    >
                        <option>Admin</option>
                        <option>Sales Manager</option>
                        <option>Sales Agent</option>
                    </select>
                    <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> New Deal
                    </button>
                </div>
            </div>

            {/* Sub-Navigation */}
            <div className="sales-sub-nav" style={{
                display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px',
                borderBottom: '1px solid #e2e8f0'
            }}>
                <SalesNavBtn icon={<Layout size={18} />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} className={view === 'dashboard' ? 'active-sales-btn' : ''} />
                <SalesNavBtn icon={<Users size={18} />} label="Leads" active={view === 'leads'} onClick={() => setView('leads')} className={view === 'leads' ? 'active-sales-btn' : ''} />
                <SalesNavBtn icon={<Target size={18} />} label="Pipeline" active={view === 'pipeline'} onClick={() => setView('pipeline')} className={view === 'pipeline' ? 'active-sales-btn' : ''} />
                <SalesNavBtn icon={<Briefcase size={18} />} label="Deals" active={view === 'deals'} onClick={() => setView('deals')} className={view === 'deals' ? 'active-sales-btn' : ''} />
                <SalesNavBtn icon={<FileText size={18} />} label="Quotations" active={view === 'quotations'} onClick={() => setView('quotations')} className={view === 'quotations' ? 'active-sales-btn' : ''} />
                <SalesNavBtn icon={<Clock size={18} />} label="Activities" active={view === 'activities'} onClick={() => setView('activities')} className={view === 'activities' ? 'active-sales-btn' : ''} />
                <SalesNavBtn icon={<PieChartIcon size={18} />} label="Reports" active={view === 'reports'} onClick={() => setView('reports')} className={view === 'reports' ? 'active-sales-btn' : ''} />
                <SalesNavBtn icon={<FileText size={18} />} label="Documents" active={view === 'documents'} onClick={() => setView('documents')} className={view === 'documents' ? 'active-sales-btn' : ''} />
            </div>

            {/* View Content */}
            {view === 'dashboard' && <SalesDashboard stats={dashboardStats} />}

            {view === 'leads' && <LeadsSection leads={leadsData} />}

            {view === 'pipeline' && <PipelineBoard deals={dealsData} stages={pipelineStages} />}

            {view === 'deals' && <DealsManagementSection deals={dealsData} />}

            {view === 'quotations' && <QuotationsSection quotations={quotationsData} />}

            {view === 'activities' && <SalesActivitiesSection activities={activitiesData} />}

            {view === 'reports' && <SalesReportsSection />}

            {view === 'documents' && <SalesDocumentsSection />}
        </div>
    );
};

// Sub-components
const SalesNavBtn = ({ icon, label, active, onClick, className }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px',
            border: 'none', background: active ? '#6366f1' : 'transparent',
            color: active ? 'white' : '#64748b', fontWeight: 600, fontSize: '14px',
            cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap'
        }}
        className={`${active ? '' : 'hover-bg-light'} ${className || ''}`}
    >
        {icon}
        {label}
    </button>
);

const SalesDashboard = ({ stats }) => {
    return (
        <div className="animations-fade-in">
            {/* Stats Grid */}
            <div className="sales-stats-grid" style={{ gap: '20px', marginBottom: '30px' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="portal-content-card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {stat.icon}
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', background: '#ecfdf5', padding: '2px 8px', borderRadius: '20px' }}>
                                {stat.trend}
                            </span>
                        </div>
                        <h4 style={{ margin: '15px 0 5px 0', fontSize: '14px', color: '#64748b', fontWeight: 600 }}>{stat.label}</h4>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="sales-charts-grid" style={{ gap: '25px', marginBottom: '30px' }}>
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem' }}>Sales Performance</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <AreaChart data={[
                                { name: 'Jan', sales: 4000 }, { name: 'Feb', sales: 3000 }, { name: 'Mar', sales: 5000 },
                                { name: 'Apr', sales: 4500 }, { name: 'May', sales: 6000 }, { name: 'Jun', sales: 8000 }
                            ]}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem' }}>Lead Sources</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Website', value: 40 },
                                        { name: 'Referral', value: 25 },
                                        { name: 'Ads', value: 20 },
                                        { name: 'Social', value: 15 }
                                    ]}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'].map((color, i) => <Cell key={i} fill={color} />)}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LeadsSection = ({ leads }) => {
    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div className="leads-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '20px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0 }}>Lead Management</h3>
                <div className="leads-actions" style={{ display: 'flex', gap: '10px' }}>
                    <div className="search-container" style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
                        <input type="text" placeholder="Search leads..." style={{ padding: '10px 10px 10px 35px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', width: '250px' }} />
                    </div>
                    <button style={{ padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white' }}><Filter size={18} /></button>
                    <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <UserPlus size={18} /> Add Lead
                    </button>
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Lead Name</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Source</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Agent</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Estimated Value</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                                <td style={{ padding: '15px' }}>
                                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{lead.name}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{lead.company}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>{lead.source}</td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>{lead.agent}</td>
                                <td style={{ padding: '15px', fontWeight: 700, color: '#1e293b' }}>{lead.value}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                                        background: lead.status === 'Qualified' ? '#ecfdf5' : '#eff6ff',
                                        color: lead.status === 'Qualified' ? '#10b981' : '#6366f1'
                                    }}>{lead.status}</span>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button title="Contact" style={{ background: '#f1f5f9', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}><Mail size={16} /></button>
                                        <button title="More" style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: '#94a3b8' }}><MoreVertical size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PipelineBoard = ({ deals, stages }) => (
    <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px', minHeight: '600px' }} className="animations-fade-in">
        {stages.map(stage => (
            <div key={stage.id} style={{ minWidth: '300px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: stage.color }} /><h4 style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase' }}>{stage.label}</h4><span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>{deals.filter(d => d.stage === stage.id).length}</span></div>
                    <button style={{ background: 'none', border: 'none', color: '#94a3b8' }}><Plus size={16} /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {deals.filter(d => d.stage === stage.id).map(deal => (
                        <div key={deal.id} className="portal-content-card" style={{ padding: '15px', cursor: 'pointer', borderLeft: `3px solid ${stage.color}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}><span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>{deal.id}</span><MoreVertical size={14} color="#94a3b8" /></div>
                            <h5 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{deal.name}</h5><div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>{deal.client}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div style={{ fontWeight: 800 }}>{deal.value}</div><div style={{ fontSize: '11px', color: '#6366f1', fontWeight: 700, background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>{deal.probability}</div></div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const DealsManagementSection = ({ deals }) => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}><h3>Active Sales Deals</h3><button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px' }}><Target size={18} style={{ marginRight: '8px' }} /> Create Deal</button></div>
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr style={{ borderBottom: '2px solid #f1f5f9' }}><th style={{ padding: '15px' }}>Deal Name</th><th style={{ padding: '15px' }}>Value</th><th style={{ padding: '15px' }}>Stage</th><th style={{ padding: '15px' }}>Probability</th><th style={{ padding: '15px' }}>Next Step</th><th style={{ padding: '15px' }}>Actions</th></tr></thead>
                <tbody>{deals.map((deal) => (
                    <tr key={deal.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                        <td style={{ padding: '15px' }}><div style={{ fontWeight: 600 }}>{deal.name}</div><div style={{ fontSize: '12px', color: '#94a3b8' }}>{deal.client}</div></td><td style={{ padding: '15px', fontWeight: 700 }}>{deal.value}</td><td style={{ padding: '15px' }}><span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#64748b' }}>{deal.stage.toUpperCase()}</span></td><td style={{ padding: '15px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '3px', width: '60px' }}><div style={{ width: deal.probability, height: '100%', background: '#6366f1', borderRadius: '3px' }} /></div><span>{deal.probability}</span></div></td><td style={{ padding: '15px', color: '#64748b' }}>Proposal Follow-up</td><td style={{ padding: '15px' }}><button className="btn-text">View Details</button></td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    </div>
);

const QuotationsSection = ({ quotations }) => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}><h3>Sales Quotations</h3><button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px' }}><Plus size={18} style={{ marginRight: '8px' }} /> New Quotation</button></div>
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr style={{ borderBottom: '2px solid #f1f5f9' }}><th style={{ padding: '15px' }}>Quotation #</th><th style={{ padding: '15px' }}>Client</th><th style={{ padding: '15px' }}>Date</th><th style={{ padding: '15px' }}>Expiry</th><th style={{ padding: '15px' }}>Total Amount</th><th style={{ padding: '15px' }}>Status</th><th style={{ padding: '15px' }}>Actions</th></tr></thead>
                <tbody>{quotations.map((qt) => (
                    <tr key={qt.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                        <td style={{ padding: '15px', fontWeight: 600 }}>{qt.id}</td><td style={{ padding: '15px' }}>{qt.client}</td><td style={{ padding: '15px', color: '#64748b' }}>{qt.date}</td><td style={{ padding: '15px', color: '#64748b' }}>{qt.expiry}</td><td style={{ padding: '15px', fontWeight: 700 }}>{qt.total}</td>
                        <td style={{ padding: '15px' }}><QuotationStatusBadge status={qt.status} /></td><td style={{ padding: '15px' }}><div style={{ display: 'flex', gap: '8px' }}><button style={{ background: '#f1f5f9', border: 'none', padding: '6px', borderRadius: '8px' }}><Download size={16} /></button><button style={{ background: '#f1f5f9', border: 'none', padding: '6px', borderRadius: '8px' }}><Mail size={16} /></button></div></td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    </div>
);

const QuotationStatusBadge = ({ status }) => {
    let bg = '#f1f5f9', color = '#64748b';
    if (status === 'Accepted') { bg = '#ecfdf5'; color = '#10b981'; } else if (status === 'Sent') { bg = '#eff6ff'; color = '#3b82f6'; } else if (status === 'Draft') { bg = '#f8fafc'; color = '#94a3b8'; } else { bg = '#fef2f2'; color = '#ef4444'; }
    return <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: bg, color: color }}>{status}</span>;
}

const SalesActivitiesSection = ({ activities }) => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <h3 style={{ margin: '0 0 25px 0' }}>Sales Activity Log</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {activities.map(act => (
                <div key={act.id} style={{ display: 'flex', gap: '15px', padding: '15px', background: '#f8fafc', borderRadius: '12px' }}>
                    <div style={{ padding: '10px', borderRadius: '10px', background: 'white', border: '1px solid #e2e8f0', color: '#6366f1' }}>{act.type === 'Call' ? <Phone size={18} /> : act.type === 'Meeting' ? <Users size={18} /> : <Mail size={18} />}</div>
                    <div style={{ flex: 1 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 700 }}>{act.type} with {act.client}</span><span style={{ fontSize: '11px', color: '#94a3b8' }}>{act.date} • {act.time}</span></div><p style={{ margin: '5px 0', fontSize: '13px', color: '#64748b' }}>{act.notes}</p><div style={{ fontSize: '12px', color: '#6366f1', fontWeight: 600 }}>By {act.agent}</div></div>
                </div>
            ))}
        </div>
    </div>
);

const SalesReportsSection = () => (
    <div className="animations-fade-in">
        <div className="sales-reports-grid" style={{ gap: '20px', marginBottom: '25px' }}>
            <div className="portal-content-card" style={{ padding: '25px' }}><h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem' }}>Revenue Forecast</h3><div style={{ height: '200px' }}><ResponsiveContainer width="100%" height="100%" minWidth={0}><RechartsBarChart data={[{ name: 'Commit', value: 45000 }, { name: 'Probable', value: 32000 }, { name: 'Best Case', value: 68000 }]}><XAxis dataKey="name" axisLine={false} tickLine={false} /><YAxis hide /><Tooltip /><Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} /></RechartsBarChart></ResponsiveContainer></div></div>
            <div className="portal-content-card" style={{ padding: '25px' }}><h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Top Agents</h3><div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}><AgentPerformanceRow name="Alex Smith" deals="12" revenue="$84,000" color="#6366f1" percent={85} /><AgentPerformanceRow name="Maria Garcia" deals="8" revenue="$52,000" color="#8b5cf6" percent={60} /></div></div>
        </div>
    </div>
);

const AgentPerformanceRow = ({ name, deals, revenue, color, percent }) => (
    <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}><span>{name}</span><span>{deals} Deals • <strong>{revenue}</strong></span></div><div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}><div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: '3px' }} /></div></div>
);

const SalesDocumentsSection = () => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <h3 style={{ margin: '0 0 25px 0' }}>Sales Assets & Documents</h3>
        <div className="sales-docs-grid" style={{ gap: '15px' }}>
            {['Proposal_Template.docx', 'Product_Manual_v2.pdf', 'Sales_Deck_2026.pptx'].map((doc, i) => (
                <div key={i} style={{ padding: '20px', border: '1px solid #f1f5f9', borderRadius: '15px', textAlign: 'center' }} className="hover-bg-light">
                    <div style={{ width: '48px', height: '48px', background: '#eff6ff', color: '#6366f1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}><FileText size={24} /></div>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>{doc}</div>
                    <button className="btn-text" style={{ fontSize: '12px' }}><Download size={14} style={{ marginRight: '5px' }} /> Download</button>
                </div>
            ))}
        </div>
    </div>
);

export default SalesManagement;
