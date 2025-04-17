import styles from "./AlertMessage.module.scss";
import {  useEffect, useState } from "react";
import { TCreateUserRequestApi } from "@/api/type/directionUsers/list";
import { observer } from "mobx-react-lite";
import rootStore from "@/stores/RootStore";
import { Alert, AlertColor } from "@mui/material";
import clsx from "clsx";

type AlertMessageProps = {
  form: TCreateUserRequestApi;
  repeatPassword: string;
}

const AlertMessage = ({ form, repeatPassword }: AlertMessageProps) => {
  const { error, user } = rootStore.user;

  const [message, setMessage] = useState<{
    status: AlertColor | "";
    text: string;
  }>({
    status: "",
    text: "",
  });

  useEffect(() => {
    if (!user) return;
  
    const someFieldFilled = form.email || form.name || form.avatar || form.password;
  
    if (someFieldFilled && !error) {
      setMessage({
        status: "success",
        text: "Профиль успешно обновлён",
      });
      setShowMessage(true);
    }
  }, [user, form, error]);  
  
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (form.password !== repeatPassword) return;
    setMessage({
      status: "",
      text: "",
    });
    setShowMessage(false);
  
  }, [form.avatar, form.email, form.name, form.password, repeatPassword]); 
  useEffect(() => {
    if (error) {
      setMessage({
        status: "error",
        text: error,
      });
      setShowMessage(true);
    }
  }, [error]);

  useEffect(() => {
    if (repeatPassword !== form.password) {
      setMessage({
        status: "warning",
        text: "Пароли не совпадают",
      });
      setShowMessage(true);
    } else {
      setMessage({
        status: "",
        text: "",
      });
      setShowMessage(false);
    }
  }, [form.password, repeatPassword]);

  return (
    <div
      className={clsx(
        styles.alert_message,
        showMessage && styles.alert_message__show,
      )}
    >
    <>      {message.text !== "" && (
        <Alert
          onClose={() => setShowMessage(false)}
          severity={message.status as AlertColor}
        >
          {message.text}
        </Alert>
      )}

</>

    </div>
  );
};

const ObserveredAlertMessage = observer(AlertMessage);

export default ObserveredAlertMessage;
