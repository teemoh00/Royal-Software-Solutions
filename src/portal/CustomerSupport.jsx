import { useState, useRef, useEffect } from 'react';
import {
    Ticket, Clock, CheckCircle, AlertCircle, MessageSquare,
    Search, Filter, Plus, ChevronRight, MoreVertical,
    Mail, Phone, User, Bot, Paperclip, Send,
    LifeBuoy, HelpCircle, BookOpen, Star, ArrowUpRight,
    Play, Activity, BarChart3, Layout, Settings, FileText,
    History, TrendingUp, ShieldCheck, Download
} from 'lucide-react';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend,
    BarChart, Bar
} from 'recharts';

// Dummy Data
const ticketsData = [
    {
        id: 'TK-1205', client: 'Springfield Tech', subject: 'ERP Login Issue on Mobile',
        category: 'Technical Issue', priority: 'High', status: 'In Progress',
        assigned: 'Alex Smith', created: '2026-03-08', updated: '2 hrs ago'
    },
    {
        id: 'TK-1204', client: 'Globex Inc', subject: 'Billing Discrepancy - Inv #088',
        category: 'Billing Issue', priority: 'Medium', status: 'Waiting for Client',
        assigned: 'Maria Garcia', created: '2026-03-07', updated: '1 day ago'
    },
    {
        id: 'TK-1203', client: 'Mega-Mart', subject: 'New User Account Setup',
        category: 'Account Issue', priority: 'Low', status: 'Resolved',
        assigned: 'David Kim', created: '2026-03-05', updated: '3 days ago'
    },
    {
        id: 'TK-1202', client: 'Springfield Tech', subject: 'Custom Report Data Missing',
        category: 'Project Issue', priority: 'Urgent', status: 'Open',
        assigned: 'Alex Smith', created: '2026-03-08', updated: '30 mins ago'
    }
];

const dashboardStats = [
    { label: 'Total Tickets', value: '1,452', trend: '+12%', icon: <Ticket size={20} />, color: '#6366f1' },
    { label: 'Open Tickets', value: '18', trend: '-5%', icon: <HelpCircle size={20} />, color: '#f59e0b' },
    { label: 'Resolved Today', value: '34', trend: '+8%', icon: <CheckCircle size={20} />, color: '#10b981' },
    { label: 'Average Response', value: '14m', trend: '-20%', icon: <Clock size={20} />, color: '#0ea5e9' },
    { label: 'SLA Compliance', value: '98.5%', trend: '+0.5%', icon: <ShieldCheck size={20} />, color: '#8b5cf6' },
    { label: 'CSAT Score', value: '4.8/5', trend: '+2%', icon: <Star size={20} />, color: '#ec4899' },
];

const kbArticles = [
    { id: 1, title: 'How to reset your portal password', category: 'Account', views: 1240, rating: 4.5 },
    { id: 2, title: 'Understanding your monthly invoice', category: 'Billing', views: 850, rating: 4.2 },
    { id: 3, title: 'Troubleshooting mobile login issues', category: 'Technical', views: 2100, rating: 4.8 },
    { id: 4, title: 'Exporting project data to Excel', category: 'Platform', views: 560, rating: 4.6 }
];

const CustomerSupport = () => {
    const [view, setView] = useState('dashboard'); // dashboard, list, details, creation, kb, reports
    const [userRole, setUserRole] = useState('Admin'); // Admin, Staff, Client
    const [activeTicketId, setActiveTicketId] = useState(null);

    return (
        <div className="support-main-container portal-module animations-fade-in">
            <style>{`
                .support-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
                .support-charts-grid { display: grid; grid-template-columns: 2fr 1fr; }
                .support-details-grid { display: grid; grid-template-columns: minmax(0, 1fr) 300px; }
                .support-creation-grid { display: grid; grid-template-columns: 1fr 1fr; }
                .kb-categories-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
                .kb-articles-grid { display: grid; grid-template-columns: 1fr 1fr; }
                .support-perf-grid { display: grid; grid-template-columns: 1.5fr 1fr; }

                @media (max-width: 1024px) {
                    .support-charts-grid, .support-details-grid, .support-creation-grid, .kb-articles-grid, .support-perf-grid {
                        grid-template-columns: 1fr;
                    }
                    .support-details-sidebar { order: -1; }
                }

                @media (max-width: 768px) {
                    .support-header-section {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 15px;
                    }
                    .support-sub-nav {
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
                    .support-sub-nav::-webkit-scrollbar { display: none; }
                    
                    .support-sub-nav button {
                        flex: 0 0 auto;
                        flex-direction: column;
                        padding: 8px 12px !important;
                        font-size: 10px !important;
                        background: transparent !important;
                        color: #64748b !important;
                        min-width: 70px;
                        gap: 2px !important;
                    }
                    .support-sub-nav button.active-support-btn {
                        color: #6366f1 !important;
                    }
                    .support-sub-nav button svg {
                        width: 20px !important;
                        height: 20px !important;
                    }
                    .support-main-container {
                        padding-bottom: 90px !important;
                    }
                    .support-stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .tickets-header {
                        flex-direction: column;
                        align-items: stretch !important;
                    }
                    .search-container {
                        width: 100% !important;
                    }
                    .search-container input {
                        width: 100% !important;
                    }
                    .chat-message {
                        max-width: 90% !important;
                    }
                }

                @media (max-width: 640px) {
                    .support-header-section h2 {
                        font-size: 1.5rem !important;
                    }
                    .kb-search-container h2 {
                        font-size: 20px !important;
                    }
                }
            `}</style>
            {/* Header */}
            <div className="support-header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>Support Tickets</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Manage requests, track issues, and provide client assistance.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        onClick={() => setView('creation')}
                        className="btn-primary"
                        style={{ padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Plus size={18} /> New Ticket
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="support-sub-nav" style={{
                display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px',
                borderBottom: '1px solid #e2e8f0'
            }}>
                <SupportNavBtn icon={<Layout size={18} />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} className={view === 'dashboard' ? 'active-support-btn' : ''} />
                <SupportNavBtn icon={<Ticket size={18} />} label="All Tickets" active={view === 'list'} onClick={() => setView('list')} className={view === 'list' ? 'active-support-btn' : ''} />
                <SupportNavBtn icon={<BookOpen size={18} />} label="Knowledge Base" active={view === 'kb'} onClick={() => setView('kb')} className={view === 'kb' ? 'active-support-btn' : ''} />
                <SupportNavBtn icon={<BarChart3 size={18} />} label="Performance" active={view === 'reports'} onClick={() => setView('reports')} className={view === 'reports' ? 'active-support-btn' : ''} />
            </div>

            {/* Dynamic View */}
            {view === 'dashboard' && <SupportDashboard stats={dashboardStats} />}
            {view === 'list' && <TicketListSection tickets={ticketsData} onViewTicket={(id) => { setActiveTicketId(id); setView('details'); }} />}
            {view === 'creation' && <TicketCreationForm onCancel={() => setView('dashboard')} />}
            {view === 'details' && <TicketDetailsView ticket={ticketsData.find(t => t.id === activeTicketId)} onBack={() => setView('list')} />}
            {view === 'kb' && <KnowledgeBaseSection />}
            {view === 'reports' && <SupportPerformanceSection />}
        </div>
    );
};

// Sub-components
const SupportNavBtn = ({ icon, label, active, onClick, className }) => (
    <button onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px',
        border: 'none', background: active ? '#6366f1' : 'transparent',
        color: active ? 'white' : '#64748b', fontWeight: 600, fontSize: '14px',
        cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap'
    }} className={`${active ? '' : 'hover-bg-light'} ${className || ''}`}>
        {icon} {label}
    </button>
);

const SupportDashboard = ({ stats }) => (
    <div className="animations-fade-in">
        <div className="support-stats-grid" style={{ gap: '20px', marginBottom: '30px' }}>
            {stats.map((stat, i) => (
                <div key={i} className="portal-content-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.icon}</div>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: stat.trend.startsWith('+') ? '#10b981' : '#ef4444', background: stat.trend.startsWith('+') ? '#ecfdf5' : '#fef2f2', padding: '2px 8px', borderRadius: '20px' }}>{stat.trend}</span>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <h4 style={{ margin: 0, color: '#64748b', fontSize: '13px', fontWeight: 600 }}>{stat.label}</h4>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginTop: '5px' }}>{stat.value}</div>
                    </div>
                </div>
            ))}
        </div>

        <div className="support-charts-grid" style={{ gap: '25px', marginBottom: '30px' }}>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '16px' }}>Monthly Ticket Volume</h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <AreaChart data={[
                            { month: 'Jan', tickets: 420 }, { month: 'Feb', tickets: 380 }, { month: 'Mar', tickets: 510 },
                            { month: 'Apr', tickets: 450 }, { month: 'May', tickets: 470 }, { month: 'Jun', tickets: 520 }
                        ]}>
                            <defs>
                                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="tickets" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorTickets)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '16px' }}>Top KB Articles</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {kbArticles.map(article => (
                        <div key={article.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 600 }}>{article.title}</div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{article.category} • {article.views} views</div>
                            </div>
                            <div style={{ color: '#f59e0b' }}><Star size={14} fill="#f59e0b" /></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const TicketListSection = ({ tickets, onViewTicket }) => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <div className="tickets-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '20px' }}>
            <h3 style={{ margin: 0 }}>All Tickets</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                <div className="search-container" style={{ position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
                    <input type="text" placeholder="Search tickets..." style={{ padding: '10px 10px 10px 35px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', width: '250px' }} />
                </div>
                <button style={{ padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white' }}><Filter size={18} /></button>
            </div>
        </div>
        <div className="table-responsive">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                        <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Ticket ID</th>
                        <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Client</th>
                        <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Subject</th>
                        <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Priority</th>
                        <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Status</th>
                        <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                            <td style={{ padding: '15px', fontWeight: 700, fontSize: '13px' }}>{ticket.id}</td>
                            <td style={{ padding: '15px' }}><div style={{ fontWeight: 600, fontSize: '14px' }}>{ticket.client}</div></td>
                            <td style={{ padding: '15px' }}>
                                <div style={{ fontSize: '14px', fontWeight: 600 }}>{ticket.subject}</div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{ticket.category}</div>
                            </td>
                            <td style={{ padding: '15px' }}>
                                <span style={{
                                    padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                                    background: ticket.priority === 'Urgent' ? '#fef2f2' : ticket.priority === 'High' ? '#fffbeb' : '#f0f9ff',
                                    color: ticket.priority === 'Urgent' ? '#ef4444' : ticket.priority === 'High' ? '#f59e0b' : '#3b82f6'
                                }}>
                                    {ticket.priority}
                                </span>
                            </td>
                            <td style={{ padding: '15px' }}>
                                <span style={{
                                    padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                                    background: ticket.status === 'Resolved' ? '#ecfdf5' : '#f1f5f9',
                                    color: ticket.status === 'Resolved' ? '#10b981' : '#64748b'
                                }}>
                                    {ticket.status}
                                </span>
                            </td>
                            <td style={{ padding: '15px' }}>
                                <button onClick={() => onViewTicket(ticket.id)} className="btn-text" style={{ fontSize: '13px' }}>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const TicketCreationForm = ({ onCancel }) => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h3 style={{ margin: 0 }}>Create Support Ticket</h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Please provide details about your issue.</p>
            </div>
            <button onClick={onCancel} className="btn-text" style={{ color: '#ef4444' }}>Discard</button>
        </div>

        <form className="support-creation-grid" style={{ gap: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <SupportInputField label="Subject" placeholder="e.g. Issues with mobile app login" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <SupportSelectField label="Category" options={['Technical Issue', 'Billing Issue', 'Account Issue', 'Project Issue', 'General Inquiry']} />
                    <SupportSelectField label="Priority" options={['Low', 'Medium', 'High', 'Urgent']} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <SupportSelectField label="Related Project" options={['Cloud Infrastructure', 'Mobile ERP', 'Website Redesign', 'None']} />
                    <SupportSelectField label="Related Invoice" options={['INV-2026-088', 'INV-2026-042', 'None']} />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Description</label>
                    <textarea
                        style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', height: '140px', resize: 'none' }}
                        placeholder="Detailed explanation of the issue..."
                    ></textarea>
                </div>
                <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '8px' }}>Attachments</label>
                    <div style={{ border: '2px dashed #e2e8f0', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                        <Paperclip size={24} color="#94a3b8" style={{ marginBottom: '10px' }} />
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Drag files or click to upload (Screenshots/Logs)</div>
                    </div>
                </div>
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '15px', borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
                <button type="button" onClick={onCancel} className="btn-outline" style={{ padding: '12px 30px', borderRadius: '12px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '12px 30px', borderRadius: '12px' }}>Submit Ticket</button>
            </div>
        </form>
    </div>
);

const TicketDetailsView = ({ ticket, onBack }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'System', text: 'Ticket created and assigned to Alex Smith.', time: '09:00 AM', type: 'system' },
        { id: 2, sender: 'Alex Smith', text: "Hello! I'm looking into your ERP login issue. Could you please specify which mobile device you are using?", time: '09:15 AM', type: 'staff' },
        { id: 3, sender: 'Client', text: "I am using an iPhone 13 Pro. The screen just stays white after I enter my credentials.", time: '09:45 AM', type: 'user' },
    ]);
    const [inputText, setInputText] = useState('');

    if (!ticket) return null;

    return (
        <div className="animations-fade-in support-details-grid" style={{ gap: '25px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={onBack} className="btn-text" style={{ padding: '8px' }}>
                        <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h3 style={{ margin: 0 }}>{ticket.subject}</h3>
                            <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: '#f0f9ff', color: '#3b82f6' }}>{ticket.id}</span>
                        </div>
                        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#64748b' }}>Technical Issue • Created on {ticket.created}</p>
                    </div>
                </div>

                <div className="portal-content-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn-text" style={{ fontSize: '13px', fontWeight: 700, color: '#6366f1' }}>Conversation</button>
                            <button className="btn-text" style={{ fontSize: '13px', color: '#64748b' }}>Internal Notes</button>
                        </div>
                        <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <CheckCircle size={14} /> AI Enhanced Support Active
                        </span>
                    </div>

                    <div style={{ flex: 1, padding: '25px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {messages.map(msg => (
                            <div key={msg.id} className="chat-message" style={{
                                alignSelf: msg.type === 'user' ? 'flex-end' : msg.type === 'system' ? 'center' : 'flex-start',
                                maxWidth: msg.type === 'system' ? '100%' : '70%'
                            }}>
                                {msg.type === 'system' ? (
                                    <div style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>{msg.text}</div>
                                ) : (
                                    <div style={{
                                        padding: '12px 16px', borderRadius: '15px',
                                        background: msg.type === 'user' ? '#6366f1' : '#f8fafc',
                                        color: msg.type === 'user' ? 'white' : '#1e293b',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '5px' }}>
                                            <span style={{ fontSize: '12px', fontWeight: 700 }}>{msg.sender}</span>
                                            <span style={{ fontSize: '10px', opacity: 0.7 }}>{msg.time}</span>
                                        </div>
                                        <div style={{ fontSize: '14px', lineHeight: '1.5' }}>{msg.text}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '20px', borderTop: '1px solid #f1f5f9' }}>
                        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#6366f1' }}>
                                <Bot size={18} />
                                <span style={{ fontSize: '13px', fontWeight: 600 }}>Support AI suggest: "Ask for software version or logs"</span>
                            </div>
                            <button className="btn-text" style={{ fontSize: '12px' }}>Use Suggestion</button>
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <input
                                type="text"
                                placeholder="Write a reply..."
                                style={{ flex: 1, padding: '12px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' }}
                            />
                            <button className="btn-primary" style={{ padding: '10px 15px', borderRadius: '10px' }}><Send size={18} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="support-details-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h4 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>Ticket Info</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <InfoItem label="Status" value={ticket.status} color="#f59e0b" />
                        <InfoItem label="Priority" value={ticket.priority} color="#ef4444" />
                        <InfoItem label="Assigned To" value={ticket.assigned} />
                        <InfoItem label="Client" value={ticket.client} />
                        <InfoItem label="Project" value="Mobile ERP" />
                    </div>
                    <button className="btn-outline" style={{ width: '100%', marginTop: '20px', padding: '10px', fontSize: '13px' }}>Manage Ticket</button>
                </div>

                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h4 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>SLA Status</h4>
                    <div style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                            <span>Resolution Deadline</span>
                            <span style={{ color: '#ef4444' }}>4 hrs left</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px' }}>
                            <div style={{ width: '75%', height: '100%', background: '#f59e0b', borderRadius: '3px' }}></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
                        <Clock size={14} /> At risk of violation
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value, color }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: '13px', fontWeight: 600, color: color || '#1e293b' }}>{value}</span>
    </div>
);

const SupportInputField = ({ label, placeholder, disabled }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: disabled ? '#f8fafc' : 'white' }}
        />
    </div>
);

const SupportSelectField = ({ label, options }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{label}</label>
        <select style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const KnowledgeBaseSection = () => (
    <div className="animations-fade-in">
        <div className="portal-content-card kb-search-container" style={{ padding: '40px', textAlign: 'center', marginBottom: '30px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: 'white' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>How can we help you?</h2>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Search our knowledge base for instant answers to your questions.</p>
            <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                <input type="text" placeholder="Search articles, guides, FAQs..." style={{ width: '100%', padding: '15px 15px 15px 50px', borderRadius: '12px', border: 'none', fontSize: '16px', color: '#1e293b' }} />
            </div>
        </div>

        <div className="kb-categories-grid" style={{ gap: '20px', marginBottom: '30px' }}>
            <KBCategoryCard icon={<User size={24} />} title="Account & Profile" desc="Manage settings and preferences." count={12} />
            <KBCategoryCard icon={<FileText size={24} />} title="Billing & Invoices" desc="Payment methods and history." count={8} />
            <KBCategoryCard icon={<Settings size={24} />} title="Platform Features" desc="Comprehensive tool guides." count={24} />
            <KBCategoryCard icon={<LifeBuoy size={24} />} title="Troubleshooting" desc="Common technical solutions." count={15} />
        </div>

        <div className="portal-content-card" style={{ padding: '25px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Featured Articles</h3>
            <div className="kb-articles-grid" style={{ gap: '20px' }}>
                {kbArticles.map(article => (
                    <div key={article.id} style={{ display: 'flex', gap: '15px', padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9' }} className="hover-bg-light">

                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0f9ff', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BookOpen size={20} /></div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{article.title}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{article.category} • {article.views} views • {article.rating} <Star size={10} fill="#f59e0b" style={{ color: '#f59e0b' }} /></div>
                        </div>
                        <ChevronRight size={18} color="#94a3b8" />
                    </div>
                ))}
            </div>
            <button className="btn-text" style={{ width: '100%', marginTop: '20px', padding: '10px' }}>View All Articles</button>
        </div>
    </div>
);

const KBCategoryCard = ({ icon, title, desc, count }) => (
    <div className="portal-content-card hover-bg-light" style={{ padding: '20px', textAlign: 'center' }}>

        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8fafc', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}>{icon}</div>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '15px' }}>{title}</h4>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 10px 0' }}>{desc}</p>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#6366f1' }}>{count} Articles</span>
    </div>
);

const SupportPerformanceSection = () => (
    <div className="animations-fade-in">
        <div className="support-perf-grid" style={{ gap: '25px', marginBottom: '25px' }}>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0' }}>Tickets by Category</h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Technical', value: 45 },
                                    { name: 'Billing', value: 25 },
                                    { name: 'Account', value: 20 },
                                    { name: 'Project', value: 10 }
                                ]}
                                cx="50%" cy="50%"
                                innerRadius={60} outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                <Cell fill="#6366f1" />
                                <Cell fill="#10b981" />
                                <Cell fill="#f59e0b" />
                                <Cell fill="#ef4444" />
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0' }}>SLA Compliance (Weekly)</h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={[
                            { day: 'Mon', sla: 98 }, { day: 'Tue', sla: 95 }, { day: 'Wed', sla: 99 },
                            { day: 'Thu', sla: 97 }, { day: 'Fri', sla: 94 }, { day: 'Sat', sla: 100 }, { day: 'Sun', sla: 100 }
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} />
                            <YAxis domain={[90, 100]} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="sla" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '25px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Support Team Leaderboard</h3>
            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px' }}>Agent Name</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px' }}>Resolved Tickets</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px' }}>Avg Resolution Time</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px' }}>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: 'Alex Smith', resolved: 145, time: '2h 15m', rating: 4.9 },
                            { name: 'Maria Garcia', resolved: 132, time: '2h 45m', rating: 4.7 },
                            { name: 'David Kim', resolved: 118, time: '3h 10m', rating: 4.8 }
                        ].map((agent, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                                <td style={{ padding: '15px', fontWeight: 600 }}>{agent.name}</td>
                                <td style={{ padding: '15px' }}>{agent.resolved}</td>
                                <td style={{ padding: '15px' }}>{agent.time}</td>
                                <td style={{ padding: '15px' }}>{agent.rating} <Star size={12} fill="#f59e0b" style={{ color: '#f59e0b' }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default CustomerSupport;
