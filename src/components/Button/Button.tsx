import React from 'react';
import styles from './Button.scss';
export const Button: React.FunctionComponent<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
};
