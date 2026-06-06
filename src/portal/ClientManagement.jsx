import { useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';
import {
    Users, UserPlus, Building2, Briefcase, FileText,
    MessageSquare, Search, Filter, Plus, ChevronRight,
    MoreVertical, Mail, Phone, MapPin, Globe, Tag,
    Download, Layout, PieChart as PieChartIcon, BarChart3,
    TrendingUp, Activity, CheckCircle2, AlertCircle, Clock, DollarSign, ArrowUpDown,
    Trash2, Eye, Upload, X, ExternalLink
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

const TEMPLATES = [
    { id: 'custom', label: 'Custom Message', text: '' },
    { id: 'payment', label: 'Outstanding Balance Reminder', text: 'Hello {client_name}, this is a friendly reminder that you have an outstanding balance of KES {outstanding_balance}. Please make payment to avoid service interruption.' },
    { id: 'welcome', label: 'Welcome Acknowledgment', text: 'Hi {client_name}, welcome to Royal Softwares! We are thrilled to have you as a client. Let us know if you need any assistance.' },
    { id: 'invoice', label: 'Invoice Issuance Alert', text: 'Dear {client_name}, a new invoice has been issued for your account. The outstanding balance is KES {outstanding_balance}. Thank you for your business!' },
    { id: 'meeting', label: 'Meeting Follow-Up', text: 'Hi {client_name}, thank you for taking the time to meet with us. As discussed, we will proceed with the next steps of your project.' }
];

const ClientManagement = () => {
    const [view, setView] = useState('dashboard'); // dashboard, list, profile, registration, edit, communications, reports
    const [userRole, setUserRole] = useState('Admin'); // Admin, Staff
    const [activeClientId, setActiveClientId] = useState(null);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
    const [formData, setFormData] = useState({
        client_type: 'CORPORATE',
        name: '',
        abbreviation: '',
        contact_person_name: '',
        contact_person_email: '',
        contact_person_phone: '',
        client_category: '',
        client_company_name: '',
        industry: '',
        manager: '',
        email: '',
        phone: '',
        address: '',
        country: '', // ID
        state: '',   // ID
        city: '',    // ID
        tax_id: '',
        notes: '',
        credit_limit: '0.00',
        is_active: true,
        logo: null
    });
    
    // Location Data
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);

    const loadClients = async () => {
        setLoading(true);
        try {
            const data = await apiClient.clients.list();
            setClients(data);
            setError(null);
        } catch (err) {
            console.error("Failed to load clients:", err);
            setError("Failed to load clients from the database.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClients();
        apiClient.utility.getCountries().then(data => setCountries(data)).catch(console.error);
    }, []);

    useEffect(() => {
        if (formData.country) {
            apiClient.utility.getRegions(formData.country).then(data => setRegions(data)).catch(console.error);
        } else {
            setRegions([]);
        }
    }, [formData.country]);

    useEffect(() => {
        if (formData.state) {
            apiClient.utility.getCities(formData.state).then(data => setCities(data)).catch(console.error);
        } else {
            setCities([]);
        }
    }, [formData.state]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: type === 'checkbox' ? checked : value };
            // Reset dependent location fields if parent changes
            if (name === 'country') {
                newData.state = '';
                newData.city = '';
            }
            if (name === 'state') {
                newData.city = '';
            }
            return newData;
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const submitData = new FormData();
            Object.entries(formData).forEach(([key, val]) => {
                if (val !== null && val !== undefined) {
                    submitData.append(key, val);
                }
            });

            if (view === 'edit') {
                const outstanding_balance = clients.find(c => c.id === activeClientId)?.outstanding_balance || 0;
                submitData.append('outstanding_balance', outstanding_balance);
                const updated = await apiClient.clients.update(activeClientId, submitData);
                setClients(prev => prev.map(c => c.id === activeClientId ? updated : c));
                setView('profile');
                showToast("Client details updated successfully!", "success");
            } else {
                const newClient = await apiClient.clients.create(submitData);
                setClients(prev => [...prev, newClient]);
                setView('list');
                showToast("Client registered successfully!", "success");
            }
            setError(null);
        } catch (err) {
            console.error("Failed to save client:", err);
            setError(err.message || "Failed to save client.");
            showToast(err.message || "Failed to save client.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClient = async (id) => {
        if (!window.confirm("Are you sure you want to delete this client?")) return;
        setLoading(true);
        try {
            await apiClient.clients.delete(id);
            setClients(prev => prev.filter(c => c.id !== id));
            setView('list');
            setError(null);
            showToast("Client deleted successfully!", "success");
        } catch (err) {
            console.error("Failed to delete client:", err);
            setError("Failed to delete client.");
            showToast("Failed to delete client.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (client) => {
        setFormData({
            client_type: client.client_type || 'CORPORATE',
            name: client.name || '',
            abbreviation: client.abbreviation || '',
            contact_person_name: client.contact_person_name || '',
            contact_person_email: client.contact_person_email || '',
            contact_person_phone: client.contact_person_phone || '',
            client_category: client.client_category || '',
            client_company_name: client.client_company_name || '',
            industry: client.industry || '',
            manager: client.manager || '',
            email: client.email || '',
            phone: client.phone || '',
            address: client.address || '',
            country: client.country || '',
            state: client.state || '',
            city: client.city || '',
            tax_id: client.tax_id || '',
            notes: client.notes || '',
            credit_limit: client.credit_limit || '0.00',
            is_active: client.is_active !== false,
            logo: null
        });
        setView('edit');
    };

    const handleAddNewClick = () => {
        setFormData({
            client_type: 'CORPORATE',
            name: '',
            abbreviation: '',
            contact_person_name: '',
            contact_person_email: '',
            contact_person_phone: '',
            client_category: '',
            client_company_name: '',
            industry: '',
            manager: '',
            email: '',
            phone: '',
            address: '',
            country: '',
            state: '',
            city: '',
            tax_id: '',
            notes: '',
            credit_limit: '0.00',
            is_active: true,
            logo: null
        });
        setView('registration');
    };

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

                .client-table-row td {
                    transition: all 0.2s ease;
                    background: #ffffff;
                    border-top: 1px solid #f1f5f9;
                    border-bottom: 1px solid #f1f5f9;
                    padding: 16px 15px !important;
                    vertical-align: middle;
                }
                .client-table-row td:first-child {
                    border-left: 1px solid #f1f5f9;
                    border-top-left-radius: 12px;
                    border-bottom-left-radius: 12px;
                }
                .client-table-row td:last-child {
                    border-right: 1px solid #f1f5f9;
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                }
                .client-table-row:hover td {
                    background: #fafcff;
                    border-color: #e2e8f0;
                }
                .client-table-row:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
                }
                .sort-header {
                    cursor: pointer;
                    user-select: none;
                    transition: color 0.2s ease;
                }
                .sort-header:hover {
                    color: #6366f1 !important;
                }

                .client-view-btn {
                    font-size: 13px;
                    padding: 8px 16px;
                    border-radius: 8px;
                    background: rgba(99, 102, 241, 0.08);
                    border: 1px solid rgba(99, 102, 241, 0.15);
                    color: #6366f1;
                    font-weight: 600;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    outline: none;
                }
                .client-view-btn:hover {
                    background: #6366f1;
                    color: #ffffff;
                    border-color: #6366f1;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
                }

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
                        onClick={handleAddNewClick}
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

            {/* Loading & Error Indicators */}
            {loading && <div style={{ padding: '10px', background: '#eff6ff', color: '#1e40af', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>Loading client database...</div>}
            {error && <div style={{ padding: '10px', background: '#fef2f2', color: '#991b1b', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

            {/* Dynamic View */}
            {view === 'dashboard' && <ClientDashboard clients={clients} />}
            {view === 'list' && <ClientListSection clients={clients} onViewProfile={(id) => { setActiveClientId(id); setView('profile'); }} />}
            {(view === 'registration' || view === 'edit') && (
                <ClientRegistrationForm 
                    formData={formData} 
                    isEdit={view === 'edit'} 
                    onChange={handleInputChange} 
                    onSubmit={handleFormSubmit} 
                    onCancel={() => setView(view === 'edit' ? 'profile' : 'list')} 
                    countries={countries}
                    regions={regions}
                    cities={cities}
                />
            )}
            {view === 'profile' && (
                <ClientProfile 
                    client={clients.find(c => c.id === activeClientId)} 
                    onBack={() => setView('list')} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteClient} 
                    showToast={showToast}
                />
            )}
            {view === 'communications' && <CommunicationsManagementSection clients={clients} showToast={showToast} />}
            {view === 'documents' && <DocumentsManagementSection clients={clients} showToast={showToast} userRole={userRole} />}
            {view === 'reports' && <ClientReportsSection />}

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
                    {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
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

const ClientDashboard = ({ clients }) => {
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.is_active !== false).length;
    const outstandingDebt = clients.reduce((sum, c) => sum + parseFloat(c.outstanding_debt || 0), 0);
    
    const stats = [
        { label: 'Total Clients', value: totalClients.toString(), trend: 'Sync', icon: <Users size={20} />, color: '#6366f1' },
        { label: 'Active Clients', value: activeClients.toString(), trend: 'Active', icon: <CheckCircle2 size={20} />, color: '#10b981' },
        { label: 'Outstanding Balance', value: `KES ${outstandingDebt.toLocaleString()}`, trend: 'Due', icon: <FileText size={20} />, color: '#ef4444' },
        { label: 'Client Base Growth', value: `+${totalClients}`, trend: 'Stable', icon: <TrendingUp size={20} />, color: '#8b5cf6' }
    ];

    // Industries count
    const industries = {};
    clients.forEach(c => {
        const ind = c.industry || 'General';
        industries[ind] = (industries[ind] || 0) + 1;
    });
    const pieData = Object.keys(industries).map(name => ({ name, value: industries[name] }));
    const finalPieData = pieData.length > 0 ? pieData : [
        { name: 'Corporate', value: activeClients },
        { name: 'Individual', value: totalClients - activeClients || 1 }
    ];

    return (
        <div className="animations-fade-in">
            {/* Stats Grid */}
            <div className="client-stats-grid" style={{ gap: '20px', marginBottom: '30px' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="portal-content-card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.icon}</div>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', background: '#ecfdf5', padding: '2px 8px', borderRadius: '20px' }}>{stat.trend}</span>
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
                                { month: 'Jan', count: Math.max(0, totalClients - 4) }, 
                                { month: 'Feb', count: Math.max(0, totalClients - 3) }, 
                                { month: 'Mar', count: Math.max(0, totalClients - 2) },
                                { month: 'Apr', count: Math.max(0, totalClients - 1) }, 
                                { month: 'May', count: totalClients }
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
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>By Category</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <PieChart>
                                <Pie data={finalPieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
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
                    {clients.slice(0, 3).map((client, idx) => (
                        <ActivityItem key={idx} icon={<UserPlus size={16} />} text={`Client '${client.name}' sync check status active.`} time="Recently updated." />
                    ))}
                    {clients.length === 0 && <div style={{ color: '#64748b', fontSize: '14px' }}>No client activities logged yet.</div>}
                </div>
            </div>
        </div>
    );
};

const ActivityItem = ({ icon, text, time }) => (
    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '10px', borderRadius: '10px' }} className="hover-bg-light">
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{time}</div>
        </div>
    </div>
);

const getAvatarStyle = (name) => {
    const colors = [
        { bg: '#eff6ff', text: '#3b82f6' }, // Blue
        { bg: '#ecfdf5', text: '#10b981' }, // Green
        { bg: '#fef3c7', text: '#d97706' }, // Orange/Yellow
        { bg: '#fef2f2', text: '#ef4444' }, // Red
        { bg: '#f5f3ff', text: '#8b5cf6' }, // Purple
        { bg: '#f0fdfa', text: '#0d9488' }, // Teal
        { bg: '#fdf2f8', text: '#db2777' }  // Pink
    ];
    const charCodeSum = [...(name || '')].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
};

const getAbbreviation = (name) => {
    if (!name) return 'CL';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

const ClientListSection = ({ clients, onViewProfile }) => {
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedClients = [...clients].sort((a, b) => {
        if (!sortConfig.key) return 0;
        
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        // Handle string lowercase comparison
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();

        // Handle numeric conversion
        if (sortConfig.key === 'outstanding_balance' || sortConfig.key === 'projects_count') {
            aVal = parseFloat(aVal || 0);
            bVal = parseFloat(bVal || 0);
        }

        if (aVal < bVal) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aVal > bVal) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filtered = sortedClients.filter(c => 
        (c.name || '').toLowerCase().includes(search.toLowerCase()) || 
        (c.email || '').toLowerCase().includes(search.toLowerCase()) || 
        (c.phone || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.client_company_name || '').toLowerCase().includes(search.toLowerCase())
    );

    const SortHeader = ({ label, sortKey }) => {
        const isSorted = sortConfig.key === sortKey;
        return (
            <th 
                onClick={() => handleSort(sortKey)} 
                className="sort-header"
                style={{ 
                    padding: '12px 15px', 
                    color: isSorted ? '#6366f1' : '#64748b', 
                    fontSize: '13px', 
                    fontWeight: 600,
                    textAlign: 'left'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {label}
                    <ArrowUpDown size={13} style={{ opacity: isSorted ? 1 : 0.4 }} />
                </div>
            </th>
        );
    };

    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px', background: 'transparent', border: 'none', boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '20px', padding: '0 5px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>Client Directory</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
                        <input 
                            type="text" 
                            placeholder="Search clients..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ padding: '10px 10px 10px 35px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', width: '250px', background: '#ffffff' }} 
                        />
                    </div>
                    <button style={{ padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }}><Filter size={18} /></button>
                </div>
            </div>
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ color: '#64748b' }}>
                            <SortHeader label="Client" sortKey="name" />
                            <SortHeader label="Contact" sortKey="email" />
                            <SortHeader label="Manager" sortKey="manager" />
                            <SortHeader label="Projects" sortKey="projects_count" />
                            <SortHeader label="Balance" sortKey="outstanding_balance" />
                            <SortHeader label="Status" sortKey="is_active" />
                            <th style={{ padding: '12px 15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((client) => {
                            const avatar = getAvatarStyle(client.name);
                            return (
                                <tr key={client.id} className="client-table-row">
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                            {client.logo ? (
                                                <img src={client.logo} alt={client.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                                            ) : (
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: avatar.bg, color: avatar.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800 }}>
                                                    {client.abbreviation ? client.abbreviation : getAbbreviation(client.name)}
                                                </div>
                                            )}
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    {client.name}
                                                    {client.client_type === 'CORPORATE' && <span style={{ fontSize: '10px', padding: '2px 6px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '10px', fontWeight: 800 }}>Corp</span>}
                                                </div>
                                                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                                                    {client.client_category || 'General'} • ID: {client.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>{client.email || 'N/A'}</div>
                                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{client.phone || 'N/A'}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>{client.manager || 'Unassigned'}</div>
                                    </td>
                                    <td>
                                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>{client.projects_count || 0}</span>
                                        <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '4px' }}>Active</span>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '14px', fontWeight: 800, color: parseFloat(client.outstanding_balance || 0) > 0 ? '#ef4444' : '#10b981' }}>
                                            KES {parseFloat(client.outstanding_balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ 
                                            padding: '6px 14px', 
                                            borderRadius: '8px', 
                                            fontSize: '12px', 
                                            fontWeight: 700, 
                                            background: '#ffffff', 
                                            border: client.is_active !== false ? '1px solid #10b98135' : '1px solid #ef444435',
                                            color: client.is_active !== false ? '#10b981' : '#ef4444',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: client.is_active !== false ? '#10b981' : '#ef4444' }}></span>
                                            Status: {client.is_active !== false ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => onViewProfile(client.id)} 
                                            className="client-view-btn"
                                        >
                                            View Profile
                                            <ChevronRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#64748b', background: '#ffffff', borderRadius: '12px', border: '1px solid #f1f5f9' }}>No clients found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ClientRegistrationForm = ({ formData, isEdit, onChange, onSubmit, onCancel, countries = [], regions = [], cities = [] }) => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h3 style={{ margin: 0 }}>{isEdit ? 'Edit Client Details' : 'Register New Client'}</h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Fill in the details below to save client data in the database.</p>
            </div>
            <button onClick={onCancel} className="btn-text" style={{ color: '#ef4444' }}>Cancel</button>
        </div>

        <form onSubmit={onSubmit} className="registration-form-grid" style={{ gap: '30px' }}>
            {/* Basic Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0, color: '#6366f1', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Building2 size={16} /> Basic Information</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Client Type</label>
                        <select name="client_type" value={formData.client_type || 'CORPORATE'} onChange={onChange} style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}>
                            <option value="CORPORATE">Corporate</option>
                            <option value="INDIVIDUAL">Individual</option>
                        </select>
                    </div>
                    <ClientInputField label={formData.client_type === 'CORPORATE' ? "Corporate Name" : "Client Name"} name="name" value={formData.name} onChange={onChange} placeholder={formData.client_type === 'CORPORATE' ? "e.g. Nakuru Mobiles" : "e.g. John Doe"} required />
                </div>

                {formData.client_type === 'CORPORATE' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <ClientInputField label="Abbreviation" name="abbreviation" value={formData.abbreviation} onChange={onChange} placeholder="e.g. NM" />
                        <ClientInputField label="Contact Person Name" name="contact_person_name" value={formData.contact_person_name} onChange={onChange} placeholder="e.g. Jane Smith" />
                        <ClientInputField label="Contact Person Email" name="contact_person_email" value={formData.contact_person_email} onChange={onChange} placeholder="e.g. jane@company.com" type="email" />
                        <ClientInputField label="Contact Person Phone" name="contact_person_phone" value={formData.contact_person_phone} onChange={onChange} placeholder="e.g. +254 700 000 000" />
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                    <ClientInputField label="Client Category" name="client_category" value={formData.client_category} onChange={onChange} placeholder="e.g. VIP, Standard" />
                    <ClientInputField label="Industry" name="industry" value={formData.industry} onChange={onChange} placeholder="e.g. Technology" />
                    <ClientInputField label="Account Manager" name="manager" value={formData.manager} onChange={onChange} placeholder="e.g. Alex Smith" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <ClientInputField label="Tax ID / PIN" name="tax_id" value={formData.tax_id} onChange={onChange} placeholder="e.g. PIN12345" />
                    <ClientInputField label="Credit Limit" name="credit_limit" value={formData.credit_limit} onChange={onChange} placeholder="0.00" type="number" />
                </div>
            </div>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0, color: '#6366f1', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> Contact Information</h4>
                <ClientInputField label="Email Address" name="email" value={formData.email} onChange={onChange} placeholder="email@company.com" type="email" />
                <ClientInputField label="Phone Number" name="phone" value={formData.phone} onChange={onChange} placeholder="+254 700 000 000" />
            </div>

            {/* Address Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0, color: '#6366f1', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Address Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Country</label>
                        <select name="country" value={formData.country || ''} onChange={onChange} style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}>
                            <option value="">Select Country</option>
                            {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>State / Region</label>
                        <select name="state" value={formData.state || ''} onChange={onChange} disabled={!formData.country} style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: !formData.country ? '#f8fafc' : 'white' }}>
                            <option value="">Select Region</option>
                            {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>City / Town</label>
                        <select name="city" value={formData.city || ''} onChange={onChange} disabled={!formData.state} style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: !formData.state ? '#f8fafc' : 'white' }}>
                            <option value="">Select City</option>
                            {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>
                <ClientInputField label="Postal/Physical Address" name="address" value={formData.address} onChange={onChange} placeholder="Full address" />
            </div>

            {/* Account Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0, color: '#6366f1', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><UserPlus size={16} /> Account Status</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Account Status</label>
                    <select 
                        name="is_active" 
                        value={formData.is_active ? "true" : "false"} 
                        onChange={(e) => onChange({ target: { name: 'is_active', value: e.target.value === 'true' } })}
                        style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Client Logo</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => onChange({ target: { name: 'logo', value: e.target.files[0] } })}
                        style={{ fontSize: '14px' }}
                    />
                </div>
            </div>

            {/* Additional Info */}
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0, color: '#6366f1', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={16} /> Notes</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={onChange} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', height: '100px', resize: 'none' }} placeholder="Internal notes about the client..."></textarea>
                </div>
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '15px', borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
                <button type="button" onClick={onCancel} className="btn-outline" style={{ padding: '12px 30px', borderRadius: '12px' }}>Discard</button>
                <button type="submit" className="btn-primary" style={{ padding: '12px 30px', borderRadius: '12px' }}>{isEdit ? 'Save Changes' : 'Save Client Data'}</button>
            </div>
        </form>
    </div>
);

const ClientInputField = ({ label, placeholder, disabled, name, value, onChange, type = "text", required = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{label}</label>
        <input 
            type={type} 
            placeholder={placeholder} 
            disabled={disabled} 
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: disabled ? '#f8fafc' : 'white' }} 
        />
    </div>
);

const ClientSelectField = ({ label, options, name, value, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{label}</label>
        <select name={name} value={value} onChange={onChange} style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const ClientProfile = ({ client, onBack, onEdit, onDelete, showToast }) => {
    const [activeSubView, setActiveSubView] = useState('overview'); // overview, projects, financials, tickets, activity
    const [logs, setLogs] = useState([]);
    const [logsLoading, setLogsLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [payments, setPayments] = useState([]);
    const [financialsLoading, setFinancialsLoading] = useState(false);

    const loadLogs = async () => {
        if (!client) return;
        setLogsLoading(true);
        try {
            const data = await apiClient.communications.list(client.id);
            setLogs(data);
        } catch (err) {
            console.error("Failed to load logs:", err);
        } finally {
            setLogsLoading(false);
        }
    };

    const loadFinancials = async () => {
        if (!client) return;
        setFinancialsLoading(true);
        try {
            // Load all invoices
            const allInvoices = await apiClient.accounting.invoices.list();
            const clientInvoices = (allInvoices || []).filter(inv => inv.client === client.id);
            setInvoices(clientInvoices);
            
            // Load all payments
            const allPayments = await apiClient.accounting.payments.list();
            const invoiceIds = clientInvoices.map(inv => inv.id);
            const clientPayments = (allPayments || []).filter(pmt => invoiceIds.includes(pmt.invoice)).map(pmt => {
                const associatedInvoice = clientInvoices.find(inv => inv.id === pmt.invoice);
                return {
                    ...pmt,
                    invoice_number: associatedInvoice ? associatedInvoice.invoice_number : 'N/A'
                };
            });
            setPayments(clientPayments);
        } catch (err) {
            console.error("Failed to load client financials:", err);
        } finally {
            setFinancialsLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
        if (activeSubView === 'financials') {
            loadFinancials();
        }
    }, [client?.id, activeSubView]);

    if (!client) return null;

    return (
        <div className="animations-fade-in">
            <button onClick={onBack} className="btn-text" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to List
            </button>

            <div className="portal-content-card" style={{ padding: '30px', marginBottom: '25px' }}>
                <div className="client-profile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        {client.logo ? (
                            <img src={client.logo} alt={client.name} style={{ width: '64px', height: '64px', borderRadius: '15px', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                        ) : (
                            <div style={{ width: '64px', height: '64px', borderRadius: '15px', background: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800 }}>
                                {(client.name || 'C').charAt(0)}
                            </div>
                        )}
                        <div>
                            <h2 style={{ margin: 0 }}>{client.name}</h2>
                            <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Outstanding: KES {parseFloat(client.outstanding_balance || client.outstanding_debt || 0).toLocaleString()}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => onEdit(client)} className="btn-primary" style={{ padding: '8px 15px', borderRadius: '10px' }}>Edit Profile</button>
                        <button onClick={() => onDelete(client.id)} className="btn-outline" style={{ padding: '8px 15px', borderRadius: '10px', borderColor: '#ef4444', color: '#ef4444' }}>Delete Client</button>
                    </div>
                </div>

                <div className="profile-tabs-container" style={{ display: 'flex', gap: '25px', marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                    <ProfileTab label="Overview" active={activeSubView === 'overview'} onClick={() => setActiveSubView('overview')} />
                    <ProfileTab label="Projects" active={activeSubView === 'projects'} onClick={() => setActiveSubView('projects')} />
                    <ProfileTab label="Financials" active={activeSubView === 'financials'} onClick={() => setActiveSubView('financials')} />
                    <ProfileTab label="Documents" active={activeSubView === 'documents'} onClick={() => setActiveSubView('documents')} />
                    <ProfileTab label="Support Tickets" active={activeSubView === 'tickets'} onClick={() => setActiveSubView('tickets')} />
                    <ProfileTab label="Activity Timeline" active={activeSubView === 'activity'} onClick={() => setActiveSubView('activity')} />
                </div>
            </div>

            {activeSubView === 'overview' && <ProfileOverview client={client} logs={logs} onLogAdded={loadLogs} showToast={showToast} />}
            {activeSubView === 'projects' && <ProfileProjects />}
            {activeSubView === 'financials' && <ProfileFinancials client={client} invoices={invoices} payments={payments} loading={financialsLoading} />}
            {activeSubView === 'documents' && <ProfileDocuments client={client} showToast={showToast} />}
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

const ProfileOverview = ({ client, logs = [], onLogAdded, showToast }) => {
    const [showLogForm, setShowLogForm] = useState(false);
    const [channel, setChannel] = useState('CALL'); // CALL, MEETING, EMAIL, SMS, WHATSAPP
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [smsProvider, setSmsProvider] = useState('twilio');
    const [loading, setLoading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('custom');

    const handleTemplateChange = (templateId) => {
        setSelectedTemplate(templateId);
        const template = TEMPLATES.find(t => t.id === templateId);
        if (!template || templateId === 'custom') {
            return;
        }
        const name = client ? client.name : '[Client Name]';
        const balance = client ? parseFloat(client.outstanding_balance || client.outstanding_debt || 0).toLocaleString() : '0.00';
        
        let formattedText = template.text
            .replace(/{client_name}/g, name)
            .replace(/{outstanding_balance}/g, balance);
            
        setMessage(formattedText);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;

        setLoading(true);
        try {
            if (channel === 'CALL' || channel === 'MEETING') {
                await apiClient.communications.logInteraction({
                    client: client.id,
                    channel: channel,
                    direction: 'OUTBOUND',
                    message: message,
                    status: 'LOGGED'
                });
            } else {
                await apiClient.communications.sendMessage({
                    client: client.id,
                    channel: channel,
                    message: message,
                    subject: channel === 'EMAIL' ? subject : undefined,
                    provider: channel === 'SMS' ? smsProvider : undefined
                });
            }
            setMessage('');
            setSubject('');
            setSelectedTemplate('custom');
            setShowLogForm(false);
            if (onLogAdded) onLogAdded();
            showToast("Interaction saved successfully!", "success");
        } catch (err) {
            console.error("Failed to log interaction:", err);
            showToast(err.message || "Failed to log interaction.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animations-fade-in client-profile-grid" style={{ gap: '25px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0' }}>Client Details</h3>
                    <div className="detail-items-grid" style={{ gap: '20px' }}>
                        <DetailItem label="Status" value={client.is_active !== false ? "Active" : "Inactive"} icon={<CheckCircle2 size={16} />} color={client.is_active !== false ? "#10b981" : "#ef4444"} />
                        <DetailItem label="Email" value={client.email || 'N/A'} icon={<Mail size={16} />} />
                        <DetailItem label="Phone" value={client.phone || 'N/A'} icon={<Phone size={16} />} />
                        <DetailItem label="Address" value={client.address || 'N/A'} icon={<MapPin size={16} />} />
                        <DetailItem label="City" value={client.city_name || 'N/A'} icon={<MapPin size={16} />} />
                        <DetailItem label="Country" value={client.country_name || 'N/A'} icon={<Globe size={16} />} />
                        <DetailItem label="Tax ID / PIN" value={client.tax_id || 'N/A'} icon={<Building2 size={16} />} />
                        <DetailItem label="Credit Limit" value={`KES ${parseFloat(client.credit_limit || 0).toLocaleString()}`} icon={<DollarSign size={16} />} />
                    </div>
                </div>
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0' }}>Internal Notes</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                        {client.notes || "No internal notes recorded for this client."}
                    </p>
                </div>
            </div>
            <div className="portal-content-card" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Communication History</h3>
                    <button 
                        onClick={() => setShowLogForm(!showLogForm)} 
                        className="btn-text" 
                        style={{ fontSize: '13px', color: showLogForm ? '#ef4444' : '#6366f1' }}
                    >
                        {showLogForm ? 'Cancel' : 'Log / Send'}
                    </button>
                </div>

                {showLogForm ? (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Channel</label>
                            <select 
                                value={channel} 
                                onChange={(e) => {
                                    setChannel(e.target.value);
                                    setSelectedTemplate('custom');
                                }}
                                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', background: 'white' }}
                            >
                                <option value="CALL">Phone Call (Manual Log)</option>
                                <option value="MEETING">Meeting (Manual Log)</option>
                                <option value="EMAIL">Email</option>
                                <option value="SMS">SMS</option>
                                <option value="WHATSAPP">WhatsApp</option>
                            </select>
                        </div>

                        {channel === 'SMS' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Provider</label>
                                <select 
                                    value={smsProvider} 
                                    onChange={(e) => setSmsProvider(e.target.value)}
                                    style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', background: 'white' }}
                                >
                                    <option value="twilio">Twilio</option>
                                    <option value="africas_talking">Africa's Talking</option>
                                </select>
                            </div>
                        )}

                        {channel === 'EMAIL' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Subject</label>
                                <input 
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Email subject..."
                                    required={channel === 'EMAIL'}
                                    style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}
                                />
                            </div>
                        )}

                        {['EMAIL', 'SMS', 'WHATSAPP'].includes(channel) && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Template</label>
                                <select
                                    value={selectedTemplate}
                                    onChange={(e) => handleTemplateChange(e.target.value)}
                                    style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', background: 'white' }}
                                >
                                    {TEMPLATES.map(t => (
                                        <option key={t.id} value={t.id}>{t.label}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Content / Notes</label>
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Details..."
                                required
                                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', height: '80px', resize: 'none' }}
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="btn-primary" 
                            style={{ padding: '10px', borderRadius: '8px', fontSize: '13px' }}
                        >
                            {loading ? 'Processing...' : 'Submit'}
                        </button>
                    </form>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '350px', overflowY: 'auto', paddingRight: '3px' }}>
                        {logs.map((log) => (
                            <CommItem 
                                key={log.id} 
                                type={log.channel} 
                                date={log.created_on ? new Date(log.created_on).toLocaleDateString() : 'N/A'} 
                                note={log.message} 
                                status={log.status}
                            />
                        ))}
                        {logs.length === 0 && (
                            <div style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>
                                No client logs recorded yet.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const DetailItem = ({ label, value, icon, color }) => (
    <div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: 600 }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: color || '#1e293b' }}>
            <span style={{ color: '#94a3b8' }}>{icon}</span> {value}
        </div>
    </div>
);

const CommItem = ({ type, date, note, status }) => {
    let icon = <Mail size={14} />;
    let iconColor = '#3b82f6';
    if (type === 'SMS') {
        icon = <MessageSquare size={14} />;
        iconColor = '#10b981';
    } else if (type === 'WHATSAPP') {
        icon = <MessageSquare size={14} />;
        iconColor = '#25d366';
    } else if (type === 'CALL') {
        icon = <Phone size={14} />;
        iconColor = '#ea580c';
    } else if (type === 'MEETING') {
        icon = <Users size={14} />;
        iconColor = '#a855f7';
    }

    let statusLabel = '';
    let statusStyle = { color: '#64748b' };
    if (status && status !== 'LOGGED') {
        statusLabel = ` [${status}]`;
        if (status === 'FAILED') statusStyle = { color: '#ef4444' };
        else if (status === 'DELIVERED') statusStyle = { color: '#10b981' };
    }

    return (
        <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', background: '#f8fafc' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor, flexShrink: 0 }}>
                {icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{type} <span style={{ fontSize: '11px', fontWeight: 600, ...statusStyle }}>{statusLabel}</span></span>
                    <span style={{ color: '#94a3b8', fontWeight: 500, fontSize: '11px' }}>{date}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: '1.4' }}>{note}</div>
            </div>
        </div>
    );
};

const ProfileProjects = () => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <h3 style={{ margin: '0 0 20px 0' }}>Assigned Projects</h3>
        <div className="table-responsive">
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
    </div>
);

const ProfileFinancials = ({ client, invoices = [], payments = [], loading }) => {
    const [showStatement, setShowStatement] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const totalBilled = invoices.reduce((sum, inv) => sum + parseFloat(inv.total || 0), 0);
    const totalPaid = payments.reduce((sum, pmt) => sum + parseFloat(pmt.amount || 0), 0);
    const outstanding = totalBilled - totalPaid;

    // Build chronological statement entries
    const buildStatementEntries = () => {
        const entries = [];
        invoices.forEach(inv => {
            entries.push({
                date: inv.issue_date || inv.created_at || '',
                type: 'invoice',
                ref: inv.invoice_number || `INV-${inv.id}`,
                description: inv.description || `Invoice ${inv.invoice_number}`,
                debit: parseFloat(inv.total || 0),
                credit: 0,
            });
        });
        payments.forEach(pmt => {
            entries.push({
                date: pmt.payment_date || pmt.created_at || '',
                type: 'payment',
                ref: pmt.receipt_number || pmt.invoice_number || `PMT-${pmt.id}`,
                description: pmt.notes || `Payment for ${pmt.invoice_number || 'invoice'}`,
                debit: 0,
                credit: parseFloat(pmt.amount || 0),
            });
        });
        // Sort chronologically
        entries.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Apply date range filter
        const filtered = entries.filter(e => {
            if (dateFrom && e.date < dateFrom) return false;
            if (dateTo && e.date > dateTo) return false;
            return true;
        });

        // Compute running balance
        let balance = 0;
        return filtered.map(entry => {
            balance += entry.debit - entry.credit;
            return { ...entry, balance };
        });
    };

    const statementEntries = buildStatementEntries();
    const statementTotalDebit = statementEntries.reduce((s, e) => s + e.debit, 0);
    const statementTotalCredit = statementEntries.reduce((s, e) => s + e.credit, 0);
    const closingBalance = statementEntries.length > 0 ? statementEntries[statementEntries.length - 1].balance : 0;

    const fmtMoney = (v) => parseFloat(v || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const handlePrintStatement = () => {
        const printContent = document.getElementById('client-statement-printable');
        if (!printContent) return;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Statement of Account - ${client.name}</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { font-family: 'Segoe UI', Tahoma, sans-serif; color: #1e293b; padding: 40px; font-size: 12px; }
                    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #6366f1; }
                    .header h1 { font-size: 22px; color: #6366f1; font-weight: 800; }
                    .header .company-info { text-align: right; color: #64748b; font-size: 11px; line-height: 1.6; }
                    .client-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; background: #f8fafc; padding: 15px; border-radius: 8px; }
                    .client-info div { font-size: 12px; }
                    .client-info strong { color: #1e293b; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                    th { background: #6366f1; color: white; padding: 10px 12px; font-size: 11px; text-align: left; font-weight: 700; }
                    td { padding: 9px 12px; border-bottom: 1px solid #e2e8f0; font-size: 11px; }
                    tr:nth-child(even) { background: #f8fafc; }
                    .debit { color: #ef4444; font-weight: 700; }
                    .credit { color: #10b981; font-weight: 700; }
                    .balance { font-weight: 800; color: #1e293b; }
                    .totals-row { background: #f1f5f9 !important; font-weight: 800; border-top: 2px solid #6366f1; }
                    .totals-row td { padding: 12px; }
                    .footer { margin-top: 30px; text-align: center; color: #94a3b8; font-size: 10px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
                    .type-badge { padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 700; display: inline-block; }
                    .type-invoice { background: #fef2f2; color: #ef4444; }
                    .type-payment { background: #ecfdf5; color: #10b981; }
                    @media print { body { padding: 20px; } }
                </style>
            </head>
            <body>
                ${printContent.innerHTML}
                <div class="footer">
                    This is a computer-generated document. Generated on ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}.
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => { printWindow.print(); }, 400);
    };

    if (loading) {
        return (
            <div className="portal-content-card animations-fade-in" style={{ padding: '40px', textAlign: 'center', color: '#6366f1', fontWeight: 600 }}>
                Loading client billing records...
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {/* Financial Performance KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div style={{ background: '#ffffff', borderRadius: '15px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Invoiced</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', marginTop: '5px' }}>
                        KES {fmtMoney(totalBilled)}
                    </div>
                </div>
                <div style={{ background: '#ffffff', borderRadius: '15px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Paid</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#10b981', marginTop: '5px' }}>
                        KES {fmtMoney(totalPaid)}
                    </div>
                </div>
                <div style={{ background: '#ffffff', borderRadius: '15px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Outstanding Debt</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: outstanding > 0 ? '#ef4444' : '#10b981', marginTop: '5px' }}>
                        KES {fmtMoney(outstanding)}
                    </div>
                </div>
            </div>

            {/* Statement CTA Full Width */}
            <div 
                onClick={() => setShowStatement(!showStatement)}
                style={{ 
                    background: showStatement ? '#6366f1' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                    borderRadius: '15px', padding: '25px', border: 'none', 
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)', cursor: 'pointer',
                    transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px'
                }}
            >
                <div style={{ position: 'absolute', top: '-50px', right: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ position: 'absolute', bottom: '-30px', right: '100px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
                
                <div style={{ zIndex: 1 }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FileText size={24} /> Client Statement of Account
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontWeight: 500, marginTop: '8px' }}>
                        Generate, view, and print the chronological ledger of all invoices and payments.
                    </div>
                </div>
                
                <div style={{ zIndex: 1, background: 'rgba(255,255,255,0.2)', padding: '12px 25px', borderRadius: '10px', color: 'white', fontWeight: 800, fontSize: '14px', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.3)', transition: 'all 0.2s' }}
                     onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                     onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                    {showStatement ? 'Hide Statement' : 'View Statement'}
                </div>
            </div>

            {/* Statement of Account */}
            {showStatement && (
                <div className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1e293b' }}>Statement of Account</h3>
                            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
                                {client.name} {client.client_company_name ? `• ${client.client_company_name}` : ''}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>From</label>
                                <input 
                                    type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                                    style={{ padding: '7px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', background: 'white' }}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>To</label>
                                <input 
                                    type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                                    style={{ padding: '7px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', background: 'white' }}
                                />
                            </div>
                            {(dateFrom || dateTo) && (
                                <button onClick={() => { setDateFrom(''); setDateTo(''); }}
                                    style={{ padding: '7px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontSize: '12px', cursor: 'pointer', color: '#ef4444', fontWeight: 600 }}>
                                    Clear
                                </button>
                            )}
                            <button 
                                onClick={handlePrintStatement}
                                style={{ 
                                    padding: '8px 16px', borderRadius: '10px', border: 'none',
                                    background: '#6366f1', color: 'white', fontSize: '12px', fontWeight: 700,
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                                    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)', transition: 'all 0.2s'
                                }}
                            >
                                <Download size={14} /> Print / Download
                            </button>
                        </div>
                    </div>

                    {/* Statement Table */}
                    <div className="table-responsive" style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc' }}>
                                    <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e2e8f0' }}>Date</th>
                                    <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e2e8f0' }}>Type</th>
                                    <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e2e8f0' }}>Reference</th>
                                    <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e2e8f0' }}>Description</th>
                                    <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e2e8f0', textAlign: 'right' }}>Debit (KES)</th>
                                    <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e2e8f0', textAlign: 'right' }}>Credit (KES)</th>
                                    <th style={{ padding: '12px 14px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e2e8f0', textAlign: 'right' }}>Balance (KES)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statementEntries.length === 0 ? (
                                    <tr><td colSpan="7" style={{ textAlign: 'center', padding: '35px', color: '#94a3b8', fontSize: '13px' }}>No transactions found for the selected period.</td></tr>
                                ) : statementEntries.map((entry, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#fafbff'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '11px 14px', fontSize: '13px', color: '#475569', whiteSpace: 'nowrap' }}>{entry.date || '—'}</td>
                                        <td style={{ padding: '11px 14px' }}>
                                            <span style={{
                                                padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 700,
                                                background: entry.type === 'invoice' ? '#fef2f2' : '#ecfdf5',
                                                color: entry.type === 'invoice' ? '#ef4444' : '#10b981',
                                            }}>
                                                {entry.type === 'invoice' ? 'Invoice' : 'Payment'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '11px 14px', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{entry.ref}</td>
                                        <td style={{ padding: '11px 14px', fontSize: '12px', color: '#64748b', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.description}</td>
                                        <td style={{ padding: '11px 14px', fontSize: '13px', fontWeight: 700, color: entry.debit > 0 ? '#ef4444' : '#cbd5e1', textAlign: 'right' }}>
                                            {entry.debit > 0 ? fmtMoney(entry.debit) : '—'}
                                        </td>
                                        <td style={{ padding: '11px 14px', fontSize: '13px', fontWeight: 700, color: entry.credit > 0 ? '#10b981' : '#cbd5e1', textAlign: 'right' }}>
                                            {entry.credit > 0 ? fmtMoney(entry.credit) : '—'}
                                        </td>
                                        <td style={{ padding: '11px 14px', fontSize: '13px', fontWeight: 800, color: entry.balance > 0 ? '#dc2626' : '#059669', textAlign: 'right' }}>
                                            {fmtMoney(Math.abs(entry.balance))} {entry.balance < 0 ? 'CR' : 'DR'}
                                        </td>
                                    </tr>
                                ))}
                                {statementEntries.length > 0 && (
                                    <tr style={{ background: '#f1f5f9', borderTop: '2px solid #6366f1' }}>
                                        <td colSpan="4" style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>Totals / Closing Balance</td>
                                        <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 800, color: '#ef4444', textAlign: 'right' }}>{fmtMoney(statementTotalDebit)}</td>
                                        <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 800, color: '#10b981', textAlign: 'right' }}>{fmtMoney(statementTotalCredit)}</td>
                                        <td style={{ padding: '13px 14px', fontSize: '14px', fontWeight: 900, color: closingBalance > 0 ? '#dc2626' : '#059669', textAlign: 'right' }}>
                                            {fmtMoney(Math.abs(closingBalance))} {closingBalance < 0 ? 'CR' : 'DR'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Hidden Printable Statement */}
            <div id="client-statement-printable" style={{ display: 'none' }}>
                <div className="header">
                    <div>
                        <h1>Statement of Account</h1>
                        <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
                            {dateFrom || dateTo ? `Period: ${dateFrom || 'Start'} to ${dateTo || 'Present'}` : 'All Transactions'}
                        </div>
                    </div>
                    <div className="company-info">
                        <strong style={{ color: '#1e293b', fontSize: '14px' }}>Royal Software Solutions</strong><br />
                        Nairobi, Kenya<br />
                        info@royalsoftwares.co.ke
                    </div>
                </div>
                <div className="client-info">
                    <div>
                        <strong>Client:</strong> {client.name}<br />
                        {client.client_company_name && <><strong>Company:</strong> {client.client_company_name}<br /></>}
                        {client.email && <><strong>Email:</strong> {client.email}<br /></>}
                        {client.phone && <><strong>Phone:</strong> {client.phone}</>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <strong>Statement Date:</strong> {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}<br />
                        {client.tax_id && <><strong>Tax ID:</strong> {client.tax_id}<br /></>}
                        <strong>Account Status:</strong> {client.is_active !== false ? 'Active' : 'Inactive'}
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Reference</th>
                            <th>Description</th>
                            <th style={{ textAlign: 'right' }}>Debit (KES)</th>
                            <th style={{ textAlign: 'right' }}>Credit (KES)</th>
                            <th style={{ textAlign: 'right' }}>Balance (KES)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statementEntries.map((entry, idx) => (
                            <tr key={idx}>
                                <td>{entry.date || '—'}</td>
                                <td><span className={`type-badge type-${entry.type}`}>{entry.type === 'invoice' ? 'Invoice' : 'Payment'}</span></td>
                                <td style={{ fontWeight: 700 }}>{entry.ref}</td>
                                <td>{entry.description}</td>
                                <td className="debit" style={{ textAlign: 'right' }}>{entry.debit > 0 ? fmtMoney(entry.debit) : '—'}</td>
                                <td className="credit" style={{ textAlign: 'right' }}>{entry.credit > 0 ? fmtMoney(entry.credit) : '—'}</td>
                                <td className="balance" style={{ textAlign: 'right' }}>{fmtMoney(Math.abs(entry.balance))} {entry.balance < 0 ? 'CR' : 'DR'}</td>
                            </tr>
                        ))}
                        <tr className="totals-row">
                            <td colSpan="4"><strong>Totals / Closing Balance</strong></td>
                            <td className="debit" style={{ textAlign: 'right' }}>{fmtMoney(statementTotalDebit)}</td>
                            <td className="credit" style={{ textAlign: 'right' }}>{fmtMoney(statementTotalCredit)}</td>
                            <td className="balance" style={{ textAlign: 'right', fontSize: '13px' }}>{fmtMoney(Math.abs(closingBalance))} {closingBalance < 0 ? 'CR' : 'DR'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '25px' }} className="form-grid-2col">
                {/* Billing & Invoices */}
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 700 }}>Invoices History</h3>
                    <div className="table-responsive">
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ color: '#64748b' }}>
                                    <th style={{ padding: '10px 12px', fontSize: '12px', fontWeight: 600 }}>Invoice ID</th>
                                    <th style={{ padding: '10px 12px', fontSize: '12px', fontWeight: 600 }}>Date</th>
                                    <th style={{ padding: '10px 12px', fontSize: '12px', fontWeight: 600 }}>Amount</th>
                                    <th style={{ padding: '10px 12px', fontSize: '12px', fontWeight: 600 }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.length === 0 ? (
                                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '25px', color: '#94a3b8' }}>No invoices raised.</td></tr>
                                ) : invoices.map(inv => (
                                    <tr key={inv.id} style={{ background: '#f8fafc', borderRadius: '8px' }}>
                                        <td style={{ padding: '12px', fontWeight: 700, fontSize: '13px', color: '#1e293b', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>{inv.invoice_number}</td>
                                        <td style={{ padding: '12px', fontSize: '13px', color: '#475569' }}>{inv.issue_date}</td>
                                        <td style={{ padding: '12px', fontWeight: 800, fontSize: '13px', color: '#6366f1' }}>KES {parseFloat(inv.total).toLocaleString()}</td>
                                        <td style={{ padding: '12px', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>
                                            <span style={{
                                                padding: '3px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700,
                                                background: inv.status === 'Paid' ? '#ecfdf5' : inv.status === 'Overdue' ? '#fef2f2' : '#fffbeb',
                                                color: inv.status === 'Paid' ? '#10b981' : inv.status === 'Overdue' ? '#ef4444' : '#f59e0b',
                                            }}>{inv.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary of Payments */}
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 700 }}>Summary of Payments</h3>
                    <div className="table-responsive">
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ color: '#64748b' }}>
                                    <th style={{ padding: '10px 12px', fontSize: '12px', fontWeight: 600 }}>Ref Invoice</th>
                                    <th style={{ padding: '10px 12px', fontSize: '12px', fontWeight: 600 }}>Date</th>
                                    <th style={{ padding: '10px 12px', fontSize: '12px', fontWeight: 600 }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length === 0 ? (
                                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '25px', color: '#94a3b8' }}>No payment receipts recorded.</td></tr>
                                ) : payments.map(pmt => (
                                    <tr key={pmt.id} style={{ background: '#f8fafc', borderRadius: '8px' }}>
                                        <td style={{ padding: '12px', fontWeight: 700, fontSize: '13px', color: '#1e293b', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>{pmt.invoice_number}</td>
                                        <td style={{ padding: '12px', fontSize: '13px', color: '#475569' }}>{pmt.payment_date}</td>
                                        <td style={{ padding: '12px', fontWeight: 800, fontSize: '13px', color: '#10b981', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>KES {parseFloat(pmt.amount).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


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

const CommunicationsManagementSection = ({ clients = [], showToast }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);

    // Form states
    const [selectedClient, setSelectedClient] = useState('');
    const [channel, setChannel] = useState('EMAIL'); // EMAIL, SMS, WHATSAPP, CALL, MEETING
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [smsProvider, setSmsProvider] = useState('twilio'); // twilio, africas_talking
    const [direction, setDirection] = useState('OUTBOUND'); // INBOUND, OUTBOUND (for call/meeting logs)
    
    // Premium Upgrade states
    const [selectedTemplate, setSelectedTemplate] = useState('custom');
    const [logSearchQuery, setLogSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('ALL');

    const loadLogs = async () => {
        setLoading(true);
        try {
            const data = await apiClient.communications.list();
            setLogs(data);
            setError(null);
        } catch (err) {
            console.error("Failed to load logs:", err);
            setError("Failed to fetch communication history.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
    }, []);

    // Recompile message when selectedClient or template changes
    const handleTemplateChange = (templateId, clientId = selectedClient) => {
        setSelectedTemplate(templateId);
        const template = TEMPLATES.find(t => t.id === templateId);
        if (!template || templateId === 'custom') {
            return;
        }

        const clientObj = clients.find(c => String(c.id) === String(clientId));
        const name = clientObj ? clientObj.name : '[Client Name]';
        const balance = clientObj ? parseFloat(clientObj.outstanding_balance || clientObj.outstanding_debt || 0).toLocaleString() : '0.00';

        let formattedText = template.text
            .replace(/{client_name}/g, name)
            .replace(/{outstanding_balance}/g, balance);

        setMessage(formattedText);
    };

    const handleClientChange = (clientId) => {
        setSelectedClient(clientId);
        if (selectedTemplate !== 'custom') {
            handleTemplateChange(selectedTemplate, clientId);
        }
    };

    const handleSendSubmit = async (e) => {
        e.preventDefault();
        if (!selectedClient || !message) {
            showToast("Please select a client and enter a message.", "error");
            return;
        }

        setSending(true);
        try {
            if (channel === 'CALL' || channel === 'MEETING') {
                await apiClient.communications.logInteraction({
                    client: selectedClient,
                    channel: channel,
                    direction: direction,
                    message: message,
                    status: 'LOGGED'
                });
            } else {
                await apiClient.communications.sendMessage({
                    client: selectedClient,
                    channel: channel,
                    message: message,
                    subject: channel === 'EMAIL' ? subject : undefined,
                    provider: channel === 'SMS' ? smsProvider : undefined
                });
            }

            // Reset form
            setMessage('');
            setSubject('');
            setSelectedTemplate('custom');
            // Refresh logs
            await loadLogs();
            showToast("Communication logged / dispatched successfully!", "success");
        } catch (err) {
            console.error("Failed to process communication:", err);
            showToast(err.message || "Failed to process message.", "error");
        } finally {
            setSending(false);
        }
    };

    // Calculate Metrics
    const totalLogs = logs.length;
    const apiLogs = logs.filter(l => ['EMAIL', 'SMS', 'WHATSAPP'].includes(l.channel));
    const successLogs = apiLogs.filter(l => ['SENT', 'DELIVERED'].includes(l.status));
    const successRate = apiLogs.length > 0 ? Math.round((successLogs.length / apiLogs.length) * 100) : 100;
    const failedLogs = logs.filter(l => l.status === 'FAILED').length;
    const manualInteractions = logs.filter(l => ['CALL', 'MEETING'].includes(l.channel)).length;

    const commStats = [
        { label: 'Total Communications', value: totalLogs, icon: <Activity size={20} />, color: '#6366f1' },
        { label: 'Delivery Success', value: `${successRate}%`, icon: <CheckCircle2 size={20} />, color: '#10b981' },
        { label: 'Failed / Bounces', value: failedLogs, icon: <AlertCircle size={20} />, color: '#ef4444' },
        { label: 'Calls & Meetings', value: manualInteractions, icon: <Phone size={20} />, color: '#ea580c' }
    ];

    // Filter Logs
    const filteredLogs = logs.filter(log => {
        if (activeFilter === 'EMAIL' && log.channel !== 'EMAIL') return false;
        if (activeFilter === 'SMS' && log.channel !== 'SMS') return false;
        if (activeFilter === 'WHATSAPP' && log.channel !== 'WHATSAPP') return false;
        if (activeFilter === 'MANUAL' && !['CALL', 'MEETING'].includes(log.channel)) return false;

        if (logSearchQuery) {
            const query = logSearchQuery.toLowerCase();
            const clientName = (log.client_name || '').toLowerCase();
            const messageText = (log.message || '').toLowerCase();
            const subjectText = (log.subject || '').toLowerCase();
            return clientName.includes(query) || messageText.includes(query) || subjectText.includes(query);
        }
        return true;
    });

    // Render Preview Mockups
    const renderPreviewMockup = () => {
        const clientObj = clients.find(c => String(c.id) === String(selectedClient));
        const clientName = clientObj ? clientObj.name : 'Valued Client';
        const clientPhone = clientObj ? clientObj.phone : '+254 700 000 000';
        const clientEmail = clientObj ? clientObj.email : 'client@company.com';

        if (channel === 'SMS' || channel === 'WHATSAPP') {
            const isWhatsApp = channel === 'WHATSAPP';
            return (
                <div style={{
                    width: '100%',
                    maxWidth: '280px',
                    height: '420px',
                    border: '10px solid #1e293b',
                    borderRadius: '32px',
                    position: 'relative',
                    background: isWhatsApp ? '#efeae2' : '#ffffff',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    {/* Notch */}
                    <div style={{
                        width: '90px',
                        height: '16px',
                        background: '#1e293b',
                        borderRadius: '0 0 12px 12px',
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10
                    }} />
                    
                    {/* Phone Header */}
                    <div style={{
                        background: isWhatsApp ? '#075e54' : '#f8fafc',
                        color: isWhatsApp ? '#ffffff' : '#1e293b',
                        padding: '20px 12px 10px 12px',
                        borderBottom: isWhatsApp ? 'none' : '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexShrink: 0
                    }}>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: isWhatsApp ? '#128c7e' : '#cbd5e1',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 700
                        }}>
                            {getAbbreviation(clientName)}
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {clientName}
                            </div>
                            <div style={{ fontSize: '9px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {isWhatsApp ? (
                                    <>
                                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
                                        online
                                    </>
                                ) : clientPhone}
                            </div>
                        </div>
                    </div>
                    
                    {/* Chat Area */}
                    <div style={{
                        flex: 1,
                        padding: '12px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontSize: '11px',
                        lineHeight: '1.4'
                    }}>
                        {/* Left Bubble */}
                        <div style={{
                            alignSelf: 'flex-start',
                            background: isWhatsApp ? '#ffffff' : '#f1f5f9',
                            color: '#334155',
                            padding: '8px 12px',
                            borderRadius: '0px 12px 12px 12px',
                            maxWidth: '80%',
                            boxShadow: isWhatsApp ? '0 1px 0.5px rgba(0,0,0,0.05)' : 'none'
                        }}>
                            Hello! This is a dynamic channel preview.
                        </div>
                        
                        {/* Right Bubble */}
                        {message ? (
                            <div style={{
                                alignSelf: 'flex-end',
                                background: isWhatsApp ? '#dcf8c6' : '#6366f1',
                                color: isWhatsApp ? '#1e293b' : '#ffffff',
                                padding: '8px 12px',
                                borderRadius: '12px 0px 12px 12px',
                                maxWidth: '85%',
                                boxShadow: isWhatsApp ? '0 1px 0.5px rgba(0,0,0,0.05)' : 'none',
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {message}
                                <div style={{
                                    fontSize: '8px',
                                    textAlign: 'right',
                                    marginTop: '4px',
                                    opacity: 0.7,
                                    color: isWhatsApp ? '#64748b' : '#cbd5e1'
                                }}>
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                alignSelf: 'center',
                                color: '#94a3b8',
                                fontSize: '10px',
                                textAlign: 'center',
                                marginTop: '20px',
                                fontStyle: 'italic',
                                padding: '0 10px'
                            }}>
                                Select a client & start typing to see live phone bubble rendering...
                            </div>
                        )}
                    </div>
                    
                    {/* Input Bar */}
                    <div style={{
                        padding: '8px',
                        background: isWhatsApp ? '#f0f0f0' : '#f8fafc',
                        borderTop: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexShrink: 0
                    }}>
                        <div style={{
                            flex: 1,
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '4px 10px',
                            fontSize: '10px',
                            color: '#94a3b8'
                        }}>
                            {isWhatsApp ? 'Type a message' : 'Text Message'}
                        </div>
                        <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: isWhatsApp ? '#075e54' : '#6366f1',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px'
                        }}>
                            ➔
                        </div>
                    </div>
                </div>
            );
        }

        if (channel === 'EMAIL') {
            return (
                <div style={{
                    width: '100%',
                    maxWidth: '380px',
                    height: '320px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    {/* Window Controls */}
                    <div style={{
                        background: '#f8fafc',
                        borderBottom: '1px solid #e2e8f0',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexShrink: 0
                    }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                        <div style={{ flex: 1, textAlign: 'center', fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>New Email Message</div>
                    </div>
                    
                    {/* Header Info */}
                    <div style={{
                        padding: '10px 15px',
                        borderBottom: '1px solid #f1f5f9',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        fontSize: '11px',
                        color: '#64748b',
                        flexShrink: 0
                    }}>
                        <div>
                            <span style={{ fontWeight: 600 }}>To:</span> <span style={{ color: '#1e293b' }}>{clientName} &lt;{clientEmail}&gt;</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: 600 }}>Subject:</span> <span style={{ color: '#1e293b', fontWeight: 700 }}>{subject || '[No Subject]'}</span>
                        </div>
                    </div>
                    
                    {/* Body */}
                    <div style={{
                        flex: 1,
                        padding: '15px',
                        overflowY: 'auto',
                        fontSize: '11px',
                        color: '#334155',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {message ? message : (
                            <div style={{ color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', marginTop: '30px' }}>
                                Select a client & start typing email body to preview browser rendering...
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (channel === 'CALL' || channel === 'MEETING') {
            const isCall = channel === 'CALL';
            return (
                <div style={{
                    width: '100%',
                    maxWidth: '320px',
                    background: isCall ? 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)' : 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                    border: isCall ? '1px solid #fed7aa' : '1px solid #e9d5ff',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: isCall ? '#ea580c' : '#a855f7',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {isCall ? <Phone size={16} /> : <Users size={16} />}
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                                {isCall ? 'Logged Phone Conversation' : 'Logged Client Meeting'}
                            </div>
                            <div style={{ fontSize: '9px', color: '#64748b' }}>
                                {direction === 'OUTBOUND' ? 'Outbound Call' : 'Inbound Call'}
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ background: '#ffffff50', borderRadius: '10px', padding: '12px', border: '1px solid #ffffff60' }}>
                        <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Client Target
                        </div>
                        <div style={{ fontSize: '11px', color: '#1e293b', fontWeight: 600, marginTop: '2px' }}>
                            {clientName}
                        </div>
                        
                        <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '10px' }}>
                            Summary of Discussion
                        </div>
                        <div style={{ fontSize: '11px', color: '#334155', marginTop: '4px', fontStyle: message ? 'normal' : 'italic', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
                            {message ? message : 'Write a summary or notes in the form above to preview...'}
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748b' }}>
                        <span>Agent: Current User (Admin)</span>
                        <span>Date: {new Date().toLocaleDateString()}</span>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <style>{`
                .timeline-card {
                    display: flex;
                    gap: 15px;
                    padding: 18px;
                    background: #ffffff;
                    border: 1px solid #f1f5f9;
                    border-radius: 14px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -2px rgba(0, 0, 0, 0.01);
                    transition: all 0.2s ease;
                }
                .timeline-card:hover {
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.02);
                    border-color: #e2e8f0;
                }
                .channel-icon-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    flex-shrink: 0;
                }
                .status-badge {
                    font-size: 11px;
                    font-weight: 700;
                    padding: 3px 8px;
                    border-radius: 6px;
                    text-transform: capitalize;
                }
                .comm-main-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-areas: 
                        "timeline"
                        "form"
                        "preview";
                    gap: 25px;
                    margin-bottom: 30px;
                }
                .comm-timeline {
                    grid-area: timeline;
                }
                .comm-form {
                    grid-area: form;
                }
                .comm-preview {
                    grid-area: preview;
                }

                @media (min-width: 1024px) {
                    .comm-main-layout {
                        grid-template-columns: 1.2fr 1fr;
                        grid-template-areas: 
                            "timeline form"
                            "timeline preview";
                    }
                }

                @media (min-width: 1400px) {
                    .comm-main-layout {
                        grid-template-columns: 1.2fr 1fr 1fr;
                        grid-template-areas: 
                            "timeline form preview";
                    }
                }
            `}</style>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', width: '100%' }}>
                {commStats.map((stat, i) => (
                    <div key={i} className="portal-content-card" style={{ padding: '20px', background: '#ffffff', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${stat.color}10`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
                            <div style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', marginTop: '2px' }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Side-by-Side Area */}
            <div className="comm-main-layout">
                
                {/* Left side: Timeline Logs with Filters */}
                <div className="portal-content-card comm-timeline" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Communication History</h3>
                        <button onClick={loadLogs} disabled={loading} className="btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>
                            {loading ? 'Refreshing...' : 'Refresh Logs'}
                        </button>
                    </div>

                    {/* Search & Filters */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
                            <input 
                                type="text" 
                                placeholder="Search logs by client, message, or subject..." 
                                value={logSearchQuery}
                                onChange={(e) => setLogSearchQuery(e.target.value)}
                                style={{ padding: '10px 10px 10px 35px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px', width: '100%', background: '#ffffff', boxSizing: 'border-box' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
                            <style>{`
                                .filter-pill {
                                    padding: 6px 12px;
                                    border-radius: 20px;
                                    border: 1px solid #e2e8f0;
                                    background: #ffffff;
                                    color: #64748b;
                                    font-size: 12px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transition: all 0.2s ease;
                                    white-space: nowrap;
                                }
                                .filter-pill:hover {
                                    background: #f8fafc;
                                    border-color: #cbd5e1;
                                }
                                .filter-pill.active {
                                    background: #6366f1;
                                    border-color: #6366f1;
                                    color: #ffffff;
                                }
                            `}</style>
                            <button className={`filter-pill ${activeFilter === 'ALL' ? 'active' : ''}`} onClick={() => setActiveFilter('ALL')}>All Channels</button>
                            <button className={`filter-pill ${activeFilter === 'EMAIL' ? 'active' : ''}`} onClick={() => setActiveFilter('EMAIL')}>Email</button>
                            <button className={`filter-pill ${activeFilter === 'SMS' ? 'active' : ''}`} onClick={() => setActiveFilter('SMS')}>SMS</button>
                            <button className={`filter-pill ${activeFilter === 'WHATSAPP' ? 'active' : ''}`} onClick={() => setActiveFilter('WHATSAPP')}>WhatsApp</button>
                            <button className={`filter-pill ${activeFilter === 'MANUAL' ? 'active' : ''}`} onClick={() => setActiveFilter('MANUAL')}>Calls & Meetings</button>
                        </div>
                    </div>

                    {error && <div style={{ color: '#ef4444', fontSize: '14px' }}>{error}</div>}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '600px', overflowY: 'auto', paddingRight: '5px' }}>
                        {filteredLogs.map((log) => {
                            // Theme channels
                            let channelIcon = <Mail size={18} />;
                            let channelColor = { bg: '#eff6ff', text: '#3b82f6' };
                            if (log.channel === 'SMS') {
                                channelIcon = <MessageSquare size={18} />;
                                channelColor = { bg: '#ecfdf5', text: '#10b981' };
                            } else if (log.channel === 'WHATSAPP') {
                                channelIcon = <MessageSquare size={18} />;
                                channelColor = { bg: '#e8fbf0', text: '#25d366' };
                            } else if (log.channel === 'CALL') {
                                channelIcon = <Phone size={18} />;
                                channelColor = { bg: '#fff7ed', text: '#ea580c' };
                            } else if (log.channel === 'MEETING') {
                                channelIcon = <Users size={18} />;
                                channelColor = { bg: '#faf5ff', text: '#a855f7' };
                            }

                            // Theme statuses
                            let statusStyle = { bg: '#f1f5f9', text: '#64748b' }; // Logged
                            if (log.status === 'SENT') {
                                statusStyle = { bg: '#e0f2fe', text: '#0284c7' };
                            } else if (log.status === 'DELIVERED') {
                                statusStyle = { bg: '#dcfce7', text: '#16a34a' };
                            } else if (log.status === 'FAILED') {
                                statusStyle = { bg: '#fee2e2', text: '#dc2626' };
                            } else if (log.status === 'PENDING') {
                                statusStyle = { bg: '#fef3c7', text: '#d97706' };
                            }

                            const logDate = log.created_on ? new Date(log.created_on).toLocaleString() : 'N/A';

                            return (
                                <div key={log.id} className="timeline-card">
                                    <div className="channel-icon-wrap" style={{ background: channelColor.bg, color: channelColor.text }}>
                                        {channelIcon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                                            <div>
                                                <span style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>
                                                    {log.client_name || 'Client'}
                                                </span>
                                                <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '6px' }}>
                                                    ({log.channel} • {log.direction === 'OUTBOUND' ? 'Outbound' : 'Inbound'})
                                                </span>
                                            </div>
                                            <span className="status-badge" style={{ background: statusStyle.bg, color: statusStyle.text }}>
                                                {log.status}
                                            </span>
                                        </div>
                                        
                                        {log.subject && (
                                            <div style={{ fontWeight: 600, fontSize: '13px', color: '#475569', marginTop: '5px' }}>
                                                Subject: {log.subject}
                                            </div>
                                        )}

                                        <p style={{ fontSize: '13px', color: '#64748b', margin: '6px 0 0 0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                                            {log.message}
                                        </p>

                                        {log.error_details && (
                                            <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '6px', background: '#fef2f2', padding: '6px 10px', borderRadius: '8px', border: '1px solid #fee2e2' }}>
                                                Error: {log.error_details}
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid #f8fafc', paddingTop: '8px', fontSize: '11px', color: '#94a3b8' }}>
                                            <span>Logged by: {log.sender_name || 'System'}</span>
                                            <span>{logDate}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredLogs.length === 0 && !loading && (
                            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                No communication logs found matching filter criteria.
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Card */}
                <div className="portal-content-card comm-form" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#ffffff', height: 'fit-content' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Log or Send Message</h3>
                        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#64748b' }}>
                            Send email, SMS/WhatsApp alerts in real-time or log phone call meetings manually.
                        </p>
                    </div>

                    <form onSubmit={handleSendSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Select Client *</label>
                           <select 
                                value={selectedClient} 
                                onChange={(e) => handleClientChange(e.target.value)}
                                required
                                style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                            >
                                <option value="">-- Choose Client --</option>
                                {clients.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.name} {c.client_company_name ? `(${c.client_company_name})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Channel *</label>
                                <select 
                                    value={channel} 
                                    onChange={(e) => {
                                        setChannel(e.target.value);
                                        setSelectedTemplate('custom');
                                        if (e.target.value === 'CALL' || e.target.value === 'MEETING') {
                                            setDirection('OUTBOUND');
                                        }
                                    }}
                                    style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                                >
                                    <option value="EMAIL">Email</option>
                                    <option value="SMS">SMS</option>
                                    <option value="WHATSAPP">WhatsApp</option>
                                    <option value="CALL">Phone Call (Manual Log)</option>
                                    <option value="MEETING">Meeting (Manual Log)</option>
                                </select>
                            </div>

                            {(channel === 'CALL' || channel === 'MEETING') ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Direction *</label>
                                    <select 
                                        value={direction} 
                                        onChange={(e) => setDirection(e.target.value)}
                                        style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                                    >
                                        <option value="OUTBOUND">Outbound</option>
                                        <option value="INBOUND">Inbound</option>
                                    </select>
                                </div>
                            ) : channel === 'SMS' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>SMS Gateway *</label>
                                    <select 
                                        value={smsProvider} 
                                        onChange={(e) => setSmsProvider(e.target.value)}
                                        style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                                    >
                                        <option value="twilio">Twilio Messaging API</option>
                                        <option value="africas_talking">Africa's Talking API</option>
                                    </select>
                                </div>
                            ) : null}
                        </div>

                        {channel === 'EMAIL' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Subject *</label>
                                <input 
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Enter email subject..."
                                    required={channel === 'EMAIL'}
                                    style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' }}
                                />
                            </div>
                        )}

                        {['EMAIL', 'SMS', 'WHATSAPP'].includes(channel) && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Dynamic Message Template</label>
                                <select 
                                    value={selectedTemplate} 
                                    onChange={(e) => handleTemplateChange(e.target.value)}
                                    style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                                >
                                    {TEMPLATES.map(t => (
                                        <option key={t.id} value={t.id}>{t.label}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                                {channel === 'CALL' || channel === 'MEETING' ? 'Notes / Interaction Summary *' : 'Message Body *'}
                            </label>
                            <textarea 
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    setSelectedTemplate('custom');
                                }}
                                placeholder={channel === 'CALL' || channel === 'MEETING' ? "Log phone call minutes or meeting outcomes..." : "Type message body here..."}
                                required
                                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', height: '140px', resize: 'none', lineHeight: '1.5' }}
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={sending} 
                            className="btn-primary" 
                            style={{ padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                            {sending ? 'Sending/Saving...' : (channel === 'CALL' || channel === 'MEETING') ? 'Save Local Log' : 'Dispatch Message'}
                        </button>
                    </form>
                </div>

                {/* Preview Mockup Card */}
                <div className="portal-content-card comm-preview" style={{ padding: '25px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '15px', height: 'fit-content' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#475569' }}>Live Channel Mockup</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        {renderPreviewMockup()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DocumentPreviewModal = ({ doc, onClose }) => {
    if (!doc) return null;

    const getDocumentUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        return `${baseUrl}${url}`;
    };

    const docUrl = getDocumentUrl(doc.document_file);
    const fileExt = (doc.document_file || '').split('.').pop().toLowerCase();
    const isImage = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(fileExt);
    const isPDF = fileExt === 'pdf';

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
        }}>
            <div className="portal-content-card animations-fade-in" style={{
                width: '100%',
                maxWidth: '900px',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                height: '85vh',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    padding: '20px 25px',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#f8fafc'
                }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{doc.name}</h3>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                            Client: {doc.client_name} • Uploaded by: {doc.uploaded_by_name || 'System'}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <a 
                            href={docUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-outline"
                            style={{ 
                                padding: '8px 14px', 
                                borderRadius: '8px', 
                                fontSize: '12px', 
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: '#6366f1',
                                border: '1px solid rgba(99, 102, 241, 0.4)',
                                background: '#ffffff',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            <ExternalLink size={14} /> Open in New Tab
                        </a>
                        <button 
                            onClick={onClose} 
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: '#64748b', 
                                cursor: 'pointer', 
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflow: 'auto', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    {isPDF ? (
                        <iframe 
                            src={docUrl} 
                            width="100%" 
                            height="100%" 
                            style={{ border: 'none', borderRadius: '8px', background: '#ffffff' }}
                            title={doc.name}
                        />
                    ) : isImage ? (
                        <img 
                            src={docUrl} 
                            alt={doc.name} 
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
                        />
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', maxWidth: '400px' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', color: '#64748b' }}>
                                <FileText size={30} />
                            </div>
                            <h4 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>Preview Not Available</h4>
                            <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                                This file type ({fileExt.toUpperCase()}) cannot be rendered directly in the browser preview. Please download the file to view its contents.
                            </p>
                            <a 
                                href={docUrl} 
                                download 
                                className="btn-primary" 
                                style={{ padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
                            >
                                <Download size={16} /> Download File
                            </a>
                        </div>
                    )}
                </div>

                {/* Footer/Description */}
                {doc.description && (
                    <div style={{ padding: '15px 25px', borderTop: '1px solid #e2e8f0', background: '#ffffff', fontSize: '13px', color: '#334155' }}>
                        <strong>Description:</strong> {doc.description}
                    </div>
                )}
            </div>
        </div>
    );
};

const DocumentUploadModal = ({ clients, onClose, onUploadSuccess, preselectedClientId, showToast }) => {
    const [name, setName] = useState('');
    const [clientId, setClientId] = useState(preselectedClientId || '');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            if (!name) {
                const baseName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.')) || selectedFile.name;
                setName(baseName.replace(/[_-]/g, ' '));
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selectedFile = e.dataTransfer.files[0];
            setFile(selectedFile);
            if (!name) {
                const baseName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.')) || selectedFile.name;
                setName(baseName.replace(/[_-]/g, ' '));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!clientId) {
            showToast("Please select a client.", "error");
            return;
        }
        if (!file) {
            showToast("Please select a file to upload.", "error");
            return;
        }
        if (!name.trim()) {
            showToast("Please specify a document name.", "error");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('client', clientId);
            formData.append('name', name.trim());
            formData.append('description', description.trim());
            formData.append('document_file', file);

            await apiClient.documents.create(formData);
            showToast("Document uploaded successfully!", "success");
            onUploadSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to upload document:", err);
            showToast(err.message || "Failed to upload document.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
        }}>
            <div className="portal-content-card animations-fade-in" style={{
                width: '100%',
                maxWidth: '550px',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Upload Client Document</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {!preselectedClientId && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Client <span style={{ color: '#ef4444' }}>*</span></label>
                            <select 
                                value={clientId} 
                                onChange={(e) => setClientId(e.target.value)} 
                                required
                                style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                            >
                                <option value="">Select a Client...</option>
                                {clients.map(c => (
                                    <option key={c.id} value={c.id}>{c.name} {c.client_company_name ? `(${c.client_company_name})` : ''}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Document Name <span style={{ color: '#ef4444' }}>*</span></label>
                        <input 
                            type="text" 
                            placeholder="e.g. Service Level Agreement 2026" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required
                            style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>File Upload <span style={{ color: '#ef4444' }}>*</span></label>
                        <div 
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            style={{
                                border: `2px dashed ${isDragOver ? '#6366f1' : '#cbd5e1'}`,
                                borderRadius: '12px',
                                padding: '25px 20px',
                                textAlign: 'center',
                                background: isDragOver ? '#f5f3ff' : '#f8fafc',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative'
                            }}
                            onClick={() => document.getElementById('doc-file-input').click()}
                        >
                            <input 
                                id="doc-file-input"
                                type="file" 
                                onChange={handleFileChange} 
                                style={{ display: 'none' }}
                                required
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <Upload size={24} style={{ color: file ? '#10b981' : '#6366f1' }} />
                                {file ? (
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#10b981' }}>{file.name}</div>
                                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                                            {(file.size / (1024 * 1024)).toFixed(2)} MB • Click or drag to change file
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Drag & drop file here or click to browse</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Supports PDF, Images, Word, Excel (Max 10MB)</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Description / Notes</label>
                        <textarea 
                            placeholder="Optional notes or tags for this document..." 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', height: '80px', resize: 'none' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '15px', marginTop: '10px' }}>
                        <button type="button" onClick={onClose} className="btn-outline" style={{ padding: '10px 20px', borderRadius: '10px' }}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {loading ? 'Uploading...' : <><Upload size={16} /> Upload Document</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteConfirmationModal = ({ docName, onConfirm, onCancel }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
        }}>
            <div className="portal-content-card animations-fade-in" style={{
                width: '100%',
                maxWidth: '400px',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                padding: '25px',
                textAlign: 'center'
            }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}>
                    <Trash2 size={24} />
                </div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Delete Document?</h3>
                <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                    Are you sure you want to delete <strong>{docName}</strong>? This action is permanent and cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button onClick={onCancel} className="btn-outline" style={{ padding: '10px 20px', borderRadius: '10px', flex: 1 }}>Cancel</button>
                    <button onClick={onConfirm} className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', background: '#ef4444', borderColor: '#ef4444', flex: 1 }}>Delete</button>
                </div>
            </div>
        </div>
    );
};

const DocumentsManagementSection = ({ clients = [], showToast, userRole }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClientFilter, setSelectedClientFilter] = useState('ALL');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [previewDoc, setPreviewDoc] = useState(null);
    const [deleteDoc, setDeleteDoc] = useState(null);

    const loadDocuments = async () => {
        setLoading(true);
        try {
            const clientId = selectedClientFilter === 'ALL' ? null : selectedClientFilter;
            const data = await apiClient.documents.list(clientId);
            setDocuments(data);
        } catch (err) {
            console.error("Failed to load documents:", err);
            showToast("Failed to load documents from repository.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, [selectedClientFilter]);

    const handleDeleteConfirm = async () => {
        if (!deleteDoc) return;
        try {
            await apiClient.documents.delete(deleteDoc.id);
            showToast(`Document "${deleteDoc.name}" deleted successfully.`, "success");
            setDocuments(prev => prev.filter(d => d.id !== deleteDoc.id));
            setDeleteDoc(null);
        } catch (err) {
            console.error("Failed to delete document:", err);
            showToast(err.message || "Failed to delete document.", "error");
        }
    };

    const getFileIcon = (fileName) => {
        const ext = (fileName || '').split('.').pop().toLowerCase();
        if (['pdf'].includes(ext)) {
            return { icon: <FileText size={20} />, color: '#ef4444', bg: '#fef2f2', label: 'PDF' };
        }
        if (['doc', 'docx'].includes(ext)) {
            return { icon: <FileText size={20} />, color: '#3b82f6', bg: '#eff6ff', label: 'Word' };
        }
        if (['xls', 'xlsx', 'csv'].includes(ext)) {
            return { icon: <FileText size={20} />, color: '#10b981', bg: '#ecfdf5', label: 'Excel' };
        }
        if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
            return { icon: <Eye size={20} />, color: '#8b5cf6', bg: '#f5f3ff', label: 'Image' };
        }
        return { icon: <FileText size={20} />, color: '#64748b', bg: '#f1f5f9', label: 'File' };
    };

    const getDocumentUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        return `${baseUrl}${url}`;
    };

    const formatFileSize = (bytes) => {
        if (bytes === null || bytes === undefined) return 'N/A';
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const filteredDocs = documents.filter(doc => {
        if (!doc) return false;
        const query = searchQuery.toLowerCase();
        const docName = (doc.name || '').toLowerCase();
        const docDesc = (doc.description || '').toLowerCase();
        const clientName = (doc.client_name || '').toLowerCase();
        return docName.includes(query) || docDesc.includes(query) || clientName.includes(query);
    });

    return (
        <div className="animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {/* Header Control Panel */}
            <div className="portal-content-card" style={{ padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
                    <div style={{ position: 'relative', minWidth: '260px' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
                        <input 
                            type="text" 
                            placeholder="Search document repository..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ padding: '10px 10px 10px 35px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', width: '100%', background: '#f8fafc' }} 
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Filter size={16} style={{ color: '#64748b' }} />
                        <select 
                            value={selectedClientFilter} 
                            onChange={(e) => setSelectedClientFilter(e.target.value)}
                            style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                        >
                            <option value="ALL">All Clients Documents</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button 
                    onClick={() => setShowUploadModal(true)}
                    className="btn-primary" 
                    style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Plus size={18} /> Upload Document
                </button>
            </div>

            {/* Document List / Grid */}
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Unified Document Repository</h3>
                
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px 0', color: '#64748b', fontSize: '14px' }}>
                        Loading document database...
                    </div>
                ) : filteredDocs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px 0', color: '#94a3b8', border: '2px dashed #f1f5f9', borderRadius: '12px' }}>
                        <FileText size={36} style={{ margin: '0 auto 10px auto', display: 'block', opacity: 0.5 }} />
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>No documents found matching filters</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Upload your first service contract, SLA, or client proposal.</p>
                    </div>
                ) : (
                    <div className="client-docs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                        {filteredDocs.map((doc) => {
                            const fileProps = getFileIcon(doc.document_file);
                            const fileUrl = getDocumentUrl(doc.document_file);
                            return (
                                <div 
                                    key={doc.id} 
                                    style={{ 
                                        padding: '20px', 
                                        border: '1px solid #e2e8f0', 
                                        borderRadius: '16px', 
                                        background: '#ffffff',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        height: '200px'
                                    }} 
                                    className="hover-bg-light"
                                >
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', background: fileProps.bg, color: fileProps.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {fileProps.icon}
                                            </div>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: fileProps.color, background: fileProps.bg, padding: '2px 8px', borderRadius: '20px' }}>
                                                {fileProps.label}
                                            </span>
                                        </div>
                                        <div 
                                            onClick={() => setPreviewDoc(doc)}
                                            style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}
                                            title={doc.name}
                                        >
                                            {doc.name}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            Client: <strong>{doc.client_name}</strong>
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                                            <div>{formatFileSize(doc.file_size)}</div>
                                            <div style={{ marginTop: '2px' }}>{doc.created_on ? new Date(doc.created_on).toLocaleDateString() : 'N/A'}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button 
                                                onClick={() => setPreviewDoc(doc)}
                                                className="btn-text" 
                                                style={{ padding: '6px', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                title="Preview Document"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <a 
                                                href={fileUrl} 
                                                download 
                                                className="btn-text" 
                                                style={{ padding: '6px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                title="Download Document"
                                            >
                                                <Download size={16} />
                                            </a>
                                            <button 
                                                onClick={() => setDeleteDoc(doc)}
                                                className="btn-text" 
                                                style={{ padding: '6px', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                title="Delete Document"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modals */}
            {showUploadModal && (
                <DocumentUploadModal 
                    clients={clients} 
                    onClose={() => setShowUploadModal(false)} 
                    onUploadSuccess={loadDocuments} 
                    showToast={showToast}
                />
            )}

            {previewDoc && (
                <DocumentPreviewModal 
                    doc={previewDoc} 
                    onClose={() => setPreviewDoc(null)} 
                />
            )}

            {deleteDoc && (
                <DeleteConfirmationModal 
                    docName={deleteDoc.name} 
                    onConfirm={handleDeleteConfirm} 
                    onCancel={() => setDeleteDoc(null)} 
                />
            )}
        </div>
    );
};

const ProfileDocuments = ({ client, showToast }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [previewDoc, setPreviewDoc] = useState(null);
    const [deleteDoc, setDeleteDoc] = useState(null);

    const loadDocuments = async () => {
        if (!client) return;
        setLoading(true);
        try {
            const data = await apiClient.documents.list(client.id);
            setDocuments(data);
        } catch (err) {
            console.error("Failed to load client documents:", err);
            showToast("Failed to load documents for this client.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, [client?.id]);

    const handleDeleteConfirm = async () => {
        if (!deleteDoc) return;
        try {
            await apiClient.documents.delete(deleteDoc.id);
            showToast(`Document "${deleteDoc.name}" deleted successfully.`, "success");
            setDocuments(prev => prev.filter(d => d.id !== deleteDoc.id));
            setDeleteDoc(null);
        } catch (err) {
            console.error("Failed to delete document:", err);
            showToast(err.message || "Failed to delete document.", "error");
        }
    };

    const getFileIcon = (fileName) => {
        const ext = (fileName || '').split('.').pop().toLowerCase();
        if (['pdf'].includes(ext)) {
            return { icon: <FileText size={20} />, color: '#ef4444', bg: '#fef2f2', label: 'PDF' };
        }
        if (['doc', 'docx'].includes(ext)) {
            return { icon: <FileText size={20} />, color: '#3b82f6', bg: '#eff6ff', label: 'Word' };
        }
        if (['xls', 'xlsx', 'csv'].includes(ext)) {
            return { icon: <FileText size={20} />, color: '#10b981', bg: '#ecfdf5', label: 'Excel' };
        }
        if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
            return { icon: <Eye size={20} />, color: '#8b5cf6', bg: '#f5f3ff', label: 'Image' };
        }
        return { icon: <FileText size={20} />, color: '#64748b', bg: '#f1f5f9', label: 'File' };
    };

    const getDocumentUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        return `${baseUrl}${url}`;
    };

    const formatFileSize = (bytes) => {
        if (bytes === null || bytes === undefined) return 'N/A';
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Client Documents</h3>
                <button 
                    onClick={() => setShowUploadModal(true)}
                    className="btn-primary" 
                    style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                    <Plus size={16} /> Upload Document
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748b', fontSize: '14px' }}>
                    Loading documents...
                </div>
            ) : documents.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', border: '1px dashed #e2e8f0', borderRadius: '12px' }}>
                    <FileText size={30} style={{ margin: '0 auto 10px auto', display: 'block', opacity: 0.5 }} />
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>No documents uploaded for this client</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '11px' }}>Keep all agreements and files grouped in one place.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {documents.map((doc) => {
                        const fileProps = getFileIcon(doc.document_file);
                        const fileUrl = getDocumentUrl(doc.document_file);
                        return (
                            <div 
                                key={doc.id} 
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between', 
                                    padding: '12px 15px', 
                                    background: '#f8fafc', 
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: fileProps.bg, color: fileProps.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {fileProps.icon}
                                    </div>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <div 
                                            onClick={() => setPreviewDoc(doc)}
                                            style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}
                                            title={doc.name}
                                        >
                                            {doc.name}
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                                            {formatFileSize(doc.file_size)} • Uploaded by {doc.uploaded_by_name || 'System'} on {doc.created_on ? new Date(doc.created_on).toLocaleDateString() : 'N/A'}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '6px', marginLeft: '15px' }}>
                                    <button 
                                        onClick={() => setPreviewDoc(doc)}
                                        className="btn-text" 
                                        style={{ padding: '6px', color: '#6366f1' }}
                                        title="Preview Document"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <a 
                                        href={fileUrl} 
                                        download 
                                        className="btn-text" 
                                        style={{ padding: '6px', color: '#10b981' }}
                                        title="Download Document"
                                    >
                                        <Download size={16} />
                                    </a>
                                    <button 
                                        onClick={() => setDeleteDoc(doc)}
                                        className="btn-text" 
                                        style={{ padding: '6px', color: '#ef4444' }}
                                        title="Delete Document"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modals */}
            {showUploadModal && (
                <DocumentUploadModal 
                    clients={[client]} 
                    preselectedClientId={client.id}
                    onClose={() => setShowUploadModal(false)} 
                    onUploadSuccess={loadDocuments} 
                    showToast={showToast}
                />
            )}

            {previewDoc && (
                <DocumentPreviewModal 
                    doc={previewDoc} 
                    onClose={() => setPreviewDoc(null)} 
                />
            )}

            {deleteDoc && (
                <DeleteConfirmationModal 
                    docName={deleteDoc.name} 
                    onConfirm={handleDeleteConfirm} 
                    onCancel={() => setDeleteDoc(null)} 
                />
            )}
        </div>
    );
};

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

