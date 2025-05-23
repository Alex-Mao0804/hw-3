import clsx from "clsx";

import styles from "./CheckBox.module.scss";
import CheckIcon from "@/components/icons/CheckIcon";
import { useCallback } from "react";

type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  disabled,
  className,
  ...props
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange],
  );
  return (
    <label className={clsx(styles.checkbox_wrapper, className)}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.checkbox_hidden}
        aria-checked={checked}
        {...props}
      />
      <span
        className={clsx(
          styles.checkbox_custom,
          !disabled && styles.checkbox_custom_hover,
          { checked, disabled },
        )}
      >
        {checked && (
          <CheckIcon
            className={styles.checkbox_icon}
            width={40}
            height={40}
            color={disabled ? "secondary" : "accent"}
          />
        )}
      </span>
    </label>
  );
};

export default CheckBox;
