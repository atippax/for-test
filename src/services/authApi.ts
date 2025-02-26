import { CONTROLLER } from '@/constants'
import axiosClient from '@/services/apiClient'

export type User = {
  id: string
  name: string
  email: string
  iat: number
  exp: number
}
export type AuthResponse = { accessToken: string }

const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const result = await axiosClient.post<AuthResponse>(`${CONTROLLER.LOGIN}`, {
    username,
    password,
  })
  localStorage.setItem('token', result.data.accessToken)
  return result.data
}

// ฟังก์ชัน Logout
const logout = (): void => {
  localStorage.removeItem('token')
}

export const authApi = { login, logout }
