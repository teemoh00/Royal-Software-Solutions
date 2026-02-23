import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import ProductsServices from './components/ProductsServices'
import Support from './components/Support'
import Login from './components/Login'
import Register from './components/Register'
import GetQuote from './components/GetQuote'
import Footer from './components/Footer'

import { useLocation } from 'react-router-dom'

function AppContent() {
  const location = useLocation()
  const hideFooterRoutes = ['/login', '/register']
  const hideNavbarRoutes = ['/register', '/login']
  const showFooter = !hideFooterRoutes.includes(location.pathname)
  const showNavbar = !hideNavbarRoutes.includes(location.pathname)

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products-services" element={<ProductsServices />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/get-quote" element={<GetQuote />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
