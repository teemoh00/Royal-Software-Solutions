import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
    PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    BarChart, Bar, LineChart, Line, ResponsiveContainer
} from 'recharts';
import {
    Briefcase, Users, DollarSign, Headset, TrendingUp, TrendingDown,
    Calendar, CheckSquare, MoreVertical, Activity, FileText,
    MessageSquare, AlertCircle, Clock, FilePlus, UserPlus, Receipt, CreditCard, Video
} from 'lucide-react';

const ResponsiveGridLayout = WidthProvider(Responsive);

// --- Dummy Data ---
const dummyUser = { name: 'Timothy', role: 'Admin', pendingTasks: 5, supportTickets: 2 };

const statsCards = [
    { title: 'Total Projects', value: '42', trend: '+12%', isUp: true, icon: <Briefcase size={24} />, color: 'var(--primary)' },
    { title: 'Total Clients', value: '128', trend: '+5%', isUp: true, icon: <Users size={24} />, color: 'var(--success)' },
    { title: 'Total Revenue', value: '$84,500', trend: '+18%', isUp: true, icon: <DollarSign size={24} />, color: 'var(--warning)' },
    { title: 'Open Tickets', value: '14', trend: '-2%', isUp: false, icon: <Headset size={24} />, color: 'var(--danger)' },
];

const projectStatusData = [
    { name: 'Completed', value: 45 },
    { name: 'In Progress', value: 30 },
    { name: 'Delayed', value: 10 },
    { name: 'On Hold', value: 15 },
];
const COLORS = ['#10b981', '#6366f1', '#f43f5e', '#fbbf24']; // Modern vivid pastels

const revenueData = [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 2000, expenses: 9800 },
    { month: 'Apr', revenue: 2780, expenses: 3908 },
    { month: 'May', revenue: 1890, expenses: 4800 },
    { month: 'Jun', revenue: 2390, expenses: 3800 },
];

const salesData = [
    { month: 'Jan', leads: 40, deals: 24 },
    { month: 'Feb', leads: 30, deals: 13 },
    { month: 'Mar', leads: 20, deals: 98 },
    { month: 'Apr', leads: 27, deals: 39 },
    { month: 'May', leads: 18, deals: 48 },
    { month: 'Jun', leads: 23, deals: 38 },
];

const recentActivities = [
    { id: 1, user: 'John Doe', action: 'created a new project', module: 'Projects', time: '10 mins ago', type: 'success' },
    { id: 2, user: 'Sarah Smith', action: 'Invoice #1023 was generated', module: 'Finance', time: '1 hour ago', type: 'primary' },
    { id: 3, user: 'Client XYZ', action: 'Payment received ($5,000)', module: 'Finance', time: '3 hours ago', type: 'success' },
    { id: 4, user: 'Mike Johnson', action: 'Support ticket #894 opened', module: 'Support', time: '5 hours ago', type: 'warning' },
];

// --- Sub-Components (Widgets) ---

const WelcomeSection = ({ user }) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <div className="dashboard-welcome" style={{ padding: '20px', background: 'linear-gradient(135deg, var(--primary) 0%, #1e3a8a 100%)', color: 'white', borderRadius: '12px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>Welcome back, {user.name}.</h1>
            <p style={{ margin: '0 0 5px 0', opacity: 0.9 }}>{today} | Role: {user.role}</p>
            <p className="welcome-stats" style={{ margin: 0, fontWeight: 500 }}>
                <AlertCircle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }} />
                You have {user.pendingTasks} pending tasks and {user.supportTickets} support tickets.
            </p>
        </div>
    );
};

const QuickStats = () => (
    <div className="stats-grid-responsive" style={{ gap: '20px', height: '100%' }}>
        {statsCards.map((stat, i) => (
            <div key={i} className="portal-content-card stat-card-modern" style={{ display: 'flex', alignItems: 'center', padding: '20px', justifyContent: 'space-between' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--text-light)', fontSize: '14px' }}>{stat.title}</h4>
                    <h2 style={{ margin: '0 0 5px 0', fontSize: '24px' }}>{stat.value}</h2>
                    <span style={{ fontSize: '12px', color: stat.isUp ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center' }}>
                        {stat.isUp ? <TrendingUp size={14} style={{ marginRight: '4px' }} /> : <TrendingDown size={14} style={{ marginRight: '4px' }} />}
                        {stat.trend} from last month
                    </span>
                </div>
                <div style={{ padding: '15px', borderRadius: '50%', backgroundColor: `${stat.color}15`, color: stat.color }}>
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
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, #ffffff, #f8fafc)' }}>
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
                        flexDirection: 'row' /* Tile layout */
                    }}
                >
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        backgroundColor: action.bg, color: action.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        {React.cloneElement(action.icon, { size: 18 })}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#475569', lineHeight: 1.2 }}>{action.label}</span>
                </button>
            ))}
        </div>
    </div>
);

const ActivityFeed = () => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <h3 style={{ margin: '0', padding: '20px', borderBottom: '1px solid var(--border)' }}>Recent Activities</h3>
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
            {recentActivities.map((act) => (
                <div key={act.id} style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: `var(--${act.type})`, marginTop: '5px' }} />
                    <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}><strong>{act.user}</strong> {act.action}</p>
                        <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>{act.time} • {act.module}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ProjectOverview = () => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0', padding: '20px', borderBottom: '1px solid var(--border)' }}>Project Overview</h3>
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', width: '100%' }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={projectStatusData} innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                            {projectStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '13px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '20px', flex: 1, overflowY: 'auto' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Active Projects</h4>
                {['ERP Implementation', 'Website Redesign', 'Mobile App Dev'].map((p, i) => (
                    <div key={i} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '13px' }}>
                            <span>{p}</span>
                            <span>{80 - i * 20}%</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${80 - i * 20}%`, background: 'var(--primary)' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const FinancialOverview = () => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0', padding: '20px', borderBottom: '1px solid var(--border)' }}>Financial Overview</h3>
        <div style={{ flex: 1, padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div><p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)' }}>Net Profit</p><h3 style={{ margin: 0, color: 'var(--success)' }}>$42,500</h3></div>
                <div><p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)' }}>Outstanding</p><h3 style={{ margin: 0, color: 'var(--warning)' }}>$12,400</h3></div>
            </div>
            <div style={{ height: 'calc(100% - 60px)', width: '100%' }}>
                <ResponsiveContainer>
                    <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dx={-10} />
                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fill="#bfdbfe" fillOpacity={0.5} name="Revenue" />
                        <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} fill="#fecdd3" fillOpacity={0.5} name="Expenses" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

const SalesPerformance = () => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0', padding: '20px', borderBottom: '1px solid var(--border)' }}>Sales Performance</h3>
        <div style={{ flex: 1, padding: '20px' }}>
            <div style={{ height: '200px', width: '100%' }}>
                <ResponsiveContainer>
                    <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dx={-10} />
                        <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                        <Bar dataKey="leads" fill="#818cf8" name="Leads Generated" radius={[6, 6, 6, 6]} barSize={12} />
                        <Bar dataKey="deals" fill="#34d399" name="Deals Closed" radius={[6, 6, 6, 6]} barSize={12} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Top Sales Agents</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span>Alice Walker</span><span>12 Deals ($14k)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 0' }}>
                    <span>Bob Martin</span><span>8 Deals ($9k)</span>
                </div>
            </div>
        </div>
    </div>
);

const SupportTickets = () => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ margin: 0 }}>Support Tickets</h3>
            <button className="btn-primary" style={{ padding: '4px 10px', fontSize: '12px' }}>New Ticket</button>
        </div>
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
            {[
                { id: '#TK-101', client: 'Acme Corp', subject: 'Login Issue', priority: 'High', status: 'Open' },
                { id: '#TK-102', client: 'Global Tech', subject: 'Billing Error', priority: 'Medium', status: 'In Progress' },
                { id: '#TK-103', client: 'Stark Ind', subject: 'Feature Request', priority: 'Low', status: 'Resolved' },
            ].map((t, i) => (
                <div key={i} style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <strong style={{ fontSize: '14px', color: 'var(--primary)' }}>{t.id} - {t.subject}</strong>
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', background: t.priority === 'High' ? '#fee2e2' : '#f3f4f6', color: t.priority === 'High' ? '#dc2626' : '#4b5563' }}>{t.priority}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-light)' }}>
                        <span>{t.client}</span>
                        <span style={{ color: t.status === 'Open' ? 'var(--danger)' : t.status === 'Resolved' ? 'var(--success)' : 'var(--warning)' }}>{t.status}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const TaskList = () => (
    <div className="portal-content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0', padding: '20px', borderBottom: '1px solid var(--border)' }}>My Tasks</h3>
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
            {[
                { task: 'Review Q3 Financials', due: 'Today', priority: 'High', done: false },
                { task: 'Client Onboarding - Beta Co.', due: 'Tomorrow', priority: 'Medium', done: false },
                { task: 'Team Standup', due: 'Today', priority: 'Low', done: true },
            ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <input type="checkbox" checked={t.done} readOnly style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                    <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '14px', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--text-light)' : 'inherit' }}>{t.task}</p>
                        <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Due: {t.due} • {t.priority}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- Main Dashboard Component ---

const Dashboard = () => {
    // Current layout mode (can later tie into userRole from context if needed)
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
        ],
        md: [
            { i: 'stats', x: 0, y: 0, w: 10, h: 2, static: true },
            { i: 'finance', x: 0, y: 2, w: 10, h: 4.5 },
            { i: 'actions', x: 0, y: 6.5, w: 5, h: 2.5 },
            { i: 'tasks', x: 5, y: 6.5, w: 5, h: 2.5 },
            { i: 'projects', x: 0, y: 9, w: 5, h: 4.5 },
            { i: 'sales', x: 5, y: 9, w: 5, h: 4.5 },
            { i: 'tickets', x: 0, y: 13.5, w: 10, h: 3.5 },
            { i: 'activity', x: 0, y: 17, w: 10, h: 3.5 },
        ],
        sm: [
            { i: 'stats', x: 0, y: 0, w: 6, h: 5, static: true },
            { i: 'finance', x: 0, y: 5, w: 6, h: 4.5 },
            { i: 'actions', x: 0, y: 9.5, w: 6, h: 3 },
            { i: 'tasks', x: 0, y: 12.5, w: 6, h: 3.5 },
            { i: 'projects', x: 0, y: 16, w: 6, h: 4.5 },
            { i: 'sales', x: 0, y: 20.5, w: 6, h: 4.5 },
            { i: 'tickets', x: 0, y: 25, w: 6, h: 4 },
            { i: 'activity', x: 0, y: 29, w: 6, h: 5 },
        ],
        xs: [
            { i: 'stats', x: 0, y: 0, w: 4, h: 6.5, static: true },
            { i: 'finance', x: 0, y: 6.5, w: 4, h: 4.5 },
            { i: 'actions', x: 0, y: 11, w: 4, h: 4.5 },
            { i: 'tasks', x: 0, y: 15.5, w: 4, h: 4 },
            { i: 'projects', x: 0, y: 19.5, w: 4, h: 4.5 },
            { i: 'sales', x: 0, y: 24, w: 4, h: 4.5 },
            { i: 'tickets', x: 0, y: 28.5, w: 4, h: 4 },
            { i: 'activity', x: 0, y: 32.5, w: 4, h: 5 },
        ],
        xxs: [
            { i: 'stats', x: 0, y: 0, w: 2, h: 11, static: true },
            { i: 'finance', x: 0, y: 11, w: 2, h: 4.5 },
            { i: 'actions', x: 0, y: 15.5, w: 2, h: 5.5 },
            { i: 'tasks', x: 0, y: 21, w: 2, h: 4.5 },
            { i: 'projects', x: 0, y: 25.5, w: 2, h: 4.5 },
            { i: 'sales', x: 0, y: 30, w: 2, h: 4.5 },
            { i: 'tickets', x: 0, y: 34.5, w: 2, h: 4.5 },
            { i: 'activity', x: 0, y: 39, w: 2, h: 6 },
        ]
    });

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const onLayoutChange = (_, layouts) => {
        setLayouts(layouts);
        // Here we could save user&apos;s custom layout preference to a backend
    };

    if (!mounted) return <div style={{ padding: '20px' }}>Loading Dashboard...</div>;

    return (
        <div style={{ padding: '20px', background: 'var(--body-bg)', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>

            <WelcomeSection user={dummyUser} />

            {/* Layout Wrapper with margin adjustment so borders fit inside correctly */}
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
                    margin={[20, 20]} // Spacing between widgets
                >
                    <div key="stats"><QuickStats /></div>
                    <div key="finance"><FinancialOverview /></div>
                    <div key="actions"><QuickActions /></div>
                    <div key="tasks"><TaskList /></div>
                    <div key="projects"><ProjectOverview /></div>
                    <div key="sales"><SalesPerformance /></div>
                    <div key="tickets"><SupportTickets /></div>
                    <div key="activity"><ActivityFeed /></div>
                </ResponsiveGridLayout>
            </div>
            <style>{`
                /* Some basic fixes for React-Grid-Layout inside the portal */
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
                /* Custom Styles */
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
