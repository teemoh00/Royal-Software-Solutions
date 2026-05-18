import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState(1) // 1: Email, 2: OTP
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSendOtp = (e) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setStep(2)
        }, 1500)
    }

    const handleVerifyOtp = (e) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate verification
        setTimeout(() => {
            setIsLoading(false)
            navigate('/portal/dashboard')
        }, 1500)
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
                            <p>{step === 1 ? 'Enter your registered email to receive an access code.' : 'We sent a 6-digit code to your email.'}</p>
                        </div>

                        {step === 1 ? (
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

                                <button type="button" className="btn-text-link" onClick={() => setStep(1)}>
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
