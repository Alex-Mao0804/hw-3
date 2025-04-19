import React from "react";
import styles from "./AuthFormUI.module.scss";
import clsx from "@libs/clsx";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Text from "@/components/Text";
import InputPassword from "@/components/InputPassword";

type TAuthFormUI = {
  isAuth: boolean;
  loading?: boolean;
  errorText?: string | null;
  formData: {
    email: string;
    password: string;
    name: string;
    avatar: string;
  };
  setFormData: (field: keyof TAuthFormUI["formData"], value: string) => void;

  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  tab: number;
};

const AuthFormUI: React.FC<TAuthFormUI> = ({
  tab,
  formData,
  setFormData,
  handleSubmit,
  errorText,
  loading,
}) => {
  return (
    <div className={styles.container}>
      <form className={clsx(styles.container__form)} onSubmit={handleSubmit}>
        <Text
          className={clsx(
            errorText && styles.container__form_titleError,
            styles.container__form_title,
          )}
        >
          {errorText ? errorText : "Enter your email and password"}
        </Text>
        {tab === 0 && (
          <Input
            value={formData.name}
            onChange={(e) => setFormData("name", e)}
            type="name"
            name="name"
            required
            placeholder="Name"
          />
        )}
        <Input
          value={formData.email}
          onChange={(e) => setFormData("email", e)}
          type="email"
          name="email"
          required
          placeholder="Email"
        />
        <InputPassword
          value={formData.password}
          onChange={(e) => setFormData("password", e)}
          placeholder="Password"
          name="password"
        />
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className={styles.container__form_button}
        >
          {tab !== 0 ? "Enter" : "Register"}
        </Button>
      </form>
      <Text tag="p" className={styles.container__text}>
        We use cookies to give you the best experience on our site. By using
        this site, you acknowledge that you have read and understand our rules.
      </Text>
    </div>
  );
};

export default AuthFormUI;
