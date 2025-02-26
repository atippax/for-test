import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authApi } from '@/services/authApi'
import { useAuth } from '@/contexts/authContext'

const useAuthHook = () => {
  const { login, logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = async (email: string, password: string) => {
    const authRes = await authApi.login(email, password)
    login(authRes.accessToken)
  }

  const handleLogout = () => {
    authApi.logout()
    logout()
    navigate('/login')
  }

  useEffect(() => {
    if (!user && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [user, location, navigate])

  return { user, login: handleLogin, logout: handleLogout }
}

export default useAuthHook
