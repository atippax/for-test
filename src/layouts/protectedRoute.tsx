// import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

// import convertor from '@/utils/convertor'
// import { User } from '@/services/authApi'

const ProtectedRoute = () => {
  // const location = useLocation()
  // console.log(location.pathname)
  // if (location.pathname === '/login') {
  //   return <Outlet />
  // }

  // const token = localStorage.getItem('token')
  // if (!token) {
  //   return <Navigate to="/login" replace />
  // }

  // const user = convertor().convertJwtToObject<User>(token)
  // if (!user || (user.exp && user.exp < Date.now() / 1000)) {
  //   return <Navigate to="/login" replace />
  // }

  return <Outlet />
}

export default ProtectedRoute
