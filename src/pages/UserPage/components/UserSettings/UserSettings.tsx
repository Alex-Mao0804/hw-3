import styles from "./UserSettings.module.scss";
import { Text, Input, Button, InputPassword } from "@components";
import { useCallback, useState } from "react";
import { TCreateUserRequestApi } from "@/api/type/users/list";
import { observer } from "mobx-react-lite";
import rootStore from "@/stores/RootStore";
import AlertMessage from "@/pages/UserPage/components/AlertMessage";

const UserSettings = observer(() => {
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
          Entered new link avatar
        </Text>
        <Input
          value={form.avatar}
          name="avatar"
          onChange={(e) => setFormData("avatar", e)}
          type="url"
          placeholder={user?.avatar || "Enter link avatar"}
        />
      </div>

      <div className={styles.user_settings__email}>
        <Text view="p-14" weight="bold">
          Entered new email
        </Text>
        <Input
          value={form.email}
          name="email"
          onChange={(e) => setFormData("email", e)}
          type="email"
          placeholder={user?.email || "Enter email"}
        />
      </div>
      <div className={styles.user_settings__name}>
        <Text view="p-14" weight="bold">
          Entered new name
        </Text>
        <Input
          value={form.name}
          name="name"
          onChange={(e) => setFormData("name", e)}
          type="name"
          placeholder={user?.name || "Enter name"}
        />
      </div>
      <Text view="p-14" weight="bold">
        New password
      </Text>
      <div className={styles.user_settings__password}>
        <InputPassword
          value={form.password}
          onChange={(e) => setFormData("password", e)}
          placeholder="Enter password"
          name="password"
        />
        <InputPassword
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e)}
          placeholder="Repeat password"
          name="repeatPassword"
        />
      </div>

      <Button disabled={disabled} loading={loading} type="submit">
        Save
      </Button>
    </form>
  );
});

export default UserSettings;
