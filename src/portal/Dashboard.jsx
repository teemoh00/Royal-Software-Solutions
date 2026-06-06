import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
    PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    BarChart, Bar, ResponsiveContainer
} from 'recharts';
import {
    Briefcase, Users, DollarSign, Headset, TrendingUp, TrendingDown,
    Activity, FileText, AlertCircle, FilePlus, UserPlus, Receipt, CreditCard, Video
} from 'lucide-react';
import { apiClient } from '../services/apiClient';
import { useCompany } from '../services/CompanyContext';

const ResponsiveGridLayout = WidthProvider(Responsive);

// --- Default/Dummy fallback Data ---
const defaultUser = { name: 'Administrator', role: 'Staff', pendingTasks: 3, supportTickets: 2 };

const defaultStats = [
    { title: 'Total Revenue', value: 'KES 0.00', trend: '0%', isUp: true, icon: <DollarSign size={24} />, color: 'var(--primary-color)' },
    { title: 'Total Clients', value: '0', trend: '0%', isUp: true, icon: <Users size={24} />, color: '#10b981' },
    { title: 'Inventory Value', value: 'KES 0.00', trend: '0%', isUp: true, icon: <Briefcase size={24} />, color: '#f59e0b' },
    { title: 'Open Tickets', value: '0', trend: '0%', isUp: false, icon: <Headset size={24} />, color: '#ef4444' },
];

const defaultRevenueData = [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 2000, expenses: 9800 },
    { month: 'Apr', revenue: 2780, expenses: 3908 },
    { month: 'May', revenue: 1890, expenses: 4800 },
    { month: 'Jun', revenue: 2390, expenses: 3800 },
];

const COLORS = ['#10b981', '#6366f1', '#f43f5e', '#fbbf24'];

// --- Sub-Components (Widgets) ---

const WelcomeSection = ({ user, companyName }) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <div className="dashboard-welcome" style={{ padding: '20px', background: 'linear-gradient(135deg, var(--primary-color) 0%, #0d3c49 100%)', color: 'white', borderRadius: '12px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>Welcome back, {user.full_name || user.username || user.name}.</h1>
            <p style={{ margin: '0 0 5px 0', opacity: 0.9 }}>{today} | {companyName} • Session: Active</p>
            <p className="welcome-stats" style={{ margin: 0, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <AlertCircle size={16} />
                You are connected to the live enterprise backend database.
            </p>
        </div>
    );
};

const QuickStats = ({ stats }) => (
    <div className="stats-grid-responsive" style={{ gap: '20px', height: '100%' }}>
        {stats.map((stat, i) => (
            <div key={i} className="portal-content-card stat-card-modern" style={{ display: 'flex', alignItems: 'center', padding: '20px', justifyContent: 'space-between', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '14px', fontWeight: 500 }}>{stat.title}</h4>
                    <h2 style={{ margin: '0 0 5px 0', fontSize: '22px', fontWeight: 700, color: '#1e293b' }}>{stat.value}</h2>
                    <span style={{ fontSize: '12px', color: stat.isUp ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {stat.trend} growth
                    </span>
                </div>
                <div style={{ padding: '15px', borderRadius: '50%', backgroundColor: `${stat.color}15`, color: stat.color || '#6366f1' }}>
                    {stat.icon}
                </div>
            </div>
        ))}
    </div>
);

const quickActionItems = [
    { label: 'Create Project', icon: <FilePlus size={18} />, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Add Client', icon: <UserPlus size={18} />, color: '#10b981', bg: '#ecfdf5' },
    { label: 'Create Invoice', icon: <Receipt size={18} />, color: '#6366f1', bg: '#e0e7ff' },
    { label: 'Record Payment', icon: <CreditCard size={18} />, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'New Ticket', icon: <Headset size={18} />, color: '#ef4444', bg: '#fef2f2' },
    { label: 'Schedule Meeting', icon: <Video size={18} />, color: '#8b5cf6', bg: '#f5f3ff' },
];

const QuickActions = () => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 10px 20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: '#1e293b' }}>Quick Actions</h3>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>6 Actions</span>
        </div>
        <div className="quick-actions-grid" style={{ gap: '12px', padding: '10px 20px 20px 20px', flex: 1 }}>
            {quickActionItems.map((action, i) => (
                <button
                    key={i}
                    className="quick-action-btn"
                    style={{
                        border: '1px solid #f1f5f9',
                        background: 'white',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                        flexDirection: 'row',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        backgroundColor: action.bg, color: action.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        {action.icon}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#475569', lineHeight: 1.2 }}>{action.label}</span>
                </button>
            ))}
        </div>
    </div>
);

const ActivityFeed = ({ sales }) => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0', padding: '20px', borderBottom: '1px solid #f1f5f9', fontSize: '1.1rem', fontWeight: 600 }}>Recent Activity Log</h3>
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
            {sales && sales.length > 0 ? (
                sales.map((sale, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'flex-start' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', marginTop: '6px' }} />
                        <div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#334155' }}>
                                Recorded sale <strong>#{sale.sale_number}</strong> for <strong>KES {parseFloat(sale.total).toLocaleString()}</strong>
                            </p>
                            <span style={{ fontSize: '12px', color: '#64748b' }}>
                                Method: {sale.payment_method} • Date: {new Date(sale.sale_date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <div style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', padding: '20px' }}>No recent activities found.</div>
            )}
        </div>
    </div>
);

const ProjectOverview = ({ projects }) => {
    const statusData = [
        { name: 'Completed', value: projects.filter(p => p.status === 'completed').length || 1 },
        { name: 'Active', value: projects.filter(p => p.status === 'active').length || 2 }
    ];
    
    return (
        <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0', padding: '20px', borderBottom: '1px solid #f1f5f9', fontSize: '1.1rem', fontWeight: 600 }}>Project Overview</h3>
            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '160px', width: '100%' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={statusData} innerRadius={50} outerRadius={65} paddingAngle={8} dataKey="value" stroke="none">
                                {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ marginTop: '10px', flex: 1, overflowY: 'auto' }}>
                    <h4 style={{ fontSize: '13px', marginBottom: '8px', color: '#64748b' }}>Active Projects</h4>
                    {projects.map((p, i) => (
                        <div key={i} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifycontent: 'space-between', marginBottom: '3px', fontSize: '12px', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500 }}>{p.name}</span>
                                <span style={{ color: '#64748b' }}>{p.progress}%</span>
                            </div>
                            <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${p.progress}%`, background: 'var(--primary-color)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FinancialOverview = ({ revenueData }) => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0', padding: '20px', borderBottom: '1px solid #f1f5f9', fontSize: '1.1rem', fontWeight: 600 }}>Financial Overview (Sales Trend)</h3>
        <div style={{ flex: 1, padding: '20px' }}>
            <div style={{ height: 'calc(100% - 20px)', width: '100%' }}>
                <ResponsiveContainer>
                    <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dx={-10} />
                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                        <Area type="monotone" dataKey="total" stroke="var(--primary-color)" strokeWidth={3} fill="rgba(22, 101, 122, 0.15)" name="Daily Sales" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

const SalesPerformance = ({ categorySales }) => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0', padding: '20px', borderBottom: '1px solid #f1f5f9', fontSize: '1.1rem', fontWeight: 600 }}>Sales by Category</h3>
        <div style={{ flex: 1, padding: '20px' }}>
            {categorySales && categorySales.length > 0 ? (
                <div style={{ height: '100%', width: '100%' }}>
                    <ResponsiveContainer>
                        <BarChart data={categorySales}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dx={-10} />
                            <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                            <Bar dataKey="value" fill="#818cf8" name="Revenue (KES)" radius={[6, 6, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', padding: '40px 20px' }}>No category sales data to display.</div>
            )}
        </div>
    </div>
);

const SupportTickets = ({ tickets }) => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Support Tickets</h3>
            <button className="btn-primary" style={{ padding: '4px 10px', fontSize: '12px', borderRadius: '6px', cursor: 'pointer' }}>New Ticket</button>
        </div>
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
            {tickets.map((t, i) => (
                <div key={i} style={{ padding: '12px', border: '1px solid #f1f5f9', borderRadius: '8px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <strong style={{ fontSize: '13px', color: 'var(--primary-color)' }}>{t.id} - {t.subject}</strong>
                        <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '12px', background: t.priority === 'High' ? '#fee2e2' : '#f3f4f6', color: t.priority === 'High' ? '#dc2626' : '#4b5563' }}>{t.priority}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                        <span>{t.client}</span>
                        <span style={{ color: t.status === 'Open' ? '#ef4444' : t.status === 'Resolved' ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>{t.status}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const TaskList = () => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0', padding: '20px', borderBottom: '1px solid #f1f5f9', fontSize: '1.1rem', fontWeight: 600 }}>My Tasks</h3>
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
            {[
                { task: 'Review Q3 Financials', due: 'Today', priority: 'High', done: false },
                { task: 'Client Onboarding - Beta Co.', due: 'Tomorrow', priority: 'Medium', done: false },
                { task: 'Team Standup', due: 'Today', priority: 'Low', done: true },
            ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <input type="checkbox" checked={t.done} readOnly style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                    <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '14px', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#64748b' : '#334155' }}>{t.task}</p>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Due: {t.due} • {t.priority}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- Main Dashboard Component ---

const Dashboard = () => {
    const { company } = useCompany();
    const [layouts, setLayouts] = useState({
        lg: [
            { i: 'stats', x: 0, y: 0, w: 12, h: 2, static: true },
            { i: 'finance', x: 0, y: 2, w: 8, h: 4.5 },
            { i: 'actions', x: 8, y: 2, w: 4, h: 2 },
            { i: 'tasks', x: 8, y: 4, w: 4, h: 2.5 },
            { i: 'projects', x: 0, y: 6.5, w: 4, h: 4.5 },
            { i: 'sales', x: 4, y: 6.5, w: 4, h: 4.5 },
            { i: 'tickets', x: 8, y: 6.5, w: 4, h: 4.5 },
            { i: 'activity', x: 0, y: 11, w: 12, h: 3 },
        ]
    });

    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState(defaultUser);
    const [stats, setStats] = useState(defaultStats);
    const [revenueData, setRevenueData] = useState(defaultRevenueData);
    const [categorySales, setCategorySales] = useState([]);
    const [recentSales, setRecentSales] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        setMounted(true);
        
        // 1. Get logged-in user profile
        const activeUser = apiClient.auth.getCurrentUser();
        if (activeUser) {
            setUser(activeUser);
        }

        // 2. Load LocalStorage Fallbacks
        setProjects(apiClient.projects.list());
        setTickets(apiClient.tickets.list());

        // 3. Fetch stats from API
        const loadStats = async () => {
            try {
                const data = await apiClient.dashboard.getStats();
                if (data && data.kpis) {
                    const kpis = data.kpis;
                    
                    // Format Stats Cards
                    const updatedStats = [
                        { 
                            title: 'Total Revenue', 
                            value: `KES ${kpis.total_sales.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 
                            trend: `${kpis.sales_growth_pct}%`, 
                            isUp: kpis.sales_growth_pct >= 0, 
                            icon: <DollarSign size={24} />, 
                            color: 'var(--primary-color)' 
                        },
                        { 
                            title: 'Transactions', 
                            value: kpis.transaction_count.toString(), 
                            trend: 'N/A', 
                            isUp: true, 
                            icon: <Users size={24} />, 
                            color: '#10b981' 
                        },
                        { 
                            title: 'Stock Value', 
                            value: `KES ${kpis.inventory_value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 
                            trend: `${kpis.low_stock_count} low items`, 
                            isUp: kpis.low_stock_count === 0, 
                            icon: <Briefcase size={24} />, 
                            color: '#f59e0b' 
                        },
                        { 
                            title: 'Open Tickets', 
                            value: apiClient.tickets.list().filter(t => t.status === 'Open').length.toString(), 
                            trend: '0%', 
                            isUp: false, 
                            icon: <Headset size={24} />, 
                            color: '#ef4444' 
                        },
                    ];
                    setStats(updatedStats);
                    
                    // Format Revenue Area Chart data
                    if (data.trends && data.trends.daily_sales) {
                        setRevenueData(data.trends.daily_sales);
                    }
                    
                    // Format Category Sales Bar Chart data
                    if (data.trends && data.trends.category_sales) {
                        setCategorySales(data.trends.category_sales);
                    }

                    // Format Recent activities
                    if (data.recent_sales) {
                        setRecentSales(data.recent_sales);
                    }
                }
            } catch (err) {
                console.warn('Dashboard API failed. Falling back to default presentation data.', err);
            }
        };

        loadStats();
    }, []);

    const onLayoutChange = (_, layouts) => {
        setLayouts(layouts);
    };

    if (!mounted) return <div style={{ padding: '20px' }}>Loading Dashboard...</div>;

    return (
        <div style={{ padding: '20px', background: 'var(--body-bg)', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>

            <WelcomeSection user={user} companyName={company.name} />

            <div style={{ margin: '-10px' }}>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={100}
                    onLayoutChange={onLayoutChange}
                    isDraggable={true}
                    isResizable={true}
                    margin={[20, 20]}
                >
                    <div key="stats"><QuickStats stats={stats} /></div>
                    <div key="finance"><FinancialOverview revenueData={revenueData} /></div>
                    <div key="actions"><QuickActions /></div>
                    <div key="tasks"><TaskList /></div>
                    <div key="projects"><ProjectOverview projects={projects} /></div>
                    <div key="sales"><SalesPerformance categorySales={categorySales} /></div>
                    <div key="tickets"><SupportTickets tickets={tickets} /></div>
                    <div key="activity"><ActivityFeed sales={recentSales} /></div>
                </ResponsiveGridLayout>
            </div>
            <style>{`
                .react-grid-item {
                    transition: all 200ms ease;
                    transition-property: left, top;
                }
                .react-grid-item.cssTransforms {
                    transition-property: transform;
                }
                .react-grid-item.resizing {
                    z-index: 100;
                    will-change: width, height;
                }
                .react-grid-item.react-draggable-dragging {
                    transition: none;
                    z-index: 100;
                    will-change: transform;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .stats-grid-responsive {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                }
                
                .quick-actions-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                }

                @media (max-width: 1024px) {
                    .stats-grid-responsive {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .dashboard-welcome h1 {
                        font-size: 20px !important;
                    }
                    .dashboard-welcome p {
                        font-size: 13px !important;
                    }
                    .welcome-stats {
                        font-size: 12px !important;
                    }
                    .stats-grid-responsive {
                        grid-template-columns: 1fr;
                    }
                    .quick-actions-grid {
                        grid-template-columns: 1fr;
                    }
                    .stat-card-modern {
                        padding: 15px !important;
                    }
                    .stat-card-modern h2 {
                        font-size: 20px !important;
                    }
                }

                @media (max-width: 480px) {
                    .dashboard-welcome {
                        padding: 15px !important;
                    }
                    .react-grid-layout {
                        margin: 0 !important;
                    }
                    .quick-action-btn span {
                        font-size: 12px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
