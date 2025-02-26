import { Bounce, toast, ToastPosition } from 'react-toastify'
export default function useToast() {
  const setting = {
    position: 'bottom-right' as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  }
  return {
    info(text: string) {
      toast.info(text, setting)
    },
    success(text: string) {
      toast.success(text, setting)
    },
    error(text: string) {
      toast.error(text, setting)
    },
    warning(text: string) {
      toast.warning(text, setting)
    },
  }
}
