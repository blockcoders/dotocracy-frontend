import { toast } from "react-toastify";

export const useToast = () => {
  const showWarningToast = (message: string) => {
    toast.warning(message);
  };

  const showErrorToast = (message: string) => {
    toast.error(message);
  };

  const showSuccessToast = (message: string) => {
    toast.success(message);
  };

  return {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
  };
};
