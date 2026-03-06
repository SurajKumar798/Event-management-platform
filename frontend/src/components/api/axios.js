import axios from 'axios';

const api = axios.create({
    baseURL: 'https://event-management-platform-backend-6j3t.onrender.com',
})

export default api;
