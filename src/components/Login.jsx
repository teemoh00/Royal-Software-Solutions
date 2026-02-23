import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react'
import { Link } from 'react-router-dom'



const Login = () => {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [showOtp, setShowOtp] = useState(false)

    // ... other handlers ...

    const handleLogin = (e) => {
        e.preventDefault()
        alert('Logging in...')
    }

    const handleRequestOtp = (e) => {
        e.preventDefault()
        alert('OTP code sent to ' + email)
    }


    return (
        <div className="login-page-container">
            <div className="login-card-split">
                {/* Left Panel */}
                <div className="login-left">
                    <div className="brand-welcome">
                        <h2 className="cursive-welcome">Welcome to</h2>
                        <h1 className="platform-title">CLIENT SUPPORT PLATFORM</h1>
                        <div className="login-brand-divider"></div>
                        <div className="login-logo-area">
                            <img src="/logo (2).png" alt="Royal Software Solutions" className="login-logo-img" />
                        </div>
                        <p className="user-login-label">USER LOGIN</p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="login-right">
                    <form onSubmit={handleLogin} className="login-split-form">
                        <div className="login-input-wrapper">
                            <div className="icon-box">
                                <User size={18} />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button type="button" className="btn-request-otp" onClick={handleRequestOtp}>
                            Request OTP for login
                        </button>

                        <div className="login-input-wrapper">
                            <div className="icon-box">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showOtp ? "text" : "password"}
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button type="button" className="toggle-password" onClick={() => setShowOtp(!showOtp)}>
                                {showOtp ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        <button type="submit" className="btn-login-submit">
                            Login
                        </button>

                        <div className="login-footer-links">
                            <Link to="/register">Create Account</Link> | <Link to="/">Home</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="login-copyright">
                <p>Copyright © 2022 - 2026 | Royal Software Solutions.</p>
                <p>Transforming Business Processes, Sustaining Growth.</p>
            </div>
        </div>
    )
}

export default Login
