import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL
});

// Interceptor para añadir token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Servicios de autenticación
export const authService = {
  login: (username, password) => {
    return axios.post(`${API_URL}token/`, { username, password });
  },
  register: (userData) => {
    return axios.post(`${API_URL}users/register/`, userData);
  },
  getCurrentUser: () => {
    return api.get('users/profile/');
  }
};

// Servicios de tareas
export const taskService = {
  getTasks: () => {
    return api.get('tasks/');
  },
  createTask: (taskData) => {
    return api.post('tasks/', taskData);
  },
  updateTask: (id, taskData) => {
    return api.put(`tasks/${id}/`, taskData);
  },
  deleteTask: (id) => {
    return api.delete(`tasks/${id}/`);
  }
};

export default api;