import { useState } from 'react';
import {
    Settings, Building, Users, Shield, Mail, CreditCard,
    Database, Activity, Lock, Globe, Bell, Save,
    Plus, Edit, Trash2, Key, Download, RefreshCw,
    AlertTriangle, FileText, ChevronRight, Check, X,
    Monitor, Server, Mailbox
} from 'lucide-react';

// --- Dummy Data ---
const initialRoles = [
    { id: 1, name: "Administrator", users: 3, status: "Active" },
    { id: 2, name: "Project Manager", users: 5, status: "Active" },
    { id: 3, name: "Finance Officer", users: 2, status: "Active" },
    { id: 4, name: "Sales Agent", users: 8, status: "Active" },
    { id: 5, name: "Support Staff", users: 6, status: "Active" },
    { id: 6, name: "Client", users: 45, status: "Active" }
];

const permissionModules = [
    { name: "Project Management", actions: ["View", "Create", "Edit", "Delete", "Manage Tasks"] },
    { name: "Finance & Accounting", actions: ["View Invoices", "Create Invoices", "Manage Expenses", "View Reports"] },
    { name: "Support System", actions: ["View Tickets", "Assign Tickets", "Resolve Tickets", "Manage KB"] },
    { name: "Client Portal", actions: ["View Profile", "Update Billing", "Download Docs"] }
];

const systemLogs = [
    { id: 1, user: "Admin (Jane)", action: "Enabled 2FA globally", module: "Security", time: "10 mins ago" },
    { id: 2, user: "System", action: "Automatic Backup completed", module: "Database", time: "1 hour ago" },
    { id: 3, user: "Finance (Bob)", action: "Updated Tax rates", module: "Settings", time: "3 hours ago" },
    { id: 4, user: "Admin (Jane)", action: "Modified 'Client' role permissions", module: "RBAC", time: "Yesterday" }
];

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general'); // general, rbac, security, email, integrations, backup, logs
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    return (
        <div className="settings-main-container portal-module animations-fade-in">
            <style>{`
                .settings-grid { display: grid; grid-template-columns: 260px 1fr; gap: 30px; }
                .settings-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .settings-bottom-nav { display: none; }

                @media (max-width: 1024px) {
                    .settings-grid { grid-template-columns: 1fr; }
                    .settings-sidebar { display: none; }
                    .settings-bottom-nav { 
                        display: flex; 
                        position: fixed; 
                        bottom: 0; 
                        left: 0; 
                        right: 0; 
                        background: rgba(255, 255, 255, 0.8); 
                        backdrop-filter: blur(10px); 
                        border-top: 1px solid #e2e8f0; 
                        padding: 10px; 
                        justify-content: space-around; 
                        z-index: 1000;
                        box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
                    }
                    .settings-main-container { padding-bottom: 80px; }
                }

                @media (max-width: 768px) {
                    .settings-form-grid { grid-template-columns: 1fr; }
                    .audit-log-row { grid-template-columns: 1fr !important; gap: 5px !important; }
                    .audit-log-time { text-align: left !important; }
                    .roles-table-container { overflow-x: auto; }
                    .integration-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>System Settings</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Configure global parameters, roles, and system integrations.</p>
                </div>
            </div>

            <div className="settings-grid">
                {/* Vertical Tabs Sidebar */}
                <div className="settings-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <TabBtn icon={<Building size={18} />} label="General Config" active={activeTab === 'general'} onClick={() => setActiveTab('general')} />
                    <TabBtn icon={<Users size={18} />} label="Roles & Permissions" active={activeTab === 'rbac'} onClick={() => setActiveTab('rbac')} />
                    <TabBtn icon={<Shield size={18} />} label="System Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
                    <TabBtn icon={<Mail size={18} />} label="Emails & Notifications" active={activeTab === 'email'} onClick={() => setActiveTab('email')} />
                    <TabBtn icon={<CreditCard size={18} />} label="Payments & API" active={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
                    <TabBtn icon={<Database size={18} />} label="Backup & Export" active={activeTab === 'backup'} onClick={() => setActiveTab('backup')} />
                    <TabBtn icon={<Activity size={18} />} label="Audit Logs" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />

                    <div style={{ marginTop: '20px', padding: '15px', borderRadius: '15px', background: maintenanceMode ? '#fef2f2' : '#f8fafc', border: `1px solid ${maintenanceMode ? '#fecaca' : '#e2e8f0'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: maintenanceMode ? '#ef4444' : '#64748b' }}>Maintenance Mode</span>
                            <div
                                onClick={() => setMaintenanceMode(!maintenanceMode)}
                                style={{ width: '36px', height: '20px', borderRadius: '10px', background: maintenanceMode ? '#ef4444' : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}
                            >
                                <div style={{ width: '14px', height: '14px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: maintenanceMode ? '19px' : '3px', transition: 'all 0.3s' }} />
                            </div>
                        </div>
                        <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '5px', lineHeight: '1.4' }}>When enabled, clients cannot access the portal.</p>
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="settings-bottom-nav">
                    <MobileSettingsBtn icon={<Building size={20} />} active={activeTab === 'general'} onClick={() => setActiveTab('general')} />
                    <MobileSettingsBtn icon={<Users size={20} />} active={activeTab === 'rbac'} onClick={() => setActiveTab('rbac')} />
                    <MobileSettingsBtn icon={<Shield size={20} />} active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
                    <MobileSettingsBtn icon={<Mail size={20} />} active={activeTab === 'email'} onClick={() => setActiveTab('email')} />
                    <MobileSettingsBtn icon={<CreditCard size={20} />} active={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
                    <MobileSettingsBtn icon={<Database size={20} />} active={activeTab === 'backup'} onClick={() => setActiveTab('backup')} />
                    <MobileSettingsBtn icon={<Activity size={20} />} active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
                </div>

                {/* Settings Content Area */}
                <div className="settings-content">
                    {activeTab === 'general' && <GeneralSettings />}
                    {activeTab === 'rbac' && <RbacSettings />}
                    {activeTab === 'security' && <SecuritySettings />}
                    {activeTab === 'email' && <EmailSettings />}
                    {activeTab === 'integrations' && <IntegrationsSettings />}
                    {activeTab === 'backup' && <BackupSettings />}
                    {activeTab === 'logs' && <LogsSettings />}
                </div>
            </div>
        </div>
    );
};

// --- Sub-components for each Tab ---

const TabBtn = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '10px',
        border: 'none', background: active ? '#6366f1' : 'transparent',
        color: active ? 'white' : '#64748b', fontWeight: 600, fontSize: '14px',
        cursor: 'pointer', transition: 'all 0.3s', width: '100%', textAlign: 'left'
    }} className={active ? '' : 'hover-bg-light'}>
        {icon} {label}
    </button>
);

const MobileSettingsBtn = ({ icon, active, onClick }) => (
    <button onClick={onClick} style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '10px', border: 'none', background: 'transparent',
        color: active ? '#6366f1' : '#64748b', transition: 'all 0.3s', cursor: 'pointer'
    }}>
        <div style={{
            padding: '8px', borderRadius: '12px',
            background: active ? '#6366f115' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {icon}
        </div>
    </button>
);

const GeneralSettings = () => (
    <div className="animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Company Information</h3>
            <div className="settings-form-grid">
                <InputField label="Company Name" defaultValue="Royal Software Solutions" />
                <InputField label="Company Email" defaultValue="admin@royalsoftwares.co.ke" />
                <InputField label="Company Phone" defaultValue="+254 700 123 456" />
                <InputField label="Website URL" defaultValue="https://royalsoftwares.co.ke" />
                <div style={{ gridColumn: 'span 2' }}>
                    <div className="settings-form-grid">
                        <InputField label="Office Address" defaultValue="Westlands, Nairobi, Kenya" />
                    </div>
                </div>
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>System Preferences</h3>
            <div className="settings-form-grid">
                <SelectField label="Default Currency" options={["KES (KSh)", "USD ($)", "EUR (€)", "GBP (£)"]} />
                <SelectField label="Time Zone" options={["(GMT+03:00) Nairobi", "(GMT+00:00) UTC", "(GMT-05:00) EST"]} />
                <SelectField label="Language" options={["English", "Swahili", "French"]} />
                <SelectField label="Date Format" options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
            </div>
        </div>

        <button className="btn-primary" style={{ alignSelf: 'flex-end', padding: '12px 30px' }}>Save Changes</button>
    </div>
);

const RbacSettings = () => (
    <div className="animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div className="portal-content-card" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>System Roles</h3>
                <button className="btn-primary btn-sm"><Plus size={16} /> Create Role</button>
            </div>
            <div className="roles-table-container">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Role Name</th>
                            <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Users Count</th>
                            <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Status</th>
                            <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialRoles.map(role => (
                            <tr key={role.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '15px', fontWeight: 700 }}>{role.name}</td>
                                <td style={{ padding: '15px' }}>{role.users} Members</td>
                                <td style={{ padding: '15px' }}><span style={{ color: '#10b981', fontSize: '12px', fontWeight: 700 }}>● {role.status}</span></td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button className="icon-btn-sm" title="Edit"><Edit size={14} /></button>
                                        <button className="icon-btn-sm danger" title="Delete"><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '25px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Permissions Matrix (Administrator)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {permissionModules.map(module => (
                    <div key={module.name} style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px' }}>
                        <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#1e293b' }}>{module.name}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                            {module.actions.map(action => (
                                <div key={action} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                        <Check size={12} strokeWidth={4} />
                                    </div>
                                    <span style={{ fontSize: '13px', color: '#475569' }}>{action}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const SecuritySettings = () => (
    <div className="animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Password Policy</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <ToggleItem label="Enforce Strong Passwords" desc="Require special characters, numbers, and mixed case." active />
                <ToggleItem label="Password Expiry" desc="Force users to change password every 90 days." />
                <ToggleItem label="Prevent Reuse" desc="Users cannot reuse their last 5 passwords." active />
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Account Security</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <ToggleItem label="Require 2FA" desc="Mandatory two-factor authentication for all staff members." active />
                <ToggleItem label="Auto Session Timeout" desc="Log users out after 30 minutes of inactivity." active />
                <ToggleItem label="IP Restricted Access" desc="Only allow logins from approved company IP addresses." />
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>System Firewall</h3>
            <div style={{ padding: '20px', borderRadius: '15px', background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', gap: '15px' }}>
                <AlertTriangle color="#f59e0b" size={24} />
                <div>
                    <h5 style={{ margin: '0 0 5px 0', color: '#92400e' }}>Intrusion Detection is Active</h5>
                    <p style={{ margin: 0, fontSize: '13px', color: '#b45309' }}>The system is automatically blocking repeated failed login attempts from 12 malicious IP sources.</p>
                </div>
            </div>
        </div>
    </div>
);

const EmailSettings = () => (
    <div className="animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>SMTP Server Configuration</h3>
            <div className="settings-form-grid">
                <InputField label="SMTP Host" defaultValue="smtp.royalsoftwares.co.ke" />
                <InputField label="Port" defaultValue="587" />
                <InputField label="Username" defaultValue="notifications@royalsoftwares.co.ke" />
                <InputField label="Password" type="password" defaultValue="••••••••••••" />
                <SelectField label="Encryption" options={["TLS", "SSL", "None"]} />
                <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '25px' }}>
                    <RefreshCw size={14} /> Send Test Email
                </button>
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Automated Notifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <ToggleItem label="Project Creation Emails" desc="Notify clients when a new project is initialized." active />
                <ToggleItem label="Invoice Payment Alerts" desc="Send confirmation email upon successful payment." active />
                <ToggleItem label="Support Ticket Assignments" desc="Notify staff when they are assigned a new ticket." active />
                <ToggleItem label="System Maintenance Alerts" desc="Email all users regarding planned downtime." />
            </div>
        </div>
    </div>
);

const IntegrationsSettings = () => (
    <div className="animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Payment Gateways</h3>
            <div className="settings-form-grid integration-grid">
                <div style={{ padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CreditCard size={20} color="#6366f1" />
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 700 }}>Stripe Payments</div>
                            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>CONNECTED</div>
                        </div>
                    </div>
                    <Settings size={16} color="#64748b" style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Globe size={20} color="#0070ba" />
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 700 }}>PayPal Checkout</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>NOT CONNECTED</div>
                        </div>
                    </div>
                    <Plus size={16} color="#6366f1" style={{ cursor: 'pointer' }} />
                </div>
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>External Integrations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <IntegrationRow name="Slack Notifications" desc="Post portal alerts to #dev-updates Slack channel." status="Active" />
                <IntegrationRow name="Google Calendar" desc="Sync project milestones with staff calendars." status="Inactive" />
                <IntegrationRow name="QuickBooks Online" desc="Automatic sync of invoices and expenses." status="Active" />
            </div>
        </div>
    </div>
);

const BackupSettings = () => (
    <div className="animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div className="portal-content-card" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ margin: 0 }}>System Backups</h3>
                <button className="btn-primary btn-sm"><RefreshCw size={14} style={{ marginRight: '8px' }} /> Backup Now</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <ToggleItem label="Automated Backups" desc="Schedule daily database backups to cloud storage." active />
                <SelectField label="Backup Frequency" options={["Every 6 Hours", "Daily (Midnight)", "Weekly (Sunday)"]} />
                <div style={{ padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700 }}><Database size={14} /> Last Backup: backup_2026_03_09.sql</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>145MB • Success</span>
                    </div>
                    <button className="btn-text" style={{ fontSize: '12px', padding: 0 }}><Download size={14} /> Download</button>
                </div>
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Bulk Data Export</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>Export all system records in various formats for offline processing.</p>
            <div style={{ display: 'flex', gap: '15px' }}>
                <ExportBtn format="Excel" />
                <ExportBtn format="CSV" />
                <ExportBtn format="PDF Report" />
            </div>
        </div>
    </div>
);

const LogsSettings = () => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>System Audit Logs</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-outline btn-sm">Filter</button>
                <button className="btn-outline btn-sm">Clear Logs</button>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {systemLogs.map(log => (
                <div key={log.id} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 120px 100px', gap: '15px', padding: '15px', borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light audit-log-row">
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{log.user}</span>
                    <span style={{ fontSize: '13px' }}>{log.action}</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#6366f1' }}>{log.module.toUpperCase()}</span>
                    <span style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'right' }} className="audit-log-time">{log.time}</span>
                </div>
            ))}
        </div>
        <button className="btn-text" style={{ width: '100%', marginTop: '15px', color: '#6366f1', fontWeight: 700 }}>Load Older Logs</button>
    </div>
);

// --- Generic UI Components ---

const InputField = ({ label, defaultValue, type = "text", disabled = false }) => (
    <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>{label}</label>
        <input
            type={type}
            defaultValue={defaultValue}
            disabled={disabled}
            style={{ width: '100%', padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', background: disabled ? '#f8fafc' : 'white', fontSize: '14px' }}
        />
    </div>
);

const SelectField = ({ label, options }) => (
    <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>{label}</label>
        <select style={{ width: '100%', padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}>
            {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
    </div>
);

const ToggleItem = ({ label, desc, active }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{desc}</div>
        </div>
        <div style={{
            width: '44px', height: '24px', borderRadius: '12px', background: active ? '#6366f1' : '#e2e8f0',
            position: 'relative', cursor: 'pointer'
        }}>
            <div style={{
                width: '18px', height: '18px', borderRadius: '50%', background: 'white',
                position: 'absolute', top: '3px', left: active ? '23px' : '3px',
                transition: 'all 0.3s'
            }}></div>
        </div>
    </div>
);

const IntegrationRow = ({ name, desc, status }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
        <div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>{name}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{desc}</div>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '10px', background: status === 'Active' ? '#ecfdf5' : '#f1f5f9', color: status === 'Active' ? '#10b981' : '#64748b' }}>{status.toUpperCase()}</span>
    </div>
);

const ExportBtn = ({ format }) => (
    <button className="btn-outline" style={{ flex: 1, padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <FileText size={20} />
        <span style={{ fontSize: '12px', fontWeight: 700 }}>Export as {format}</span>
    </button>
);

export default SettingsPage;
