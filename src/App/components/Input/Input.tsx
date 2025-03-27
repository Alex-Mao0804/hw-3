import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, type = 'text', ...props }, ref) => {
    return (
      <div className={clsx(styles.input_container, className)}>
        <input
          type={type}
          ref={ref}
          className={styles.input_field}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
        {afterSlot && <div className={styles.input_after_slot}>{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
