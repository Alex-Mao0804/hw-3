
import styles from "./UserInfo.module.scss";
import Text from "@/components/Text";

type UserInfoProps = {
  avatar: string;
  name: string;
  email: string;
};

const UserInfo = ({ avatar, name, email }: UserInfoProps) => {
  return (
    <div className={styles.user_info}>
      <div className={styles.user_info__avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Text view="p-20" weight="bold" className={styles.user_info__name}>{name}</Text>
      <Text view="p-16" color='accent' className={styles.user_info__email}>{email}</Text>
    </div>
  );
};

export default UserInfo;
