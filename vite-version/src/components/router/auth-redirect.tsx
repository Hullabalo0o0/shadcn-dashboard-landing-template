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

  console.log('Authenticated:', authenticated)

  return authenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth/sign-in-2" replace />
}
