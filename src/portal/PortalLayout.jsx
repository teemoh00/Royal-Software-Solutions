import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useCompany } from '../services/CompanyContext';
import { apiClient } from '../services/apiClient';
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    User,
    DollarSign,
    Users,
    Headset,
    Bell,
    Search,
    Briefcase,
    Building,
    UserCircle,
    ChevronDown,
    ChevronRight,
    CircleDot
} from 'lucide-react';

const PortalLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState('Admin');
    const [showNotifications, setShowNotifications] = useState(false);
    const [adminName, setAdminName] = useState('Administrator');
    const [expandedNav, setExpandedNav] = useState('/portal/admin/sales');

    const { company } = useCompany();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const viewParam = queryParams.get('view');

    // Load logged-in user name
    useEffect(() => {
        const user = apiClient.auth.getCurrentUser();
        if (user) {
            const name = user.full_name ||
                `${user.first_name || ''} ${user.last_name || ''}`.trim() ||
                user.username || 'Administrator';
            setAdminName(name);
            if (user.is_superuser) setUserRole('Admin');
            else if (user.is_staff) setUserRole('Admin');
        }
    }, []);

    // Auto-close mobile drawer & dropdowns on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setShowNotifications(false);
    }, [location.pathname]);

    // Handle responsive sidebar behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        if (window.innerWidth <= 1024) {
            setMobileMenuOpen(!mobileMenuOpen);
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };

    const isActive = (path, subView = null) => {
        if (subView) {
            return location.pathname === path && viewParam === subView ? 'active' : '';
        }
        return location.pathname === path && !viewParam ? 'active' : '';
    };

    // --- Role Based Navigation Layout ---
    const navLinks = [
        { path: '/portal/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', roles: ['Admin', 'Finance', 'Sales', 'Support'] },
        { path: '/portal/admin/projects', icon: <Briefcase size={20} />, label: 'Project Management', roles: ['Admin'] },
        { path: '/portal/admin/finance', icon: <DollarSign size={20} />, label: 'Finance & Accounting', roles: ['Admin', 'Finance'] },
        { path: '/portal/admin/hr', icon: <UserCircle size={20} />, label: 'HR & Staff', roles: ['Admin'] },
        { 
            path: '/portal/admin/sales', icon: <Users size={20} />, label: 'Sales Management', roles: ['Admin', 'Sales'],
            subLinks: [
                { view: 'dashboard', label: 'Overview' },
                { view: 'sales_registry', label: 'Sales Registry' },
                { view: 'leads', label: 'Leads' },
                { view: 'pipeline', label: 'Pipeline' },
                { view: 'deals', label: 'Deals' },
                { view: 'quotations', label: 'Quotations' },
                { view: 'activities', label: 'Activities' },
                { view: 'reports', label: 'Reports' },
                { view: 'documents', label: 'Documents' }
            ]
        },
        { path: '/portal/admin/clients', icon: <Building size={20} />, label: 'Client Management', roles: ['Admin', 'Sales'] },
        { path: '/portal/admin/support-tickets', icon: <Headset size={20} />, label: 'Support Tickets', roles: ['Admin', 'Support'] }
    ];

    const filteredLinks = navLinks.filter(link => link.roles.includes(userRole));

    return (
        <div className="portal-layout">
            {/* Sidebar */}
            <aside className={`portal-sidebar ${sidebarOpen ? 'open' : 'closed'} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/portal/admin/dashboard" className="sidebar-logo">
                        <img
                            src={company.logo || '/logo (2).png'}
                            alt={company.name}
                            className="sidebar-logo-img"
                            onError={(e) => { e.target.src = '/logo (2).png'; }}
                        />
                        <span className={`sidebar-logo-text ${(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}`}>
                            {company.name || 'Staff Portal'}
                        </span>
                    </Link>
                    <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <div className="sidebar-nav-container">
                    <p className={`sidebar-label ${(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}`}>CORE MODULES {userRole !== 'Admin' && `(${userRole})`}</p>
                    <nav className="sidebar-nav">
                        {filteredLinks.map((link) => (
                            <div key={link.path}>
                                {link.subLinks ? (
                                    <div 
                                        className={`sidebar-link ${location.pathname === link.path ? 'active-parent' : ''}`} 
                                        onClick={() => setExpandedNav(expandedNav === link.path ? null : link.path)}
                                        style={{ cursor: 'pointer', justifyContent: 'space-between' }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            {link.icon}
                                            <span className={(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}>{link.label}</span>
                                        </div>
                                        {(sidebarOpen || mobileMenuOpen) && (
                                            expandedNav === link.path ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                                        )}
                                    </div>
                                ) : (
                                    <Link to={link.path} className={`sidebar-link ${isActive(link.path)}`} title={link.label}>
                                        {link.icon}
                                        <span className={(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}>{link.label}</span>
                                    </Link>
                                )}
                                
                                {link.subLinks && expandedNav === link.path && (sidebarOpen || mobileMenuOpen) && (
                                    <div className="sidebar-submenu animations-fade-in" style={{ marginLeft: '10px', paddingLeft: '20px', borderLeft: '1px solid rgba(255,255,255,0.1)', marginTop: '5px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        {link.subLinks.map(sub => (
                                            <Link 
                                                key={sub.view} 
                                                to={`${link.path}?view=${sub.view}`} 
                                                className={`sidebar-sublink ${isActive(link.path, sub.view)}`}
                                                style={{ 
                                                    padding: '8px 12px', 
                                                    borderRadius: '8px',
                                                    color: isActive(link.path, sub.view) ? 'white' : '#94a3b8',
                                                    fontSize: '13px',
                                                    textDecoration: 'none',
                                                    background: isActive(link.path, sub.view) ? '#6366f1' : 'transparent',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <CircleDot size={10} style={{ opacity: isActive(link.path, sub.view) ? 1 : 0.5 }} />
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <p className={`sidebar-label ${(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}`}>ACCOUNT</p>
                    <nav className="sidebar-nav">
                        <Link to="/portal/admin/profile" className={`sidebar-link ${isActive('/portal/admin/profile')}`} title="Profile">
                            <User size={20} />
                            <span className={(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}>Profile</span>
                        </Link>



                        <Link to="/portal/admin/settings" className={`sidebar-link ${isActive('/portal/admin/settings')}`} title="Settings">
                            <Settings size={20} />
                            <span className={(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}>Settings</span>
                        </Link>
                    </nav>
                </div>

                <div className="sidebar-footer">
                    <Link to="/" className="sidebar-link logout" title="Logout">
                        <LogOut size={20} />
                        <span className={(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className={`portal-main-wrapper ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                {/* Topbar */}
                <header className="portal-topbar">
                    <div className="topbar-left">
                        <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                            <Menu size={24} />
                        </button>
                        <h2 className="topbar-page-title desktop-only">
                            {location.pathname === '/portal/admin/dashboard' ? 'Overview' :
                                location.pathname.split('/').pop().replace('-', ' ').toUpperCase()}
                        </h2>
                    </div>

                    <div className="topbar-right">
                        {/* Global Search Interface */}
                        <div className="global-search desktop-only">
                            <Search size={18} />
                            <input type="text" placeholder="Search invoices, tickets, leads..." />
                        </div>

                        {/* Notifications System */}
                        <div className="notification-bell-container">
                            <button
                                className="notification-btn"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <Bell size={20} />
                                <span className="notification-badge">3</span>
                            </button>

                            {/* Dropdown UI */}
                            {showNotifications && (
                                <div className="notifications-dropdown">
                                    <div className="notifications-header">
                                        <h3>Notifications</h3>
                                        <button className="text-btn text-sm">Mark all read</button>
                                    </div>
                                    <div className="notifications-list">
                                        <div className="notification-item unread">
                                            <div className="notification-icon bg-warning">
                                                <MessageSquare size={14} />
                                            </div>
                                            <div className="notification-content">
                                                <p>New support ticket #TK-895 created</p>
                                                <span>Just now</span>
                                            </div>
                                        </div>
                                        <div className="notification-item unread">
                                            <div className="notification-icon bg-success">
                                                <DollarSign size={14} />
                                            </div>
                                            <div className="notification-content">
                                                <p>Invoice #INV-2026-048 paid</p>
                                                <span>2 hours ago</span>
                                            </div>
                                        </div>
                                        <div className="notification-item">
                                            <div className="notification-icon bg-primary">
                                                <Users size={14} />
                                            </div>
                                            <div className="notification-content">
                                                <p>New lead assigned to you: Mega-Mart</p>
                                                <span>Yesterday</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notifications-footer">
                                        <Link to="/portal/notifications" className="view-all-link">View All Activity</Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile Area */}
                        <Link to="/portal/admin/profile" className="user-profile-menu" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="user-avatar">
                                <User size={20} />
                            </div>
                            <div className="user-info desktop-only">
                                <span className="user-name">{adminName}</span>
                                <span className="user-role">{userRole} · {company.name}</span>
                            </div>
                        </Link>

                    </div>
                </header>

                {/* Page Content */}
                <main className="portal-content-area">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div className="portal-mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
            )}
        </div>
    );
};

export default PortalLayout;
