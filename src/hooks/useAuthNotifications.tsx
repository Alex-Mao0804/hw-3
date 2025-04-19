import { useEffect } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CustomSnackbar from "@/components/CustomSnackbar/CustomSnackbar";
const useAuthNotifications = (isLogin: boolean | null) => {
  useEffect(() => {
    if (isLogin) {
      enqueueSnackbar("", {
        content: (key) => (
          <CustomSnackbar
            message="User logged in"
            variant="login"
            onClose={() => closeSnackbar(key)}
          />
        ),
      });
    } else if (isLogin === false) {
      enqueueSnackbar("", {
        content: (key) => (
          <CustomSnackbar
            message="User logged out"
            variant="logout"
            onClose={() => closeSnackbar(key)}
          />
        ),
      });
    }
  }, [isLogin]);
};

export default useAuthNotifications;
