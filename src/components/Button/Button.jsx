/**
 * This code was generated by Builder.io.
 */
import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, variant }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export default Button;