import styles from "./ButtonBack.module.scss";
import ArrowSideIcon from "@/components/icons/ArrowSideIcon";
import Text from "@/components/Text";
import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navigation}>
      <button
        className={styles.navigation__button}
        onClick={() => navigate(-1)}
      >
        <ArrowSideIcon className={styles.navigation__icon} />
        <Text view="p-20" color="primary" weight="normal">
          Back
        </Text>
      </button>
    </div>
  );
};

export default ButtonBack;
