"use client";

import styles from './components.module.css';

interface ButtonProps {
  tag: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset"; 
}

export default function Button({ tag, onClick, disabled, className, type = "button" }: ButtonProps) {
  const combinedClass = `${styles.button} ${disabled ? styles.disabled : ""} ${className || ""}`;
  return (
    <button onClick={onClick} className={combinedClass} disabled={disabled} type={type}>
      {tag}
    </button>
  );
}
