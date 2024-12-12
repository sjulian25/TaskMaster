import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL
});

// Implementar el refresh token
const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}token/refresh/`, {
      refresh: localStorage.getItem('refresh_token'),
    });
    localStorage.setItem('access_token', response.data.access);
  } catch (error) {
    console.error("Error al refrescar el token", error);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  }
};

// Interceptor para añadir token de autenticación
// api.interceptors.request.use(async config => {
//   const token = localStorage.getItem('access_token');
//   const refresh = localStorage.getItem('refresh_token');

//   if (token && refresh) {
//     try {
//       // Verificar expiración del token
//       const exp = JSON.parse(atob(token.split('.')[1])).exp;
//       if (Date.now() >= exp * 1000) {
//         await refreshToken();
//         config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
//       } else {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error("Error procesando el token: ", error);
//     }
//   }
//   return config;
// });

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');

  if (token && refresh) {
    try {
      const exp = JSON.parse(atob(token.split('.')[1])).exp;
      if (Date.now() >= exp * 1000) {
        await refreshToken();
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error procesando el token: ", error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
  }
  return config;
});


// Intercepto para redirigir al login en caso de un 401
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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
  getTasks: () => api.get('tasks/'),
  createTask: (taskData) => api.post('tasks/', taskData),
  updateTask: (id, taskData) => api.put(`tasks/${id}/`, taskData),
  deleteTask: (id) => api.delete(`tasks/${id}/`),
};
// export const taskService = {
//   // Obtener todas las tareas
//   getTasks: () => {
//     const token = localStorage.getItem('access_token');
//     return api.get('tasks/', {
//       headers: {
//         Authorization: `Bearer ${token}`, // Agregar el token en la cabecera
//       }
//     });
//   },

//   // Crear una nueva tarea
//   createTask: (taskData) => {
//     const token = localStorage.getItem('access_token');
//     return api.post('tasks/', taskData, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Agregar el token en la cabecera
//       }
//     });
//   },

//   // Actualizar una tarea existente
//   updateTask: (id, taskData) => {
//     const token = localStorage.getItem('access_token');
//     return api.put(`tasks/${id}/`, taskData, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Agregar el token en la cabecera
//       }
//     });
//   },

//   // Eliminar una tarea
//   deleteTask: (id) => {
//     const token = localStorage.getItem('access_token');
//     return api.delete(`tasks/${id}/`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Agregar el token en la cabecera
//       }
//     });
//   }
// };

export default api;
