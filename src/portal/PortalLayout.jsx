import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
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
    UserCircle
} from 'lucide-react';

const PortalLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Simulate User Role & Notification State for Phase 1
    const [userRole, setUserRole] = useState('Admin'); // Can be 'Admin', 'Finance', 'Sales', 'Support'
    const [showNotifications, setShowNotifications] = useState(false);

    const location = useLocation();

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

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    // --- Role Based Navigation Layout ---
    const navLinks = [
        { path: '/portal/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', roles: ['Admin', 'Finance', 'Sales', 'Support', 'Client'] },
        { path: '/portal/projects', icon: <Briefcase size={20} />, label: 'Project Management', roles: ['Admin', 'Client'] },
        { path: '/portal/finance', icon: <DollarSign size={20} />, label: 'Finance & Accounting', roles: ['Admin', 'Finance', 'Client'] },
        { path: '/portal/hr', icon: <UserCircle size={20} />, label: 'HR & Staff', roles: ['Admin'] },
        { path: '/portal/sales', icon: <Users size={20} />, label: 'Sales Management', roles: ['Admin', 'Sales'] },
        { path: '/portal/clients', icon: <Building size={20} />, label: 'Client Management', roles: ['Admin', 'Sales'] },
        { path: '/portal/support-tickets', icon: <Headset size={20} />, label: 'Support Tickets', roles: ['Admin', 'Support', 'Client'] }
    ];

    const filteredLinks = navLinks.filter(link => link.roles.includes(userRole));

    return (
        <div className="portal-layout">
            {/* Sidebar */}
            <aside className={`portal-sidebar ${sidebarOpen ? 'open' : 'closed'} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/portal/dashboard" className="sidebar-logo">
                        <img src="/logo (2).png" alt="Royal Software Solutions" className="sidebar-logo-img" />
                        <span className={`sidebar-logo-text ${(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}`}>Royal Portal</span>
                    </Link>
                    {window.innerWidth <= 1024 && (
                        <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
                            <X size={24} />
                        </button>
                    )}
                </div>

                <div className="sidebar-nav-container">
                    <p className={`sidebar-label ${(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}`}>CORE MODULES {userRole !== 'Admin' && `(${userRole})`}</p>
                    <nav className="sidebar-nav">
                        {filteredLinks.map((link) => (
                            <Link key={link.path} to={link.path} className={`sidebar-link ${isActive(link.path)}`} title={link.label}>
                                {link.icon}
                                <span className={(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}>{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <p className={`sidebar-label ${(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}`}>ACCOUNT</p>
                    <nav className="sidebar-nav">
                        <Link to="/portal/profile" className={`sidebar-link ${isActive('/portal/profile')}`} title="Profile">
                            <User size={20} />
                            <span className={(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}>Profile</span>
                        </Link>



                        <Link to="/portal/settings" className={`sidebar-link ${isActive('/portal/settings')}`} title="Settings">
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
                            {location.pathname === '/portal/dashboard' ? 'Overview' :
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
                        <Link to="/portal/profile" className="user-profile-menu" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="user-avatar">
                                <User size={20} />
                            </div>
                            <div className="user-info desktop-only">
                                <span className="user-name">Jane Doe</span>
                                <span className="user-role">{userRole}</span>
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
