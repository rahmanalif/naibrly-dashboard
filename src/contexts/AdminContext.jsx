import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAdminProfile } from '@/services/settingsService';

const AdminContext = createContext(null);

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch admin profile
    const fetchAdminProfile = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getAdminProfile();

            if (response.success) {
                const adminData = response.data.admin;
                setAdmin({
                    id: adminData._id,
                    firstName: adminData.firstName,
                    lastName: adminData.lastName,
                    name: `${adminData.firstName || ""} ${adminData.lastName || ""}`.trim(),
                    email: adminData.email,
                    phone: adminData.phone,
                    profileImage: adminData.profileImage?.url || null,
                    profileImagePublicId: adminData.profileImage?.publicId || null,
                    role: adminData.adminRole || adminData.role || 'Admin',
                });
            }
        } catch (err) {
            console.error('Failed to fetch admin profile:', err);
            setError(err.message || 'Failed to fetch admin profile');
        } finally {
            setLoading(false);
        }
    }, []);

    // Update admin profile locally
    const updateAdminProfile = useCallback((updates) => {
        setAdmin(prev => prev ? { ...prev, ...updates } : null);
    }, []);

    // Logout function
    const logout = useCallback(() => {
        setAdmin(null);
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
    }, []);

    // Auto-fetch admin profile on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchAdminProfile();
        } else {
            setLoading(false);
        }
    }, [fetchAdminProfile]);

    const value = {
        admin,
        loading,
        error,
        fetchAdminProfile,
        updateAdminProfile,
        logout,
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};
