import React, { useState } from 'react';
import {
    LayoutDashboard, List, PlusCircle, Search, Filter,
    MoreVertical, Briefcase, CheckCircle, Clock, AlertTriangle,
    PieChart as PieChartIcon, BarChart as BarChartIcon, TrendingUp,
    Users, DollarSign, Calendar, ArrowRight, Activity
} from 'lucide-react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from 'recharts';

// --- Dummy Data ---
const projectStats = {
    total: 42,
    active: 28,
    completed: 10,
    pending: 4,
    overdue: 2,
    awaitingApproval: 3
};

const statusDistribution = [
    { name: 'Active', value: 28, color: '#3b82f6' },
    { name: 'Completed', value: 10, color: '#10b981' },
    { name: 'Pending', value: 4, color: '#f59e0b' },
];

const completionData = [
    { month: 'Jan', completed: 4 },
    { month: 'Feb', completed: 6 },
    { month: 'Mar', completed: 3 },
    { month: 'Apr', completed: 8 },
    { month: 'May', completed: 5 },
    { month: 'Jun', completed: 10 },
];

const recentActivities = [
    { id: 1, type: 'create', user: 'Timothy', project: 'Website Redesign', time: '10 mins ago', detail: 'New project created' },
    { id: 2, type: 'milestone', user: 'Alice', project: 'ERP Implementation', time: '1 hour ago', detail: 'Planning Phase completed' },
    { id: 3, type: 'task', user: 'Bob', project: 'Mobile App', time: '3 hours ago', detail: 'UI Design task assigned to Sarah' },
    { id: 4, type: 'file', user: 'Charlie', project: 'SEO Campaign', time: '5 hours ago', detail: 'Requirements.pdf uploaded' },
];

const projectsData = [
    { id: 'PRJ-001', name: 'Website Redesign', client: 'Acme Corp', manager: 'Timothy', members: 3, start: '2026-03-01', deadline: '2026-04-15', progress: 35, status: 'Active', priority: 'High', budget: '$5,000' },
    { id: 'PRJ-002', name: 'ERP Implementation', client: 'Global Tech', manager: 'Alice', members: 5, start: '2026-02-15', deadline: '2026-06-30', progress: 15, status: 'Active', priority: 'Critical', budget: '$25,000' },
    { id: 'PRJ-003', name: 'Mobile App Dev', client: 'Stark Ind', manager: 'Bob', members: 4, start: '2026-01-10', deadline: '2026-03-05', progress: 95, status: 'On Hold', priority: 'High', budget: '$15,000' },
    { id: 'PRJ-004', name: 'SEO Campaign', client: 'Wayne Ent', manager: 'Charlie', members: 2, start: '2026-03-05', deadline: '2026-05-05', progress: 5, status: 'Active', priority: 'Medium', budget: '$3,500' },
    { id: 'PRJ-005', name: 'Cloud Migration', client: 'Lex Corp', manager: 'Timothy', members: 6, start: '2025-12-01', deadline: '2026-02-28', progress: 100, status: 'Completed', priority: 'Critical', budget: '$45,000' },
];

const ProjectManagement = () => {
    const [view, setView] = useState('dashboard'); // dashboard, list, create, details
    const [selectedProject, setSelectedProject] = useState(null);
    const [userRole, setUserRole] = useState('Admin'); // Admin, PM, Staff, Client

    const handleSelectProject = (project) => {
        setSelectedProject(project);
        setView('details');
    };

    const renderDashboard = () => (
        <div className="project-dashboard animations-fade-in">
            {/* Stats Grid */}
            <div className="project-stats-grid" style={{ gap: '20px', marginBottom: '25px' }}>
                <StatCard title="Total Projects" value={projectStats.total} icon={<Briefcase size={20} />} color="#6366f1" />
                <StatCard title="Active" value={projectStats.active} icon={<Activity size={20} />} color="#3b82f6" />
                <StatCard title="Completed" value={projectStats.completed} icon={<CheckCircle size={20} />} color="#10b981" />
                <StatCard title="Overdue" value={projectStats.overdue} icon={<AlertTriangle size={20} />} color="#f43f5e" />
            </div>

            <div className="project-charts-grid" style={{ gap: '25px', marginBottom: '25px' }}>
                {/* Charts Section */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Monthly Completion</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span style={{ fontSize: '12px', color: '#64748b' }}>Last 6 Months</span>
                        </div>
                    </div>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={completionData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="completed" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600 }}>Status Distribution</h3>
                    <div style={{ height: '240px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusDistribution}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {statusDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="project-secondary-grid" style={{ gap: '25px' }}>
                {/* Recent Activity */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Project Activity</h3>
                        <button style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '13px', cursor: 'pointer' }}>View All</button>
                    </div>
                    <div className="activity-list">
                        {recentActivities.map((act) => (
                            <div key={act.id} className="activity-item" style={{ padding: '12px 0' }}>
                                <div className="activity-dot" style={{ backgroundColor: act.type === 'create' ? '#6366f1' : act.type === 'milestone' ? '#10b981' : '#f59e0b' }} />
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>
                                        {act.user} <span style={{ fontWeight: 400, color: '#64748b' }}>{act.detail}</span>
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                        <span style={{ fontSize: '12px', color: '#6366f1' }}>{act.project}</span>
                                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{act.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overdue/Urgent Projects */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600 }}>Urgent Attention</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <UrgentItem name="E-commerce Platform" deadline="Overdue by 2 days" priority="Critical" />
                        <UrgentItem name="Mobile App Security Patch" deadline="Due in 5 hours" priority="High" />
                        <UrgentItem name="Client Portal Beta" deadline="Due Tomorrow" priority="Critical" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <style>{`
                .project-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
                .project-charts-grid { display: grid; grid-template-columns: 2fr 1fr; }
                .project-secondary-grid { display: grid; grid-template-columns: 1fr 1fr; }
                .project-overview-grid { display: grid; grid-template-columns: 2fr 1fr; }
                
                @media (max-width: 1024px) {
                    .project-charts-grid, .project-secondary-grid, .project-overview-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .project-header-container {
                        flex-direction: column;
                        align-items: flex-start !important;
                        position: relative;
                        padding-bottom: 20px;
                    }
                    .project-nav-pills {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        border-radius: 20px 20px 0 0 !important;
                        background: rgba(255, 255, 255, 0.95) !important;
                        backdrop-filter: blur(10px);
                        padding: 15px 10px !important;
                        box-shadow: 0 -10px 30px rgba(0,0,0,0.15) !important;
                        z-index: 9999;
                        display: flex !important;
                        justify-content: space-around !important;
                        margin: 0 !important;
                        gap: 5px !important;
                    }
                    .project-nav-pills button {
                        flex: 1;
                        flex-direction: column;
                        gap: 2px !important;
                        padding: 8px 5px !important;
                        font-size: 10px !important;
                        background: transparent !important;
                        color: #64748b !important;
                    }
                    .project-nav-pills button svg {
                        width: 22px !important;
                        height: 22px !important;
                    }
                    .project-nav-pills button.active-nav-btn {
                        color: #6366f1 !important;
                    }
                    /* Ensure containers have enough padding at bottom */
                    .project-dashboard, .project-list-container, .project-details-container, .project-create-container {
                        padding-bottom: 100px !important;
                    }
                    .project-stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .project-details-header {
                        flex-direction: column;
                        align-items: flex-start !important;
                    }
                    .mobile-hide {
                        display: none !important;
                    }
                    .project-task-item {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 10px;
                    }
                    .project-tabs {
                        padding-bottom: 5px;
                    }
                    .role-switcher-container {
                        margin-bottom: 10px;
                    }
                }

                @media (max-width: 640px) {
                    .project-timeline-row {
                        flex-direction: column;
                        gap: 15px !important;
                    }
                }
            `}</style>
            {/* Header / Sub-nav */}
            <div className="project-header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>Project Management</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Manage and track your project life cycle</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ marginRight: '15px', color: '#64748b', fontSize: '13px' }}>
                        Role: <select value={userRole} onChange={(e) => setUserRole(e.target.value)} style={{ border: 'none', background: 'transparent', fontWeight: 700, color: '#1e293b', cursor: 'pointer' }}>
                            <option>Admin</option>
                            <option>PM</option>
                            <option>Staff</option>
                            <option>Client</option>
                        </select>
                    </div>
                    <div className="project-nav-pills" style={{ display: 'flex', gap: '8px', background: 'white', padding: '6px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <NavBtn icon={<LayoutDashboard size={18} />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} className={view === 'dashboard' ? 'active-nav-btn' : ''} />
                        <NavBtn icon={<List size={18} />} label="Projects" active={view === 'list'} onClick={() => setView('list')} className={view === 'list' ? 'active-nav-btn' : ''} />
                        {userRole !== 'Client' && <NavBtn icon={<PlusCircle size={18} />} label="Create" active={view === 'create'} onClick={() => setView('create')} className={view === 'create' ? 'active-nav-btn' : ''} />}
                    </div>
                </div>
            </div>

            {view === 'dashboard' && renderDashboard()}
            {view === 'list' && <ProjectListSection projects={projectsData} onSelectProject={handleSelectProject} role={userRole} />}
            {view === 'create' && <CreateProjectSection onCancel={() => setView('dashboard')} />}
            {view === 'details' && <ProjectDetailsSection project={selectedProject || projectsData[0]} onBack={() => { setView('list'); setSelectedProject(null); }} role={userRole} />}
        </div>
    );
};

// --- View Components ---

const ProjectDetailsSection = ({ project, onBack }) => {
    const [activeTab, setActiveTab] = useState('overview'); // overview, tasks, milestones, files, discussion

    return (
        <div className="project-details-container animations-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {/* Project Header */}
            <div className="project-details-header portal-content-card" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <button onClick={onBack} style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#64748b' }}>
                        <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{project.name}</h2>
                            <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', fontSize: '11px', fontWeight: 700 }}>{project.id}</span>
                        </div>
                        <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Client: {project.client} • Manager: {project.manager}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Project Progress</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className="mobile-hide" style={{ width: '150px', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${project.progress}%`, background: '#6366f1' }} />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 700 }}>{project.progress}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="project-tabs" style={{ display: 'flex', gap: '5px', borderBottom: '1px solid #e2e8f0', padding: '0 10px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                <TabItem label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<Briefcase size={16} />} />
                <TabItem label="Tasks" active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} icon={<CheckCircle size={16} />} />
                <TabItem label="Milestones" active={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')} icon={<TrendingUp size={16} />} />
                <TabItem label="Files" active={activeTab === 'files'} onClick={() => setActiveTab('files')} icon={<FileText size={16} />} />
                <TabItem label="Discussion" active={activeTab === 'discussion'} onClick={() => setActiveTab('discussion')} icon={<MessageSquare size={16} />} />
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'overview' && <ProjectOverviewTab project={project} />}
                {activeTab === 'tasks' && <ProjectTasksTab role={role} />}
                {activeTab === 'milestones' && <ProjectMilestonesTab />}
                {activeTab === 'files' && <ProjectFilesTab role={role} />}
                {activeTab === 'discussion' && <ProjectDiscussionTab />}
            </div>
        </div>
    );
};

// --- Tab Content Components ---

const ProjectOverviewTab = ({ project }) => (
    <div className="project-overview-grid" style={{ gap: '25px' }}>
        <div className="portal-content-card" style={{ padding: '25px' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Description</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, margin: '0 0 25px 0' }}>
                This project involves a comprehensive redesign of the company's primary corporate website.
                The goal is to improve mobile responsiveness, modernize the UI/UX, and integrate a new CMS backend.
                Key objectives include increasing conversion rates by 20% and reducing page load times by 50%.
            </p>
            <div className="project-timeline-row" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                <div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Start Date</span>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 600 }}>{project.start}</p>
                </div>
                <div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Deadline</span>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: '#f43f5e' }}>{project.deadline}</p>
                </div>
                <div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Days Remaining</span>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 600 }}>24 Days</p>
                </div>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Financial Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Budget</span>
                        <span style={{ fontWeight: 600 }}>{project.budget}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Spent</span>
                        <span style={{ fontWeight: 600 }}>$1,250</span>
                    </div>
                    <div style={{ height: '1px', background: '#f1f5f9' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Remaining</span>
                        <span style={{ fontWeight: 600, color: '#10b981' }}>$3,750</span>
                    </div>
                </div>
            </div>
            <div className="portal-content-card" style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '1rem' }}>Team Members</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['Timothy (PM)', 'Alice (Design)', 'Bob (Dev)'].map((m) => (
                        <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>{m.charAt(0)}</div>
                            <span style={{ fontSize: '13px' }}>{m}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const ProjectTasksTab = ({ role }) => (
    <div className="portal-content-card" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Project Tasks</h3>
            {role !== 'Client' && <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}><Plus size={16} style={{ marginRight: '6px' }} /> Add Task</button>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
                { title: 'Initial Design Review', status: 'Completed', priority: 'High', due: 'Mar 10', assigned: 'Alice' },
                { title: 'Setup Database Schema', status: 'In Progress', priority: 'Critical', due: 'Mar 15', assigned: 'Bob' },
                { title: 'Homepage Hero Animation', status: 'Not Started', priority: 'Medium', due: 'Mar 18', assigned: 'Alice' },
                { title: 'Client Feedback Phase 1', status: 'Under Review', priority: 'Low', due: 'Mar 20', assigned: 'Timothy' },
            ].map((t, i) => (
                <div key={i} className="project-task-item" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px', flexWrap: 'wrap' }}>
                    <div style={{
                        width: '20px', height: '20px', borderRadius: '4px', border: '2px solid #cbd5e1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: t.status === 'Completed' ? '#6366f1' : 'transparent',
                        borderColor: t.status === 'Completed' ? '#6366f1' : '#cbd5e1'
                    }}>
                        {t.status === 'Completed' && <CheckCircle size={14} color="white" />}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', textDecoration: t.status === 'Completed' ? 'line-through' : 'none', color: t.status === 'Completed' ? '#94a3b8' : '#1e293b' }}>{t.title}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Assigned: {t.assigned} • Due: {t.due}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', background: '#f1f5f9', color: '#475569', fontWeight: 600 }}>{t.status}</span>
                        <span style={{
                            fontSize: '11px', padding: '4px 10px', borderRadius: '12px',
                            background: t.priority === 'Critical' ? '#fee2e2' : t.priority === 'High' ? '#ffedd5' : '#f1f5f9',
                            color: t.priority === 'Critical' ? '#ef4444' : t.priority === 'High' ? '#f97316' : '#475569',
                            fontWeight: 700
                        }}>{t.priority}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ProjectMilestonesTab = () => (
    <div className="portal-content-card" style={{ padding: '25px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem' }}>Project Milestones</h3>
        <div style={{ position: 'relative', paddingLeft: '40px' }}>
            <div style={{ position: 'absolute', left: '19px', top: '10px', bottom: '10px', width: '2px', background: '#e2e8f0' }} />
            {[
                { name: 'Project Kickoff', date: 'Mar 01, 2026', status: 'Completed' },
                { name: 'Design Approval', date: 'Mar 15, 2026', status: 'In Progress' },
                { name: 'Beta Version Launch', date: 'Apr 25, 2026', status: 'Pending' },
                { name: 'Final Delivery', date: 'May 10, 2026', status: 'Pending' },
            ].map((m, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: '30px' }}>
                    <div style={{
                        position: 'absolute', left: '-29px', top: '2px',
                        width: '18px', height: '18px', borderRadius: '50%',
                        background: m.status === 'Completed' ? '#10b981' : m.status === 'In Progress' ? '#6366f1' : 'white',
                        border: '3px solid #e2e8f0', zIndex: 2
                    }} />
                    <div>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{m.name}</h4>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{m.date}</span>
                        <span style={{
                            marginLeft: '15px', fontSize: '11px', fontWeight: 600,
                            color: m.status === 'Completed' ? '#10b981' : m.status === 'In Progress' ? '#6366f1' : '#94a3b8'
                        }}>{m.status}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ProjectFilesTab = ({ role }) => (
    <div className="portal-content-card" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Project Documents</h3>
            {role !== 'Client' && <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}><Plus size={16} /> Upload File</button>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {[
                { name: 'Requirements.pdf', size: '2.4 MB', type: 'PDF' },
                { name: 'Design_V1.figma', size: '12.8 MB', type: 'Design' },
                { name: 'Contract_Signed.pdf', size: '1.1 MB', type: 'PDF' },
                { name: 'Assets_Pack.zip', size: '45.0 MB', type: 'Archive' },
            ].map((f, i) => (
                <div key={i} style={{ padding: '20px', border: '1px solid #f1f5f9', borderRadius: '12px', textAlign: 'center' }} className="hover-bg-light">
                    <div style={{ width: '50px', height: '50px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', color: '#3b82f6' }}>
                        <FileText size={24} />
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{f.size} • {f.type}</div>
                </div>
            ))}
        </div>
    </div>
);

const ProjectDiscussionTab = () => (
    <div className="portal-content-card" style={{ padding: '25px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem' }}>Discussion Thread</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '25px' }}>
            {[
                { user: 'Timothy', comment: "Hi Alice, have we finalized the color palette for the new landing page?", time: '2 hours ago' },
                { user: 'Alice', comment: "Yes! I've uploaded the Design_V1.figma file to the documents tab. Check the assets folder.", time: '1 hour ago' },
                { user: 'Bob', comment: "I'll start setting up the database schema based on the latest requirements.", time: '45 mins ago' },
            ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>{c.user.charAt(0)}</div>
                    <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ fontWeight: 600, fontSize: '14px' }}>{c.user}</span>
                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{c.time}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{c.comment}</p>
                    </div>
                </div>
            ))}
        </div>
        <div style={{ display: 'flex', gap: '15px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>T</div>
            <div style={{ flex: 1, position: 'relative' }}>
                <textarea style={{ width: '100%', padding: '12px', paddingRight: '100px', borderRadius: '12px', border: '1px solid #e2e8f0', minHeight: '80px', fontSize: '14px' }} placeholder="Write a comment..." />
                <button className="btn-primary" style={{ position: 'absolute', right: '10px', bottom: '10px', padding: '6px 14px', fontSize: '12px' }}>Post</button>
            </div>
        </div>
    </div>
);

const TabItem = ({ label, active, onClick, icon }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'none',
            border: 'none',
            borderBottom: active ? '2px solid #6366f1' : '2px solid transparent',
            color: active ? '#6366f1' : '#64748b',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'all 0.2s'
        }}
    >
        {icon}
        {label}
    </button>
);
const ProjectListSection = ({ projects, onSelectProject }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="project-list-container portal-content-card animations-fade-in" style={{ padding: '25px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search projects or clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Filter size={18} color="#64748b" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                    >
                        <option>All</option>
                        <option>Active</option>
                        <option>Completed</option>
                        <option>On Hold</option>
                    </select>
                </div>
            </div>

            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <th style={{ padding: '12px 15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Project</th>
                            <th style={{ padding: '12px 15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Client</th>
                            <th style={{ padding: '12px 15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Manager</th>
                            <th style={{ padding: '12px 15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Deadline</th>
                            <th style={{ padding: '12px 15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Progress</th>
                            <th style={{ padding: '12px 15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '12px 15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map((p) => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                                <td style={{ padding: '15px' }}>
                                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>{p.name}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{p.id}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>{p.client}</td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600 }}>{p.manager.charAt(0)}</div>
                                        <span style={{ fontSize: '14px' }}>{p.manager}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>{p.deadline}</td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', minWidth: '80px' }}>
                                            <div style={{ height: '100%', width: `${p.progress}%`, background: p.progress === 100 ? '#10b981' : '#6366f1', borderRadius: '3px' }} />
                                        </div>
                                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{p.progress}%</span>
                                    </div>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        background: p.status === 'Active' ? '#eff6ff' : p.status === 'Completed' ? '#ecfdf5' : '#fffbeb',
                                        color: p.status === 'Active' ? '#3b82f6' : p.status === 'Completed' ? '#10b981' : '#f59e0b'
                                    }}>{p.status}</span>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <button onClick={() => onSelectProject(p)} style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}>
                                        View <ArrowRight size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CreateProjectSection = ({ onCancel }) => {
    return (
        <div className="project-create-container portal-content-card animations-fade-in" style={{ padding: '30px' }}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '1.25rem' }}>Create New Project</h3>
            <form className="create-project-form" style={{ gap: '25px' }} onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '15px', color: '#6366f1' }}>Basic Information</h4>
                    <InputField label="Project Name" placeholder="e.g. Website Redesign" />
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <SelectField label="Category" options={['Software', 'Marketing', 'Consulting']} />
                        <SelectField label="Priority" options={['Low', 'Medium', 'High', 'Critical']} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Description</label>
                        <textarea style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '100px', fontSize: '14px' }} placeholder="Project overview and objectives..." />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '15px', color: '#6366f1' }}>Timeline & Team</h4>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <InputField label="Start Date" type="date" />
                        <InputField label="Deadline" type="date" />
                    </div>
                    <SelectField label="Assign Manager" options={['Timothy', 'Alice', 'Bob', 'Sarah']} />
                    <InputField label="Client" placeholder="Select Client..." />

                    <h4 style={{ margin: '10px 0 5px 0', fontSize: '15px', color: '#6366f1' }}>Financials</h4>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <InputField label="Budget" placeholder="$0.00" />
                        <SelectField label="Billing Type" options={['Fixed Price', 'Hourly']} />
                    </div>
                </div>

                <div style={{ gridColumn: 'span 1', display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '10px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }} className="form-footer">
                    <button onClick={onCancel} style={{ padding: '10px 24px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                    <button style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#6366f1', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Create Project</button>
                </div>
                <style>{`
                    .create-project-form {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                    @media (max-width: 1024px) {
                        .create-project-form {
                            grid-template-columns: 1fr;
                        }
                        .form-footer {
                            grid-column: span 1 !important;
                        }
                    }
                `}</style>
            </form>
        </div>
    );
};

const InputField = ({ label, placeholder, type = "text" }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{label}</label>
        <input type={type} placeholder={placeholder} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
    </div>
);

const SelectField = ({ label, options }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{label}</label>
        <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}>
            {options.map((opt, i) => <option key={i}>{opt}</option>)}
        </select>
    </div>
);

// --- Helper Components ---
const StatCard = ({ title, value, icon, color }) => (
    <div className="portal-content-card" style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        borderLeft: `5px solid ${color}`,
        transition: 'transform 0.3s ease',
        cursor: 'default'
    }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{title}</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700, color: '#1e293b' }}>{value}</h2>
        </div>
    </div>
);

const NavBtn = ({ icon, label, active, onClick, className }) => (
    <button onClick={onClick} className={className} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 600,
        backgroundColor: active ? '#6366f1' : 'transparent',
        color: active ? 'white' : '#64748b',
        transition: 'all 0.2s ease'
    }}>
        {icon}
        {label}
    </button>
);

const UrgentItem = ({ name, deadline, priority }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', borderRadius: '12px', background: '#fff', border: '1px solid #f1f5f9' }}>
        <div>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{name}</h4>
            <span style={{ fontSize: '12px', color: '#f43f5e', fontWeight: 500 }}>{deadline}</span>
        </div>
        <span style={{
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '20px',
            background: priority === 'Critical' ? '#fee2e2' : '#ffedd5',
            color: priority === 'Critical' ? '#ef4444' : '#f97316',
            fontWeight: 700
        }}>{priority}</span>
    </div>
);

export default ProjectManagement;

