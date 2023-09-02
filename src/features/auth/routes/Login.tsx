import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Layout, LoginForm } from '@/features/auth'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Layout headerText="Sign in to your account">
      <LoginForm onSuccess={() => navigate('/app')} />
    </Layout>
  )
}
