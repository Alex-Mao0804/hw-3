import React from "react";
import styles from "./AuthFormTabs.module.scss";
import clsx from "clsx";

import AuthFormUI from "@/pages/AuthPage/components/AuthFormUI/AuthFormUI";
import { Box, Tab, Tabs } from "@mui/material";
import rootStore from "@/stores/RootStore/RootStore";
import { observer } from "mobx-react-lite";
import { INITIAL_USER_AVATAR } from "@/utils/constants";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AuthFormTabs = observer(() => {
  const {
    loading: isLoading,
    error,
    isAuth,
    registration,
    resetError,
    login,
  } = rootStore.user;
  const errorText = String(error || "");
  const [value, setValue] = React.useState(1);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [form, setForm] = React.useState({
    email: "",
    password: "",
    name: "",
    avatar: INITIAL_USER_AVATAR,
  });

  const handleSubmitAuthn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(form.email, form.password);
    if (isAuth) {
      setValue(0);
    }
  };

  const handleSubmitReg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registration(form);
  };

  const setFormData = React.useCallback(
    (field: keyof typeof form, value: string) => {
      resetError();
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [resetError],
  );
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.container__tabs)}>
        <Tabs
          centered
          className={clsx(styles.tabs)}
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          textColor="inherit"
          indicatorColor="primary"
        >
          <Tab disableRipple label="Registration" {...a11yProps(0)} />
          <Tab disableRipple label="Login" {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <AuthFormUI
            tab={0}
            formData={form}
            setFormData={setFormData}
            handleSubmit={handleSubmitReg}
            errorText={errorText}
            loading={isLoading}
            isAuth={isAuth}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AuthFormUI
            tab={1}
            formData={form}
            setFormData={setFormData}
            handleSubmit={handleSubmitAuthn}
            errorText={errorText}
            loading={isLoading}
            isAuth={isAuth}
          />
        </CustomTabPanel>
      </div>
    </div>
  );
});

export default AuthFormTabs;
