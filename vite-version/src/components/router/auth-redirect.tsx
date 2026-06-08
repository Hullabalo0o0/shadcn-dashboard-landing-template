"use client"

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '@/lib/auth'

export function AuthRedirect() {
  const [checked, setChecked] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    setAuthenticated(isAuthenticated())
    setChecked(true)
  }, [])

  if (!checked) {
    return null
  }

  return authenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/SignIn" replace />
}
