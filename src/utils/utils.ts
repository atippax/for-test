import useToast from '@/hooks/usetoast'
import { AxiosError } from 'axios'

export default function useUtils() {
  const toast = useToast()
  function errorLog(ex: unknown) {
    if (ex instanceof AxiosError) {
      toast.error(ex.response?.data.message)
    } else if (ex instanceof Error) {
      toast.error(ex.message)
    } else {
      toast.error('An unknown error occurred.')
    }
  }
  return { errorLog }
}
