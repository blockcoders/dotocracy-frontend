import { toast } from "react-toastify";

export const useToast = () => {
  const showWarningToast = (message: string) => {
    toast.warning(message, {
      toastId: "WARNING_TOAST",
    });
  };

  const showErrorToast = (message: string) => {
    toast.error(message, {
      toastId: "ERROR_TOAST",
    });
  };

  const showSuccessToast = (message: string) => {
    toast.success(message, {
      toastId: "SUCCES_TOAST",
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
  };
};
