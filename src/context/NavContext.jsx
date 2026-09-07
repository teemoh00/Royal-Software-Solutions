import { createContext, useContext, useState } from 'react'

export const NavContext = createContext({ isMenuOpen: false, setIsMenuOpen: () => {} })
export const useNav = () => useContext(NavContext)

export function NavProvider({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <NavContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
            {children}
        </NavContext.Provider>
    )
}
