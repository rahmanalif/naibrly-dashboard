import api from '@/lib/api';

/**
 * Withdrawal Service - Handles all withdrawal related API calls
 */

// ==================== ADMIN WITHDRAWAL APIs ====================

/**
 * Get all withdrawal requests (Admin only)
 * @returns {Promise} - All withdrawal requests with provider details
 */
export const getAllWithdrawals = async () => {
    try {
        const response = await api.get('/withdrawals/admin');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Approve a withdrawal request (Admin only)
 * @param {string} withdrawalId - The ID of the withdrawal to approve
 * @param {Object} data - Optional data
 * @param {string} data.payoutReference - External payout reference
 * @param {string} data.notes - Admin notes
 * @returns {Promise} - Approved withdrawal data
 */
export const approveWithdrawal = async (withdrawalId, data = {}) => {
    try {
        const response = await api.patch(`/withdrawals/${withdrawalId}/approve`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Reject a withdrawal request (Admin only)
 * @param {string} withdrawalId - The ID of the withdrawal to reject
 * @param {Object} data - Optional data
 * @param {string} data.notes - Reason for rejection
 * @returns {Promise} - Rejected withdrawal data
 */
export const rejectWithdrawal = async (withdrawalId, data = {}) => {
    try {
        const response = await api.patch(`/withdrawals/${withdrawalId}/reject`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== PROVIDER WITHDRAWAL APIs ====================

/**
 * Get provider's withdrawal history (Provider only)
 * @returns {Promise} - Provider's withdrawals and balances
 */
export const getMyWithdrawals = async () => {
    try {
        const response = await api.get('/withdrawals/my');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Create a new withdrawal request (Provider only)
 * @param {Object} data - Withdrawal data
 * @param {number} data.amount - Amount to withdraw
 * @param {string} data.notes - Optional notes
 * @returns {Promise} - Created withdrawal data
 */
export const createWithdrawal = async (data) => {
    try {
        const response = await api.post('/withdrawals', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Format withdrawal date
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date (DD/MM/YYYY)
 */
export const formatWithdrawalDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency ($900.00)
 */
export const formatWithdrawalAmount = (amount) => {
    if (amount === null || amount === undefined) return '$0.00';
    return `$${Number(amount).toFixed(2)}`;
};

/**
 * Get status badge class
 * @param {string} status - Withdrawal status
 * @returns {string} - CSS class for status badge
 */
export const getWithdrawalStatusClass = (status) => {
    const statusClasses = {
        'pending': 'text-yellow-600 bg-yellow-50',
        'approved': 'text-blue-600 bg-blue-50',
        'paid': 'text-green-600 bg-green-50',
        'rejected': 'text-red-600 bg-red-50'
    };
    return statusClasses[status?.toLowerCase()] || 'text-gray-600 bg-gray-50';
};

/**
 * Get provider name from withdrawal
 * @param {Object} provider - Provider object
 * @returns {string} - Provider business name
 */
export const getProviderName = (provider) => {
    if (!provider) return 'N/A';
    return provider.businessNameRegistered || provider.email || 'N/A';
};

/**
 * Get last 4 digits of account
 * @param {Object} provider - Provider object
 * @returns {string} - Last 4 digits or full account number
 */
export const getAccountNumber = (provider) => {
    if (!provider || !provider.stripeAccountId) return 'N/A';
    const accountId = provider.stripeAccountId;
    return accountId.length > 4 ? `****${accountId.slice(-4)}` : accountId;
};
