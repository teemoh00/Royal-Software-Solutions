import { useState } from 'react';
import {
    Users, UserPlus, Building2, Briefcase, FileText,
    MessageSquare, Search, Filter, Plus, ChevronRight,
    MoreVertical, Mail, Phone, MapPin, Globe, Tag,
    Download, Layout, PieChart as PieChartIcon, BarChart3,
    TrendingUp, Activity, CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend,
    BarChart, Bar
} from 'recharts';

// Dummy Data
const clientsData = [
    {
        id: 'CL-1001', name: 'Springfield Tech', company: 'Springfield Tech Solutions',
        industry: 'Technology', email: 'contact@springfield.com', phone: '+1 555-0101',
        manager: 'Alex Smith', projects: 3, balance: '$4,500', status: 'Active',
        location: 'Springfield', city: 'Springfield', country: 'USA'
    },
    {
        id: 'CL-1002', name: 'Globex Inc', company: 'Globex International',
        industry: 'Manufacturing', email: 'hank@globex.com', phone: '+1 555-0202',
        manager: 'Maria Garcia', projects: 1, balance: '$0', status: 'Active',
        location: 'Shelbyville', city: 'Shelbyville', country: 'USA'
    },
    {
        id: 'CL-1003', name: 'Mega-Mart', company: 'Mega-Mart Retail Group',
        industry: 'Retail', email: 'apu@megamart.com', phone: '+1 555-0303',
        manager: 'Alex Smith', projects: 0, balance: '$1,200', status: 'Active',
        location: 'Capital City', city: 'Capital City', country: 'USA'
    }
];

const dashboardStats = [
    { label: 'Total Clients', value: '1,284', trend: '+5%', icon: <Users size={20} />, color: '#6366f1' },
    { label: 'Active Clients', value: '1,150', trend: '+2%', icon: <CheckCircle2 size={20} />, color: '#10b981' },
    { label: 'New This Month', value: '42', trend: '+12%', icon: <UserPlus size={20} />, color: '#f59e0b' },
    { label: 'Active Projects', value: '86', trend: '+8%', icon: <Briefcase size={20} />, color: '#8b5cf6' },
    { label: 'Pending Invoices', value: '$24.5k', trend: '-3%', icon: <FileText size={20} />, color: '#ef4444' },
    { label: 'Support Tickets', value: '14', trend: '-20%', icon: <MessageSquare size={20} />, color: '#0ea5e9' },
];

const ClientManagement = () => {
    const [view, setView] = useState('dashboard'); // dashboard, list, profile, registration, communications, reports
    const [userRole, setUserRole] = useState('Admin'); // Admin, Staff
    const [activeClientId, setActiveClientId] = useState(null);

    return (
        <div className="client-main-container portal-module animations-fade-in">
            <style>{`
                .client-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
                .client-charts-grid { display: grid; grid-template-columns: 1.5fr 1fr; }
                .client-profile-grid { display: grid; grid-template-columns: 1.5fr 1fr; }
                .detail-items-grid { display: grid; grid-template-columns: 1fr 1fr; }
                .registration-form-grid { display: grid; grid-template-columns: 1fr 1fr; }
                .client-reports-grid { display: grid; grid-template-columns: 1fr 1fr; }
                .client-docs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

                @media (max-width: 1024px) {
                    .client-charts-grid, .client-profile-grid, .registration-form-grid, .client-reports-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .client-header-section {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 15px;
                    }
                    .client-sub-nav {
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
                    .client-sub-nav::-webkit-scrollbar { display: none; }
                    
                    .client-sub-nav button {
                        flex: 0 0 auto;
                        flex-direction: column;
                        padding: 8px 12px !important;
                        font-size: 10px !important;
                        background: transparent !important;
                        color: #64748b !important;
                        min-width: 70px;
                        gap: 2px !important;
                    }
                    .client-sub-nav button.active-client-btn {
                        color: #6366f1 !important;
                    }
                    .client-sub-nav button svg {
                        width: 20px !important;
                        height: 20px !important;
                    }
                    .client-main-container {
                        padding-bottom: 90px !important;
                    }
                    .client-stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .detail-items-grid {
                        grid-template-columns: 1fr;
                    }
                    .client-profile-header {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 20px;
                    }
                    .profile-tabs-container {
                        overflow-x: auto;
                        white-space: nowrap;
                        padding-bottom: 10px;
                    }
                }

                @media (max-width: 640px) {
                    .client-header-section h2 {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
            {/* Header */}
            <div className="client-header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>Client Management</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Overview and management of your company's client relationships.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        onClick={() => setView('registration')}
                        className="btn-primary"
                        style={{ padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <UserPlus size={18} /> Add New Client
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="client-sub-nav" style={{
                display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px',
                borderBottom: '1px solid #e2e8f0'
            }}>
                <ClientNavBtn icon={<Layout size={18} />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} className={view === 'dashboard' ? 'active-client-btn' : ''} />
                <ClientNavBtn icon={<Users size={18} />} label="Client List" active={view === 'list'} onClick={() => setView('list')} className={view === 'list' ? 'active-client-btn' : ''} />
                <ClientNavBtn icon={<MessageSquare size={18} />} label="Communications" active={view === 'communications'} onClick={() => setView('communications')} className={view === 'communications' ? 'active-client-btn' : ''} />
                <ClientNavBtn icon={<FileText size={18} />} label="Documents" active={view === 'documents'} onClick={() => setView('documents')} className={view === 'documents' ? 'active-client-btn' : ''} />
                <ClientNavBtn icon={<BarChart3 size={18} />} label="Reports" active={view === 'reports'} onClick={() => setView('reports')} className={view === 'reports' ? 'active-client-btn' : ''} />
            </div>

            {/* Dynamic View */}
            {view === 'dashboard' && <ClientDashboard stats={dashboardStats} />}
            {view === 'list' && <ClientListSection clients={clientsData} onViewProfile={(id) => { setActiveClientId(id); setView('profile'); }} />}
            {view === 'registration' && <ClientRegistrationForm onCancel={() => setView('dashboard')} />}
            {view === 'profile' && <ClientProfile client={clientsData.find(c => c.id === activeClientId)} onBack={() => setView('list')} />}
            {view === 'communications' && <CommunicationsManagementSection />}
            {view === 'documents' && <DocumentsManagementSection />}
            {view === 'reports' && <ClientReportsSection />}
        </div>
    );
};

// Sub-components
const ClientNavBtn = ({ icon, label, active, onClick, className }) => (
    <button onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px',
        border: 'none', background: active ? '#6366f1' : 'transparent',
        color: active ? 'white' : '#64748b', fontWeight: 600, fontSize: '14px',
        cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap'
    }} className={`${active ? '' : 'hover-bg-light'} ${className || ''}`}>
        {icon} {label}
    </button>
);

const ClientDashboard = ({ stats }) => (
    <div className="animations-fade-in">
        {/* Stats Grid */}
        <div className="client-stats-grid" style={{ gap: '20px', marginBottom: '30px' }}>
            {stats.map((stat, i) => (
                <div key={i} className="portal-content-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.icon}</div>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: stat.trend.startsWith('+') ? '#10b981' : '#ef4444', background: stat.trend.startsWith('+') ? '#ecfdf5' : '#fef2f2', padding: '2px 8px', borderRadius: '20px' }}>{stat.trend}</span>
                    </div>
                    <h4 style={{ margin: '15px 0 5px 0', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{stat.label}</h4>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b' }}>{stat.value}</div>
                </div>
            ))}
        </div>

        {/* Charts Row */}
        <div className="client-charts-grid" style={{ gap: '25px', marginBottom: '30px' }}>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Client Growth</h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <AreaChart data={[
                            { month: 'Jan', count: 1100 }, { month: 'Feb', count: 1150 }, { month: 'Mar', count: 1180 },
                            { month: 'Apr', count: 1220 }, { month: 'May', count: 1250 }, { month: 'Jun', count: 1284 }
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="rgba(99, 102, 241, 0.05)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>By Industry</h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <PieChart>
                            <Pie data={[
                                { name: 'Tech', value: 450 }, { name: 'Finance', value: 300 },
                                { name: 'Retail', value: 250 }, { name: 'Other', value: 284 }
                            ]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'].map((color, i) => <Cell key={i} fill={color} />)}
                            </Pie>
                            <Tooltip /><Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Activity Row */}
        <div className="portal-content-card" style={{ padding: '25px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Recent Client Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <ActivityItem icon={<UserPlus size={16} />} text="New client 'Springfield Tech' added to the system." time="2 hours ago." />
                <ActivityItem icon={<Briefcase size={16} />} text="New project 'Cloud Migration' created for Globex Inc." time="5 hours ago." />
                <ActivityItem icon={<FileText size={16} />} text="Invoice #INV-2026-042 generated for Mega-Mart." time="Yesterday." />
                <ActivityItem icon={<MessageSquare size={16} />} text="Support ticket #TKT-882 submitted by Springfield Tech." time="Yesterday." />
            </div>
        </div>
    </div>
);

const ActivityItem = ({ icon, text, time }) => (
    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '10px', borderRadius: '10px' }} className="hover-bg-light">
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{time}</div>
        </div>
    </div>
);

const ClientListSection = ({ clients, onViewProfile }) => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '20px' }}>
            <h3 style={{ margin: 0 }}>Client Directory</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ position: 'relative' }}><Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} /><input type="text" placeholder="Search clients..." style={{ padding: '10px 10px 10px 35px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', width: '250px' }} /></div>
                <button style={{ padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white' }}><Filter size={18} /></button>
                <button className="btn-outline" style={{ padding: '10px 15px', borderRadius: '10px', fontSize: '14px' }}><Download size={18} style={{ marginRight: '5px' }} /> Export</button>
            </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr style={{ borderBottom: '2px solid #f1f5f9' }}><th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Client</th><th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Contact</th><th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Manager</th><th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Projects</th><th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Balance</th><th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Status</th><th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Actions</th></tr></thead>
                <tbody>{clients.map((client) => (
                    <tr key={client.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                        <td style={{ padding: '15px' }}><div style={{ fontWeight: 600, fontSize: '14px' }}>{client.name}</div><div style={{ fontSize: '12px', color: '#94a3b8' }}>{client.id} • {client.industry}</div></td>
                        <td style={{ padding: '15px' }}><div style={{ fontSize: '14px' }}>{client.email}</div><div style={{ fontSize: '12px', color: '#94a3b8' }}>{client.phone}</div></td>
                        <td style={{ padding: '15px', fontSize: '14px' }}>{client.manager}</td><td style={{ padding: '15px', fontSize: '14px' }}><span style={{ fontWeight: 600 }}>{client.projects}</span> Active</td><td style={{ padding: '15px', fontWeight: 700, color: client.balance !== '$0' ? '#ef4444' : '#1e293b' }}>{client.balance}</td>
                        <td style={{ padding: '15px' }}><span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: '#ecfdf5', color: '#10b981' }}>{client.status}</span></td>
                        <td style={{ padding: '15px' }}><button onClick={() => onViewProfile(client.id)} className="btn-text" style={{ fontSize: '13px' }}>View Profile</button></td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    </div>
);

const ClientRegistrationForm = ({ onCancel }) => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h3 style={{ margin: 0 }}>Register New Client</h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Fill in the details below to add a new client to the portal.</p>
            </div>
            <button onClick={onCancel} className="btn-text" style={{ color: '#ef4444' }}>Cancel</button>
        </div>

        <form className="registration-form-grid" style={{ gap: '30px' }}>
            {/* Basic Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0, color: '#6366f1', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Building2 size={16} /> Basic Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <ClientInputField label="Client ID" placeholder="Auto-generated" disabled />
                    <ClientInputField label="Client Name" placeholder="e.g. John Doe" />
                </div>
                <ClientInputField label="Company Name" placeholder="e.g. Acme Corp" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <ClientSelectField label="Industry" options={['Technology', 'Finance', 'Retail', 'Healthcare', 'Other']} />
                    <ClientInputField label="Website" placeholder="https://" />
                </div>
            </div>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0, color: '#6366f1', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> Contact Information</h4>
                <ClientInputField label="Contact Person" placeholder="Name" />
                <ClientInputField label="Email Address" placeholder="email@company.com" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <ClientInputField label="Phone Number" placeholder="+1..." />
                    <ClientInputField label="Alternative Phone" placeholder="+1..." />
                </div>
            </div>

            {/* Address Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0, color: '#6366f1', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Address Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <ClientInputField label="Country" placeholder="e.g. USA" />
                    <ClientInputField label="City" placeholder="e.g. New York" />
                </div>
                <ClientInputField label="Postal Address" placeholder="Full address" />
            </div>

            {/* Account Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0, color: '#6366f1', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><UserPlus size={16} /> Account Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <ClientSelectField label="Account Manager" options={['Alex Smith', 'Maria Garcia', 'David Kim']} />
                    <ClientSelectField label="Category" options={['Corporate', 'Individual']} />
                </div>
                <ClientSelectField label="Client Status" options={['Active', 'Inactive', 'Suspended']} />
            </div>

            {/* Additional Info */}
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0, color: '#6366f1', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={16} /> Additional Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Notes</label>
                        <textarea style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', height: '100px', resize: 'none' }} placeholder="Internal notes about the client..."></textarea>
                    </div>
                    <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '8px' }}>Attachments</label>
                        <div style={{ border: '2px dashed #e2e8f0', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                            <Plus size={24} color="#94a3b8" style={{ marginBottom: '10px' }} />
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Click to upload file</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '15px', borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
                <button type="button" onClick={onCancel} className="btn-outline" style={{ padding: '12px 30px', borderRadius: '12px' }}>Discard</button>
                <button type="submit" className="btn-primary" style={{ padding: '12px 30px', borderRadius: '12px' }}>Save Client Data</button>
            </div>
        </form>
    </div>
);

const ClientInputField = ({ label, placeholder, disabled }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{label}</label>
        <input type="text" placeholder={placeholder} disabled={disabled} style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: disabled ? '#f8fafc' : 'white' }} />
    </div>
);

const ClientSelectField = ({ label, options }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{label}</label>
        <select style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const ClientProfile = ({ client, onBack }) => {
    const [activeSubView, setActiveSubView] = useState('overview'); // overview, projects, financials, tickets, activity

    if (!client) return null;

    return (
        <div className="animations-fade-in">
            <button onClick={onBack} className="btn-text" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to List
            </button>

            <div className="portal-content-card" style={{ padding: '30px', marginBottom: '25px' }}>
                <div className="client-profile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '15px', background: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800 }}>
                            {client.name.charAt(0)}
                        </div>
                        <div>
                            <h2 style={{ margin: 0 }}>{client.name}</h2>
                            <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>{client.company} • {client.industry}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn-outline" style={{ padding: '8px 15px', borderRadius: '10px' }}><Mail size={16} /></button>
                        <button className="btn-outline" style={{ padding: '8px 15px', borderRadius: '10px' }}><Phone size={16} /></button>
                        <button className="btn-primary" style={{ padding: '8px 15px', borderRadius: '10px' }}>Edit Profile</button>
                    </div>
                </div>

                <div className="profile-tabs-container" style={{ display: 'flex', gap: '25px', marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                    <ProfileTab label="Overview" active={activeSubView === 'overview'} onClick={() => setActiveSubView('overview')} />
                    <ProfileTab label="Projects" active={activeSubView === 'projects'} onClick={() => setActiveSubView('projects')} />
                    <ProfileTab label="Financials" active={activeSubView === 'financials'} onClick={() => setActiveSubView('financials')} />
                    <ProfileTab label="Support Tickets" active={activeSubView === 'tickets'} onClick={() => setActiveSubView('tickets')} />
                    <ProfileTab label="Activity Timeline" active={activeSubView === 'activity'} onClick={() => setActiveSubView('activity')} />
                </div>
            </div>

            {activeSubView === 'overview' && <ProfileOverview client={client} />}
            {activeSubView === 'projects' && <ProfileProjects />}
            {activeSubView === 'financials' && <ProfileFinancials client={client} />}
            {activeSubView === 'tickets' && <ProfileTickets />}
            {activeSubView === 'activity' && <ProfileActivity />}
        </div>
    );
};

const ProfileTab = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{
        background: 'none', border: 'none', padding: '10px 0', fontSize: '14px', fontWeight: 600,
        color: active ? '#6366f1' : '#64748b', cursor: 'pointer', position: 'relative'
    }}>
        {label}
        {active && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#6366f1' }}></div>}
    </button>
);

const ProfileOverview = ({ client }) => (
    <div className="animations-fade-in client-profile-grid" style={{ gap: '25px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0' }}>Client Details</h3>
                <div className="detail-items-grid" style={{ gap: '20px' }}>
                    <DetailItem label="Account Manager" value={client.manager} icon={<Briefcase size={16} />} />
                    <DetailItem label="Status" value={client.status} icon={<CheckCircle2 size={16} />} color="#10b981" />
                    <DetailItem label="Email" value={client.email} icon={<Mail size={16} />} />
                    <DetailItem label="Phone" value={client.phone} icon={<Phone size={16} />} />
                    <DetailItem label="Address" value={`${client.city}, ${client.country}`} icon={<MapPin size={16} />} />
                    <DetailItem label="Website" value="www.corp.com" icon={<Globe size={16} />} />
                </div>
            </div>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0' }}>Internal Notes</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                    Client prefers communication via email for technical updates. Highly interested in expanding current cloud infrastructure by Q3.
                    Last meeting was very positive regarding the new ERP integration proposal.
                </p>
            </div>
        </div>
        <div className="portal-content-card" style={{ padding: '25px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Communication History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <CommItem type="Call" date="March 05, 2026" note="Quick follow-up on project status." />
                <CommItem type="Meeting" date="Feb 28, 2026" note="Quarterly review and future planning." />
                <CommItem type="Email" date="Feb 20, 2026" note="Sent detailed proposal for module expansion." />
            </div>
            <button className="btn-outline" style={{ width: '100%', marginTop: '20px', padding: '10px' }}>Log New Interaction</button>
        </div>
    </div>
);

const DetailItem = ({ label, value, icon, color }) => (
    <div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: 600 }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: color || '#1e293b' }}>
            <span style={{ color: '#94a3b8' }}>{icon}</span> {value}
        </div>
    </div>
);

const CommItem = ({ type, date, note }) => (
    <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', background: '#f8fafc' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
            {type === 'Call' ? <Phone size={14} /> : type === 'Meeting' ? <Users size={14} /> : <Mail size={14} />}
        </div>
        <div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>{type} - <span style={{ color: '#94a3b8', fontWeight: 500 }}>{date}</span></div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>{note}</div>
        </div>
    </div>
);

const ProfileProjects = () => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <h3 style={{ margin: '0 0 20px 0' }}>Assigned Projects</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead><tr style={{ borderBottom: '2px solid #f1f5f9' }}><th style={{ padding: '15px', color: '#64748b', fontSize: '13px' }}>Project Name</th><th style={{ padding: '15px', color: '#64748b', fontSize: '13px' }}>Status</th><th style={{ padding: '15px', color: '#64748b', fontSize: '13px' }}>Deadline</th><th style={{ padding: '15px', color: '#64748b', fontSize: '13px' }}>Progress</th></tr></thead>
            <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px', fontWeight: 600 }}>Cloud Infrastructure Upgrade</td>
                    <td style={{ padding: '15px' }}><span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: '#eff6ff', color: '#3b82f6' }}>In Progress</span></td>
                    <td style={{ padding: '15px', color: '#64748b' }}>Dec 15, 2026</td>
                    <td style={{ padding: '15px' }}><div style={{ width: '100px', height: '6px', background: '#f1f5f9', borderRadius: '3px' }}><div style={{ width: '65%', height: '100%', background: '#6366f1', borderRadius: '3px' }}></div></div></td>
                </tr>
            </tbody>
        </table>
    </div>
);

const ProfileFinancials = ({ client }) => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <h3>Billing & Invoices</h3>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Outstanding Balance</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: client.balance !== '$0' ? '#ef4444' : '#10b981' }}>{client.balance}</div>
            </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead><tr style={{ borderBottom: '2px solid #f1f5f9' }}><th style={{ padding: '15px' }}>Invoice #</th><th style={{ padding: '15px' }}>Date</th><th style={{ padding: '15px' }}>Amount</th><th style={{ padding: '15px' }}>Status</th><th style={{ padding: '15px' }}>Actions</th></tr></thead>
            <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px', fontWeight: 600 }}>INV-2026-088</td><td style={{ padding: '15px' }}>May 01, 2026</td><td style={{ padding: '15px', fontWeight: 700 }}>$1,200</td>
                    <td style={{ padding: '15px' }}><span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: '#fef2f2', color: '#ef4444' }}>Unpaid</span></td>
                    <td style={{ padding: '15px' }}><button className="btn-text">Download</button></td>
                </tr>
            </tbody>
        </table>
    </div>
);

const ProfileTickets = () => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <h3 style={{ margin: '0 0 20px 0' }}>Support History</h3>
        <p style={{ color: '#64748b', textAlign: 'center', padding: '40px 0' }}>No active support tickets for this client.</p>
    </div>
);

const ProfileActivity = () => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <h3 style={{ margin: '0 0 20px 0' }}>Activity Timeline</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ActivityLineItem date="May 10, 2026" text="Invoice generated for May services." />
            <ActivityLineItem date="May 05, 2026" text="Phone call logged by Alex Smith." />
            <ActivityLineItem date="April 20, 2026" text="Project 'Cloud Infrastructure' milestones updated." />
        </div>
    </div>
);

const ActivityLineItem = ({ date, text }) => (
    <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1', marginTop: '5px' }}></div>
            <div style={{ flex: 1, width: '2px', background: '#e2e8f0', margin: '5px 0' }}></div>
        </div>
        <div style={{ paddingBottom: '20px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{date}</div>
            <div style={{ fontSize: '14px', color: '#1e293b', marginTop: '2px' }}>{text}</div>
        </div>
    </div>
);

const CommunicationsManagementSection = () => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3>Client Communications</h3>
            <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px' }}>Log New Interaction</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
                { type: 'Email', client: 'Springfield Tech', person: 'John Peterson', date: '2026-03-08', note: 'Project update sent.' },
                { type: 'Call', client: 'Globex Inc', person: 'Hank Scorpio', date: '2026-03-07', note: 'Discussed new requirements.' },
                { type: 'Meeting', client: 'Mega-Mart', person: 'Apu N.', date: '2026-03-05', note: 'Quarterly sales review.' }
            ].map((comm, i) => (
                <div key={i} style={{ display: 'flex', gap: '15px', padding: '15px', background: '#f8fafc', borderRadius: '12px' }}>
                    <div style={{ padding: '10px', borderRadius: '10px', background: 'white', border: '1px solid #e2e8f0', color: '#6366f1' }}>
                        {comm.type === 'Call' ? <Phone size={18} /> : comm.type === 'Meeting' ? <Users size={18} /> : <Mail size={18} />}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 700 }}>{comm.type} with {comm.client}</span>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{comm.date}</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b', margin: '5px 0' }}>{comm.person}: {comm.note}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const DocumentsManagementSection = () => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3>Document Repository</h3>
            <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px' }}><Plus size={18} style={{ marginRight: '8px' }} /> Upload Document</button>
        </div>
        <div className="client-docs-grid" style={{ gap: '15px' }}>
            {[
                { name: 'Service_Agreement_v1.pdf', client: 'Springfield Tech', size: '2.4 MB' },
                { name: 'Proposal_Globex.docx', client: 'Globex Inc', size: '1.1 MB' },
                { name: 'Tax_Exemption_Form.pdf', client: 'Mega-Mart', size: '450 KB' }
            ].map((doc, i) => (
                <div key={i} style={{ padding: '20px', border: '1px solid #f1f5f9', borderRadius: '15px', textAlign: 'center' }} className="hover-bg-light">
                    <div style={{ width: '40px', height: '40px', background: '#eff6ff', color: '#6366f1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}><FileText size={20} /></div>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>{doc.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px' }}>{doc.client} • {doc.size}</div>
                    <button className="btn-text" style={{ fontSize: '12px' }}>Download</button>
                </div>
            ))}
        </div>
    </div>
);

const ClientReportsSection = () => (
    <div className="animations-fade-in">
        <div className="client-reports-grid" style={{ gap: '25px', marginBottom: '25px' }}>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0' }}>Client Distribution by Industry</h3>
                <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={[{ name: 'Tech', count: 120 }, { name: 'Finance', count: 80 }, { name: 'Retail', count: 95 }, { name: 'Healthcare', count: 45 }]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#6366f1" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0' }}>Available Reports</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ReportDownloadRow title="Client List (Full)" format="XLSX" />
                    <ReportDownloadRow title="Industry Analysis" format="PDF" />
                    <ReportDownloadRow title="Revenue per Client" format="CSV" />
                    <ReportDownloadRow title="Active Projects Status" format="PDF" />
                </div>
            </div>
        </div>
    </div>
);

const ReportDownloadRow = ({ title, format }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f8fafc', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FileText size={18} color="#6366f1" /> <span style={{ fontSize: '14px', fontWeight: 600 }}>{title}</span></div>
        <button style={{ padding: '5px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontSize: '12px', fontWeight: 700 }}>Download {format}</button>
    </div>
);

export default ClientManagement;

