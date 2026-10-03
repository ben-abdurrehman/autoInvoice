import { login } from './actions'
import AuthUI from '@/components/AuthUI'

export default async function LoginPage({ searchParams }) {
  const params = await searchParams
  return (
    <AuthUI 
      action={login} 
      type="login" 
      message={params?.message} 
    />
  )
}
