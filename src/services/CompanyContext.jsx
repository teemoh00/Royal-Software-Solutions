import { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from './apiClient';

// Fallback defaults — used when the API is unreachable or the user isn't logged in yet
const DEFAULT_COMPANY = {
    id: 1,
    name: 'Royal Software Solutions',
    email: 'info@royalsoftwares.co.ke',
    phone_number: '+254 759 437 978',
    primary_address: 'Westlands, Nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    logo: '/logo (2).png',
};

const CompanyContext = createContext({
    company: DEFAULT_COMPANY,
    loading: false,
    refetch: () => {},
});

export const CompanyProvider = ({ children }) => {
    const [company, setCompany] = useState(DEFAULT_COMPANY);
    const [loading, setLoading] = useState(false);

    const fetchCompany = async () => {
        // Only fetch when authenticated
        if (!apiClient.auth.isAuthenticated()) return;
        setLoading(true);
        try {
            const data = await apiClient.company.getInfo();
            if (data && data.name) {
                setCompany({
                    ...DEFAULT_COMPANY,
                    ...data,
                    // Ensure logo falls back to local asset if backend doesn't return one
                    logo: data.logo || DEFAULT_COMPANY.logo,
                });
            }
        } catch (err) {
            console.warn('Could not load company info from backend, using defaults.', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompany();
    }, []);

    return (
        <CompanyContext.Provider value={{ company, loading, refetch: fetchCompany }}>
            {children}
        </CompanyContext.Provider>
    );
};

// Convenient hook
export const useCompany = () => useContext(CompanyContext);
