
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("pitchsap_token");
    localStorage.removeItem("pitchsap_logged_in");
    localStorage.removeItem("pitchsap_user");
    window.location.href = "/auth";
    return res; // Let the caller decide if they want to handle it further
  }

  return res;
};
