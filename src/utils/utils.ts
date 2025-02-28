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

  async function downloadFile(fileData: Blob, filename: string): Promise<void> {
    try {
      const blob = new Blob([fileData])
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  return { errorLog, downloadFile }
}
