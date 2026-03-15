const getApiBase = () => {
  const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  // Ensure no trailing slash
  return rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;
};

const API_BASE = getApiBase();

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  const url = endpoint.startsWith("/") ? `${API_BASE}${endpoint}` : `${API_BASE}/${endpoint}`;

  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  // Default to JSON if no Content-Type is provided
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    console.warn("Unauthorized! Clearing session and redirecting to login.");
    localStorage.clear(); // Clear all keys safely
    window.location.href = "/auth";
  }

  return res;
};
