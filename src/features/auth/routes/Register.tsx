import { useNavigate } from 'react-router-dom'

import { Layout, RegisterForm } from '@/features/auth'

export const Register: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Layout headerText="Sign up">
      <RegisterForm onSuccess={() => navigate('/app')} />
    </Layout>
  )
}
