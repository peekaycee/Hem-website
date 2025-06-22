"use client";

import styles from './components.module.css';

interface ButtonProps {
  tag: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({ tag, onClick, disabled, className }: ButtonProps) {
  const combinedClass = `${styles.button} ${disabled ? styles.disabled : ""} ${className || ""}`;

  return (
    <button onClick={onClick} className={combinedClass} disabled={disabled}>
      {tag}
    </button>
  );
}
