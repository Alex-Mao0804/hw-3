import clsx from "clsx";

import styles from "./Icon.module.scss";

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: "primary" | "secondary" | "accent";
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  children,
  ...props
}) => {
  return (
    <svg
      className={clsx(styles.icon, color && styles[color], className)}
      width={props.width || 24}
      height={props.height || 24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
