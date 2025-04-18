import styles from "./UserSettings.module.scss";
import Text from "@/components/Text";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import { TCreateUserRequestApi } from "@/api/type/directionUsers/list";
import Button from "@/components/Button";
import { observer } from "mobx-react-lite";
import rootStore from "@/stores/RootStore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AlertMessage from "@/pages/UserPage/components/AlertMessage";

const UserSettings = () => {
  const { user, loading, resetError, updateProfile } = rootStore.user;
  const [form, setForm] = useState<TCreateUserRequestApi>({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const setFormData = useCallback(
    (field: keyof typeof form, value: string) => {
      resetError();
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [resetError],
  );

  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredForm = Object.fromEntries(
      Object.entries(form).filter(([, value]) => value.trim() !== ""),
    ) as Partial<TCreateUserRequestApi>;
    updateProfile(filteredForm);
  };

  const someFieldFilled =
    form.email !== "" ||
    form.name !== "" ||
    form.avatar !== "" ||
    form.password !== "";
  const passwordsMatch = form.password === repeatPassword;
  const passwordValid = form.password === "" || passwordsMatch;

  const disabled = !someFieldFilled || !passwordValid;

  return (
    <form onSubmit={handleSubmit} className={styles.user_settings}>
      <AlertMessage form={form} repeatPassword={repeatPassword} />
      <div className={styles.user_settings__avatar}>
        <Text view="p-14" weight="bold">
          Введите ссылку на аватар
        </Text>
        <Input
          value={form.avatar}
          name="avatar"
          onChange={(e) => setFormData("avatar", e)}
          type="url"
          placeholder={user?.avatar || "Введите ссылку на аватар"}
        />
      </div>

      <div className={styles.user_settings__email}>
        <Text view="p-14" weight="bold">
          Введите email
        </Text>
        <Input
          value={form.email}
          name="email"
          onChange={(e) => setFormData("email", e)}
          type="email"
          placeholder={user?.email || "Введите email"}
        />
      </div>
      <div className={styles.user_settings__name}>
        <Text view="p-14" weight="bold">
          Введите новое имя
        </Text>
        <Input
          value={form.name}
          name="name"
          onChange={(e) => setFormData("name", e)}
          type="name"
          placeholder={user?.name || "Введите имя"}
        />
      </div>
      <Text view="p-14" weight="bold">
        Пароль
      </Text>
      <div className={styles.user_settings__password}>
        <Input
          value={form.password}
          onChange={(e) => setFormData("password", e)}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Введите пароль"
          afterSlot={
            !showPassword ? (
              <VisibilityIcon
                role="button"
                aria-label="Показать пароль"
                className={styles.user_settings__icon}
                color="disabled"
                onClick={handleClickShowPassword}
              />
            ) : (
              <VisibilityOffIcon
                role="button"
                aria-label="Скрыть пароль"
                className={styles.user_settings__icon}
                onClick={handleClickShowPassword}
              />
            )
          }
        />

        <Input
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e)}
          type={showRepeatPassword ? "text" : "password"}
          name="repeatPassword"
          placeholder="Повторите пароль"
          afterSlot={
            !showRepeatPassword ? (
              <VisibilityIcon
                role="button"
                aria-label="Показать пароль"
                className={styles.user_settings__icon}
                color="disabled"
                onClick={handleClickShowRepeatPassword}
              />
            ) : (
              <VisibilityOffIcon
                role="button"
                aria-label="Скрыть пароль"
                className={styles.user_settings__icon}
                onClick={handleClickShowRepeatPassword}
              />
            )
          }
        />
      </div>

      <Button disabled={disabled} loading={loading} type="submit">
        Сохранить
      </Button>
    </form>
  );
};

const ObservedUserSettings = observer(UserSettings);

export default ObservedUserSettings;
