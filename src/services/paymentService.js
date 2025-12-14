import api from '@/lib/api';

/**
 * Payment Service - Handles all payment and transaction related API calls
 */

// ==================== ADMIN TRANSACTION APIs ====================

/**
 * Get all transactions with filtering and pagination (Admin only)
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by status (pending, accepted, paid, cancelled, disputed, failed)
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 20)
 * @returns {Promise} - Transaction data with pagination
 */
export const getAllTransactions = async (params = {}) => {
    try {
        const response = await api.get('/money-requests/admin/transactions', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get earnings summary with monthly breakdown (Admin only)
 * @param {number} months - Number of months to retrieve (default: 6)
 * @returns {Promise} - Earnings data
 */
export const getEarningsSummary = async (months = 6) => {
    try {
        const response = await api.get('/admin/dashboard/earnings', {
            params: { months }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get dashboard stats including pending actions (Admin only)
 * @returns {Promise} - Dashboard statistics and pending actions data
 */
export const getDashboardStats = async () => {
    try {
        const response = await api.get('/admin/dashboard/stats');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get commission earnings report (Admin only)
 * @param {Object} params - Query parameters
 * @param {string} params.startDate - Start date (ISO format)
 * @param {string} params.endDate - End date (ISO format)
 * @param {string} params.type - Type filter: 'service' or 'bundle'
 * @returns {Promise} - Commission earnings data
 */
export const getCommissionEarnings = async (params = {}) => {
    try {
        const response = await api.get('/commission/earnings', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get all withdrawal requests (Admin only)
 * @returns {Promise} - Withdrawal data
 */
export const getAllWithdrawals = async () => {
    try {
        const response = await api.get('/withdrawals/admin');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== PROVIDER PAYMENT APIs ====================

/**
 * Get provider payment history (Provider only)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @returns {Promise} - Payment history data
 */
export const getProviderPaymentHistory = async (params = {}) => {
    try {
        const response = await api.get('/money-requests/provider/history', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get provider withdrawals (Provider only)
 * @returns {Promise} - Withdrawal data with balances
 */
export const getProviderWithdrawals = async () => {
    try {
        const response = await api.get('/withdrawals/my');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== CUSTOMER PAYMENT APIs ====================

/**
 * Get customer payment history (Customer only)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @returns {Promise} - Payment history data
 */
export const getCustomerPaymentHistory = async (params = {}) => {
    try {
        const response = await api.get('/money-requests/customer/history', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== COMMISSION SETTINGS APIs ====================

/**
 * Get commission settings (Public)
 * @returns {Promise} - Commission settings
 */
export const getCommissionSettings = async () => {
    try {
        const response = await api.get('/commission/settings');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Update commission settings (Admin only)
 * @param {Object} data - Commission settings
 * @param {number} data.serviceCommission - Service commission percentage (0-50)
 * @param {number} data.bundleCommission - Bundle commission percentage (0-50)
 * @returns {Promise} - Updated settings
 */
export const updateCommissionSettings = async (data) => {
    try {
        const response = await api.put('/commission/settings', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Format transaction date
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
export const formatTransactionDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency
 */
export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '$0.00';
    return `$${Number(amount).toFixed(2)}`;
};

/**
 * Get status badge color
 * @param {string} status - Transaction status
 * @returns {string} - CSS class name for status
 */
export const getStatusColor = (status) => {
    const statusColors = {
        'paid': 'text-green-600 bg-green-50',
        'completed': 'text-green-600 bg-green-50',
        'pending': 'text-yellow-600 bg-yellow-50',
        'accepted': 'text-blue-600 bg-blue-50',
        'cancelled': 'text-gray-600 bg-gray-50',
        'disputed': 'text-red-600 bg-red-50',
        'failed': 'text-red-600 bg-red-50'
    };
    return statusColors[status?.toLowerCase()] || 'text-gray-600 bg-gray-50';
};

/**
 * Get customer full name
 * @param {Object} customer - Customer object
 * @returns {string} - Full name
 */
export const getCustomerName = (customer) => {
    if (!customer) return 'N/A';
    return `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'N/A';
};

/**
 * Get provider name
 * @param {Object} provider - Provider object
 * @returns {string} - Provider business name
 */
export const getProviderName = (provider) => {
    if (!provider) return 'N/A';
    return provider.businessNameRegistered || provider.email || 'N/A';
};

/**
 * Extract transaction ID from payment details
 * @param {Object} transaction - Transaction object
 * @returns {string} - Transaction ID
 */
export const getTransactionId = (transaction) => {
    if (!transaction) return 'N/A';
    return transaction.paymentDetails?.transactionId ||
           transaction.paymentDetails?.stripePaymentIntentId ||
           transaction._id ||
           'N/A';
};
