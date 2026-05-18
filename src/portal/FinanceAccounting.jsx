import React, { useState } from 'react';
import {
    Download, CreditCard, TrendingUp, DollarSign, Activity,
    FileText, PlusCircle, LayoutDashboard, History, PieChart as PieChartIcon,
    ArrowUpRight, ArrowDownRight, Wallet, Receipt, Filter, Plus, Search,
    Calendar, MoreVertical, CheckCircle, AlertCircle, Clock
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

// --- Dummy Data ---

const financeStats = {
    totalRevenue: '$145,280.00',
    totalExpenses: '$62,450.00',
    netProfit: '$82,830.00',
    outstandingInvoices: '$12,400.00',
    revenueGrowth: '+12.5%',
    expenseGrowth: '-4.2%'
};

const revenueVsExpenses = [
    { month: 'Jan', revenue: 15000, expenses: 8000 },
    { month: 'Feb', revenue: 18000, expenses: 9500 },
    { month: 'Mar', revenue: 12000, expenses: 7000 },
    { month: 'Apr', revenue: 22000, expenses: 11000 },
    { month: 'May', revenue: 25000, expenses: 12000 },
    { month: 'Jun', revenue: 28000, expenses: 10500 },
];

const monthlyIncome = [
    { name: 'Subscription', value: 45000 },
    { name: 'Consulting', value: 32000 },
    { name: 'Custom Dev', value: 58000 },
    { name: 'Maintenance', value: 10280 },
];

const invoiceStatusData = [
    { name: 'Paid', value: 65, color: '#10b981' },
    { name: 'Pending', value: 25, color: '#f59e0b' },
    { name: 'Overdue', value: 10, color: '#f43f5e' },
];

const recentActivity = [
    { id: 1, type: 'invoice', detail: 'Invoice #INV-2026-042 created for Acme Corp', time: '2 mins ago', amount: '$1,200.00', status: 'created' },
    { id: 2, type: 'payment', detail: 'Payment received from Global Tech', time: '1 hour ago', amount: '$4,500.00', status: 'received' },
    { id: 3, type: 'expense', detail: 'Office Supplies expense recorded', time: '3 hours ago', amount: '$240.00', status: 'recorded' },
    { id: 4, type: 'refund', detail: 'Refund issued to Star-base Systems', time: '5 hours ago', amount: '$500.00', status: 'issued' },
];

const invoicesData = [
    { id: 'INV-2026-001', client: 'Acme Corp', project: 'Website Redesign', date: '2026-03-01', due: '2026-03-15', amount: '$1,200.00', status: 'Paid', method: 'Bank Transfer' },
    { id: 'INV-2026-002', client: 'Global Tech', project: 'ERP Implementation', date: '2026-03-05', due: '2026-03-20', amount: '$4,500.00', status: 'Sent', method: '-' },
    { id: 'INV-2026-003', client: 'Stark Ind', project: 'Cloud Migration', date: '2026-02-15', due: '2026-03-01', amount: '$8,900.00', status: 'Overdue', method: '-' },
    { id: 'INV-2026-004', client: 'Wayne Ent', project: 'SEO Campaign', date: '2026-03-08', due: '2026-03-22', amount: '$750.00', status: 'Draft', method: '-' },
    { id: 'INV-2026-005', client: 'Lex Corp', project: 'Security Audit', date: '2026-03-10', due: '2026-03-24', amount: '$2,100.00', status: 'Viewed', method: '-' },
];

const expensesData = [
    { id: 'EXP-101', title: 'Office Supplies', category: 'Supplies', amount: '$240.00', date: '2026-03-05', vendor: 'Amazon', status: 'Approved' },
    { id: 'EXP-102', title: 'Cloud Hosting - March', category: 'Software', amount: '$1,150.00', date: '2026-03-02', vendor: 'AWS', status: 'Approved' },
    { id: 'EXP-103', title: 'Marketing Campaign Ads', category: 'Marketing', amount: '$3,400.00', date: '2026-03-07', vendor: 'Google Ads', status: 'Pending' },
    { id: 'EXP-104', title: 'Employee Travel - Alice', category: 'Travel', amount: '$820.00', date: '2026-03-04', vendor: 'Delta Airlines', status: 'Approved' },
];

const transactionsData = [
    { id: 'TXN-001', type: 'Income', category: 'Invoice Payment', amount: '$1,200.00', date: '2026-03-06', method: 'Bank Transfer', ref: 'INV-2026-001' },
    { id: 'TXN-002', type: 'Expense', category: 'Software Subscription', amount: '$1,150.00', date: '2026-03-02', method: 'Credit Card', ref: 'EXP-102' },
    { id: 'TXN-003', type: 'Income', category: 'Service Fee', amount: '$4,500.00', date: '2026-03-08', method: 'Online Gateway', ref: 'INV-2026-002' },
    { id: 'TXN-004', type: 'Expense', category: 'Travel', amount: '$820.00', date: '2026-03-04', method: 'Corporate Card', ref: 'EXP-104' },
];

const FinanceAccounting = () => {
    const [view, setView] = useState('dashboard'); // dashboard, invoices, expenses, payments, transactions, reports
    const [userRole, setUserRole] = useState('Admin'); // Admin, Finance, Staff, Client
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [showRecordExpense, setShowRecordExpense] = useState(false);

    const renderDashboard = () => (
        <div className="finance-dashboard animations-fade-in">
            {/* Stats Grid */}
            <div className="finance-stats-grid" style={{ gap: '20px', marginBottom: '25px' }}>
                <FinanceStatCard title="Total Revenue" value={financeStats.totalRevenue} growth={financeStats.revenueGrowth} isPositive={true} icon={<TrendingUp size={22} />} color="#6366f1" />
                <FinanceStatCard title="Total Expenses" value={financeStats.totalExpenses} growth={financeStats.expenseGrowth} isPositive={true} icon={<ArrowDownRight size={22} />} color="#f43f5e" />
                <FinanceStatCard title="Net Profit" value={financeStats.netProfit} growth="+8.2%" isPositive={true} icon={<Wallet size={22} />} color="#10b981" />
                <FinanceStatCard title="Outstanding" value={financeStats.outstandingInvoices} growth="+2.1%" isPositive={false} icon={<History size={22} />} color="#f59e0b" />
            </div>

            <div className="finance-charts-grid" style={{ gap: '25px', marginBottom: '25px' }}>
                {/* Revenue vs Expenses Chart */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Revenue vs Expenses</h3>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1' }} />
                                <span style={{ fontSize: '12px', color: '#64748b' }}>Revenue</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f43f5e' }} />
                                <span style={{ fontSize: '12px', color: '#64748b' }}>Expenses</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <AreaChart data={revenueVsExpenses}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600 }}>Invoice Status</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <PieChart>
                                <Pie
                                    data={invoiceStatusData}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {invoiceStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="finance-secondary-grid" style={{ gap: '25px' }}>
                {/* Recent Activities */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Financial Activity</h3>
                        <button style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>View All</button>
                    </div>
                    <div className="activity-list">
                        {recentActivity.map((act) => (
                            <div key={act.id} className="activity-item" style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    background: act.type === 'invoice' ? '#eff6ff' : act.type === 'payment' ? '#ecfdf5' : act.type === 'expense' ? '#fef2f2' : '#fff7ed',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: act.type === 'invoice' ? '#3b82f6' : act.type === 'payment' ? '#10b981' : act.type === 'expense' ? '#ef4444' : '#f97316'
                                }}>
                                    {act.type === 'invoice' && <FileText size={20} />}
                                    {act.type === 'payment' && <CheckCircle size={20} />}
                                    {act.type === 'expense' && <Receipt size={20} />}
                                    {act.type === 'refund' && <DollarSign size={20} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 600 }}>{act.detail}</span>
                                        <span style={{ fontSize: '14px', fontWeight: 700, color: act.type === 'expense' || act.type === 'refund' ? '#ef4444' : '#10b981' }}>
                                            {act.type === 'expense' || act.type === 'refund' ? '-' : '+'}{act.amount}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{act.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Income Breakdown */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600 }}>Revenue Streams</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={monthlyIncome} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={15} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="finance-main-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <style>{`
                .finance-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
                .finance-charts-grid { display: grid; grid-template-columns: 1.8fr 1.2fr; }
                .finance-secondary-grid { display: grid; grid-template-columns: 1fr 1fr; }
                .finance-reports-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
                .finance-reports-charts { display: grid; grid-template-columns: 2fr 1fr; }

                @media (max-width: 1024px) {
                    .finance-charts-grid, .finance-secondary-grid, .finance-reports-charts {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .finance-header-section {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 15px;
                    }
                    .finance-sub-nav {
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
                        justify-content: space-around !important;
                        gap: 5px !important;
                        overflow-x: auto;
                    }
                    .finance-sub-nav button {
                        flex: 1;
                        flex-direction: column;
                        padding: 8px 5px !important;
                        font-size: 10px !important;
                        background: transparent !important;
                        color: #64748b !important;
                        min-width: 60px;
                    }
                    .finance-sub-nav button.active-finance-btn {
                        color: #6366f1 !important;
                    }
                    .finance-sub-nav button svg {
                        width: 20px !important;
                        height: 20px !important;
                    }
                    .finance-main-container {
                        padding-bottom: 90px !important;
                    }
                    .finance-stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .form-grid-2col {
                        grid-template-columns: 1fr !important;
                    }
                }

                @media (max-width: 640px) {
                    .finance-header-section h2 {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
            {/* Header Section */}
            <div className="finance-header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>Finance & Accounting</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Monitor revenue, expenses and company financials</p>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                        Role: <select value={userRole} onChange={(e) => setUserRole(e.target.value)} style={{ border: 'none', background: 'transparent', fontWeight: 700, color: '#1e293b', cursor: 'pointer' }}>
                            <option>Admin</option>
                            <option>Finance</option>
                            <option>Staff</option>
                            <option>Client</option>
                        </select>
                    </div>
                    <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '10px' }}>
                        <Download size={18} style={{ marginRight: '8px' }} /> Export Financials
                    </button>
                </div>
            </div>

            {/* Sub-Navigation */}
            <div className="finance-sub-nav" style={{ display: 'flex', gap: '10px', background: 'white', padding: '6px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', width: 'fit-content' }}>
                <FinanceNavBtn icon={<LayoutDashboard size={18} />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} className={view === 'dashboard' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<FileText size={18} />} label="Invoices" active={view === 'invoices'} onClick={() => setView('invoices')} className={view === 'invoices' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<Receipt size={18} />} label="Expenses" active={view === 'expenses'} onClick={() => setView('expenses')} className={view === 'expenses' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<Wallet size={18} />} label="Payments" active={view === 'payments'} onClick={() => setView('payments')} className={view === 'payments' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<History size={18} />} label="Transactions" active={view === 'transactions'} onClick={() => setView('transactions')} className={view === 'transactions' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<PieChartIcon size={18} />} label="Reports" active={view === 'reports'} onClick={() => setView('reports')} className={view === 'reports' ? 'active-finance-btn' : ''} />
            </div>

            {/* View Content */}
            {view === 'dashboard' && renderDashboard()}

            {view === 'invoices' && (
                showCreateInvoice ?
                    <CreateInvoiceSection onCancel={() => setShowCreateInvoice(false)} /> :
                    <InvoiceListSection invoices={invoicesData} onCreateNew={() => setShowCreateInvoice(true)} userRole={userRole} />
            )}

            {view === 'expenses' && (
                showRecordExpense ?
                    <RecordExpenseSection onCancel={() => setShowRecordExpense(false)} /> :
                    <ExpenseListSection expenses={expensesData} onRecordNew={() => setShowRecordExpense(true)} userRole={userRole} />
            )}

            {view === 'payments' && <PaymentRecordingSection invoices={invoicesData} userRole={userRole} />}

            {view === 'transactions' && <TransactionsLogSection transactions={transactionsData} />}

            {view === 'reports' && <FinancialReportsSection />}
        </div>
    );
};

// --- Sub-View Components ---

const InvoiceListSection = ({ invoices, onCreateNew, userRole }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filtered = invoices.filter(inv => {
        const matchesSearch = inv.client.toLowerCase().includes(searchTerm.toLowerCase()) || inv.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search invoices, clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                    >
                        <option>All Status</option>
                        <option>Paid</option>
                        <option>Sent</option>
                        <option>Overdue</option>
                        <option>Draft</option>
                        <option>Viewed</option>
                    </select>
                    {(userRole === 'Admin' || userRole === 'Finance') && (
                        <button onClick={onCreateNew} className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Plus size={18} /> Create Invoice
                        </button>
                    )}
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Invoice ID</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Client</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Date</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Amount</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((inv) => (
                            <tr key={inv.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                                <td style={{ padding: '15px' }}>
                                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{inv.id}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{inv.project}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>{inv.client}</td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ fontSize: '14px' }}>{inv.date}</div>
                                    <div style={{ fontSize: '12px', color: '#f43f5e' }}>Due: {inv.due}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px', fontWeight: 700 }}>{inv.amount}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                                        background: inv.status === 'Paid' ? '#ecfdf5' : inv.status === 'Overdue' ? '#fef2f2' : '#fffbeb',
                                        color: inv.status === 'Paid' ? '#10b981' : inv.status === 'Overdue' ? '#ef4444' : '#f59e0b'
                                    }}>{inv.status}</span>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button title="Download PDF" style={{ background: '#f8fafc', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#64748b' }}><Download size={16} /></button>
                                        <button title="More Options" style={{ background: '#f8fafc', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#64748b' }}><MoreVertical size={16} /></button>
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

const CreateInvoiceSection = ({ onCancel }) => {
    const [items, setItems] = useState([{ id: 1, name: '', qty: 1, price: 0 }]);

    const addItem = () => setItems([...items, { id: items.length + 1, name: '', qty: 1, price: 0 }]);

    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3 style={{ margin: 0 }}>Create New Invoice</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={onCancel} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                    <button className="btn-primary" style={{ padding: '10px 25px', borderRadius: '10px', fontWeight: 600 }}>Save & Send</button>
                </div>
            </div>

            <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="card-section">
                        <h4 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#6366f1' }}>Invoice Details</h4>
                        <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <FinanceInputField label="Invoice Number" placeholder="INV-2026-XXX" />
                            <FinanceSelectField label="Client" options={['Acme Corp', 'Global Tech', 'Stark Ind']} />
                            <FinanceInputField label="Invoice Date" type="date" />
                            <FinanceInputField label="Due Date" type="date" />
                        </div>
                    </div>

                    <div className="card-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h4 style={{ margin: 0, fontSize: '15px', color: '#6366f1' }}>Invoice Items</h4>
                            <button onClick={addItem} style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Plus size={14} /> Add Item
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {items.map((item, idx) => (
                                <div key={item.id} className="invoice-item-row" style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr', gap: '10px' }}>
                                    <input placeholder="Item name/description" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
                                    <input type="number" defaultValue={1} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
                                    <input type="number" placeholder="Price" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
                                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', background: '#f8fafc', borderRadius: '8px', fontSize: '14px', fontWeight: 700 }}>$0.00</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="portal-content-card" style={{ padding: '20px', background: '#f8fafc', border: 'none' }}>
                        <h4 style={{ margin: '0 0 15px 0' }}>Invoice Summary</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>Subtotal</span>
                                <span style={{ fontWeight: 600 }}>$0.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>Tax (10%)</span>
                                <span style={{ fontWeight: 600 }}>$0.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>Discount</span>
                                <span style={{ fontWeight: 600 }}>$0.00</span>
                            </div>
                            <div style={{ height: '1px', background: '#e2e8f0', margin: '5px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
                                <span>Grand Total</span>
                                <span style={{ color: '#6366f1' }}>$0.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-section">
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#475569' }}>Internal Notes</h4>
                        <textarea style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '100px', fontSize: '14px' }} placeholder="Add notes for your team..." />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExpenseListSection = ({ expenses, onRecordNew, userRole }) => {
    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ margin: 0 }}>Expense Tracking</h3>
                {(userRole === 'Admin' || userRole === 'Finance') && (
                    <button onClick={onRecordNew} className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> Record Expense
                    </button>
                )}
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Expense ID</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Description</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Category</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Vendor</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Amount</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((exp) => (
                            <tr key={exp.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                                <td style={{ padding: '15px', fontSize: '14px', fontWeight: 600 }}>{exp.id}</td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>
                                    <div>{exp.title}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{exp.date}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>{exp.category}</td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>{exp.vendor}</td>
                                <td style={{ padding: '15px', fontSize: '14px', fontWeight: 700, color: '#ef4444' }}>{exp.amount}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                                        background: exp.status === 'Approved' ? '#ecfdf5' : '#fffbeb',
                                        color: exp.status === 'Approved' ? '#10b981' : '#f59e0b'
                                    }}>{exp.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const RecordExpenseSection = ({ onCancel }) => {
    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Record New Expense</h3>
            <form className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }} onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <FinanceInputField label="Expense Title" placeholder="e.g. Office Stationery" />
                    <FinanceSelectField label="Category" options={['Supplies', 'Software', 'Marketing', 'Travel', 'Salaries', 'Utilities']} />
                    <FinanceInputField label="Amount" placeholder="$0.00" />
                    <FinanceInputField label="Date" type="date" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <FinanceInputField label="Vendor Name" placeholder="e.g. Amazon" />
                    <FinanceSelectField label="Payment Method" options={['Credit Card', 'Bank Transfer', 'Cash']} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Description</label>
                        <textarea style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px', fontSize: '14px' }} placeholder="Purpose of expense..." />
                    </div>
                </div>
                <div style={{ gridColumn: 'span 1', display: 'flex', justifyContent: 'flex-end', gap: '15px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }} className="form-footer">
                    <button onClick={onCancel} style={{ padding: '10px 24px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                    <button className="btn-primary" style={{ padding: '10px 24px', borderRadius: '10px', fontWeight: 600 }}>Save Expense</button>
                </div>
            </form>
        </div>
    );
};

const PaymentRecordingSection = ({ invoices, userRole }) => {
    if (userRole === 'Client' || userRole === 'Staff') {
        return (
            <div className="portal-content-card animations-fade-in" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ padding: '40px', background: '#f8fafc', borderRadius: '20px', maxWidth: '400px', margin: '0 auto' }}>
                    <AlertCircle size={48} color="#f43f5e" style={{ marginBottom: '20px' }} />
                    <h3 style={{ margin: '0 0 10px 0' }}>Access Restricted</h3>
                    <p style={{ color: '#64748b', margin: 0 }}>You do not have permission to record payments. Please contact an Administrator.</p>
                </div>
            </div>
        );
    }
    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Record Client Payment</h3>
            <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => e.preventDefault()}>
                    <FinanceSelectField label="Select Invoice" options={invoices.map(i => `${i.id} - ${i.client}`)} />
                    <FinanceInputField label="Payment Amount" placeholder="$0.00" />
                    <FinanceInputField label="Payment Date" type="date" />
                    <FinanceSelectField label="Payment Method" options={['Bank Transfer', 'Credit Card', 'Cash', 'Online Gateway']} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Internal Notes</label>
                        <textarea style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px', fontSize: '14px' }} placeholder="Payment reference or notes..." />
                    </div>
                    <button className="btn-primary" style={{ padding: '12px', borderRadius: '10px', fontWeight: 700 }}>Record Payment</button>
                </form>
                <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '20px' }}>
                    <h4 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={18} color="#6366f1" /> Recording Guidelines</h4>
                    <ul style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.8, paddingLeft: '20px' }}>
                        <li>Select the correct invoice ID to avoid reconciliation errors.</li>
                        <li>Update the invoice status to "Paid" automatically after full payment.</li>
                        <li>Payments recorded here will be logged in the Transaction history.</li>
                        <li>Partial payments will be tracked as "Partially Paid" status.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const TransactionsLogSection = ({ transactions }) => {
    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ margin: 0 }}>Transaction History</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><Filter size={14} /> Filter</button>
                    <button style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={14} /> Export CSV</button>
                </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>TXN ID</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Type</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Category</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Reference</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Amount</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => (
                            <tr key={txn.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                                <td style={{ padding: '15px', fontSize: '14px', fontWeight: 600 }}>{txn.id}</td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: txn.type === 'Income' ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                                        {txn.type === 'Income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                        {txn.type}
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{txn.date}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>{txn.category}</td>
                                <td style={{ padding: '15px', fontSize: '14px', color: '#6366f1', fontWeight: 600 }}>{txn.ref}</td>
                                <td style={{ padding: '15px', fontSize: '14px', fontWeight: 700 }}>{txn.amount}</td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>{txn.method}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const FinanceInputField = ({ label, placeholder, type = "text" }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{label}</label>
        <input type={type} placeholder={placeholder} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
    </div>
);

const FinanceSelectField = ({ label, options }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{label}</label>
        <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}>
            {options.map((opt, i) => <option key={i}>{opt}</option>)}
        </select>
    </div>
);
const FinanceStatCard = ({ title, value, growth, isPositive, icon, color }) => (
    <div className="portal-content-card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: isPositive ? '#10b981' : '#f43f5e' }}>
                {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {growth}
            </div>
        </div>
        <div style={{ marginTop: '15px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{title}</span>
            <h4 style={{ margin: '4px 0 0 0', fontSize: '1.5rem', fontWeight: 750 }}>{value}</h4>
        </div>
    </div>
);

const FinanceNavBtn = ({ icon, label, active, onClick, className }) => (
    <button
        onClick={onClick}
        className={className}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            border: 'none',
            background: active ? '#6366f1' : 'transparent',
            color: active ? 'white' : '#64748b',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: 600,
            fontSize: '14px'
        }}
    >
        {icon}
        {label}
    </button>
);

const FinancialReportsSection = () => {
    const reportData = [
        { month: 'Jan', profit: 7000, loss: 2000 },
        { month: 'Feb', profit: 8500, loss: 2500 },
        { month: 'Mar', profit: 5000, loss: 3000 },
        { month: 'Apr', profit: 11000, loss: 4000 },
    ];

    return (
        <div className="animations-fade-in reports-container">
            <div className="finance-reports-grid" style={{ gap: '20px', marginBottom: '25px' }}>
                <div className="portal-content-card" style={{ padding: '20px', borderLeft: '4px solid #6366f1' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Profit & Loss (Q1)</span>
                    <h3 style={{ margin: '5px 0', fontSize: '1.5rem', color: '#10b981' }}>+$24,500.00</h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Excludes pending tax liabilities</p>
                </div>
                <div className="portal-content-card" style={{ padding: '20px', borderLeft: '4px solid #f59e0b' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Tax Liability (Estimated)</span>
                    <h3 style={{ margin: '5px 0', fontSize: '1.5rem', color: '#f59e0b' }}>$4,280.00</h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Based on 15% corporate tax rate</p>
                </div>
                <div className="portal-content-card" style={{ padding: '20px', borderLeft: '4px solid #ef4444' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Tax Paid (YTD)</span>
                    <h3 style={{ margin: '5px 0', fontSize: '1.5rem', color: '#ef4444' }}>$12,100.00</h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Last payment: Feb 15, 2026</p>
                </div>
            </div>

            <div className="finance-reports-charts" style={{ gap: '25px' }}>
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem' }}>Monthly Profit vs Loss</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={reportData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Legend />
                                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Net Profit" />
                                <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} name="Operating Loss" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem' }}>Tax Breakdown</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <TaxItem label="VAT (16%)" amount="$1,850.00" progress={65} color="#6366f1" />
                        <TaxItem label="Income Tax" amount="$2,430.00" progress={40} color="#10b981" />
                        <TaxItem label="Service Tax" amount="$920.00" progress={85} color="#f59e0b" />
                    </div>
                    <button className="btn-text" style={{ marginTop: '25px', width: '100%', textAlign: 'center', fontWeight: 700 }}>Generate Tax Report</button>
                </div>
            </div>
        </div>
    );
};

const TaxItem = ({ label, amount, progress, color }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ fontWeight: 600, color: '#475569' }}>{label}</span>
            <span style={{ fontWeight: 700 }}>{amount}</span>
        </div>
        <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: color, borderRadius: '3px' }} />
        </div>
    </div>
);

export default FinanceAccounting;
