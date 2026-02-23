import { useState } from 'react'
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'



const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!")
            return
        }
        alert('Registration successful! Please check your email to verify your account.')
    }

    return (
        <div className="login-page-container">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div className="login-card-split">
                {/* Left Panel */}
                <div className="login-left">
                    <div className="brand-welcome">
                        <h2 className="cursive-welcome">Join our</h2>
                        <h1 className="platform-title">GROWING COMMUNITY</h1>
                        <div className="login-brand-divider"></div>
                        <div className="login-logo-area">
                            <img src="/logo (2).png" alt="Royal Software Solutions" className="login-logo-img" />
                        </div>
                        <p className="user-login-label">CREATE ACCOUNT</p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="login-right">
                    <form onSubmit={handleRegister} className="login-split-form">

                        <div className="login-input-wrapper">
                            <div className="icon-box">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="login-input-wrapper">
                            <div className="icon-box">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="login-input-wrapper">
                            <div className="icon-box">
                                <Phone size={18} />
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="login-input-wrapper">
                            <div className="icon-box">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        <div className="login-input-wrapper">
                            <div className="icon-box">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>


                        <button type="submit" className="btn-login-submit">
                            Register
                        </button>

                        <div className="login-footer-links">
                            Already have an account? <Link to="/login">Login here</Link> | <Link to="/">Home</Link>
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

export default Register
