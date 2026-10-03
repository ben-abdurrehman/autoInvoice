import { signup } from '../login/actions'
import AuthUI from '@/components/AuthUI'

export default async function SignupPage({ searchParams }) {
  const params = await searchParams
  return (
    <AuthUI 
      action={signup} 
      type="signup" 
      message={params?.message} 
    />
  )
}
