import React from 'react';
import styles from './Button.module.scss'; 
import Loader from '../Loader';
import clsx from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, disabled,  onClick, ...props }) => {
  return (
    <button
      className={clsx(styles.button, className, 
        styles.button__disabled && (!disabled && loading),
      )}
      disabled={disabled || loading}
      onClick={loading ? undefined : onClick} 
      {...props}
    >
      {loading ? <div className={styles.button__loader}>
        <Loader size='s' className={styles.loader_color_white}/>
        <span>{children}</span>
      </div> : children}
    </button>
  );
};

export default Button;
