import styles from "./Button.module.scss";
import Loader from "@/components/Loader";
import clsx from "@libs/clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  className,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        className,
        styles.button__disabled && !disabled && loading,
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className={styles.button__loader}>
          <Loader size="s" className={styles.loader_color_white} />
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
