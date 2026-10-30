import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light'
};

export const notify = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      toastId: options?.toastId || `toast-success-${message}`,
      ...defaultOptions,
      ...options
    });
  },
  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      toastId: options?.toastId || `toast-error-${message}`,
      ...defaultOptions,
      ...options
    });
  },
  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, {
      toastId: options?.toastId || `toast-info-${message}`,
      ...defaultOptions,
      ...options
    });
  },
  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, {
      toastId: options?.toastId || `toast-warning-${message}`,
      ...defaultOptions,
      ...options
    });
  }
};

export default notify;
