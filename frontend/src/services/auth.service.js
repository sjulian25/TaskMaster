import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';  // URL de tu API

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}login/`, credentials);
  return response.data;
};