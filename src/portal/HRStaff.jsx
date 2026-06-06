import React, { useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';
import {
    Users, UserPlus, Building, Clock, Calendar, DollarSign,
    ClipboardCheck, FileText, LayoutDashboard, History,
    TrendingUp, Plus, Search, MoreVertical, CheckCircle,
    AlertCircle, Briefcase, GraduationCap, MapPin, Phone, Mail,
    Download, Filter, ChevronRight, PieChart as PieChartIcon, Edit, Trash2
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

// --- Dummy Data ---

const hrStats = {
    totalEmployees: 42,
    activeEmployees: 38,
    onLeave: 4,
    newHiresMonth: 3,
    totalDepartments: 6,
    pendingLeaves: 5,
    payrollProcessed: '95%',
    avgAttendance: '92%'
};

const departmentDistribution = [
    { name: 'Management', value: 4, color: '#6366f1' },
    { name: 'Finance', value: 5, color: '#10b981' },
    { name: 'Sales', value: 8, color: '#f59e0b' },
    { name: 'Customer Support', value: 10, color: '#3b82f6' },
    { name: 'Development', value: 12, color: '#8b5cf6' },
    { name: 'Marketing', value: 3, color: '#f43f5e' },
];

const monthlyAttendance = [
    { month: 'Jan', rate: 94 },
    { month: 'Feb', rate: 91 },
    { month: 'Mar', rate: 95 },
    { month: 'Apr', rate: 89 },
    { month: 'May', rate: 93 },
    { month: 'Jun', rate: 96 },
];

const employeeGrowth = [
    { month: 'Jan', count: 32 },
    { month: 'Feb', count: 34 },
    { month: 'Mar', count: 35 },
    { month: 'Apr', count: 38 },
    { month: 'May', count: 40 },
    { month: 'Jun', count: 42 },
];

const recentHRActivity = [
    { id: 1, type: 'new_hire', detail: 'Sarah Jenkins joined Customer Support', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'leave_request', detail: 'David Miller submitted Sick Leave request', time: '4 hours ago', status: 'pending' },
    { id: 3, type: 'payroll', detail: 'June Payroll processed for Development team', time: '1 day ago', status: 'completed' },
    { id: 4, type: 'promotion', detail: 'Michael Chen promoted to Senior Developer', time: '2 days ago', status: 'completed' },
];

const employeesData = [
    { id: 'EMP-001', name: 'John Doe', role: 'Senior Developer', dept: 'Development', status: 'Active', email: 'john.doe@company.com', joinDate: '2023-01-15' },
    { id: 'EMP-002', name: 'Jane Smith', role: 'HR Manager', dept: 'Management', status: 'Active', email: 'jane.smith@company.com', joinDate: '2022-05-10' },
    { id: 'EMP-003', name: 'Robert Brown', role: 'Sales rep', dept: 'Sales', status: 'On Leave', email: 'robert.b@company.com', joinDate: '2023-08-22' },
    { id: 'EMP-004', name: 'Emily Davis', role: 'Support Agent', dept: 'Customer Support', status: 'Active', email: 'emily.d@company.com', joinDate: '2024-02-01' },
    { id: 'EMP-005', name: 'Michael Chen', role: 'Senior Developer', dept: 'Development', status: 'Active', email: 'michael.c@company.com', joinDate: '2021-11-30' },
];

const departmentsData = [
    { id: 1, name: 'Management', head: 'Jane Smith', staff: 4, budget: '$120k' },
    { id: 2, name: 'Finance', head: 'Alice Cooper', staff: 5, budget: '$85k' },
    { id: 3, name: 'Sales', head: 'Bob Thompson', staff: 8, budget: '$150k' },
    { id: 4, name: 'Development', head: 'Michael Chen', staff: 12, budget: '$300k' },
];

const attendanceData = [
    { id: 1, name: 'John Doe', date: '2026-03-09', checkIn: '08:45 AM', checkOut: '05:30 PM', hours: '8.75h', status: 'Present' },
    { id: 2, name: 'Jane Smith', date: '2026-03-09', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9.00h', status: 'Present' },
    { id: 3, name: 'Robert Brown', date: '2026-03-09', checkIn: '-', checkOut: '-', hours: '0h', status: 'On Leave' },
    { id: 4, name: 'Emily Davis', date: '2026-03-09', checkIn: '09:15 AM', checkOut: '05:45 PM', hours: '8.50h', status: 'Late' },
    { id: 5, name: 'Michael Chen', date: '2026-03-09', checkIn: '08:30 AM', checkOut: '05:00 PM', hours: '8.50h', status: 'Present' },
];

const HRStaff = () => {
    const [view, setView] = useState('dashboard'); // dashboard, employees, departments, attendance, leave, payroll, performance
    const [userRole, setUserRole] = useState('HR Manager'); // Admin, HR Manager, Staff
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editEmployeeData, setEditEmployeeData] = useState(null);

    const loadEmployees = async () => {
        setLoading(true);
        try {
            const data = await apiClient.hr.listEmployees();
            setEmployees(data);
            setError(null);
        } catch (err) {
            console.error("Failed to load employees:", err);
            setError("Failed to load employees from database.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    // Calculate dynamic stats
    const totalCount = employees.length;
    const activeCount = employees.filter(e => e.status === 'active' || e.status === 'Active' || !e.status).length;
    const leaveCount = employees.filter(e => e.status === 'leave' || e.status === 'On Leave').length;
    const dynamicHRStats = {
        totalEmployees: totalCount || hrStats.totalEmployees,
        activeEmployees: activeCount || hrStats.activeEmployees,
        onLeave: leaveCount || hrStats.onLeave,
        newHiresMonth: employees.filter(e => e.date_joining && e.date_joining.includes('2026')).length || hrStats.newHiresMonth,
        totalDepartments: 6,
        pendingLeaves: 5,
        payrollProcessed: '95%',
        avgAttendance: '92%'
    };

    // Calculate department distribution
    const deptCounts = {};
    employees.forEach(e => {
        const dept = e.department || 'General';
        deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });
    const dynamicDeptDistribution = Object.keys(deptCounts).map((name, i) => ({
        name,
        value: deptCounts[name],
        color: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#f43f5e'][i % 6]
    }));
    const finalDeptDistribution = dynamicDeptDistribution.length > 0 ? dynamicDeptDistribution : departmentDistribution;

    const handleCreateEmployee = async (employeeFormData) => {
        setLoading(true);
        try {
            if (editEmployeeData) {
                // Update mode
                const empUpdatePayload = {
                    first_name: employeeFormData.name.split(' ')[0] || '',
                    last_name: employeeFormData.name.split(' ').slice(1).join(' ') || '',
                    gender: employeeFormData.gender || 'Male',
                    date_of_birth: employeeFormData.date_of_birth || null,
                    national_id: employeeFormData.national_id || '',
                    email: employeeFormData.email || '',
                    cell_phone: employeeFormData.cell_phone || '',
                    address: employeeFormData.address || '',
                    designation: employeeFormData.designation || '',
                    department: employeeFormData.department || '',
                    employment_type: employeeFormData.employment_type || 'full_time',
                    status: employeeFormData.status || 'active'
                };
                const updated = await apiClient.hr.updateEmployee(editEmployeeData.id, empUpdatePayload);
                setEmployees(prev => prev.map(e => e.id === editEmployeeData.id ? updated : e));
            } else {
                // Generate username from full name
                const username = employeeFormData.name.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000);
                
                // Create User first
                const userPayload = {
                    username,
                    email: employeeFormData.email,
                    first_name: employeeFormData.name.split(' ')[0] || '',
                    last_name: employeeFormData.name.split(' ').slice(1).join(' ') || '',
                    password: 'TemporaryPass123!',
                    link_to_hr: true
                };
                
                const userResponse = await apiClient.post('/api/v1/accounts/users/', userPayload);
                
                // Fetch and find the newly created employee to update other details
                const allEmployees = await apiClient.hr.listEmployees();
                const createdEmp = allEmployees.find(emp => emp.user === userResponse.id);
                
                if (createdEmp) {
                    const empUpdatePayload = {
                        first_name: userPayload.first_name,
                        last_name: userPayload.last_name,
                        gender: employeeFormData.gender || 'Male',
                        date_of_birth: employeeFormData.date_of_birth || null,
                        national_id: employeeFormData.national_id || '',
                        email: employeeFormData.email || '',
                        cell_phone: employeeFormData.cell_phone || '',
                        address: employeeFormData.address || '',
                        designation: employeeFormData.designation || '',
                        department: employeeFormData.department || '',
                        employment_type: employeeFormData.employment_type || 'full_time',
                        status: 'active'
                    };
                    const finalEmp = await apiClient.hr.updateEmployee(createdEmp.id, empUpdatePayload);
                    setEmployees(prev => [...prev, finalEmp]);
                } else {
                    await loadEmployees();
                }
            }
            setShowAddEmployee(false);
            setEditEmployeeData(null);
            setError(null);
        } catch (err) {
            console.error("Failed to save employee:", err);
            setError(err.message || "Failed to save employee profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEmployee = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        setLoading(true);
        try {
            await apiClient.hr.deleteEmployee(id);
            setEmployees(prev => prev.filter(e => e.id !== id));
            setError(null);
        } catch (err) {
            console.error("Failed to delete employee:", err);
            setError("Failed to delete employee record.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditEmployeeClick = (emp) => {
        setEditEmployeeData(emp);
        setShowAddEmployee(true);
    };

    const handleAddNewClick = () => {
        setEditEmployeeData(null);
        setShowAddEmployee(true);
    };

    const renderDashboard = () => (
        <div className="hr-dashboard animations-fade-in">
            {/* Stats Grid */}
            <div className="hr-stats-grid" style={{ gap: '20px', marginBottom: '25px' }}>
                <HRStatCard title="Total Employees" value={dynamicHRStats.totalEmployees} trend="+3 this month" icon={<Users size={20} />} color="#6366f1" />
                <HRStatCard title="On Leave" value={dynamicHRStats.onLeave} trend="2 pending approval" icon={<Calendar size={20} />} color="#f59e0b" />
                <HRStatCard title="Attendance" value={dynamicHRStats.avgAttendance} trend="Stable" icon={<Clock size={20} />} color="#10b981" />
                <HRStatCard title="Payroll Status" value={dynamicHRStats.payrollProcessed} trend="Calculated" icon={<DollarSign size={20} />} color="#6366f1" />
            </div>

            <div className="hr-charts-grid" style={{ gap: '25px', marginBottom: '25px' }}>
                {/* Dept Distribution */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600 }}>Department Distribution</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <PieChart>
                                <Pie
                                    data={departmentDistribution}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {departmentDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Attendance Trends */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600 }}>Monthly Attendance (%)</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <AreaChart data={monthlyAttendance}>
                                <defs>
                                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="hr-secondary-grid" style={{ gap: '25px' }}>
                {/* Recent Activities */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>HR Activity Feed</h3>
                        <button style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>View All</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {recentHRActivity.map((act) => (
                            <div key={act.id} style={{ display: 'flex', gap: '12px', paddingBottom: '15px', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '10px',
                                    background: act.type === 'new_hire' ? '#ecfdf5' : act.type === 'leave_request' ? '#fffbeb' : '#eff6ff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: act.type === 'new_hire' ? '#10b981' : act.type === 'leave_request' ? '#f59e0b' : '#3b82f6'
                                }}>
                                    {act.type === 'new_hire' && <UserPlus size={18} />}
                                    {act.type === 'leave_request' && <Calendar size={18} />}
                                    {act.type === 'payroll' && <DollarSign size={18} />}
                                    {act.type === 'promotion' && <TrendingUp size={18} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{act.detail}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{act.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Growth Chart */}
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600 }}>Employee Growth</h3>
                    <div style={{ height: '240px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={employeeGrowth}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="hr-main-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <style>{`
                .hr-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
                .hr-charts-grid { display: grid; grid-template-columns: 1.2fr 1.8fr; }
                .hr-secondary-grid { display: grid; grid-template-columns: 1fr 1fr; }
                .hr-reports-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
                .hr-leave-grid { display: grid; grid-template-columns: 2fr 1fr; }

                @media (max-width: 1024px) {
                    .hr-charts-grid, .hr-secondary-grid, .hr-leave-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .hr-header-section {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 15px;
                    }
                    .hr-sub-nav {
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
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                    }
                    .hr-sub-nav::-webkit-scrollbar { display: none; }
                    
                    .hr-sub-nav button {
                        flex: 0 0 auto;
                        flex-direction: column;
                        padding: 8px 12px !important;
                        font-size: 10px !important;
                        background: transparent !important;
                        color: #64748b !important;
                        min-width: 70px;
                        gap: 2px !important;
                    }
                    .hr-sub-nav button.active-hr-btn {
                        color: #6366f1 !important;
                    }
                    .hr-sub-nav button svg {
                        width: 20px !important;
                        height: 20px !important;
                    }
                    .hr-main-container {
                        padding-bottom: 90px !important;
                    }
                    .hr-stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .form-grid-responsive {
                        grid-template-columns: 1fr !important;
                    }
                    .employee-list-header {
                        flex-direction: column;
                        align-items: stretch !important;
                    }
                }

                @media (max-width: 640px) {
                    .hr-header-section h2 {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
            {/* Header */}
            <div className="hr-header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>HR & Staff Management</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Manage employees, departments, payroll and performance</p>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                        Role: <select value={userRole} onChange={(e) => setUserRole(e.target.value)} style={{ border: 'none', background: 'transparent', fontWeight: 700, color: '#1e293b', cursor: 'pointer' }}>
                            <option>Admin</option>
                            <option>HR Manager</option>
                            <option>Staff</option>
                        </select>
                    </div>
                    {(userRole === 'Admin' || userRole === 'HR Manager') && (
                        <button onClick={() => { setView('employees'); setShowAddEmployee(true); }} className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <UserPlus size={18} /> Add Employee
                        </button>
                    )}
                </div>
            </div>

            {/* Sub-Navigation */}
            <div className="hr-sub-nav" style={{ display: 'flex', gap: '10px', background: 'white', padding: '6px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', width: 'fit-content', flexWrap: 'wrap' }}>
                <HRNavBtn icon={<LayoutDashboard size={18} />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} className={view === 'dashboard' ? 'active-hr-btn' : ''} />
                <HRNavBtn icon={<Users size={18} />} label="Employees" active={view === 'employees'} onClick={() => setView('employees')} className={view === 'employees' ? 'active-hr-btn' : ''} />
                <HRNavBtn icon={<Building size={18} />} label="Departments" active={view === 'departments'} onClick={() => setView('departments')} className={view === 'departments' ? 'active-hr-btn' : ''} />
                <HRNavBtn icon={<Clock size={18} />} label="Attendance" active={view === 'attendance'} onClick={() => setView('attendance')} className={view === 'attendance' ? 'active-hr-btn' : ''} />
                <HRNavBtn icon={<Calendar size={18} />} label="Leave" active={view === 'leave'} onClick={() => setView('leave')} className={view === 'leave' ? 'active-hr-btn' : ''} />
                <HRNavBtn icon={<DollarSign size={18} />} label="Payroll" active={view === 'payroll'} onClick={() => setView('payroll')} className={view === 'payroll' ? 'active-hr-btn' : ''} />
                <HRNavBtn icon={<TrendingUp size={18} />} label="Performance" active={view === 'performance'} onClick={() => setView('performance')} className={view === 'performance' ? 'active-hr-btn' : ''} />
                <HRNavBtn icon={<FileText size={18} />} label="Documents" active={view === 'documents'} onClick={() => setView('documents')} className={view === 'documents' ? 'active-hr-btn' : ''} />
                <HRNavBtn icon={<PieChartIcon size={18} />} label="Reports" active={view === 'reports'} onClick={() => setView('reports')} className={view === 'reports' ? 'active-hr-btn' : ''} />
            </div>

            {/* View Content */}
            {view === 'dashboard' && renderDashboard()}

            {view === 'employees' && (
                showAddEmployee ?
                    <AddEmployeeSection 
                        onCancel={() => { setShowAddEmployee(false); setEditEmployeeData(null); }} 
                        onSave={handleCreateEmployee}
                        editData={editEmployeeData}
                    /> :
                    <EmployeeListSection 
                        employees={employees} 
                        onAddNew={handleAddNewClick} 
                        onEdit={handleEditEmployeeClick}
                        onDelete={handleDeleteEmployee}
                        userRole={userRole} 
                    />
            )}

            {view === 'departments' && (
                <DepartmentsManagementSection departments={departmentsData} userRole={userRole} />
            )}

            {view === 'leave' && <LeaveManagementSection userRole={userRole} />}

            {view === 'payroll' && <PayrollManagementSection />}

            {view === 'performance' && <PerformanceTrackingSection />}

            {view === 'documents' && <DocumentsManagementSection />}

            {view === 'reports' && <HRReportsSection />}
        </div>
    );
};

// --- Sub-Components ---

const HRStatCard = ({ title, value, trend, icon, color }) => (
    <div className="portal-content-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', background: '#ecfdf5', padding: '2px 8px', borderRadius: '10px' }}>{trend}</span>
        </div>
        <div>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{title}</span>
            <h4 style={{ margin: '4px 0 0 0', fontSize: '1.5rem', fontWeight: 800 }}>{value}</h4>
        </div>
    </div>
);

const HRNavBtn = ({ icon, label, active, onClick, className }) => (
    <button
        onClick={onClick}
        className={className}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            border: 'none',
            background: active ? '#6366f1' : 'transparent',
            color: active ? 'white' : '#64748b',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: 600,
            fontSize: '14px'
        }}
    >
        {icon}
        {label}
    </button>
);

const EmployeeListSection = ({ employees, onAddNew, onEdit, onDelete, userRole }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');

    const filtered = employees.filter(emp => {
        const name = (emp.full_name || emp.name || `${emp.first_name || ''} ${emp.last_name || ''}`.trim() || 'Employee').toLowerCase();
        const id = String(emp.id || '').toLowerCase();
        const dept = (emp.department || emp.dept || '').toLowerCase();
        
        const matchesSearch = name.includes(searchTerm.toLowerCase()) || id.includes(searchTerm.toLowerCase());
        const matchesDept = deptFilter === 'All' || deptFilter === 'All Departments' || dept === deptFilter.toLowerCase();
        return matchesSearch && matchesDept;
    });

    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search employees by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <select
                        value={deptFilter}
                        onChange={(e) => setDeptFilter(e.target.value)}
                        style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
                    >
                        <option>All Departments</option>
                        <option>Management</option>
                        <option>Finance</option>
                        <option>Sales</option>
                        <option>Customer Support</option>
                        <option>Development</option>
                        <option>Marketing</option>
                    </select>
                    {(userRole === 'Admin' || userRole === 'HR Manager') && (
                        <button onClick={onAddNew} className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Plus size={18} /> Add Employee
                        </button>
                    )}
                </div>
            </div>

            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Employee</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Role & Dept</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Email</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Joined</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontWeight: 700, fontSize: '12px' }}>
                                            {(emp.full_name || emp.name || `${emp.first_name || ''} ${emp.last_name || ''}`.trim() || 'EMP').split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '14px' }}>{emp.full_name || emp.name || `${emp.first_name || ''} ${emp.last_name || ''}`.trim() || 'Employee'}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{emp.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 500 }}>{emp.designation || emp.role}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>{emp.department || emp.dept}</div>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px', color: '#64748b' }}>{emp.email || emp.email_address}</td>
                                <td style={{ padding: '15px', fontSize: '14px', color: '#64748b' }}>{emp.date_joining || emp.joinDate}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                                        background: (emp.status === 'Active' || emp.status === 'active') ? '#ecfdf5' : '#fef2f2',
                                        color: (emp.status === 'Active' || emp.status === 'active') ? '#10b981' : '#ef4444'
                                    }}>{emp.status || 'active'}</span>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {(userRole === 'Admin' || userRole === 'HR Manager') && (
                                            <>
                                                <button 
                                                    title="Edit Employee" 
                                                    onClick={() => onEdit(emp)}
                                                    style={{ background: '#ecfdf5', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#10b981' }}
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button 
                                                    title="Delete Employee" 
                                                    onClick={() => onDelete(emp.id)}
                                                    style={{ background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        )}
                                        <button title="View Profile" style={{ background: '#f8fafc', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#64748b' }}><Search size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AddEmployeeSection = ({ onCancel, onSave, editData }) => {
    const [name, setName] = useState(editData ? (editData.full_name || `${editData.first_name || ''} ${editData.last_name || ''}`.trim()) : '');
    const [gender, setGender] = useState(editData?.gender || 'Male');
    const [dob, setDob] = useState(editData?.date_of_birth || '');
    const [nationalId, setNationalId] = useState(editData?.national_id || '');
    const [email, setEmail] = useState(editData?.email || editData?.email_address || '');
    const [phone, setPhone] = useState(editData?.cell_phone || '');
    const [address, setAddress] = useState(editData?.address || '');
    const [dept, setDept] = useState(editData?.department || editData?.dept || 'Management');
    const [designation, setDesignation] = useState(editData?.designation || editData?.role || '');
    const [empType, setEmpType] = useState(editData?.employment_type || 'full_time');
    const [dateJoining, setDateJoining] = useState(editData?.date_joining || editData?.joinDate || '');
    const [status, setStatus] = useState(editData?.status || 'active');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            name,
            gender,
            date_of_birth: dob || null,
            national_id: nationalId,
            email,
            cell_phone: phone,
            address,
            department: dept,
            designation,
            employment_type: empType,
            date_joining: dateJoining || null,
            status
        });
    };

    return (
        <form onSubmit={handleSubmit} className="portal-content-card animations-fade-in" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3 style={{ margin: 0 }}>{editData ? 'Edit Employee Profile' : 'Add New Employee'}</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={onCancel} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" className="btn-primary" style={{ padding: '10px 25px', borderRadius: '10px', fontWeight: 600 }}>Save Employee</button>
                </div>
            </div>

            <div className="form-grid-responsive" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div className="card-section">
                        <h4 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#6366f1' }}>Basic Information</h4>
                        <div className="form-grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <HRInputField label="Full Name" placeholder="e.g. Michael Jordan" value={name} onChange={e => setName(e.target.value)} />
                            <HRSelectField label="Gender" options={['Male', 'Female', 'Other']} value={gender} onChange={e => setGender(e.target.value)} />
                            <HRInputField label="Date of Birth" type="date" value={dob} onChange={e => setDob(e.target.value)} />
                            <HRInputField label="National ID / Passport" placeholder="ID Number" value={nationalId} onChange={e => setNationalId(e.target.value)} />
                        </div>
                    </div>

                    <div className="card-section">
                        <h4 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#6366f1' }}>Contact Information</h4>
                        <div className="form-grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <HRInputField label="Email Address" type="email" placeholder="email@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                            <HRInputField label="Phone Number" placeholder="+123 456 789" value={phone} onChange={e => setPhone(e.target.value)} />
                            <div style={{ gridColumn: 'span 2' }}>
                                <HRInputField label="Residential Address" placeholder="Street, City, Country" value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="card-section">
                        <h4 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#6366f1' }}>Employment Details</h4>
                        <div className="form-grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <HRSelectField label="Department" options={['Management', 'Finance', 'Sales', 'Support', 'Development', 'Marketing']} value={dept} onChange={e => setDept(e.target.value)} />
                            <HRInputField label="Job Title" placeholder="e.g. Senior Manager" value={designation} onChange={e => setDesignation(e.target.value)} />
                            <HRSelectField label="Employment Type" options={[{value: 'full_time', label: 'Full-Time'}, {value: 'part_time', label: 'Part-Time'}, {value: 'contract', label: 'Contract'}, {value: 'casual', label: 'Casual'}]} value={empType} onChange={e => setEmpType(e.target.value)} />
                            <HRInputField label="Date of Joining" type="date" value={dateJoining} onChange={e => setDateJoining(e.target.value)} />
                            <HRSelectField label="Status" options={[{value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}]} value={status} onChange={e => setStatus(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div className="portal-content-card" style={{ padding: '20px', background: '#f8fafc', border: 'none', textAlign: 'center' }}>
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#e2e8f0', margin: '0 auto 15px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={40} color="#94a3b8" />
                        </div>
                        <button type="button" style={{ background: '#6366f1', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Upload Photo</button>
                    </div>

                    <div className="card-section">
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#475569' }}>Notes / Professional Summary</h4>
                        <textarea style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '120px', fontSize: '14px' }} placeholder="Additional information about the candidate..." />
                    </div>

                    <div style={{ background: '#fffbeb', padding: '15px', borderRadius: '15px', border: '1px dashed #f59e0b' }}>
                        <h5 style={{ margin: '0 0 8px 0', color: '#d97706', display: 'flex', alignItems: 'center', gap: '5px' }}><AlertCircle size={14} /> HR Tip</h5>
                        <p style={{ margin: 0, fontSize: '12px', color: '#92400e' }}>Ensure the email address matches the company domain for auto-provisioning systems.</p>
                    </div>
                </div>
            </div>
        </form>
    );
};

const HRInputField = ({ label, placeholder, type = "text", value, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{label}</label>
        <input 
            type={type} 
            placeholder={placeholder} 
            value={value || ''} 
            onChange={onChange} 
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }} 
        />
    </div>
);

const HRSelectField = ({ label, options, value, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{label}</label>
        <select 
            value={value} 
            onChange={onChange} 
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', background: 'white' }}
        >
            {options.map((opt, i) => {
                const val = typeof opt === 'object' ? opt.value : opt;
                const lbl = typeof opt === 'object' ? opt.label : opt;
                return <option key={i} value={val}>{lbl}</option>;
            })}
        </select>
    </div>
);

const AttendanceStatusBadge = ({ status }) => {
    let bg = '#f1f5f9', color = '#64748b';
    if (status === 'Present') { bg = '#ecfdf5'; color = '#10b981'; }
    if (status === 'Late') { bg = '#fffbeb'; color = '#f59e0b'; }
    if (status === 'Absent') { bg = '#fef2f2'; color = '#ef4444'; }
    if (status === 'On Leave') { bg = '#eff6ff'; color = '#6366f1'; }

    return (
        <span style={{
            padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
            background: bg, color: color
        }}>{status}</span>
    );
};

const AttendanceManagementSection = ({ attendance, userRole }) => {
    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '20px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0 }}>Daily Attendance Log</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input type="date" style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }} defaultValue="2026-03-09" />
                    {(userRole === 'Admin' || userRole === 'HR Manager') && (
                        <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Clock size={18} /> Manual Entry
                        </button>
                    )}
                </div>
            </div>

            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Employee</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Date</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Check-In</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Check-Out</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Work Hours</th>
                            <th style={{ padding: '15px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((record) => (
                            <tr key={record.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-light">
                                <td style={{ padding: '15px', fontWeight: 600, fontSize: '14px' }}>{record.name}</td>
                                <td style={{ padding: '15px', fontSize: '14px', color: '#64748b' }}>{record.date}</td>
                                <td style={{ padding: '15px', fontSize: '14px', color: '#64748b' }}>{record.checkIn}</td>
                                <td style={{ padding: '15px', fontSize: '14px', color: '#64748b' }}>{record.checkOut}</td>
                                <td style={{ padding: '15px', fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{record.hours}</td>
                                <td style={{ padding: '15px' }}>
                                    <AttendanceStatusBadge status={record.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const LeaveManagementSection = ({ userRole }) => {
    const leaveRequests = [
        { id: 1, name: 'David Miller', type: 'Sick Leave', start: '2026-03-10', end: '2026-03-12', days: 3, status: 'Pending' },
        { id: 2, name: 'Emily Davis', type: 'Annual Leave', start: '2026-04-01', end: '2026-04-10', days: 10, status: 'Approved' },
        { id: 3, name: 'Robert Brown', type: 'Emergency Leave', start: '2026-03-08', end: '2026-03-09', days: 2, status: 'Rejected' },
    ];

    return (
        <div className="animations-fade-in hr-leave-grid" style={{ gap: '25px' }}>
            <div className="portal-content-card" style={{ padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h3 style={{ margin: 0 }}>Leave Requests</h3>
                    <button className="btn-primary" style={{ padding: '8px 15px', borderRadius: '8px', fontSize: '13px' }}>Apply for Leave</button>
                </div>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>Employee</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>Type</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>Duration</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>Status</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.map(req => (
                                <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: 600 }}>{req.name}</td>
                                    <td style={{ padding: '12px', fontSize: '14px' }}>{req.type}</td>
                                    <td style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>
                                        {req.start} to {req.end}<br />
                                        <span style={{ fontWeight: 700, color: '#1e293b' }}>{req.days} Days</span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                                            background: req.status === 'Approved' ? '#ecfdf5' : req.status === 'Pending' ? '#fffbeb' : '#fef2f2',
                                            color: req.status === 'Approved' ? '#10b981' : req.status === 'Pending' ? '#f59e0b' : '#ef4444'
                                        }}>{req.status}</span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={{ background: '#ecfdf5', color: '#10b981', border: 'none', padding: '5px', borderRadius: '6px', cursor: 'pointer' }}><CheckCircle size={16} /></button>
                                            <button style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '5px', borderRadius: '6px', cursor: 'pointer' }}><AlertCircle size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div className="portal-content-card" style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Leave Balance</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <LeaveBalanceItem label="Annual Leave" used={15} total={24} color="#6366f1" />
                        <LeaveBalanceItem label="Sick Leave" used={2} total={12} color="#f43f5e" />
                        <LeaveBalanceItem label="Emergency Leave" used={0} total={5} color="#f59e0b" />
                    </div>
                </div>
                <div style={{
                    padding: '20px', borderRadius: '20px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    color: 'white', display: 'flex', flexDirection: 'column', gap: '10px'
                }}>
                    <h4 style={{ margin: 0 }}>HR Leave Policy</h4>
                    <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                        Leave requests must be submitted at least 2 weeks in advance for approval.
                    </p>
                    <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Download Policy PDF</button>
                </div>
            </div>
        </div>
    );
};

const LeaveBalanceItem = ({ label, used, total, color }) => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
            <span style={{ color: '#64748b' }}>{label}</span>
            <span style={{ fontWeight: 700 }}>{used} / {total} Days</span>
        </div>
        <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(used / total) * 100}%`, height: '100%', background: color, borderRadius: '3px' }} />
        </div>
    </div>
);

const PayrollManagementSection = () => {
    const payrollRows = [
        { id: 1, name: 'John Doe', salary: '$5,500', tax: '$825', net: '$4,675', status: 'Paid' },
        { id: 2, name: 'Jane Smith', salary: '$6,800', tax: '$1,020', net: '$5,780', status: 'Pending' },
        { id: 3, name: 'Michael Chen', salary: '$7,200', tax: '$1,080', net: '$6,120', status: 'Paid' },
    ];

    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ margin: 0 }}>Monthly Payroll - June 2026</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-text" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Download size={16} /> Export CSV</button>
                    <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px' }}>Process Batch Payroll</button>
                </div>
            </div>

            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Employee</th>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Gross Salary</th>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Taxes & Ded.</th>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Net Pay</th>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Status</th>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Payslip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payrollRows.map(row => (
                            <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '15px', fontWeight: 600 }}>{row.name}</td>
                                <td style={{ padding: '15px' }}>{row.salary}</td>
                                <td style={{ padding: '15px', color: '#ef4444' }}>-{row.tax}</td>
                                <td style={{ padding: '15px', fontWeight: 700, color: '#10b981' }}>{row.net}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                                        background: row.status === 'Paid' ? '#ecfdf5' : '#fffbeb',
                                        color: row.status === 'Paid' ? '#10b981' : '#f59e0b'
                                    }}>{row.status}</span>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <button style={{ background: '#f1f5f9', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                                        <FileText size={14} /> PDF
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

const PerformanceTrackingSection = () => {
    const reviews = [
        { id: 1, name: 'John Doe', rating: 'Excellent', score: 95, lastReview: '2026-01-15' },
        { id: 2, name: 'Jane Smith', rating: 'Good', score: 82, lastReview: '2025-12-20' },
        { id: 3, name: 'Michael Chen', rating: 'Excellent', score: 98, lastReview: '2026-02-10' },
    ];

    return (
        <div className="animations-fade-in">
            <div className="hr-reports-grid" style={{ gap: '25px', marginBottom: '25px' }}>
                {reviews.map(rev => (
                    <div key={rev.id} className="portal-content-card" style={{ padding: '25px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '18px', color: '#6366f1' }}>
                                {rev.name[0]}
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '24px', fontWeight: 800, color: rev.score > 90 ? '#10b981' : '#6366f1' }}>{rev.score}%</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Performance Score</div>
                            </div>
                        </div>
                        <h4 style={{ margin: '0 0 5px 0' }}>{rev.name}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
                            <span style={{
                                padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700,
                                background: rev.rating === 'Excellent' ? '#ecfdf5' : '#eff6ff',
                                color: rev.rating === 'Excellent' ? '#10b981' : '#6366f1'
                            }}>{rev.rating}</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                            Last Review: <span style={{ fontWeight: 600 }}>{rev.lastReview}</span>
                        </div>
                        <button className="btn-text" style={{ width: '100%', textAlign: 'center', padding: '10px', border: '1px solid #f1f5f9', borderRadius: '10px' }}>View Full Review</button>
                    </div>
                ))}
            </div>

            <div className="portal-content-card" style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0' }}>Performance Goals & Feedback</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '15px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                        <div style={{ padding: '10px', borderRadius: '10px', background: '#ecfdf5', color: '#10b981' }}><TrendingUp size={20} /></div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '14px' }}>Q3 Development Objective</div>
                            <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#64748b' }}>Complete the HR & Staff management module with 100% test coverage.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DocumentsManagementSection = () => {
    const documents = [
        { id: 1, name: 'Employment_Contract_John.pdf', type: 'Contract', size: '1.2 MB', date: '2026-01-20' },
        { id: 2, name: 'Company_Policy_2026.pdf', type: 'Policy', size: '3.5 MB', date: '2026-01-01' },
        { id: 3, name: 'NDA_Jane_Smith.pdf', type: 'Legal', size: '0.8 MB', date: '2026-02-15' },
    ];

    return (
        <div className="portal-content-card animations-fade-in" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ margin: 0 }}>Staff & Company Documents</h3>
                <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> Upload Document
                </button>
            </div>
            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Document Name</th>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Category</th>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Size</th>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Upload Date</th>
                            <th style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map(doc => (
                            <tr key={doc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <FileText size={18} color="#6366f1" />
                                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{doc.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '15px' }}>{doc.type}</td>
                                <td style={{ padding: '15px', color: '#64748b' }}>{doc.size}</td>
                                <td style={{ padding: '15px', color: '#64748b' }}>{doc.date}</td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button title="Download" style={{ background: '#eff6ff', border: 'none', padding: '6px', borderRadius: '6px', color: '#3b82f6', cursor: 'pointer' }}><Download size={16} /></button>
                                        <button title="Delete" style={{ background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '6px', color: '#ef4444', cursor: 'pointer' }}><AlertCircle size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const HRReportsSection = () => {
    return (
        <div className="animations-fade-in">
            <div className="hr-reports-grid" style={{ gap: '20px', marginBottom: '25px' }}>
                <ReportCard title="Employee Retention" value="94%" trend="+2% vs LY" color="#6366f1" />
                <ReportCard title="Avg. Hiring Time" value="18 Days" trend="-3 days" color="#10b981" />
                <ReportCard title="Monthly HR Spend" value="$245k" trend="Within budget" color="#f59e0b" />
            </div>

            <div className="hr-secondary-grid" style={{ gap: '25px' }}>
                <div className="portal-content-card" style={{ padding: '25px' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem' }}>Available Reports</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <ReportLink title="Headcount Report" description="Staff distribution by department and role" />
                        <ReportLink title="Attendance Summary" description="Monthly attendance and punctuality trends" />
                        <ReportLink title="Payroll Expense Report" description="Total salary and tax breakdown" />
                        <ReportLink title="Leave Utilization" description="Staff leave usage and balances" />
                    </div>
                </div>
                <div className="portal-content-card" style={{ padding: '25px', background: '#f8fafc', border: 'none' }}>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Quick Insights</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                        The sales department currently has the highest turnover rate (5%). Consider reviewing the compensation package for this department.
                        Attendance in the development team has increased by 4% after the new "Flexible Friday" policy.
                    </p>
                    <button className="btn-primary" style={{ marginTop: '20px', width: '100%', padding: '12px', borderRadius: '10px' }}>Generate Annual Insight Report</button>
                </div>
            </div>
        </div>
    );
};

const ReportCard = ({ title, value, trend, color }) => (
    <div className="portal-content-card" style={{ padding: '20px', borderLeft: `4px solid ${color}` }}>
        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{title}</span>
        <h3 style={{ margin: '5px 0', fontSize: '1.5rem', color: '#1e293b' }}>{value}</h3>
        <p style={{ fontSize: '12px', color: '#10b981', margin: 0, fontWeight: 700 }}>{trend}</p>
    </div>
);

const ReportLink = ({ title, description }) => (
    <div style={{
        padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        cursor: 'pointer', transition: 'all 0.2s'
    }} className="hover-bg-light">
        <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{title}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{description}</div>
        </div>
        <ChevronRight size={18} color="#94a3b8" />
    </div>
);

const DepartmentsManagementSection = ({ departments, userRole }) => {
    return (
        <div className="animations-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ margin: 0 }}>Company Departments</h3>
                {(userRole === 'Admin' || userRole === 'HR Manager') && (
                    <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> Add Department
                    </button>
                )}
            </div>

            <div className="hr-reports-grid" style={{ gap: '20px' }}>
                {departments.map((dept) => (
                    <div key={dept.id} className="portal-content-card" style={{ padding: '25px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: '#eff6ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Building size={24} />
                            </div>
                            <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><MoreVertical size={18} /></button>
                        </div>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{dept.name}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
                            <Users size={14} />
                            <span>{dept.staff} Members</span>
                            <span style={{ margin: '0 5px' }}>•</span>
                            <span>Head: {dept.head}</span>
                        </div>

                        <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '10px', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                                <span style={{ color: '#64748b' }}>Budget Utilization</span>
                                <span style={{ fontWeight: 700 }}>65%</span>
                            </div>
                            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: '65%', height: '100%', background: '#6366f1', borderRadius: '3px' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Annual Budget: <strong>{dept.budget}</strong></span>
                            <button className="btn-text" style={{ fontSize: '12px', padding: '5px 10px' }}>View Team <ChevronRight size={14} /></button>
                        </div>
                    </div>
                ))}

                {(userRole === 'Admin' || userRole === 'HR Manager') && (
                    <div style={{
                        border: '2px dashed #e2e8f0', borderRadius: '15px', padding: '25px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        color: '#94a3b8', cursor: 'pointer', transition: 'all 0.3s'
                    }} className="hover-bg-light">
                        <Plus size={30} style={{ marginBottom: '10px' }} />
                        <span style={{ fontWeight: 600 }}>Create New Department</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HRStaff;
