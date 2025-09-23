const API_BASE_URL = "http://localhost:5000/api"; // Change to deployed URL if needed

// Get Authorization header with token from localStorage
export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default API_BASE_URL;
