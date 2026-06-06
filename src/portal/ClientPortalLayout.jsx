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
    UserCircle,
    FileText
} from 'lucide-react';
import { apiClient } from '../services/apiClient';
import { useCompany } from '../services/CompanyContext';

const ClientPortalLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [clientName, setClientName] = useState('Valued Client');
    const [clientEmail, setClientEmail] = useState('');

    const { company } = useCompany();
    const location = useLocation();

    // Auto-close mobile drawer on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setShowNotifications(false);
    }, [location.pathname]);

    // Fetch user details
    useEffect(() => {
        const user = apiClient.auth.getCurrentUser();
        if (user) {
            const name = user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username;
            setClientName(name || 'Valued Client');
            setClientEmail(user.email || '');
        }
    }, []);

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

    const clientNavLinks = [
        { path: '/portal/client/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/portal/client/projects', icon: <Briefcase size={20} />, label: 'My Projects' },
        { path: '/portal/client/billing', icon: <DollarSign size={20} />, label: 'Billing & Invoices' },
        { path: '/portal/client/support', icon: <Headset size={20} />, label: 'Support Tickets' }
    ];

    return (
        <div className="portal-layout client-portal">
            <style>{`
                /* Client portal specific premium style updates */
                .client-portal .portal-sidebar {
                    background: linear-gradient(180deg, #0f2d37 0%, #07181e 100%);
                    border-right: 1px solid rgba(200, 155, 42, 0.15);
                }
                .client-portal .sidebar-logo-text {
                    color: #C89B2A;
                    font-family: 'Outfit', sans-serif;
                }
                .client-portal .sidebar-link.active {
                    background: linear-gradient(90deg, rgba(200, 155, 42, 0.25) 0%, rgba(27, 107, 107, 0.1) 100%);
                    color: #C89B2A;
                    border-left: 3px solid #C89B2A;
                }
                .client-portal .sidebar-link:hover:not(.active) {
                    background: rgba(255, 255, 255, 0.03);
                    color: #fff;
                }
                .client-portal .sidebar-label {
                    color: rgba(255, 255, 255, 0.3);
                }
                .client-portal .user-avatar {
                    background: rgba(200, 155, 42, 0.15) !important;
                    color: #C89B2A !important;
                    border: 1px solid rgba(200, 155, 42, 0.3);
                }
                .client-portal .notification-badge {
                    background: #C89B2A;
                }
            `}</style>
            
            {/* Sidebar */}
            <aside className={`portal-sidebar ${sidebarOpen ? 'open' : 'closed'} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/portal/client/dashboard" className="sidebar-logo">
                        <img
                            src={company.logo || '/logo (2).png'}
                            alt={company.name}
                            className="sidebar-logo-img"
                            onError={(e) => { e.target.src = '/logo (2).png'; }}
                        />
                        <span className={`sidebar-logo-text ${(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}`}>
                            {company.name ? `${company.name.split(' ')[0]} Hub` : 'Client Hub'}
                        </span>
                    </Link>
                    <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <div className="sidebar-nav-container">
                    <p className={`sidebar-label ${(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}`}>CLIENT WORKSPACE</p>
                    <nav className="sidebar-nav">
                        {clientNavLinks.map((link) => (
                            <Link key={link.path} to={link.path} className={`sidebar-link ${isActive(link.path)}`} title={link.label}>
                                {link.icon}
                                <span className={(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}>{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <p className={`sidebar-label ${(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}`}>SETTINGS</p>
                    <nav className="sidebar-nav">
                        <Link to="/portal/client/profile" className={`sidebar-link ${isActive('/portal/client/profile')}`} title="Profile Settings">
                            <User size={20} />
                            <span className={(sidebarOpen || mobileMenuOpen) ? 'visible' : 'hidden'}>My Profile</span>
                        </Link>
                    </nav>
                </div>

                <div className="sidebar-footer">
                    <Link to="/" className="sidebar-link logout" title="Logout" onClick={() => apiClient.auth.logout()}>
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
                            {location.pathname === '/portal/client/dashboard' ? 'Overview' :
                                location.pathname.split('/').pop().replace('-', ' ').toUpperCase()}
                        </h2>
                    </div>

                    <div className="topbar-right">
                        {/* Notifications System */}
                        <div className="notification-bell-container">
                            <button
                                className="notification-btn"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <Bell size={20} />
                                <span className="notification-badge">2</span>
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
                                            <div className="notification-icon bg-warning" style={{ backgroundColor: 'rgba(200,155,42,0.15)', color: '#C89B2A' }}>
                                                <FileText size={14} />
                                            </div>
                                            <div className="notification-content">
                                                <p>Proposal for Website Redesign upload complete</p>
                                                <span>10 mins ago</span>
                                            </div>
                                        </div>
                                        <div className="notification-item unread">
                                            <div className="notification-icon bg-success">
                                                <DollarSign size={14} />
                                            </div>
                                            <div className="notification-content">
                                                <p>Invoice #INV-2026-001 issued for review</p>
                                                <span>1 day ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notifications-footer">
                                        <span className="view-all-link" style={{ cursor: 'pointer' }}>Close</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile Area */}
                        <div className="user-profile-menu">
                            <div className="user-avatar">
                                <User size={20} />
                            </div>
                            <div className="user-info desktop-only">
                                <span className="user-name">{clientName}</span>
                                <span className="user-role" style={{ color: '#C89B2A' }}>Client · {company.name}</span>
                            </div>
                        </div>

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

export default ClientPortalLayout;
