import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const adminSecret = import.meta.env.VITE_ADMIN_SECRET_KEY;
        if (adminSecret) {
            config.headers['x-admin-secret'] = adminSecret;
        }

        // Skip ngrok browser warning
        config.headers['ngrok-skip-browser-warning'] = 'true';

        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
