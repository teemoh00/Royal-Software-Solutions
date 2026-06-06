import React, { useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';
import {
    Download, CreditCard, TrendingUp, DollarSign, Activity,
    FileText, PlusCircle, LayoutDashboard, History, PieChart as PieChartIcon,
    ArrowUpRight, ArrowDownRight, Wallet, Receipt, Filter, Plus, Search,
    Calendar, MoreVertical, CheckCircle, AlertCircle, Clock,
    Trash2, Droplet, Zap, Wifi, Eye, Printer
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

    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [ledgers, setLedgers] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [clients, setClients] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast(prev => ({ ...prev, show: false }));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    const loadAllData = async () => {
        setLoading(true);
        try {
            const [invData, expData, txnData, clientData, supplierData, ledgerData] = await Promise.all([
                apiClient.accounting.invoices.list(),
                apiClient.accounting.expenses.list(),
                apiClient.accounting.transactions.list(),
                apiClient.clients.list(),
                apiClient.accounting.suppliers.list(),
                apiClient.accounting.ledgers.list()
            ]);
            setInvoices(invData || []);
            setExpenses(expData || []);
            setTransactions(txnData || []);
            setClients(clientData || []);
            setSuppliers(supplierData || []);
            setLedgers(ledgerData || []);
        } catch (err) {
            console.error("Failed to load accounting data:", err);
            showToast("Failed to load financial records.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    const formatCurrency = (val) => {
        return `KES ${parseFloat(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Live Metrics Calculations
    const totalRevenueValue = invoices
        .filter(inv => inv.status === 'Paid')
        .reduce((sum, inv) => sum + parseFloat(inv.total || 0), 0);

    const totalExpensesValue = expenses
        .filter(exp => exp.status === 'Approved')
        .reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

    const netProfitValue = totalRevenueValue - totalExpensesValue;

    const outstandingInvoicesValue = invoices
        .filter(inv => inv.status !== 'Paid' && inv.status !== 'Draft')
        .reduce((sum, inv) => sum + parseFloat(inv.total || 0), 0);

    // Chart Data Calculations
    const getRevenueVsExpensesData = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date().getFullYear();
        
        const grouped = months.map((month, idx) => {
            const rev = transactions
                .filter(t => t.transaction_type === 'Income' && new Date(t.date).getMonth() === idx && new Date(t.date).getFullYear() === currentYear)
                .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
            const exp = transactions
                .filter(t => t.transaction_type === 'Expense' && new Date(t.date).getMonth() === idx && new Date(t.date).getFullYear() === currentYear)
                .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
            return { month, revenue: rev, expenses: exp };
        });
        
        const currentMonthIdx = new Date().getMonth();
        return grouped.slice(0, Math.max(6, currentMonthIdx + 1));
    };

    const getInvoiceStatusData = () => {
        const paidCount = invoices.filter(inv => inv.status === 'Paid').length;
        const pendingCount = invoices.filter(inv => ['Sent', 'Viewed', 'Draft'].includes(inv.status)).length;
        const overdueCount = invoices.filter(inv => inv.status === 'Overdue').length;
        
        const totalCount = paidCount + pendingCount + overdueCount;
        if (totalCount === 0) {
            return [
                { name: 'Paid', value: 1, color: '#10b981' },
                { name: 'Pending', value: 0, color: '#f59e0b' },
                { name: 'Overdue', value: 0, color: '#f43f5e' }
            ];
        }
        return [
            { name: 'Paid', value: paidCount, color: '#10b981' },
            { name: 'Pending', value: pendingCount, color: '#f59e0b' },
            { name: 'Overdue', value: overdueCount, color: '#f43f5e' }
        ].filter(item => item.value > 0);
    };

    const getRevenueStreamsData = () => {
        const streams = {};
        transactions
            .filter(t => t.transaction_type === 'Income')
            .forEach(t => {
                const cat = t.category || 'Other';
                streams[cat] = (streams[cat] || 0) + parseFloat(t.amount || 0);
            });
        
        const result = Object.keys(streams).map(name => ({ name, value: streams[name] }));
        return result.length > 0 ? result : [
            { name: 'Service Invoices', value: totalRevenueValue || 1 }
        ];
    };

    const recentActivityFormatted = transactions.slice(0, 4).map(txn => ({
        id: txn.id,
        type: txn.transaction_type.toLowerCase(),
        detail: `${txn.category} - Ref: ${txn.reference || 'N/A'}`,
        time: txn.date ? new Date(txn.date).toLocaleDateString() : 'N/A',
        amount: formatCurrency(txn.amount),
        status: 'completed'
    }));

    const handleDeleteInvoice = async (id) => {
        if (!window.confirm("Are you sure you want to delete this invoice?")) return;
        try {
            await apiClient.accounting.invoices.delete(id);
            showToast("Invoice deleted successfully.", "success");
            loadAllData();
        } catch (err) {
            showToast(err.message || "Failed to delete invoice.", "error");
        }
    };

    const handleDeleteExpense = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense log?")) return;
        try {
            await apiClient.accounting.expenses.delete(id);
            showToast("Expense log deleted successfully.", "success");
            loadAllData();
        } catch (err) {
            showToast(err.message || "Failed to delete expense log.", "error");
        }
    };

    const renderDashboard = () => (
        <div className="finance-dashboard animations-fade-in">
            {/* Stats Grid */}
            <div className="finance-stats-grid" style={{ gap: '20px', marginBottom: '25px' }}>
                <FinanceStatCard title="Total Revenue" value={formatCurrency(totalRevenueValue)} growth="Live" isPositive={true} icon={<TrendingUp size={22} />} color="#6366f1" />
                <FinanceStatCard title="Total Expenses" value={formatCurrency(totalExpensesValue)} growth="Booked" isPositive={false} icon={<ArrowDownRight size={22} />} color="#f43f5e" />
                <FinanceStatCard title="Net Profit" value={formatCurrency(netProfitValue)} growth="Net" isPositive={netProfitValue >= 0} icon={<Wallet size={22} />} color="#10b981" />
                <FinanceStatCard title="Outstanding" value={formatCurrency(outstandingInvoicesValue)} growth="Due" isPositive={false} icon={<History size={22} />} color="#f59e0b" />
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
                            <AreaChart data={getRevenueVsExpensesData()}>
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
                                    data={getInvoiceStatusData()}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {getInvoiceStatusData().map((entry, index) => (
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
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Financial Activity Ledger</h3>
                        <button onClick={() => setView('transactions')} style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>View All</button>
                    </div>
                    <div className="activity-list">
                        {recentActivityFormatted.map((act, idx) => (
                            <div key={idx} className="activity-item" style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    background: act.type === 'income' ? '#ecfdf5' : '#fef2f2',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                    color: act.type === 'income' ? '#10b981' : '#ef4444'
                                }}>
                                    {act.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 600 }}>{act.detail}</span>
                                        <span style={{ fontSize: '14px', fontWeight: 700, color: act.type === 'expense' ? '#ef4444' : '#10b981' }}>
                                            {act.type === 'expense' ? '-' : '+'}{act.amount}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{act.time}</span>
                                </div>
                            </div>
                        ))}
                        {recentActivityFormatted.length === 0 && (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                                No financial transactions recorded yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Monthly Income Breakdown */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600 }}>Revenue Streams</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={getRevenueStreamsData()} layout="vertical" margin={{ left: 20 }}>
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
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>Finance & Accounting</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Monitor revenue, expenses, utilities, and company financials under company profile ID: 1</p>
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
                </div>
            </div>

            {/* Sub-Navigation */}
            <div className="finance-sub-nav" style={{ display: 'flex', gap: '10px', background: 'white', padding: '6px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', width: 'fit-content' }}>
                <FinanceNavBtn icon={<LayoutDashboard size={18} />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} className={view === 'dashboard' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<FileText size={18} />} label="Invoices" active={view === 'invoices'} onClick={() => setView('invoices')} className={view === 'invoices' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<Receipt size={18} />} label="Expenses & Bills" active={view === 'expenses'} onClick={() => setView('expenses')} className={view === 'expenses' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<Wallet size={18} />} label="Payments" active={view === 'payments'} onClick={() => setView('payments')} className={view === 'payments' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<History size={18} />} label="Transactions" active={view === 'transactions'} onClick={() => setView('transactions')} className={view === 'transactions' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<PieChartIcon size={18} />} label="Reports" active={view === 'reports'} onClick={() => setView('reports')} className={view === 'reports' ? 'active-finance-btn' : ''} />
                <FinanceNavBtn icon={<Activity size={18} />} label="Chart of Accounts" active={view === 'chart-of-accounts'} onClick={() => setView('chart-of-accounts')} className={view === 'chart-of-accounts' ? 'active-finance-btn' : ''} />
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div style={{
                    padding: '12px 24px', 
                    background: 'rgba(99, 102, 241, 0.08)', 
                    color: '#6366f1', 
                    borderRadius: '10px', 
                    fontWeight: '600', 
                    fontSize: '13px',
                    textAlign: 'center'
                }}>
                    Fetching financial ledgers and records...
                </div>
            )}

            {/* View Content */}
            {view === 'dashboard' && renderDashboard()}

            {view === 'invoices' && (
                showCreateInvoice ?
                    <CreateInvoiceSection 
                        clients={clients} 
                        ledgers={ledgers}
                        showToast={showToast} 
                        onSave={loadAllData} 
                        onCancel={() => setShowCreateInvoice(false)} 
                    /> :
                    <InvoiceListSection 
                        invoices={invoices} 
                        onCreateNew={() => setShowCreateInvoice(true)} 
                        onDelete={handleDeleteInvoice}
                        onViewInvoice={setSelectedInvoice}
                        userRole={userRole} 
                        formatCurrency={formatCurrency}
                    />
            )}

            {view === 'expenses' && (
                showRecordExpense ?
                    <RecordExpenseSection 
                        suppliers={suppliers} 
                        ledgers={ledgers}
                        showToast={showToast} 
                        onSave={loadAllData} 
                        onCancel={() => setShowRecordExpense(false)} 
                    /> :
                    <ExpenseListSection 
                        expenses={expenses} 
                        onRecordNew={() => setShowRecordExpense(true)} 
                        onDelete={handleDeleteExpense}
                        userRole={userRole} 
                        formatCurrency={formatCurrency}
                    />
            )}

            {view === 'payments' && (
                <PaymentRecordingSection 
                    invoices={invoices} 
                    ledgers={ledgers}
                    userRole={userRole} 
                    showToast={showToast} 
                    onSave={loadAllData} 
                    formatCurrency={formatCurrency}
                />
            )}

            {view === 'transactions' && (
                <TransactionsLogSection 
                    transactions={transactions} 
                    formatCurrency={formatCurrency}
                />
            )}

            {view === 'reports' && (
                <FinancialReportsSection 
                    transactions={transactions} 
                    formatCurrency={formatCurrency}
                />
            )}

            {view === 'chart-of-accounts' && (
                <ChartOfAccountsSection />
            )}

            {selectedInvoice && (
                <InvoicePreviewModal 
                    invoice={selectedInvoice} 
                    onClose={() => setSelectedInvoice(null)} 
                    formatCurrency={formatCurrency} 
                />
            )}

            {/* Toast Notifications */}
            {toast.show && (
                <div style={{
                    position: 'fixed',
                    bottom: '25px',
                    right: '25px',
                    background: toast.type === 'error' ? '#ef4444' : '#10b981',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    zIndex: 9999,
                    fontSize: '14px',
                    fontWeight: 600,
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <style>{`
                        @keyframes slideIn {
                            from { transform: translateY(100px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                    `}</style>
                    {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                    <span>{toast.message}</span>
                    <button 
                        onClick={() => setToast(prev => ({ ...prev, show: false }))} 
                        style={{ background: 'none', border: 'none', color: '#ffffff', opacity: 0.8, cursor: 'pointer', fontSize: '16px', marginLeft: '10px', display: 'flex', alignItems: 'center' }}
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

// --- Sub-View Components ---

const InvoiceListSection = ({ invoices, onCreateNew, onDelete, onViewInvoice, userRole, formatCurrency }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filtered = invoices.filter(inv => {
        const clientName = (inv.client_name || '').toLowerCase();
        const invNum = (inv.invoice_number || '').toLowerCase();
        const matchesSearch = clientName.includes(searchTerm.toLowerCase()) || invNum.includes(searchTerm.toLowerCase());
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
                        placeholder="Search invoices by client or ID..."
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
                        <option value="All">All Status</option>
                        <option value="Draft">Draft</option>
                        <option value="Sent">Sent</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Viewed">Viewed</option>
                    </select>
                    {(userRole === 'Admin' || userRole === 'Finance') && (
                        <button onClick={onCreateNew} className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Plus size={18} /> Create Invoice
                        </button>
                    )}
                </div>
            </div>

            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ color: '#64748b' }}>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Invoice ID</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Client</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Date</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Amount</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((inv) => (
                            <tr key={inv.id} style={{ background: '#ffffff', borderRadius: '12px' }} className="hover-bg-light">
                                <td style={{ padding: '15px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', border: '1px solid #f1f5f9', borderRight: 'none' }}>
                                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>{inv.invoice_number}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{inv.project || 'Standard Service'}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none', fontWeight: 600 }}>{inv.client_name || 'Generic Client'}</td>
                                <td style={{ padding: '15px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>
                                    <div style={{ fontSize: '13px', color: '#334155' }}>Issued: {inv.issue_date}</div>
                                    <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '2px' }}>Due: {inv.due_date}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px', fontWeight: 800, color: '#6366f1', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>{formatCurrency(inv.total)}</td>
                                <td style={{ padding: '15px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                                        background: inv.status === 'Paid' ? '#ecfdf5' : inv.status === 'Overdue' ? '#fef2f2' : '#fffbeb',
                                        color: inv.status === 'Paid' ? '#10b981' : inv.status === 'Overdue' ? '#ef4444' : '#f59e0b',
                                        border: inv.status === 'Paid' ? '1px solid #10b98125' : inv.status === 'Overdue' ? '1px solid #ef444425' : '1px solid #f59e0b25'
                                    }}>{inv.status}</span>
                                </td>
                                <td style={{ padding: '15px', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', border: '1px solid #f1f5f9', borderLeft: 'none' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button onClick={() => onViewInvoice(inv)} title="View Invoice Preview" style={{ background: '#f8fafc', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={16} /></button>
                                        {(userRole === 'Admin' || userRole === 'Finance') && (
                                            <button onClick={() => onDelete(inv.id)} title="Delete Invoice" style={{ background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={16} /></button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>No invoices found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CreateInvoiceSection = ({ clients = [], ledgers = [], showToast, onSave, onCancel }) => {
    const [clientId, setClientId] = useState('');
    const [project, setProject] = useState('');
    const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState('');
    const [incomeAccountId, setIncomeAccountId] = useState('');
    const [taxRate, setTaxRate] = useState(16); // default 16% VAT
    const [discount, setDiscount] = useState(0);
    const [notes, setNotes] = useState('');
    const [items, setItems] = useState([{ id: 1, name: '', qty: 1, price: 0 }]);

    const revenueLedgers = ledgers.filter(l => l.account_type_name === 'Revenue');

    const addItem = () => setItems([...items, { id: items.length + 1, name: '', qty: 1, price: 0 }]);
    const removeItem = (id) => {
        if (items.length === 1) return;
        setItems(items.filter(item => item.id !== id));
    };

    const handleItemChange = (id, field, val) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: val };
                return updated;
            }
            return item;
        }));
    };

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + (parseFloat(item.qty || 0) * parseFloat(item.price || 0)), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * (parseFloat(taxRate || 0) / 100);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax() - parseFloat(discount || 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!clientId) {
            showToast("Please select a client.", "error");
            return;
        }
        if (!dueDate) {
            showToast("Please select a due date.", "error");
            return;
        }
        if (items.some(item => !item.name.trim() || item.price <= 0 || item.qty <= 0)) {
            showToast("Please complete all invoice items with valid prices and quantities.", "error");
            return;
        }

        try {
            const invoiceItems = items.map(item => ({
                name: item.name,
                quantity: parseFloat(item.qty),
                unit_price: parseFloat(item.price),
                subtotal: parseFloat(item.qty) * parseFloat(item.price)
            }));

            const payload = {
                client: clientId,
                project: project.trim() || undefined,
                issue_date: issueDate,
                due_date: dueDate,
                income_account: incomeAccountId || undefined,
                subtotal: calculateSubtotal(),
                tax_rate: parseFloat(taxRate),
                tax_amount: calculateTax(),
                discount: parseFloat(discount),
                total: calculateTotal(),
                notes: notes.trim() || undefined,
                status: 'Sent',
                items: invoiceItems
            };

            await apiClient.accounting.invoices.create(payload);
            showToast("Invoice generated successfully!", "success");
            onSave();
            onCancel();
        } catch (err) {
            console.error("Failed to generate invoice:", err);
            showToast(err.message || "Failed to create invoice.", "error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3 style={{ margin: 0 }}>Create New Customer Invoice</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={onCancel} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" className="btn-primary" style={{ padding: '10px 25px', borderRadius: '10px', fontWeight: 600 }}>Save & Dispatch</button>
                </div>
            </div>

            <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
                        <h4 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#6366f1' }}>Invoice Details</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Customer / Client</label>
                                <select 
                                    value={clientId} 
                                    onChange={(e) => setClientId(e.target.value)} 
                                    required
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                                >
                                    <option value="">Select Customer...</option>
                                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Project (Optional)</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Phase 2 Retainer" 
                                    value={project}
                                    onChange={(e) => setProject(e.target.value)}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Income Account</label>
                                <select 
                                    value={incomeAccountId}
                                    onChange={(e) => setIncomeAccountId(e.target.value)}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                                >
                                    <option value="">Select Revenue Account...</option>
                                    {revenueLedgers.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Issue Date</label>
                                <input 
                                    type="date" 
                                    value={issueDate}
                                    onChange={(e) => setIssueDate(e.target.value)}
                                    required
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Due Date</label>
                                <input 
                                    type="date" 
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h4 style={{ margin: 0, fontSize: '15px', color: '#6366f1' }}>Invoice Line Items</h4>
                            <button type="button" onClick={addItem} style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Plus size={14} /> Add Line Item
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {/* Header Row */}
                            {items.length > 0 && (
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr auto', gap: '10px', paddingBottom: '5px', borderBottom: '1px solid #e2e8f0', marginBottom: '2px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Item Description</span>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Qty</span>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Rate (KES)</span>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', textAlign: 'right', paddingRight: '10px' }}>Amount</span>
                                    <span style={{ width: '20px' }}></span>
                                </div>
                            )}
                            {items.map((item, idx) => (
                                <div key={item.id} className="invoice-item-row" style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr auto', gap: '10px', alignItems: 'center' }}>
                                    <input 
                                        placeholder="Item description..." 
                                        value={item.name}
                                        onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                        required
                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="Qty" 
                                        value={item.qty}
                                        onChange={(e) => handleItemChange(item.id, 'qty', parseFloat(e.target.value) || 0)}
                                        required
                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="Rate" 
                                        value={item.price}
                                        onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                                        required
                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                                    />
                                    <div style={{ padding: '10px', background: '#ffffff', borderRadius: '8px', fontSize: '14px', fontWeight: 700, border: '1px solid #e2e8f0', textAlign: 'right' }}>
                                        KES {(parseFloat(item.qty || 0) * parseFloat(item.price || 0)).toLocaleString()}
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => removeItem(item.id)}
                                        disabled={items.length === 1}
                                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="portal-content-card" style={{ padding: '20px', background: '#f8fafc', border: 'none' }}>
                        <h4 style={{ margin: '0 0 15px 0', fontSize: '15px' }}>Financial Summary</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>Subtotal</span>
                                <span style={{ fontWeight: 600 }}>KES {calculateSubtotal().toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', alignItems: 'center' }}>
                                <span style={{ color: '#64748b' }}>Tax Rate (%)</span>
                                <input 
                                    type="number" 
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                    style={{ width: '60px', padding: '4px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '13px', textAlign: 'right' }} 
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>Tax Amount</span>
                                <span style={{ fontWeight: 600 }}>KES {calculateTax().toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', alignItems: 'center' }}>
                                <span style={{ color: '#64748b' }}>Discount (KES)</span>
                                <input 
                                    type="number" 
                                    value={discount}
                                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                    style={{ width: '100px', padding: '4px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '13px', textAlign: 'right' }} 
                                />
                            </div>
                            <div style={{ height: '1px', background: '#e2e8f0', margin: '5px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800 }}>
                                <span>Grand Total</span>
                                <span style={{ color: '#6366f1' }}>KES {calculateTotal().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#475569' }}>Invoice Memo / Notes</h4>
                        <textarea 
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '100px', fontSize: '14px', resize: 'none' }} 
                            placeholder="Add notes visible to client or internal billing terms..." 
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

const ExpenseListSection = ({ expenses, onRecordNew, onDelete, userRole, formatCurrency }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    const filtered = expenses.filter(exp => {
        const title = (exp.title || '').toLowerCase();
        const vendor = (exp.vendor_name || exp.supplier_name || '').toLowerCase();
        const matchesSearch = title.includes(searchTerm.toLowerCase()) || vendor.includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || exp.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getUtilityIcon = (utilityType) => {
        if (utilityType === 'water') return <Droplet size={14} style={{ color: '#0284c7' }} />;
        if (utilityType === 'electricity') return <Zap size={14} style={{ color: '#eab308' }} />;
        if (utilityType === 'internet') return <Wifi size={14} style={{ color: '#a855f7' }} />;
        return null;
    };

    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search expenses by title, vendor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                    >
                        <option value="All">All Categories</option>
                        <option value="Supplies">Supplies</option>
                        <option value="Software">Software</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Travel">Travel</option>
                        <option value="Salaries">Salaries</option>
                        <option value="Utilities">Utilities & Bills</option>
                        <option value="Other">Other</option>
                    </select>
                    {(userRole === 'Admin' || userRole === 'Finance') && (
                        <button onClick={onRecordNew} className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Plus size={18} /> Record Expense / Bill
                        </button>
                    )}
                </div>
            </div>
            
            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ color: '#64748b' }}>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Expense ID</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Description</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Category</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Vendor / Supplier</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Amount</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((exp) => (
                            <tr key={exp.id} style={{ background: '#ffffff', borderRadius: '12px' }} className="hover-bg-light">
                                <td style={{ padding: '15px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', border: '1px solid #f1f5f9', borderRight: 'none', fontWeight: 700, color: '#1e293b' }}>{exp.expense_number}</td>
                                <td style={{ padding: '15px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>
                                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#334155' }}>{exp.title}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{exp.date_incurred}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        {exp.category}
                                        {getUtilityIcon(exp.utility_type)}
                                    </div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>{exp.supplier_name || exp.vendor_name || 'Generic Vendor'}</td>
                                <td style={{ padding: '15px', fontSize: '14px', fontWeight: 800, color: '#ef4444', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>{formatCurrency(exp.amount)}</td>
                                <td style={{ padding: '15px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                                        background: exp.status === 'Approved' ? '#ecfdf5' : exp.status === 'Rejected' ? '#fef2f2' : '#fffbeb',
                                        color: exp.status === 'Approved' ? '#10b981' : exp.status === 'Rejected' ? '#ef4444' : '#f59e0b',
                                        border: exp.status === 'Approved' ? '1px solid #10b98125' : exp.status === 'Rejected' ? '1px solid #ef444425' : '1px solid #f59e0b25'
                                    }}>{exp.status}</span>
                                </td>
                                <td style={{ padding: '15px', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', border: '1px solid #f1f5f9', borderLeft: 'none' }}>
                                    {(userRole === 'Admin' || userRole === 'Finance') && (
                                        <button onClick={() => onDelete(exp.id)} title="Delete Log" style={{ background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={16} /></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>No expenses recorded.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const RecordExpenseSection = ({ suppliers = [], ledgers = [], showToast, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Utilities');
    const [utilityType, setUtilityType] = useState('none');
    const [amount, setAmount] = useState('');
    const [dateIncurred, setDateIncurred] = useState(new Date().toISOString().split('T')[0]);
    const [supplierId, setSupplierId] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [expenseAccountId, setExpenseAccountId] = useState('');
    const [paymentAccountId, setPaymentAccountId] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const expenseLedgers = ledgers.filter(l => l.account_type_name === 'Expenses');
    const bankLedgers = ledgers.filter(l => l.account_type_name === 'Assets');

    useEffect(() => {
        if (category !== 'Utilities') {
            setUtilityType('none');
        }
        
        // Auto-select smart account mapping
        if (category === 'Utilities') {
             const found = expenseLedgers.find(l => l.name.toLowerCase().includes('utilities'));
             if (found) setExpenseAccountId(found.id);
        } else if (category === 'Salaries') {
             const found = expenseLedgers.find(l => l.name.toLowerCase().includes('salar'));
             if (found) setExpenseAccountId(found.id);
        } else if (category === 'Marketing') {
             const found = expenseLedgers.find(l => l.name.toLowerCase().includes('marketing'));
             if (found) setExpenseAccountId(found.id);
        }
    }, [category, ledgers]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            showToast("Please enter an expense title.", "error");
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            showToast("Please enter a valid expense amount.", "error");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title: title.trim(),
                utility_type: category === 'Utilities' ? utilityType : 'none',
                amount: parseFloat(amount),
                date_incurred: dateIncurred,
                supplier: supplierId || undefined,
                vendor_name: vendorName.trim() || undefined,
                expense_account: expenseAccountId || undefined,
                payment_account: paymentAccountId || undefined,
                description: description.trim() || undefined,
                status: 'Approved' // auto-approve registered bills
            };

            await apiClient.accounting.expenses.create(payload);
            showToast("Expense logged and recorded successfully!", "success");
            onSave();
            onCancel();
        } catch (err) {
            console.error("Failed to save expense:", err);
            showToast(err.message || "Failed to save expense record.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Record Expense / Bill Details</h3>
            <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Expense Title / Bill Description</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Electricity Bill - May 2026" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Category</label>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                        >
                            <option value="Utilities">Utilities & Utility Bills</option>
                            <option value="Supplies">Supplies</option>
                            <option value="Software">Software</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Travel">Travel</option>
                            <option value="Salaries">Salaries</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {category === 'Utilities' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', animation: 'fadeIn 0.2s' }}>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Utility Bill Type</label>
                            <select 
                                value={utilityType}
                                onChange={(e) => setUtilityType(e.target.value)}
                                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                            >
                                <option value="none">Generic Utility Bill</option>
                                <option value="water">Water Bill</option>
                                <option value="electricity">Electricity Bill</option>
                                <option value="internet">Internet Bill</option>
                            </select>
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Amount (KES)</label>
                        <input 
                            type="number" 
                            placeholder="0.00" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Date Incurred</label>
                        <input 
                            type="date" 
                            value={dateIncurred}
                            onChange={(e) => setDateIncurred(e.target.value)}
                            required
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                        />
                    </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Vendor (Select from Suppliers)</label>
                        <select 
                            value={supplierId}
                            onChange={(e) => setSupplierId(e.target.value)}
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                        >
                            <option value="">Select Vendor...</option>
                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Vendor Name (Or specify manually)</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Kenya Power, Safaricom" 
                            value={vendorName}
                            onChange={(e) => setVendorName(e.target.value)}
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Chart of Accounts: Expense Ledger</label>
                        <select 
                            value={expenseAccountId}
                            onChange={(e) => setExpenseAccountId(e.target.value)}
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                        >
                            <option value="">Select Expense Account...</option>
                            {expenseLedgers.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Paid From (Cashbook/Bank)</label>
                        <select 
                            value={paymentAccountId}
                            onChange={(e) => setPaymentAccountId(e.target.value)}
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                        >
                            <option value="">Select Asset/Bank Account...</option>
                            {bankLedgers.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Description / Notes</label>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px', fontSize: '14px', resize: 'none' }} 
                            placeholder="Purpose of expense or billing reference..." 
                        />
                    </div>
                </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', paddingTop: '20px', borderTop: '1px solid #f1f5f9', marginTop: '25px' }}>
                <button type="button" onClick={onCancel} style={{ padding: '10px 24px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '10px 24px', borderRadius: '10px', fontWeight: 600 }}>
                    {loading ? 'Recording...' : 'Record Bill / Expense'}
                </button>
            </div>
        </form>
    );
};

const PaymentRecordingSection = ({ invoices = [], ledgers = [], userRole, showToast, onSave, formatCurrency }) => {
    const [invoiceId, setInvoiceId] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const [depositAccountId, setDepositAccountId] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const bankLedgers = ledgers.filter(l => l.account_type_name === 'Assets');

    // Only show unpaid invoices
    const unpaidInvoices = invoices.filter(inv => inv.status !== 'Paid' && inv.status !== 'Draft');

    const handleInvoiceChange = (id) => {
        setInvoiceId(id);
        const inv = invoices.find(i => String(i.id) === String(id));
        if (inv) {
            setAmount(inv.total);
        } else {
            setAmount('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!invoiceId) {
            showToast("Please select an invoice.", "error");
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            showToast("Please specify a valid payment amount.", "error");
            return;
        }

        setLoading(true);
        try {
            await apiClient.accounting.payments.create({
                invoice: invoiceId,
                amount: parseFloat(amount),
                payment_date: paymentDate,
                deposit_account: depositAccountId || undefined,
                notes: notes.trim() || undefined
            });
            showToast("Payment recorded successfully!", "success");
            setInvoiceId('');
            setAmount('');
            setNotes('');
            onSave();
        } catch (err) {
            console.error("Failed to record payment:", err);
            showToast(err.message || "Failed to record payment.", "error");
        } finally {
            setLoading(false);
        }
    };

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
            <h3 style={{ margin: '0 0 25px 0' }}>Record Client Payment Intake</h3>
            <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Select Unpaid Invoice</label>
                        <select 
                            value={invoiceId} 
                            onChange={(e) => handleInvoiceChange(e.target.value)}
                            required
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                        >
                            <option value="">Select Invoice...</option>
                            {unpaidInvoices.map(i => (
                                <option key={i.id} value={i.id}>
                                    {i.invoice_number} - {i.client_name} (Due: {formatCurrency(i.total)})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Payment Amount (KES)</label>
                        <input 
                            type="number" 
                            placeholder="0.00" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Payment Date</label>
                        <input 
                            type="date" 
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            required
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} 
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Deposit To (Asset/Bank Account)</label>
                        <select 
                            value={depositAccountId}
                            onChange={(e) => setDepositAccountId(e.target.value)}
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                        >
                            <option value="">Select Account...</option>
                            {bankLedgers.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Notes / Memo</label>
                        <textarea 
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px', fontSize: '14px', resize: 'none' }} 
                            placeholder="Receipt ID, bank slip reference..." 
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px', borderRadius: '10px', fontWeight: 700 }}>
                        {loading ? 'Saving Payment...' : 'Record Payment Intake'}
                    </button>
                </form>
                <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '20px', height: 'fit-content' }}>
                    <h4 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={18} color="#6366f1" /> Bookkeeping Guidelines</h4>
                    <ul style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
                        <li>Verify the payment reference or bank slip ID before saving.</li>
                        <li>Payments logged here will update the invoice's paid progress automatically.</li>
                        <li>An automated double-entry ledger item is registered under "Transactions".</li>
                        <li>Clients will receive automated payment receipts if email alerts are configured.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const TransactionsLogSection = ({ transactions = [], formatCurrency }) => {
    const [filterType, setFilterType] = useState('All');

    const filtered = transactions.filter(t => {
        if (filterType === 'All') return true;
        return t.transaction_type === filterType;
    });

    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                <h3 style={{ margin: 0 }}>Financial Transaction Log</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', background: 'white' }}
                    >
                        <option value="All">All Transactions</option>
                        <option value="Income">Income only</option>
                        <option value="Expense">Expenses only</option>
                    </select>
                </div>
            </div>
            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ color: '#64748b' }}>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>TXN Number</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Type</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Category</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Reference</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Amount</th>
                            <th style={{ padding: '12px 15px', fontSize: '13px', fontWeight: 600 }}>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((txn) => (
                            <tr key={txn.id} style={{ background: '#ffffff', borderRadius: '12px' }} className="hover-bg-light">
                                <td style={{ padding: '15px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', border: '1px solid #f1f5f9', borderRight: 'none', fontWeight: 700, color: '#1e293b' }}>{txn.transaction_number}</td>
                                <td style={{ padding: '15px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: txn.transaction_type === 'Income' ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                                        {txn.transaction_type === 'Income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                        {txn.transaction_type}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{txn.date}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '13px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none', fontWeight: 600, color: '#475569' }}>{txn.category}</td>
                                <td style={{ padding: '15px', fontSize: '13px', color: '#6366f1', fontWeight: 700, border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>{txn.reference || 'N/A'}</td>
                                <td style={{ padding: '15px', fontSize: '14px', fontWeight: 800, color: txn.transaction_type === 'Income' ? '#10b981' : '#ef4444', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>
                                    {txn.transaction_type === 'Expense' ? '-' : '+'}{formatCurrency(txn.amount)}
                                </td>
                                <td style={{ padding: '15px', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', border: '1px solid #f1f5f9', borderLeft: 'none', fontSize: '13px' }}>{txn.payment_method}</td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>No transaction records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const FinancialReportsSection = ({ transactions = [], formatCurrency }) => {
    const profit = transactions
        .filter(t => t.transaction_type === 'Income')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    const loss = transactions
        .filter(t => t.transaction_type === 'Expense')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    const netProfit = profit - loss;
    const estimatedTax = netProfit > 0 ? netProfit * 0.15 : 0; // 15% corporate tax estimate
    const vatEstimate = profit * 0.16; // 16% VAT estimation

    const reportData = [
        { name: 'Income Stream', profit: profit, loss: 0 },
        { name: 'Expense Outflow', profit: 0, loss: loss }
    ];

    return (
        <div className="animations-fade-in reports-container">
            <div className="finance-reports-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                <div className="portal-content-card" style={{ padding: '20px', borderLeft: '4px solid #10b981', background: '#ffffff' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Net Profit / Margin</span>
                    <h3 style={{ margin: '5px 0', fontSize: '1.4rem', color: netProfit >= 0 ? '#10b981' : '#ef4444', fontWeight: 800 }}>{formatCurrency(netProfit)}</h3>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Direct ledger income minus expenses</p>
                </div>
                <div className="portal-content-card" style={{ padding: '20px', borderLeft: '4px solid #f59e0b', background: '#ffffff' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Tax Liability (Estimated)</span>
                    <h3 style={{ margin: '5px 0', fontSize: '1.4rem', color: '#f59e0b', fontWeight: 800 }}>{formatCurrency(estimatedTax)}</h3>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Based on 15% general tax estimation</p>
                </div>
                <div className="portal-content-card" style={{ padding: '20px', borderLeft: '4px solid #6366f1', background: '#ffffff' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Estimated VAT YTD</span>
                    <h3 style={{ margin: '5px 0', fontSize: '1.4rem', color: '#6366f1', fontWeight: 800 }}>{formatCurrency(vatEstimate)}</h3>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Computed 16% VAT value from sales</p>
                </div>
            </div>

            <div className="finance-reports-charts" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '25px' }}>
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 800 }}>Income vs Expense Allocation</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={reportData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Ledger Income" />
                                <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} name="Ledger Expense" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 800 }}>Tax Liabilities Summary</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <TaxItem label="VAT (16%)" amount={formatCurrency(vatEstimate)} progress={80} color="#6366f1" />
                        <TaxItem label="Estimated Income Tax" amount={formatCurrency(estimatedTax)} progress={50} color="#10b981" />
                    </div>
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
            <h4 style={{ margin: '4px 0 0 0', fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{value}</h4>
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

const ChartOfAccountsSection = () => {
    const [accountTypes, setAccountTypes] = useState([]);
    const [ledgers, setLedgers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [showAddLedger, setShowAddLedger] = useState(false);
    
    // form state
    const [ledgerName, setLedgerName] = useState('');
    const [ledgerAccountType, setLedgerAccountType] = useState('');

    const showToastMsg = (msg, type='success') => {
        setToast({ show: true, message: msg, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
    };

    const loadData = async () => {
        setLoading(true);
        try {
            const types = await apiClient.accounting.accountTypes.list();
            const leds = await apiClient.accounting.ledgers.list();
            setAccountTypes(types || []);
            setLedgers(leds || []);
        } catch (e) {
            showToastMsg("Failed to load Chart of Accounts", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleAddLedger = async (e) => {
        e.preventDefault();
        try {
            await apiClient.accounting.ledgers.create({
                name: ledgerName,
                account_type: ledgerAccountType,
                code: `LDG-${Math.floor(Math.random() * 10000)}`
            });
            showToastMsg("Ledger created successfully!", "success");
            setShowAddLedger(false);
            setLedgerName('');
            loadData();
        } catch (err) {
            showToastMsg("Failed to create ledger", "error");
        }
    };

    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h3 style={{ margin: 0 }}>Chart of Accounts</h3>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '13px' }}>Manage financial ledgers and accounting categories.</p>
                </div>
                <button onClick={() => setShowAddLedger(!showAddLedger)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
                    <Plus size={16} /> New Ledger
                </button>
            </div>
            
            {showAddLedger && (
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 15px 0' }}>Add New Ledger</h4>
                    <form onSubmit={handleAddLedger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Ledger Name</label>
                            <input required value={ledgerName} onChange={e=>setLedgerName(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder="e.g. Marketing Expense" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Account Type</label>
                            <select required value={ledgerAccountType} onChange={e=>setLedgerAccountType(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}>
                                <option value="">Select Category...</option>
                                {accountTypes.map(at => (
                                    <option key={at.id} value={at.id}>{at.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', height: '40px' }}>
                            Save Ledger
                        </button>
                    </form>
                </div>
            )}

            <div className="table-responsive">
                {loading ? (
                    <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>Loading ledgers...</div>
                ) : (
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                        <thead>
                            <tr style={{ color: '#64748b' }}>
                                <th style={{ padding: '12px 15px', fontWeight: 600, fontSize: '13px' }}>Code</th>
                                <th style={{ padding: '12px 15px', fontWeight: 600, fontSize: '13px' }}>Ledger Name</th>
                                <th style={{ padding: '12px 15px', fontWeight: 600, fontSize: '13px' }}>Account Type</th>
                                <th style={{ padding: '12px 15px', fontWeight: 600, fontSize: '13px' }}>Total Debit</th>
                                <th style={{ padding: '12px 15px', fontWeight: 600, fontSize: '13px' }}>Total Credit</th>
                                <th style={{ padding: '12px 15px', fontWeight: 600, fontSize: '13px' }}>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ledgers.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>No ledgers found. Ensure defaults are generated by recording an expense/invoice.</td></tr>
                            ) : ledgers.map(l => (
                                <tr key={l.id} style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #f1f5f9' }} className="hover-bg-light">
                                    <td style={{ padding: '15px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', borderLeft: '1px solid #f1f5f9', fontWeight: 700, color: '#475569' }}>{l.code || 'N/A'}</td>
                                    <td style={{ padding: '15px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#1e293b' }}>{l.name}</td>
                                    <td style={{ padding: '15px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                                        <span style={{ padding: '4px 10px', background: '#f1f5f9', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                                            {l.account_type_name || l.account_type}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', color: '#10b981', fontWeight: 600 }}>{l.total_debit}</td>
                                    <td style={{ padding: '15px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', color: '#ef4444', fontWeight: 600 }}>{l.total_credit}</td>
                                    <td style={{ padding: '15px', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', fontWeight: 800, color: '#0f172a' }}>{l.balance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {toast.show && (
                <div style={{ position: 'fixed', bottom: '25px', right: '25px', background: toast.type === 'error' ? '#ef4444' : '#10b981', color: '#ffffff', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', zIndex: 9999, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default FinanceAccounting;

const InvoicePreviewModal = ({ invoice, onClose, formatCurrency }) => {
    if (!invoice) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="invoice-modal-overlay" style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
            overflowY: 'auto'
        }}>
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .invoice-print-area, .invoice-print-area * {
                        visibility: visible;
                    }
                    .invoice-print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        background: white !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .invoice-modal-overlay {
                        background: none !important;
                        backdrop-filter: none !important;
                        padding: 0 !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
            `}</style>

            <div className="invoice-print-area" style={{
                background: '#ffffff',
                width: '100%',
                maxWidth: '850px',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                animation: 'scaleUp 0.3s ease-out',
                maxHeight: '90vh'
            }}>
                <style>{`
                    @keyframes scaleUp {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `}</style>

                {/* Top Action Bar */}
                <div className="no-print" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px 30px',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: 700,
                            background: invoice.status === 'Paid' ? '#ecfdf5' : '#fffbeb',
                            color: invoice.status === 'Paid' ? '#10b981' : '#f59e0b',
                            border: invoice.status === 'Paid' ? '1px solid #10b98125' : '1px solid #f59e0b25'
                        }}>{invoice.status}</span>
                        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                            Invoice: <strong style={{ color: '#0f172a' }}>{invoice.invoice_number}</strong>
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={handlePrint} className="btn-primary" style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}>
                            <Printer size={15} /> Print / Save PDF
                        </button>
                        <button onClick={onClose} style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            color: '#475569',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}>
                            Close
                        </button>
                    </div>
                </div>

                {/* Main Invoice Document (Printable area) */}
                <div style={{
                    padding: '40px',
                    overflowY: 'auto',
                    flex: 1
                }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        borderBottom: '2px solid #f1f5f9',
                        paddingBottom: '30px',
                        marginBottom: '30px'
                    }}>
                        <div>
                            {/* Royal Softwares Logo */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                <img src="/logo (2).png" alt="Royal Software Solutions" style={{ height: '45px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>Royal Software Solutions</span>
                            </div>
                            <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                                NextGen Tech Chambers<br />
                                Mombasa Road, P.O Box 12840-00100<br />
                                Nairobi, Kenya<br />
                                Email: billing@royalsoftwares.com | Phone: +254 700 000 000
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h1 style={{
                                fontSize: '2.5rem',
                                fontWeight: 900,
                                color: '#6366f1',
                                margin: '0 0 10px 0',
                                letterSpacing: '-1px'
                            }}>INVOICE</h1>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
                                <span>Invoice No: <strong style={{ color: '#0f172a' }}>{invoice.invoice_number}</strong></span>
                                <span>Issue Date: <strong>{invoice.issue_date}</strong></span>
                                <span>Due Date: <strong style={{ color: '#ef4444' }}>{invoice.due_date}</strong></span>
                            </div>
                        </div>
                    </div>

                    {/* Address Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '40px',
                        marginBottom: '40px'
                    }}>
                        <div>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>Billed To:</span>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '5px' }}>{invoice.client_name || 'Valued Customer'}</div>
                            <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                                Project Reference: {invoice.project || 'General Software Engineering'}<br />
                                Client Account ID: CL-{invoice.client || 'N/A'}
                            </div>
                        </div>
                        <div style={{ borderLeft: '3px solid #6366f120', paddingLeft: '20px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>Payment Terms:</span>
                            <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                                Due within 14 days of issue.<br />
                                Pay via Bank Transfer or Mobile Money.<br />
                                Account Details: KCB Bank, Royal Softwares AC 1294829302
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div style={{ marginBottom: '40px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '12px 15px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>Item / Description</th>
                                    <th style={{ padding: '12px 15px', fontSize: '12px', fontWeight: 700, color: '#475569', textAlign: 'center', width: '80px' }}>Qty</th>
                                    <th style={{ padding: '12px 15px', fontSize: '12px', fontWeight: 700, color: '#475569', textAlign: 'right', width: '120px' }}>Rate</th>
                                    <th style={{ padding: '12px 15px', fontSize: '12px', fontWeight: 700, color: '#475569', textAlign: 'right', width: '150px' }}>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(!invoice.items || invoice.items.length === 0) ? (
                                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '15px' }}>{invoice.project || 'General IT Services'}</td>
                                        <td style={{ padding: '15px', textAlign: 'center' }}>1</td>
                                        <td style={{ padding: '15px', textAlign: 'right' }}>{formatCurrency(invoice.subtotal || invoice.total)}</td>
                                        <td style={{ padding: '15px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{formatCurrency(invoice.subtotal || invoice.total)}</td>
                                    </tr>
                                ) : (
                                    invoice.items.map((item, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '15px', fontSize: '13.5px', color: '#1e293b', fontWeight: 600 }}>{item.name}</td>
                                            <td style={{ padding: '15px', textAlign: 'center', fontSize: '13.5px', color: '#475569' }}>{parseFloat(item.quantity).toLocaleString()}</td>
                                            <td style={{ padding: '15px', textAlign: 'right', fontSize: '13.5px', color: '#475569' }}>{formatCurrency(item.unit_price)}</td>
                                            <td style={{ padding: '15px', textAlign: 'right', fontWeight: 700, fontSize: '13.5px', color: '#0f172a' }}>{formatCurrency(item.subtotal)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Footer */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 0.8fr',
                        gap: '40px',
                        alignItems: 'flex-start'
                    }}>
                        <div>
                            {invoice.notes && (
                                <>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Notes / Special Instructions:</span>
                                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.6', background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
                                        {invoice.notes}
                                    </p>
                                </>
                            )}
                        </div>
                        <div style={{
                            background: '#f8fafc',
                            borderRadius: '12px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
                                <span>Subtotal</span>
                                <span style={{ fontWeight: 600, color: '#0f172a' }}>{formatCurrency(invoice.subtotal || invoice.total)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
                                <span>VAT ({parseFloat(invoice.tax_rate || 0)}%)</span>
                                <span style={{ fontWeight: 600, color: '#0f172a' }}>{formatCurrency(invoice.tax_amount || 0)}</span>
                            </div>
                            {parseFloat(invoice.discount || 0) > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#ef4444' }}>
                                    <span>Discount</span>
                                    <span style={{ fontWeight: 600 }}>-{formatCurrency(invoice.discount)}</span>
                                </div>
                            )}
                            <div style={{ height: '1px', background: '#e2e8f0', margin: '5px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800 }}>
                                <span>Total Amount Due</span>
                                <span style={{ color: '#6366f1', fontSize: '16px' }}>{formatCurrency(invoice.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Thank You Note */}
                    <div style={{
                        marginTop: '50px',
                        textAlign: 'center',
                        borderTop: '1px solid #f1f5f9',
                        paddingTop: '20px',
                        fontSize: '12px',
                        color: '#94a3b8'
                    }}>
                        Thank you for partnering with Royal Software Solutions!
                    </div>
                </div>
            </div>
        </div>
    );
};
