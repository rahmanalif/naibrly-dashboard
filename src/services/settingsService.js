import api from '../lib/api';

/**
 * Settings Service
 * Handles all settings-related API calls for admin dashboard
 */

// ==================== Profile Management ====================

/**
 * Get current admin profile
 * @returns {Promise<Object>} Admin profile data
 */
export const getAdminProfile = async () => {
    try {
        const response = await api.get('/admin/profile');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Update admin profile
 * @param {Object} data - Profile data to update
 * @param {string} data.name - Admin name
 * @param {string} data.email - Admin email
 * @param {string} data.phone - Admin phone number
 * @param {string} data.avatar - Avatar URL or file
 * @returns {Promise<Object>} Updated profile data
 */
export const updateAdminProfile = async (data) => {
    try {
        const response = await api.put('/admin/profile', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Upload admin profile image to Cloudinary
 * @param {File} imageFile - Image file to upload
 * @returns {Promise<Object>} Upload response with URL and publicId
 */
export const uploadAdminProfileImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('profileImage', imageFile);

        const response = await api.post('/upload/admin/profile-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Delete admin profile image from Cloudinary
 * @returns {Promise<Object>} Delete response
 */
export const deleteAdminProfileImage = async () => {
    try {
        const response = await api.delete('/upload/admin/profile-image');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== Password Management ====================

/**
 * Change admin password
 * @param {Object} data - Password data
 * @param {string} data.currentPassword - Current password
 * @param {string} data.newPassword - New password
 * @returns {Promise<Object>} Success message
 */
export const changeAdminPassword = async (data) => {
    try {
        const response = await api.put('/admin/change-password', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== Content Management ====================

/**
 * Get content by type (terms, privacy, about)
 * @param {string} type - Content type (terms | privacy | about)
 * @returns {Promise<Object>} Content data
 */
export const getContent = async (type) => {
    try {
        const response = await api.get(`/admin/content/${type}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Update content by type
 * @param {string} type - Content type (terms | privacy | about)
 * @param {Object} data - Content data
 * @param {string} data.content - HTML content
 * @returns {Promise<Object>} Updated content data
 */
export const updateContent = async (type, data) => {
    try {
        const response = await api.put(`/admin/content/${type}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get Terms & Conditions
 * @returns {Promise<Object>} Terms content
 */
export const getTermsAndConditions = async () => {
    return getContent('terms');
};

/**
 * Update Terms & Conditions
 * @param {string} content - HTML content
 * @returns {Promise<Object>} Updated content
 */
export const updateTermsAndConditions = async (content) => {
    return updateContent('terms', { content });
};

/**
 * Get Privacy Policy
 * @returns {Promise<Object>} Privacy policy content
 */
export const getPrivacyPolicy = async () => {
    return getContent('privacy');
};

/**
 * Update Privacy Policy
 * @param {string} content - HTML content
 * @returns {Promise<Object>} Updated content
 */
export const updatePrivacyPolicy = async (content) => {
    return updateContent('privacy', { content });
};

/**
 * Get About Us
 * @returns {Promise<Object>} About us content
 */
export const getAboutUs = async () => {
    return getContent('about');
};

/**
 * Update About Us
 * @param {string} content - HTML content
 * @returns {Promise<Object>} Updated content
 */
export const updateAboutUs = async (content) => {
    return updateContent('about', { content });
};

// ==================== FAQ Management ====================

/**
 * Get all FAQs
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.search - Search query
 * @returns {Promise<Object>} FAQs data with pagination
 */
export const getAllFAQs = async (params = {}) => {
    try {
        const response = await api.get('/admin/faq', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Create new FAQ
 * @param {Object} data - FAQ data
 * @param {string} data.question - FAQ question
 * @param {string} data.answer - FAQ answer
 * @param {number} data.order - Display order (optional)
 * @returns {Promise<Object>} Created FAQ
 */
export const createFAQ = async (data) => {
    try {
        const response = await api.post('/admin/faq', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Update FAQ
 * @param {string} id - FAQ ID
 * @param {Object} data - FAQ data to update
 * @param {string} data.question - FAQ question
 * @param {string} data.answer - FAQ answer
 * @param {number} data.order - Display order (optional)
 * @returns {Promise<Object>} Updated FAQ
 */
export const updateFAQ = async (id, data) => {
    try {
        const response = await api.put(`/admin/faq/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Delete FAQ
 * @param {string} id - FAQ ID
 * @returns {Promise<Object>} Success message
 */
export const deleteFAQ = async (id) => {
    try {
        const response = await api.delete(`/admin/faq/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== Utility Functions ====================

/**
 * Format last updated timestamp
 * @param {string|Date} timestamp - Timestamp to format
 * @returns {string} Formatted date string
 */
export const formatLastUpdated = (timestamp) => {
    if (!timestamp) return 'Never';

    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return `Updated ${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
        return 'Updated yesterday';
    } else {
        return `Updated on ${date.toLocaleDateString()}`;
    }
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result
 */
export const validatePassword = (password) => {
    const minLength = 6;
    const hasLength = password.length >= minLength;

    return {
        isValid: hasLength,
        message: hasLength ? '' : `Password must be at least ${minLength} characters`
    };
};
