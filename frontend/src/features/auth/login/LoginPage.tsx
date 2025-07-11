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
      console.log('로그인 시도:', { email, password });
        const res = await login({ email, password });
      console.log(res)
        // 응답이 성공적인지 상태코드로 체크
        if (res.status === 200) {
          // JSON 파싱 (login 함수가 JSON 객체를 반환한다고 가정)
  
          alert(res.data.message); // 서버에서 받은 message 띄우기
          // 로그인 성공 후 추가 작업 (예: 리다이렉트)
          router('/'); // 홈으로 리다이렉트
        } else {
          // 실패 시에도 JSON 파싱해서 메시지 보여주기   
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