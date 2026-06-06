import { useState } from 'react'
import { ShieldAlert, Lock, User, Eye, EyeOff, Terminal, Key } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { apiClient } from '../services/apiClient'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleAdminLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            await apiClient.auth.login(email, password)
            navigate('/portal/admin/dashboard')
        } catch (err) {
            console.error('Admin Login Error:', err)
            setError(err.message || 'Authentication failed. Please check credentials.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="admin-login-page">
            <div className="admin-bg-effects">
                <div className="scanline"></div>
                <div className="grid-overlay"></div>
            </div>

            <div className="admin-login-container">
                <div className="admin-login-card">
                    <div className="admin-card-header">
                        <div className="security-badge">
                            <ShieldAlert size={32} />
                        </div>
                        <h2>EXECUTIVE TERMINAL</h2>
                        <p>RESTRICTED ACCESS AREA</p>
                    </div>

                    {error && (
                        <div className="auth-error-msg" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#f87171', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleAdminLogin} className="admin-login-form">
                        <div className="admin-input-group">
                            <label>ADMINISTRATOR ID / EMAIL</label>
                            <div className="admin-input-wrapper">
                                <User size={18} className="input-icon" />
                                <input 
                                    type="email" 
                                    placeholder="Enter Admin ID"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-input-group">
                            <label>SECURITY CREDENTIALS</label>
                            <div className="admin-input-wrapper">
                                <Key size={18} className="input-icon" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="pwd-toggle" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="auth-level-indicator">
                            <Terminal size={14} />
                            <span>AUTH_LEVEL: LEVEL_4_ENCRYPTION_ACTIVE</span>
                        </div>

                        <button type="submit" className="btn-admin-submit" disabled={isLoading}>
                            {isLoading ? 'ESTABLISHING SECURE SESSION...' : 'AUTHENTICATE'}
                        </button>
                    </form>

                    <div className="admin-card-footer">
                        <Link to="/login">Switch to Client Portal</Link>
                        <span>|</span>
                        <Link to="/">Exit Terminal</Link>
                    </div>
                </div>

                <div className="security-notice">
                    <p>WARNING: Unauthorized access to this terminal is strictly prohibited. All activities are monitored and logged. System IP: 192.168.1.1 [SECURED]</p>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
