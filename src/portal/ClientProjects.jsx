import { useState, useEffect } from 'react';
import {
    Briefcase, Clock, CheckCircle, AlertCircle, Calendar,
    FileText, Download, ChevronDown, ChevronRight, Users,
    Activity, Target, Paperclip
} from 'lucide-react';
import { apiClient } from '../services/apiClient';

const statusConfig = {
    completed: { bg: '#ecfdf5', color: '#10b981', label: 'COMPLETED' },
    active: { bg: '#eff6ff', color: '#3b82f6', label: 'ACTIVE' },
    'in progress': { bg: '#eff6ff', color: '#3b82f6', label: 'IN PROGRESS' },
    'on hold': { bg: '#fef3c7', color: '#f59e0b', label: 'ON HOLD' },
    planning: { bg: '#f5f3ff', color: '#8b5cf6', label: 'PLANNING' }
};

const mockProjects = [
    {
        id: 1,
        name: 'ERP System Customization',
        description: 'Full customization of the business ERP for your operations including HR, Finance, and Sales modules.',
        status: 'in progress',
        progress: 68,
        startDate: '2026-04-01',
        endDate: '2026-07-15',
        manager: 'Alex Smith',
        team: ['Alex Smith', 'Jane Wanjiru', 'Brian Odhiambo'],
        milestones: [
            { id: 1, name: 'Requirements Gathering', status: 'done', date: '2026-04-10' },
            { id: 2, name: 'UI/UX Design Phase', status: 'done', date: '2026-04-28' },
            { id: 3, name: 'Core Module Development', status: 'done', date: '2026-05-20' },
            { id: 4, name: 'Integration & Testing', status: 'active', date: '2026-06-15' },
            { id: 5, name: 'Client Acceptance Testing', status: 'pending', date: '2026-07-01' },
            { id: 6, name: 'Go-Live & Deployment', status: 'pending', date: '2026-07-15' }
        ],
        files: [
            { name: 'Project_Proposal.pdf', size: '1.2 MB' },
            { name: 'UI_Design_Mockup.fig', size: '8.4 MB' }
        ]
    },
    {
        id: 2,
        name: 'Corporate Website Redesign',
        description: 'Redesign of the company main website with modern UI, mobile responsiveness, and SEO optimization.',
        status: 'planning',
        progress: 15,
        startDate: '2026-05-10',
        endDate: '2026-08-30',
        manager: 'Fatuma Hassan',
        team: ['Fatuma Hassan', 'Kevin Mwangi'],
        milestones: [
            { id: 1, name: 'Content Audit & Strategy', status: 'done', date: '2026-05-18' },
            { id: 2, name: 'Wireframe Development', status: 'active', date: '2026-06-01' },
            { id: 3, name: 'Design Production', status: 'pending', date: '2026-06-25' },
            { id: 4, name: 'Development Sprint', status: 'pending', date: '2026-07-30' },
            { id: 5, name: 'Launch & QA', status: 'pending', date: '2026-08-30' }
        ],
        files: [
            { name: 'Website_Scope.pdf', size: '450 KB' }
        ]
    }
];

const MilestoneIcon = ({ status }) => {
    if (status === 'done') return <CheckCircle size={18} color="#10b981" />;
    if (status === 'active') return <Activity size={18} color="#3b82f6" />;
    return <Clock size={18} color="#94a3b8" />;
};

const ClientProjects = () => {
    const [projects, setProjects] = useState([]);
    const [expandedProject, setExpandedProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const data = await apiClient.projects.list();
                setProjects(Array.isArray(data) && data.length > 0 ? data : mockProjects);
            } catch {
                setProjects(mockProjects);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const toggleProject = (id) => {
        setExpandedProject(expandedProject === id ? null : id);
    };

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                <Activity size={40} style={{ margin: '0 auto 15px', color: '#C89B2A' }} />
                <p>Loading your projects...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }} className="animations-fade-in">
            {/* Page Header */}
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ margin: '0 0 8px', fontSize: '26px', fontWeight: 800, color: '#1e293b', fontFamily: 'Outfit, sans-serif' }}>
                    My Projects
                </h1>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                    Track milestone progress, review deliverables, and access shared project files.
                </p>
            </div>

            {/* Summary Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                <StatCard icon={<Briefcase size={20} />} label="Total Projects" value={projects.length} color="#1b6b6b" />
                <StatCard icon={<Activity size={20} />} label="In Progress" value={projects.filter(p => p.status === 'in progress' || p.status === 'active').length} color="#3b82f6" />
                <StatCard icon={<CheckCircle size={20} />} label="Completed" value={projects.filter(p => p.status === 'completed').length} color="#10b981" />
                <StatCard icon={<Clock size={20} />} label="Planning" value={projects.filter(p => p.status === 'planning').length} color="#8b5cf6" />
            </div>

            {/* Project Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {projects.map((project) => {
                    const conf = statusConfig[project.status?.toLowerCase()] || statusConfig['active'];
                    const isExpanded = expandedProject === project.id;

                    return (
                        <div key={project.id} className="portal-content-card" style={{ borderRadius: '16px', overflow: 'hidden', background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
                            {/* Project Header */}
                            <div
                                style={{ padding: '20px 25px', cursor: 'pointer', borderBottom: isExpanded ? '1px solid #f1f5f9' : 'none' }}
                                onClick={() => toggleProject(project.id)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>{project.name}</h3>
                                            <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: conf.bg, color: conf.color }}>
                                                {conf.label}
                                            </span>
                                        </div>
                                        <p style={{ margin: '0 0 12px', color: '#64748b', fontSize: '13px', lineHeight: 1.5 }}>{project.description}</p>

                                        {/* Progress Bar */}
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                <span style={{ fontSize: '12px', color: '#64748b' }}>Overall Completion</span>
                                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#1b6b6b' }}>{project.progress}%</span>
                                            </div>
                                            <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${project.progress}%`, background: 'linear-gradient(90deg, #1b6b6b, #C89B2A)', borderRadius: '10px', transition: 'width 0.5s ease' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#64748b' }}>
                                            <Calendar size={13} />
                                            <span>{project.startDate} → {project.endDate}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#64748b' }}>
                                            <Users size={13} />
                                            <span>PM: {project.manager}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8' }}>
                                            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div style={{ padding: '20px 25px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '25px' }} className="form-grid-responsive">

                                        {/* Milestones */}
                                        <div>
                                            <h4 style={{ margin: '0 0 15px', fontSize: '14px', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Target size={16} color="#C89B2A" /> Project Milestones
                                            </h4>
                                            <div style={{ position: 'relative' }}>
                                                {(project.milestones || []).map((ms, idx) => (
                                                    <div key={ms.id} style={{ display: 'flex', gap: '12px', marginBottom: idx < (project.milestones.length - 1) ? '15px' : '0' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                            <MilestoneIcon status={ms.status} />
                                                            {idx < (project.milestones.length - 1) && (
                                                                <div style={{ width: '2px', flex: 1, background: ms.status === 'done' ? '#10b981' : '#e2e8f0', minHeight: '20px', margin: '4px 0' }} />
                                                            )}
                                                        </div>
                                                        <div style={{ flex: 1, paddingBottom: '5px' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <span style={{ fontSize: '13px', fontWeight: ms.status === 'active' ? 700 : 500, color: ms.status === 'done' ? '#94a3b8' : '#1e293b', textDecoration: ms.status === 'done' ? 'line-through' : 'none' }}>
                                                                    {ms.name}
                                                                </span>
                                                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{ms.date}</span>
                                                            </div>
                                                            {ms.status === 'active' && (
                                                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#3b82f6', background: '#eff6ff', padding: '1px 6px', borderRadius: '4px' }}>IN PROGRESS</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Team & Files */}
                                        <div>
                                            <h4 style={{ margin: '0 0 15px', fontSize: '14px', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Users size={16} color="#C89B2A" /> Project Team
                                            </h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                                                {(project.team || [project.manager]).map((member, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #1b6b6b, #C89B2A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 700 }}>
                                                            {member.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{member}</div>
                                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{i === 0 ? 'Project Manager' : 'Team Member'}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <h4 style={{ margin: '0 0 15px', fontSize: '14px', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Paperclip size={16} color="#C89B2A" /> Project Files
                                            </h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {(project.files || []).map((file, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <FileText size={16} color="#C89B2A" />
                                                            <div>
                                                                <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{file.name}</div>
                                                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{file.size}</div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1b6b6b', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}
                                                            onClick={() => alert(`Downloading: ${file.name}`)}
                                                        >
                                                            <Download size={14} /> Get
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className="portal-content-card" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '15px', background: 'white', borderRadius: '12px' }}>
        <div style={{ padding: '10px', borderRadius: '10px', background: `${color}15`, color }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b' }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{label}</div>
        </div>
    </div>
);

export default ClientProjects;
