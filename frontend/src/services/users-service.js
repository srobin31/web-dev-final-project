import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

const api = axios.create({
  withCredentials: true,
});

export const getUserById = async (userId) => {
  const response = await api.get(`${USERS_API}/${userId}`);
  return response.data;
}

export const getUserFullName = async (userId) => {
  const response = await api.get(`${USERS_API}/fullName/${userId}`);
  return response.data;
}

export const getUserBasicInfo = async (userId) => {
  const response = await api.get(`${USERS_API}/basicInfo/${userId}`);
  return response.data;
}
