import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Modal from "@/components/Modal";
import rootStore from "@/stores/RootStore/RootStore";
import { observer } from "mobx-react-lite";
import ROUTES from "@/utils/routes";
import CatalogPage from "@pages/CatalogPage";
import AuthFormTabs from "./components/AuthFormTabs";

const AuthPage = observer(() => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const isAuth = rootStore.user.isAuth;

  const location = useLocation();
  const background = (location.state && location.state.background) || "/";

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTES.USER);
    }
  }, [isAuth, navigate]);

  const handleClose = () => {
    rootStore.user.resetError();
    navigate(background, { replace: true });
  };

  return (
    <>
      {background === ROUTES.CATALOG && <CatalogPage />}
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>
        <AuthFormTabs />
      </Modal>
    </>
  );
});

export default AuthPage;
