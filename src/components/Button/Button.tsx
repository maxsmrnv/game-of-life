import React from 'react';
import styles from './Button.scss';
const ButtonComponent: React.FunctionComponent<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
};

export const Button = React.memo(ButtonComponent);
