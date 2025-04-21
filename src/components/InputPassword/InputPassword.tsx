import styles from "./InputPassword.module.scss";
import Input from "@/components/Input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

type InputPasswordProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  name: string;
  required?: boolean;
};

const InputPassword = ({
  value,
  onChange,
  placeholder,
  name,
  required = false,
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Input
      value={value}
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      name={name}
      required={required}
      placeholder={placeholder}
      afterSlot={
        !showPassword ? (
          <VisibilityIcon
            aria-label="show password"
            className={styles.inputPassword}
            color="disabled"
            onClick={handleClickShowPassword}
          />
        ) : (
          <VisibilityOffIcon
            aria-label="hide password"
            className={styles.inputPassword}
            onClick={handleClickShowPassword}
          />
        )
      }
    />
  );
};

export default InputPassword;
