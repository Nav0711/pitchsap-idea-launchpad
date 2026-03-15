const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  // Ensure endpoint starts with exactly one slash
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${cleanEndpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {})
    }
  });

  if (res.status === 401) {
    console.warn("Unauthorized! Clearing session and redirecting to login.");
    localStorage.clear();
    window.location.href = "/auth";
  }

  return res;
};
