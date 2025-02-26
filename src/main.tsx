import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Index from './pages/Index.tsx'
import Login from './pages/Login.tsx'
import CoaSetting from './pages/CoaSetting.tsx'
import ImportReport from './pages/ImportReport.tsx'
import { AuthProvider } from '@/contexts/authContext.tsx'
import Layout from '@/layouts/default.tsx'
import ProtectedRoute from '@/layouts/protectedRoute.tsx'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'dayjs/locale/th'
import dayjs, { Dayjs } from 'dayjs'
import { ToastContainer } from 'react-toastify'
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <Index /> },
          { path: 'coa-setting', element: <CoaSetting /> },
          { path: 'import-report/:id', element: <ImportReport /> },
        ],
      },
    ],
  },
])
dayjs.extend(buddhistEra)
class AdapterDayjsBE extends AdapterDayjs {
  format = (date: Dayjs, formatKey: keyof AdapterDayjs['formats']): string => {
    const result = date.format(this.formats[formatKey].replace('YYYY', 'BBBB'))
    return result
  }

  formatByString = (date: dayjs.Dayjs, format: string) => {
    let newFormat = format.replace(/\bYYYY\b/g, 'BBBB')
    return this.dayjs(date).format(newFormat)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjsBE} adapterLocale="th">
      <ToastContainer />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LocalizationProvider>
  </StrictMode>
)
