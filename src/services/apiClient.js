// API Client for Royal Software Solutions connecting to the business-erp backend
// Utilizes native fetch with auto JWT header management and local persistence fallbacks

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'royal_auth_token';
const USER_KEY = import.meta.env.VITE_USER_KEY || 'royal_user_info';

const getAuthHeaders = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
    if (response.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        window.location.href = '/login';
        throw new Error('Session expired. Please log in again.');
    }
    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || data.error || data.message || 'API request failed.');
        }
        return data;
    }
    
    if (!response.ok) {
        throw new Error(response.statusText || 'API response was not ok.');
    }
    return response.text();
};

export const apiClient = {
    // Core HTTP verbs
    get: async (endpoint, config = {}) => {
        let url = `${API_URL}${endpoint}`;
        if (config.params) {
            const queryParams = new URLSearchParams();
            Object.entries(config.params).forEach(([key, val]) => {
                if (val !== undefined && val !== null && val !== '') {
                    queryParams.append(key, val);
                }
            });
            const queryString = queryParams.toString();
            if (queryString) {
                url += `?${queryString}`;
            }
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            }
        });
        return handleResponse(response);
    },
    
    post: async (endpoint, body) => {
        const isFormData = body instanceof FormData;
        const headers = { ...getAuthHeaders() };
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: isFormData ? body : JSON.stringify(body)
        });
        return handleResponse(response);
    },
    
    put: async (endpoint, body) => {
        const isFormData = body instanceof FormData;
        const headers = { ...getAuthHeaders() };
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: isFormData ? body : JSON.stringify(body)
        });
        return handleResponse(response);
    },
    
    delete: async (endpoint) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            }
        });
        return handleResponse(response);
    },

    // Authentication Services
    auth: {
        login: async (username, password) => {
            const data = await apiClient.post('/api/v1/auth/login/', { username, password });
            if (data.access && data.user) {
                if (!data.user.is_superuser && data.user.company_id !== 1) {
                    throw new Error("Unauthorized: Your account does not belong to this portal.");
                }
                localStorage.setItem(TOKEN_KEY, data.access);
                localStorage.setItem(USER_KEY, JSON.stringify(data.user));
            }
            return data;
        },
        
        requestOtp: async (email) => {
            return apiClient.post('/api/v1/auth/otp-request/', { email });
        },
        
        verifyOtp: async (email, otpCode) => {
            const data = await apiClient.post('/api/v1/auth/otp-verify/', { email, otp_code: otpCode });
            if (data.access && data.user) {
                if (!data.user.is_superuser && data.user.company_id !== 1) {
                    throw new Error("Unauthorized: Your account does not belong to this portal.");
                }
                localStorage.setItem(TOKEN_KEY, data.access);
                localStorage.setItem(USER_KEY, JSON.stringify(data.user));
            }
            return data;
        },
        
        logout: () => {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            return true;
        },
        
        getCurrentUser: () => {
            const userStr = localStorage.getItem(USER_KEY);
            return userStr ? JSON.parse(userStr) : null;
        },
        
        isAuthenticated: () => {
            return !!localStorage.getItem(TOKEN_KEY);
        }
    },

    // Dashboard Statistics
    dashboard: {
        getStats: async () => {
            try {
                return await apiClient.get('/api/v1/dashboard/stats/');
            } catch (error) {
                console.error('Failed to load dashboard stats from API, using fallback:', error);
                return null;
            }
        }
    },

    // Utility Endpoints
    utility: {
        getCountries: async () => {
            const data = await apiClient.get('/api/v1/utility/countries/');
            return data.results || data;
        },
        getRegions: async (countryId) => {
            const data = await apiClient.get('/api/v1/utility/regions/', { params: { country: countryId } });
            return data.results || data;
        },
        getCities: async (regionId) => {
            const data = await apiClient.get('/api/v1/utility/cities/', { params: { state: regionId } });
            return data.results || data;
        }
    },

    // Client Management (Custom App)
    clients: {
        list: async () => {
            const data = await apiClient.get('/api/v1/clients_management/clients/');
            return data.results || data; // handle pagination envelope
        },
        create: async (clientData) => {
            return apiClient.post('/api/v1/clients_management/clients/', clientData);
        },
        update: async (id, clientData) => {
            return apiClient.put(`/api/v1/clients_management/clients/${id}/`, clientData);
        },
        delete: async (id) => {
            return apiClient.delete(`/api/v1/clients_management/clients/${id}/`);
        }
    },

    communications: {
        list: async (clientId) => {
            const data = await apiClient.get('/api/v1/clients_management/communications/', { params: { client: clientId } });
            return data.results || data;
        },
        logInteraction: async (logData) => {
            return apiClient.post('/api/v1/clients_management/communications/', logData);
        },
        sendMessage: async (sendData) => {
            return apiClient.post('/api/v1/clients_management/communications/send/', sendData);
        }
    },

    documents: {
        list: async (clientId) => {
            const params = clientId ? { client: clientId } : {};
            const data = await apiClient.get('/api/v1/clients_management/documents/', { params });
            return data.results || data;
        },
        create: async (formData) => {
            return apiClient.post('/api/v1/clients_management/documents/', formData);
        },
        delete: async (id) => {
            return apiClient.delete(`/api/v1/clients_management/documents/${id}/`);
        }
    },

    accounting: {
        invoices: {
            list: async () => {
                const data = await apiClient.get('/api/v1/accounting/invoices/');
                return data.results || data;
            },
            create: async (invoiceData) => {
                return apiClient.post('/api/v1/accounting/invoices/', invoiceData);
            },
            update: async (id, invoiceData) => {
                return apiClient.put(`/api/v1/accounting/invoices/${id}/`, invoiceData);
            },
            delete: async (id) => {
                return apiClient.delete(`/api/v1/accounting/invoices/${id}/`);
            }
        },
        suppliers: {
            list: async () => {
                const data = await apiClient.get('/api/v1/suppliers/');
                return data.results || data;
            }
        },
        expenses: {
            list: async () => {
                const data = await apiClient.get('/api/v1/accounting/expenses/');
                return data.results || data;
            },
            create: async (expenseData) => {
                return apiClient.post('/api/v1/accounting/expenses/', expenseData);
            },
            delete: async (id) => {
                return apiClient.delete(`/api/v1/accounting/expenses/${id}/`);
            }
        },
        payments: {
            list: async () => {
                const data = await apiClient.get('/api/v1/accounting/payments/');
                return data.results || data;
            },
            create: async (paymentData) => {
                return apiClient.post('/api/v1/accounting/payments/', paymentData);
            }
        },
        transactions: {
            list: async () => {
                const data = await apiClient.get('/api/v1/accounting/transactions/');
                return data.results || data;
            }
        },
        accountTypes: {
            list: async () => {
                const data = await apiClient.get('/api/v1/accounting/account-types/');
                return data.results || data;
            },
            create: async (payload) => {
                return apiClient.post('/api/v1/accounting/account-types/', payload);
            },
            update: async (id, payload) => {
                return apiClient.put(`/api/v1/accounting/account-types/${id}/`, payload);
            },
            delete: async (id) => {
                return apiClient.delete(`/api/v1/accounting/account-types/${id}/`);
            }
        },
        ledgers: {
            list: async () => {
                const data = await apiClient.get('/api/v1/accounting/ledgers/');
                return data.results || data;
            },
            create: async (payload) => {
                return apiClient.post('/api/v1/accounting/ledgers/', payload);
            },
            update: async (id, payload) => {
                return apiClient.put(`/api/v1/accounting/ledgers/${id}/`, payload);
            },
            delete: async (id) => {
                return apiClient.delete(`/api/v1/accounting/ledgers/${id}/`);
            }
        }
    },

    // HR Staff Management
    hr: {
        listEmployees: async () => {
            const data = await apiClient.get('/api/v1/hr/employees/');
            return data.results || data;
        },
        createEmployee: async (employeeData) => {
            return apiClient.post('/api/v1/hr/employees/', employeeData);
        },
        updateEmployee: async (id, employeeData) => {
            return apiClient.put(`/api/v1/hr/employees/${id}/`, employeeData);
        },
        deleteEmployee: async (id) => {
            return apiClient.delete(`/api/v1/hr/employees/${id}/`);
        }
    },

    // Sales Management (Legacy POS)
    sales: {
        list: async () => {
            const data = await apiClient.get('/api/v1/sales/');
            return data.results || data;
        },
        create: async (saleData) => {
            return apiClient.post('/api/v1/sales/', saleData);
        }
    },

    // Royal Softwares Custom CRM & Sales App
    royalsoftwares: {
        products: {
            list: async () => {
                const data = await apiClient.get('/api/v1/royalsoftwares/products/');
                return data.results || data;
            },
            create: async (payload) => apiClient.post('/api/v1/royalsoftwares/products/', payload)
        },
        leads: {
            list: async () => {
                const data = await apiClient.get('/api/v1/royalsoftwares/leads/');
                return data.results || data;
            },
            create: async (payload) => apiClient.post('/api/v1/royalsoftwares/leads/', payload)
        },
        deals: {
            list: async () => {
                const data = await apiClient.get('/api/v1/royalsoftwares/deals/');
                return data.results || data;
            },
            create: async (payload) => apiClient.post('/api/v1/royalsoftwares/deals/', payload)
        },
        quotations: {
            list: async () => {
                const data = await apiClient.get('/api/v1/royalsoftwares/quotations/');
                return data.results || data;
            },
            create: async (payload) => apiClient.post('/api/v1/royalsoftwares/quotations/', payload)
        },
        quotationRequests: {
            list: async () => {
                const data = await apiClient.get('/api/v1/royalsoftwares/quotation-requests/');
                return data.results || data;
            },
            create: async (payload) => apiClient.post('/api/v1/royalsoftwares/quotation-requests/', payload),
            update: async (id, payload) => apiClient.put(`/api/v1/royalsoftwares/quotation-requests/${id}/`, payload)
        },
        sales: {
            list: async () => {
                const data = await apiClient.get('/api/v1/royalsoftwares/sales/');
                return data.results || data;
            },
            create: async (payload) => apiClient.post('/api/v1/royalsoftwares/sales/', payload)
        },
        activities: {
            list: async () => {
                const data = await apiClient.get('/api/v1/royalsoftwares/activities/');
                return data.results || data;
            },
            create: async (payload) => apiClient.post('/api/v1/royalsoftwares/activities/', payload)
        }
    },

    // Profile & Settings
    profile: {
        get: async () => {
            return apiClient.get('/api/v1/profile/');
        }
    },
    
    company: {
        getInfo: async () => {
            return apiClient.get('/api/v1/company/');
        }
    },

    // Local Storage Database Fallbacks for Unmapped Modules (Projects & Support Tickets)
    projects: {
        list: () => {
            const projects = localStorage.getItem('royal_projects');
            if (!projects) {
                const initial = [
                    { id: 'PRJ-001', name: 'ERP Implementation', client: 'Acme Corp', manager: 'John Doe', status: 'completed', progress: 100 },
                    { id: 'PRJ-002', name: 'Website Redesign', client: 'Global Tech', manager: 'Sarah Smith', status: 'active', progress: 60 },
                    { id: 'PRJ-003', name: 'Mobile App Dev', client: 'Stark Ind', manager: 'Mike Johnson', status: 'active', progress: 40 }
                ];
                localStorage.setItem('royal_projects', JSON.stringify(initial));
                return initial;
            }
            return JSON.parse(projects);
        },
        save: (projects) => {
            localStorage.setItem('royal_projects', JSON.stringify(projects));
            return projects;
        }
    },

    tickets: {
        list: () => {
            const tickets = localStorage.getItem('royal_tickets');
            if (!tickets) {
                const initial = [
                    { id: '#TK-101', client: 'Acme Corp', subject: 'Login Issue', priority: 'High', status: 'Open', date: '2026-05-25' },
                    { id: '#TK-102', client: 'Global Tech', subject: 'Billing Error', priority: 'Medium', status: 'In Progress', date: '2026-05-24' },
                    { id: '#TK-103', client: 'Stark Ind', subject: 'Feature Request', priority: 'Low', status: 'Resolved', date: '2026-05-20' }
                ];
                localStorage.setItem('royal_tickets', JSON.stringify(initial));
                return initial;
            }
            return JSON.parse(tickets);
        },
        save: (tickets) => {
            localStorage.setItem('royal_tickets', JSON.stringify(tickets));
            return tickets;
        }
    }
};
