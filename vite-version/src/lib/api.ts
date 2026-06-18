const API_URL = import.meta.env.VITE_BACKEND_API_URL_PROD

function getAuthHeaders() {
  const token = localStorage.getItem("token")

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

export const api = {
  get: async (url: string) => {
    return fetch(`${API_URL}${url}`, {
      method: "GET",
      headers: getAuthHeaders()
    })
  },

  post: async (url: string, body: unknown) => {
    console.log("API POST:", `${API_URL}${url}`, body)
    return fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body)
    })
  },

  put: async (url: string, body: unknown) => {
    return fetch(`${API_URL}${url}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(body)
    })
  },

  delete: async (url: string) => {
    return fetch(`${API_URL}${url}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    })
  }
}