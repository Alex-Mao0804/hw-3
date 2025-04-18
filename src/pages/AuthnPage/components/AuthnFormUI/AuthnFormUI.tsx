import React, {  useState } from "react";
import styles from "./AuthnFormUI.module.scss";
import clsx from "clsx";
import { Link } from "react-router";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Text from "@/components/Text";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type TAuthnFormUI = {
  isAuth: boolean;
  loading?: boolean;
  errorText?: string | null;
  formData: {
    email: string;
    password: string;
		name: string;
		avatar: string;
  };
  setFormData: (field: keyof TAuthnFormUI["formData"], value: string) => void;

  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  tab: number;
};

const AuthnFormUI: React.FC<TAuthnFormUI> = ({
  tab,
  formData,
  setFormData,
  handleSubmit,
  errorText,
  loading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.container}>
      <form className={clsx(styles.container__form)} onSubmit={handleSubmit}>
        <Text
          className={clsx(
            errorText && styles.container__form_titleError,
            styles.container__form_title,
          )}
        >
          {errorText ? errorText : "Введите ваши данные для входа"}
        </Text>
				{tab === 0 &&
				<Input
          value={formData.name}
          onChange={(e) => setFormData("name", e)}
          type="name"
          name="name"
          required
          placeholder="Name"
        />
}
        <Input
          value={formData.email}
          onChange={(e) => setFormData("email", e)}
          type="email"
          name="email"
          required
          placeholder="Email"
        />

        <Input
          value={formData.password}
          onChange={(e) => setFormData("password", e)}
          type={showPassword ? "text" : "password"}
          name="password"
          required
          placeholder="Password"
          afterSlot={
            !showPassword ? (
              <VisibilityIcon
                className={styles.container__form_icon}
                color="disabled"
                onClick={handleClickShowPassword}
              />
            ) : (
              <VisibilityOffIcon
                className={styles.container__form_icon}
                onClick={handleClickShowPassword}
              />
            )
          }
        />
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className={styles.container__form_button}
        >
          {tab !== 0 ? "Войти" : "Зарегистрироваться"}
        </Button>
      </form>
      <Text tag="p" className={styles.container__text}>
        Мы собираем ваши данные, нажимая кнопку “зарегистрироваться” вы
        соглашаетесь с нашими правилами - вы можете ознакомиться со всеми
        правилами в пункте{" "}
        <Text tag="span">
          <Link to="/">Политика конфиденциальности</Link>
        </Text>
      </Text>
    </div>
  );
};

export default AuthnFormUI;
