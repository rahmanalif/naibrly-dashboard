import api from '../lib/api';

/**
 * Support Ticket Service
 * Handles all support ticket-related API calls for admin dashboard
 */

// ==================== Admin Ticket Management ====================

/**
 * Get all support tickets (Admin)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @param {string} params.status - Filter by status (Unsolved | Open | Resolved)
 * @param {string} params.priority - Filter by priority (Low | Medium | High | Urgent)
 * @param {string} params.category - Filter by category
 * @param {string} params.search - Search query (searches name, email, subject)
 * @returns {Promise<Object>} Tickets data with pagination
 */
export const getAllTickets = async (params = {}) => {
    try {
        const response = await api.get('/admin/tickets', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get ticket statistics (Admin)
 * @returns {Promise<Object>} Ticket statistics
 * @returns {number} return.total - Total tickets
 * @returns {number} return.unsolved - Unsolved tickets
 * @returns {number} return.open - Open tickets
 * @returns {number} return.resolved - Resolved tickets
 */
export const getTicketStats = async () => {
    try {
        const response = await api.get('/admin/tickets/stats');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get single ticket by ID (Admin)
 * @param {string} ticketId - MongoDB ticket ID
 * @returns {Promise<Object>} Ticket data
 */
export const getTicketById = async (ticketId) => {
    try {
        const response = await api.get(`/admin/tickets/${ticketId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get ticket by ticket ID string (Admin)
 * @param {string} ticketId - Ticket ID string (e.g., "ADG39")
 * @returns {Promise<Object>} Ticket data
 */
export const getTicketByTicketId = async (ticketId) => {
    try {
        const response = await api.get(`/admin/tickets/ticket/${ticketId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Update ticket status (Admin)
 * @param {string} ticketId - MongoDB ticket ID
 * @param {Object} data - Status update data
 * @param {string} data.status - New status (Unsolved | Open | Resolved)
 * @param {string} data.notes - Optional notes about status change
 * @returns {Promise<Object>} Updated ticket
 */
export const updateTicketStatus = async (ticketId, data) => {
    try {
        const response = await api.patch(`/admin/tickets/${ticketId}/status`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Update ticket details (Admin)
 * @param {string} ticketId - MongoDB ticket ID
 * @param {Object} data - Ticket data to update
 * @param {string} data.priority - Priority (Low | Medium | High | Urgent)
 * @param {string} data.category - Category
 * @param {string} data.assignedTo - Admin ID to assign to
 * @returns {Promise<Object>} Updated ticket
 */
export const updateTicket = async (ticketId, data) => {
    try {
        const response = await api.put(`/admin/tickets/${ticketId}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Add reply to ticket (Admin)
 * @param {string} ticketId - MongoDB ticket ID
 * @param {Object} data - Reply data
 * @param {string} data.message - Reply message
 * @param {Array<string>} data.attachments - Optional attachment URLs
 * @returns {Promise<Object>} Updated ticket with new reply
 */
export const addReplyToTicket = async (ticketId, data) => {
    try {
        const response = await api.post(`/admin/tickets/${ticketId}/reply`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Delete ticket (Admin)
 * @param {string} ticketId - MongoDB ticket ID
 * @returns {Promise<Object>} Success message
 */
export const deleteTicket = async (ticketId) => {
    try {
        const response = await api.delete(`/admin/tickets/${ticketId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== Public Ticket Creation ====================

/**
 * Create new support ticket (Public - no auth required)
 * @param {Object} data - Ticket data
 * @param {string} data.name - Requester name
 * @param {string} data.email - Requester email
 * @param {string} data.subject - Ticket subject
 * @param {string} data.description - Ticket description
 * @param {string} data.priority - Priority (Low | Medium | High | Urgent) - optional, defaults to Medium
 * @param {string} data.category - Category - optional
 * @param {Array<string>} data.attachments - Optional attachment URLs
 * @returns {Promise<Object>} Created ticket
 */
export const createTicket = async (data) => {
    try {
        const response = await api.post('/support/tickets', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== User Ticket Management (Authenticated) ====================

/**
 * Get user's own tickets (Authenticated users)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.status - Filter by status
 * @returns {Promise<Object>} User's tickets with pagination
 */
export const getMyTickets = async (params = {}) => {
    try {
        const response = await api.get('/support/tickets/my-tickets', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Add reply to ticket (Authenticated users)
 * @param {string} ticketId - MongoDB ticket ID
 * @param {Object} data - Reply data
 * @param {string} data.message - Reply message
 * @param {Array<string>} data.attachments - Optional attachment URLs
 * @returns {Promise<Object>} Updated ticket with new reply
 */
export const addUserReplyToTicket = async (ticketId, data) => {
    try {
        const response = await api.post(`/support/tickets/${ticketId}/reply`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== Utility Functions ====================

/**
 * Format ticket creation time
 * @param {string|Date} timestamp - Timestamp to format
 * @returns {string} Formatted time string
 */
export const formatTicketTime = (timestamp) => {
    if (!timestamp) return 'N/A';

    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
};

/**
 * Get status badge color class
 * @param {string} status - Ticket status
 * @returns {Object} Badge color classes
 */
export const getStatusColors = (status) => {
    switch (status) {
        case 'Unsolved':
            return {
                bg: 'bg-blue-100',
                text: 'text-blue-700',
                hover: 'hover:bg-blue-100'
            };
        case 'Open':
            return {
                bg: 'bg-yellow-100',
                text: 'text-yellow-800',
                hover: 'hover:bg-yellow-100'
            };
        case 'Resolved':
            return {
                bg: 'bg-green-100',
                text: 'text-green-800',
                hover: 'hover:bg-green-100'
            };
        default:
            return {
                bg: 'bg-gray-100',
                text: 'text-gray-800',
                hover: 'hover:bg-gray-100'
            };
    }
};

/**
 * Get priority badge color class
 * @param {string} priority - Ticket priority
 * @returns {Object} Badge color classes
 */
export const getPriorityColors = (priority) => {
    switch (priority) {
        case 'Urgent':
            return {
                bg: 'bg-red-100',
                text: 'text-red-700',
                hover: 'hover:bg-red-100'
            };
        case 'High':
            return {
                bg: 'bg-orange-100',
                text: 'text-orange-700',
                hover: 'hover:bg-orange-100'
            };
        case 'Medium':
            return {
                bg: 'bg-yellow-100',
                text: 'text-yellow-700',
                hover: 'hover:bg-yellow-100'
            };
        case 'Low':
            return {
                bg: 'bg-blue-100',
                text: 'text-blue-700',
                hover: 'hover:bg-blue-100'
            };
        default:
            return {
                bg: 'bg-gray-100',
                text: 'text-gray-700',
                hover: 'hover:bg-gray-100'
            };
    }
};

/**
 * Validate ticket creation data
 * @param {Object} data - Ticket data
 * @returns {Object} Validation result
 */
export const validateTicketData = (data) => {
    const errors = {};

    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Valid email is required';
    }

    if (!data.subject || data.subject.trim().length < 5) {
        errors.subject = 'Subject must be at least 5 characters';
    }

    if (!data.description || data.description.trim().length < 10) {
        errors.description = 'Description must be at least 10 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
