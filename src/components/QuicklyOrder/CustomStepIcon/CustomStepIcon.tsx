import { StepIconProps } from "@mui/material";
import clsx from "clsx";
import styles from "./CustomStepIcon.module.scss";
import CheckIcon from "@/components/icons/CheckIcon";

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return (
    <div
      className={clsx(className, styles.stepIcon, {
        [styles.stepIconActive]: active,
        [styles.stepIconCompleted]: completed,
      })}
    >
      {completed ? <CheckIcon/> : props.icon}
    </div>
  );
};

export default CustomStepIcon;
