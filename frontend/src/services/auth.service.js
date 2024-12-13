import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';  // URL base de tu API

/**
 * Inicia sesión con las credenciales proporcionadas.
 * @param {Object} credentials - Objeto con el nombre de usuario y contraseña.
 * @returns {Promise<Object>} Respuesta del servidor con los tokens de acceso y refresh.
 */
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}token/`, credentials);
  return response.data;
};

/**
 * Registra un nuevo usuario con los datos proporcionados.
 * @param {FormData} userData - Datos del usuario incluyendo archivo de imagen, si aplica.
 * @returns {Promise<Object>} Respuesta del servidor con los datos del usuario registrado.
 */
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}users/`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Necesario para manejar archivos
    },
  });
  return response.data;
};