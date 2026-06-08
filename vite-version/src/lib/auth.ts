export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem('token')
}

export function isAuthenticated(): boolean {
  return Boolean(getToken())
}

export function logout(): void {
    if (typeof window === 'undefined') {
        return
    }

    localStorage.removeItem('token')
    localStorage.removeItem('user')
}
