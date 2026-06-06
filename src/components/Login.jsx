import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, RefreshCw, Key } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { apiClient } from '../services/apiClient'

const Login = () => {
    const [loginMethod, setLoginMethod] = useState('otp') // 'password' or 'otp'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState(1) // 1: Email/Credentials, 2: OTP verification
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handlePasswordLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            await apiClient.auth.login(email, password)
            navigate('/portal/client/dashboard')
        } catch (err) {
            console.error('Password Login Error:', err)
            setError(err.message || 'Invalid email or password.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSendOtp = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            await apiClient.auth.requestOtp(email)
            setStep(2)
        } catch (err) {
            console.error('OTP Request Error:', err)
            setError(err.message || 'Failed to send verification code.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            await apiClient.auth.verifyOtp(email, otp)
            navigate('/portal/client/dashboard')
        } catch (err) {
            console.error('OTP Verification Error:', err)
            setError(err.message || 'Invalid or expired verification code.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="login-page-container client-login">
            <div className="login-card-split">
                <div className="login-left">
                    <div className="brand-welcome">
                        <h2 className="cursive-welcome">Welcome to</h2>
                        <h1 className="platform-title">FAHARI UNIFIED IDENTITY</h1>
                        <div className="login-brand-divider"></div>
                        <div className="login-logo-area">
                            <img src="/logo (2).png" alt="Royal Software Solutions" className="login-logo-img" />
                        </div>
                        <p className="user-login-label">CLIENT ACCESS PORTAL</p>
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-form-container">
                        <div className="auth-header">
                            <ShieldCheck className="auth-icon" size={40} />
                            <h2>Secure Client Login</h2>
                            
                            {step === 1 && (
                                <div className="login-tabs" style={{ display: 'flex', gap: '10px', margin: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                                    <button 
                                        type="button" 
                                        onClick={() => { setLoginMethod('otp'); setError(''); }} 
                                        style={{ 
                                            flex: 1, padding: '8px', borderRadius: '6px', border: 'none', 
                                            background: loginMethod === 'otp' ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)',
                                            color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' 
                                        }}
                                    >
                                        ONE-TIME PIN (OTP)
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => { setLoginMethod('password'); setError(''); }} 
                                        style={{ 
                                            flex: 1, padding: '8px', borderRadius: '6px', border: 'none', 
                                            background: loginMethod === 'password' ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)',
                                            color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' 
                                        }}
                                    >
                                        PASSWORD
                                    </button>
                                </div>
                            )}

                            <p style={{ marginTop: step === 2 ? '10px' : '0' }}>
                                {step === 2 
                                    ? `We sent a 6-digit code to ${email}`
                                    : loginMethod === 'otp'
                                        ? 'Enter your registered email to receive an access code.'
                                        : 'Log in using your password credentials.'
                                }
                            </p>
                        </div>

                        {error && (
                            <div className="auth-error-msg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#f87171', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        {step === 1 ? (
                            loginMethod === 'otp' ? (
                                <form onSubmit={handleSendOtp} className="login-split-form">
                                    <div className="login-input-wrapper">
                                        <div className="icon-box">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="yourname@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn-login-submit" disabled={isLoading}>
                                        {isLoading ? <RefreshCw className="spin" size={20} /> : 'Request Access Code'}
                                        {!isLoading && <ArrowRight size={20} />}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handlePasswordLogin} className="login-split-form">
                                    <div className="login-input-wrapper">
                                        <div className="icon-box">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="yourname@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="login-input-wrapper" style={{ marginTop: '15px' }}>
                                        <div className="icon-box">
                                            <Key size={18} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            className="pwd-toggle" 
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginRight: '10px' }}
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>

                                    <button type="submit" className="btn-login-submit" disabled={isLoading} style={{ marginTop: '20px' }}>
                                        {isLoading ? <RefreshCw className="spin" size={20} /> : 'Sign In'}
                                        {!isLoading && <ArrowRight size={20} />}
                                    </button>
                                </form>
                            )
                        ) : (
                            <form onSubmit={handleVerifyOtp} className="login-split-form">
                                <div className="login-input-wrapper">
                                    <div className="icon-box">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={6}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn-login-submit" disabled={isLoading}>
                                    {isLoading ? <RefreshCw className="spin" size={20} /> : 'Verify & Enter Portal'}
                                </button>

                                <button type="button" className="btn-text-link" onClick={() => { setStep(1); setOtp(''); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontSize: '13px', cursor: 'pointer', marginTop: '15px', fontWeight: 'bold' }}>
                                    Try a different email
                                </button>
                            </form>
                        )}

                        <div className="login-footer-links">
                            <span>Don't have an account? </span>
                            <Link to="/register">Create One</Link>
                        </div>
                        
                        <div className="admin-link-hint">
                            <Link to="/admin/login">Internal Staff Login</Link>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="login-copyright">
                <p>&copy; 2022 - {new Date().getFullYear()} Royal Software Solutions | All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Login
