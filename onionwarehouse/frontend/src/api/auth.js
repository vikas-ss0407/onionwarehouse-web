import API_BASE_URL from "./config";

export const signup = async (data) => {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include', // <-- important
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include', // <-- important
    body: JSON.stringify(data),
  });
  return res.json();
};

// No need for getAuthHeader() anymore
export default API_BASE_URL;
