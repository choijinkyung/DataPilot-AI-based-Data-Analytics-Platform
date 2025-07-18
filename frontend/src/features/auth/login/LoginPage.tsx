import { useState } from 'react'
import { useLoginStore } from './useLoginStore'
import LoginForm from './LoginForm'
import {useNavigate} from 'react-router-dom'

export default function LoginPage() {
    const router = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading } = useLoginStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await login({ email, password });
      console.log(res)
        if (res.status === 200) {
          alert(res.data.message); 
          router('/'); 
        } else {
          alert((res.data.message));
        }
      } catch (error) {
        console.error('Login error:', error);
      }
  }

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={e => setEmail(e.target.value)}
      onPasswordChange={e => setPassword(e.target.value)}
      onSubmit={handleSubmit}
      loading={loading}
    />
  )
}