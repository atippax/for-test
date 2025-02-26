import { User } from '@/services/authApi'
import convertor from '@/utils/convertor'
import { createContext, useContext, useState } from 'react'

type AuthContextType = {
  user: User | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const token = localStorage.getItem('token')
  // if (!token) {
  //   localStorage.removeItem('user')
  //   if (window.location.pathname != '/login') {
  //     window.location.href = '/login'
  //     return
  //   }
  // }

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (token: string) => {
    const user = convertor().convertJwtToObject<User>(token)
    if (!user) throw new Error("can't caonvert user")
    localStorage.setItem('token', token)
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth ต้องใช้ภายใต้ <AuthProvider>')
  }
  return context
}
