import styles from "./UserPage.module.scss";
import { observer } from "mobx-react-lite";
import UserInfo from "./components/UserInfo";
import clsx from "@libs/clsx";

import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import rootStore from "@/stores/RootStore";
import ROUTES from "@/utils/routes";
import { useNavigate } from "react-router-dom";
import UserSettings from "./components/UserSettings";
import HeaderWithArrow from "@components/HeaderWithArrow";
import UserHistory from "./components/UserHistory";

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
      className={styles.tab_panel}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const UserPage = observer(() => {
  const { user, logout } = rootStore.user;
  const navigate = useNavigate();
  const [value, setValue] = useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 3) {
      logout();
      navigate(ROUTES.CATALOG);
    } else {
      setValue(newValue);
    }
  };
  return (
    <div className={styles.user_page}>
      <HeaderWithArrow className={styles.header} title="" />
      <div className={styles.content}>
        <CustomTabPanel value={value} index={1}>
          <HeaderWithArrow className={styles.content__header} title="History" />
          <UserHistory />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <HeaderWithArrow
            className={styles.content__header}
            title="Settings"
          />
          <UserSettings />
        </CustomTabPanel>

        <Tabs
          centered
          orientation="vertical"
          className={clsx(styles.content__menu)}
          value={value}
          onChange={handleChange}
          aria-label="табы"
          textColor="inherit"
          indicatorColor="primary"
          TabIndicatorProps={{
            sx: {
              left: 0,
              right: "auto",
            },
          }}
        >
          <UserInfo
            avatar={user!.avatar}
            name={user!.name}
            email={user!.email}
          />
          <Tab disableRipple label="History of orders" {...a11yProps(0)} />
          <Tab disableRipple label="Settings profile" {...a11yProps(1)} />
          <Tab disableRipple label="Logout" {...a11yProps(2)} />
        </Tabs>
      </div>
    </div>
  );
});

export default UserPage;
