"use client"

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '@/lib/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [checked, setChecked] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    setAuthenticated(isAuthenticated())
    setChecked(true)
  }, [])

  if (!checked) {
    return null
  }

  console.log("ProtectedRoute: authenticated =", authenticated)

  return authenticated ? <>{children}</> : <Navigate to="/SignIn" replace />
}
