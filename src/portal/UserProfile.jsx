import { useState, useRef } from 'react';
import {
    User, Mail, Phone, MapPin, Briefcase, Building,
    Shield, Key, Bell, Globe, Moon, Sun,
    Monitor, Lock, LogOut, History, FileText,
    Plus, Download, Trash2, Edit3, Camera,
    CheckCircle, AlertCircle, Eye, EyeOff,
    Layout, Settings, Activity, Terminal
} from 'lucide-react';

// --- Dummy Data ---
const userData = {
    fullName: "Jane Doe",
    username: "janedoe",
    email: "jane.doe@royalsoftwares.co.ke",
    phone: "+254 700 000 000",
    jobTitle: "Senior Solutions Architect",
    department: "Engineering",
    role: "Admin",
    status: "Active",
    dateJoined: "January 15, 2024",
    bio: "Passionate about building scalable cloud solutions and improving developer workflows. 10+ years of experience in full-stack development.",
    address: "Westlands, Nairobi, Kenya",
    skills: ["React", "Node.js", "AWS", "Security Compliance"],
    certifications: ["AWS Certified Solutions Architect", "CISSP"]
};

const loginActivity = [
    { date: "2026-03-09 14:20", device: "MacBook Pro", browser: "Chrome", ip: "197.232.14.88", location: "Nairobi, KE" },
    { date: "2026-03-08 09:15", device: "iPhone 15", browser: "Mobile Safari", ip: "197.232.14.88", location: "Nairobi, KE" },
    { date: "2026-03-05 18:45", device: "Windows Desktop", browser: "Edge", ip: "197.248.55.12", location: "Mombasa, KE" }
];

const activityLog = [
    { action: "Profile Updated", date: "2026-03-09 10:30" },
    { action: "Password Changed", date: "2026-03-01 16:20" },
    { action: "2FA Enabled", date: "2026-02-15 09:00" }
];

const personalFiles = [
    { id: 1, name: "Employment_Contract.pdf", size: "1.2 MB", date: "2024-01-15" },
    { id: 2, name: "AWS_Certification.pdf", size: "2.5 MB", date: "2024-06-20" },
    { id: 3, name: "Profile_Backup_Settings.json", size: "45 KB", date: "2026-02-28" }
];

const UserProfile = () => {
    const [view, setView] = useState('overview'); // overview, editing, security, preferences, activity, files, api
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="profile-main-container portal-module animations-fade-in">
            <style>{`
                .profile-grid { display: grid; grid-template-columns: 300px 1fr; gap: 30px; }
                .profile-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
                .profile-skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
                .profile-bottom-nav { display: none; }

                @media (max-width: 1024px) {
                    .profile-grid { grid-template-columns: 1fr; }
                    .profile-sidebar { display: none; }
                    .profile-bottom-nav { 
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
                    .profile-main-container { padding-bottom: 80px; }
                }

                @media (max-width: 768px) {
                    .profile-info-grid { grid-template-columns: 1fr; }
                    .profile-skills-grid { grid-template-columns: 1fr; }
                    .edit-form-grid { grid-template-columns: 1fr !important; }
                    .security-form { max-width: 100% !important; }
                }
            `}</style>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>My Profile</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Manage your personal details, security, and account preferences.</p>
                </div>
            </div>

            <div className="profile-grid">
                {/* Sidebar Navigation */}
                <div className="profile-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div className="portal-content-card" style={{ padding: '25px', marginBottom: '10px', textAlign: 'center' }}>
                        <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 15px auto' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <User size={48} />
                            </div>
                            <button style={{ position: 'absolute', bottom: '0', right: '0', background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', padding: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                <Camera size={14} color="#6366f1" />
                            </button>
                        </div>
                        <h3 style={{ margin: '0 0 5px 0' }}>{userData.fullName}</h3>
                        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>{userData.jobTitle}</p>
                        <span style={{ display: 'inline-block', marginTop: '10px', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: '#ecfdf5', color: '#10b981' }}>{userData.role}</span>
                    </div>

                    <div className="portal-content-card" style={{ padding: '10px' }}>
                        <ProfileNavBtn icon={<User size={18} />} label="Overview" active={view === 'overview' || view === 'editing'} onClick={() => setView('overview')} />
                        <ProfileNavBtn icon={<Shield size={18} />} label="Security" active={view === 'security'} onClick={() => setView('security')} />
                        <ProfileNavBtn icon={<Settings size={18} />} label="Preferences" active={view === 'preferences'} onClick={() => setView('preferences')} />
                        <ProfileNavBtn icon={<History size={18} />} label="Logs & Activity" active={view === 'activity'} onClick={() => setView('activity')} />
                        <ProfileNavBtn icon={<FileText size={18} />} label="Personal Files" active={view === 'files'} onClick={() => setView('files')} />
                        <ProfileNavBtn icon={<Terminal size={18} />} label="API Access" active={view === 'api'} onClick={() => setView('api')} />
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="profile-bottom-nav">
                    <MobileNavBtn icon={<User size={20} />} active={view === 'overview' || view === 'editing'} onClick={() => setView('overview')} />
                    <MobileNavBtn icon={<Shield size={20} />} active={view === 'security'} onClick={() => setView('security')} />
                    <MobileNavBtn icon={<Settings size={20} />} active={view === 'preferences'} onClick={() => setView('preferences')} />
                    <MobileNavBtn icon={<History size={20} />} active={view === 'activity'} onClick={() => setView('activity')} />
                    <MobileNavBtn icon={<FileText size={20} />} active={view === 'files'} onClick={() => setView('files')} />
                    <MobileNavBtn icon={<Terminal size={20} />} active={view === 'api'} onClick={() => setView('api')} />
                </div>

                {/* Main Content Area */}
                <div className="profile-content">
                    {view === 'overview' && <ProfileOverview onEdit={() => setView('editing')} />}
                    {view === 'editing' && <ProfileEditForm onCancel={() => setView('overview')} />}
                    {view === 'security' && <SecuritySettings />}
                    {view === 'preferences' && <UserPreferences />}
                    {view === 'activity' && <ActivitySection />}
                    {view === 'files' && <FilesSection />}
                    {view === 'api' && <ApiAccessSection />}
                </div>
            </div>
        </div>
    );
};

// --- Sub-components ---

const ProfileNavBtn = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '10px',
        border: 'none', background: active ? '#6366f1' : 'transparent',
        color: active ? 'white' : '#64748b', fontWeight: 600, fontSize: '14px',
        cursor: 'pointer', transition: 'all 0.3s', width: '100%', textAlign: 'left'
    }} className={active ? '' : 'hover-bg-light'}>
        {icon} {label}
    </button>
);

const MobileNavBtn = ({ icon, active, onClick }) => (
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

const ProfileOverview = ({ onEdit }) => (
    <div className="animations-fade-in">
        <div className="portal-content-card" style={{ padding: '30px', marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                <h3 style={{ margin: 0 }}>Basic Information</h3>
                <button onClick={onEdit} className="btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Edit3 size={14} /> Edit Profile
                </button>
            </div>

            <div className="profile-info-grid">
                <DetailItem label="Full Name" value={userData.fullName} icon={<User size={16} />} />
                <DetailItem label="Email Address" value={userData.email} icon={<Mail size={16} />} />
                <DetailItem label="Phone Number" value={userData.phone} icon={<Phone size={16} />} />
                <DetailItem label="Username" value={userData.username} icon={<User size={16} />} />
                <DetailItem label="Department" value={userData.department} icon={<Building size={16} />} />
                <DetailItem label="Address" value={userData.address} icon={<MapPin size={16} />} />
            </div>

            <div style={{ marginTop: '30px', borderTop: '1px solid #f1f5f9', paddingTop: '25px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#64748b' }}>About Me</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#1e293b', margin: 0 }}>{userData.bio}</p>
            </div>
        </div>

        <div className="profile-skills-grid">
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h4 style={{ margin: '0 0 15px 0' }}>Professional Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {userData.skills.map(skill => (
                        <span key={skill} style={{ padding: '6px 14px', borderRadius: '10px', background: '#f1f5f9', color: '#475569', fontSize: '13px', fontWeight: 600 }}>{skill}</span>
                    ))}
                </div>
            </div>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h4 style={{ margin: '0 0 15px 0' }}>Certifications</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {userData.certifications.map(cert => (
                        <div key={cert} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b', fontSize: '14px' }}>
                            <CheckCircle size={16} color="#10b981" /> {cert}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const DetailItem = ({ label, value, icon }) => (
    <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ color: '#6366f1', marginTop: '3px' }}>{icon}</div>
        <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>{label}</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{value}</div>
        </div>
    </div>
);

const ProfileEditForm = ({ onCancel }) => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
        <h3 style={{ margin: '0 0 25px 0' }}>Edit Personal Information</h3>
        <form className="edit-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <InputField label="Full Name" defaultValue={userData.fullName} />
            <InputField label="Email Address" defaultValue={userData.email} />
            <InputField label="Phone Number" defaultValue={userData.phone} />
            <InputField label="Address" defaultValue={userData.address} />
            <InputField label="Job Title" defaultValue={userData.jobTitle} disabled />
            <InputField label="Department" defaultValue={userData.department} disabled />

            <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>Bio / About Me</label>
                <textarea
                    defaultValue={userData.bio}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '100px', fontSize: '14px' }}
                ></textarea>
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={onCancel} className="btn-outline" style={{ padding: '10px 25px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '10px 25px' }}>Save Changes</button>
            </div>
        </form>
    </div>
);

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

const SecuritySettings = () => (
    <div className="animations-fade-in">
        <div className="portal-content-card" style={{ padding: '30px', marginBottom: '25px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Update Password</h3>
            <form className="security-form" style={{ maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <InputField label="Current Password" type="password" placeholder="••••••••" />
                <InputField label="New Password" type="password" placeholder="••••••••" />
                <InputField label="Confirm New Password" type="password" placeholder="••••••••" />
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 25px' }}>Update Password</button>
            </form>
        </div>

        <div className="portal-content-card" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h3 style={{ margin: 0 }}>Two-Factor Authentication (2FA)</h3>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Add an extra layer of security to your account.</p>
                </div>
                <button className="btn-outline" style={{ color: '#10b981', borderColor: '#10b981' }}>Enable 2FA</button>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '25px', marginTop: '25px' }}>
                <h4 style={{ margin: '0 0 20px 0' }}>Active Sessions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {loginActivity.slice(0, 2).map((session, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <Monitor size={20} color="#64748b" />
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 700 }}>{session.browser} on {session.device}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{session.ip} • Nairobi, Kenya • {i === 0 ? 'Current Session' : '2 hours ago'}</div>
                                </div>
                            </div>
                            {i !== 0 && <button style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Revoke</button>}
                        </div>
                    ))}
                </div>
                <button className="btn-text" style={{ marginTop: '20px', color: '#ef4444', fontWeight: 700 }}>Log Out From All Devices</button>
            </div>
        </div>
    </div>
);

const UserPreferences = () => (
    <div className="animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Appearance & Portal UI</h3>
            <div style={{ display: 'flex', gap: '20px' }}>
                <ThemeOption label="Light Mode" active icon={<Sun size={24} />} />
                <ThemeOption label="Dark Mode" icon={<Moon size={24} />} />
                <ThemeOption label="System" icon={<Monitor size={24} />} />
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Global Preferences</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <SelectField label="Preferred Language" options={["English (US)", "Swahili", "French", "German"]} />
                <SelectField label="Time Zone" options={["(GMT+03:00) Nairobi", "(GMT+00:00) UTC", "(GMT-05:00) EST"]} />
                <SelectField label="Date Format" options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0' }}>Notification Channels</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <ToggleItem label="Email Notifications" desc="Receive updates, invoices, and summaries via email." active />
                <ToggleItem label="In-App Notifications" desc="Get pop-up alerts within the portal interface." active />
                <ToggleItem label="SMS Notifications" desc="Urgent alerts sent directly to your phone." />
                <ToggleItem label="Browser Push" desc="Notifications even when the portal isn't front & center." />
            </div>
        </div>
    </div>
);

const ThemeOption = ({ label, icon, active }) => (
    <div style={{
        flex: 1, padding: '20px', borderRadius: '15px', border: active ? '2px solid #6366f1' : '1px solid #e2e8f0',
        textAlign: 'center', cursor: 'pointer', background: active ? '#f5f7ff' : 'white'
    }}>
        <div style={{ color: active ? '#6366f1' : '#64748b', marginBottom: '10px' }}>{icon}</div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{label}</div>
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

const ActivitySection = () => (
    <div className="animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div className="portal-content-card" style={{ padding: '25px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Recent Login History</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                        <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Date & Time</th>
                        <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Device / Browser</th>
                        <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>IP Address</th>
                        <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {loginActivity.map((log, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '15px', fontSize: '14px' }}>{log.date}</td>
                            <td style={{ padding: '15px', fontSize: '14px' }}>{log.device} • {log.browser}</td>
                            <td style={{ padding: '15px', fontSize: '14px', fontFamily: 'monospace' }}>{log.ip}</td>
                            <td style={{ padding: '15px', fontSize: '14px' }}>{log.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="portal-content-card" style={{ padding: '25px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Account Activity Log</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {activityLog.map((log, i) => (
                    <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }}></div>
                        <div style={{ fontSize: '14px', flex: 1 }}>{log.action}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{log.date}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const FilesSection = () => (
    <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3 style={{ margin: 0 }}>My Personal Files</h3>
            <button className="btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={16} /> Upload New
            </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {personalFiles.map(file => (
                <div key={file.id} style={{ padding: '20px', borderRadius: '15px', border: '1px solid #f1f5f9', textAlign: 'center' }} className="hover-bg-light">
                    <div style={{ color: '#6366f1', marginBottom: '10px' }}><FileText size={32} /></div>
                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '5px', wordBreak: 'break-all' }}>{file.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '15px' }}>{file.size} • {file.date}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <button style={{ padding: '6px', borderRadius: '8px', border: 'none', background: '#f1f5f9', color: '#64748b' }}><Download size={14} /></button>
                        <button style={{ padding: '6px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: '#ef4444' }}><Trash2 size={14} /></button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ApiAccessSection = () => (
    <div className="animations-fade-in">
        <div className="portal-content-card" style={{ padding: '30px', marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h3 style={{ margin: 0 }}>Personal API Keys</h3>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Integrate Royal Services into your custom apps.</p>
                </div>
                <button className="btn-primary btn-sm"><Plus size={16} /> Generate Key</button>
            </div>

            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 700 }}>Production_Main_Key</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Created: 2 weeks ago • Last used: 2 hours ago</div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn-text" style={{ fontSize: '12px' }}>View Key</button>
                        <button className="btn-text" style={{ fontSize: '12px', color: '#ef4444' }}>Revoke</button>
                    </div>
                </div>
            </div>

            <div style={{ fontSize: '13px', color: '#64748b', padding: '15px', borderLeft: '4px solid #f59e0b', background: '#fffbeb' }}>
                <AlertCircle size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Never share your API keys or post them publicly.
            </div>
        </div>

        <div className="portal-content-card" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>API Permissions Scope</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <ToggleItem label="Read Projects" desc="Allows reading project details and milestones." active />
                <ToggleItem label="Write Finance" desc="Allows creating invoices and logging expenses." />
                <ToggleItem label="Read Support" desc="Allows accessing support ticket history." active />
            </div>
        </div>
    </div>
);

export default UserProfile;
