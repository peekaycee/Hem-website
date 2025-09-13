"use client";

import React from "react";
import styles from "./components.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tag: string;
  className?: string;
}

export default function Button({
  tag,
  onClick,
  disabled,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const combinedClass = `${styles.button} ${disabled ? styles.disabled : ""} ${
    className || ""
  }`;

  return (
    <button
      onClick={onClick}
      className={combinedClass}
      disabled={disabled}
      type={type}
      {...rest} // ✅ forwards any extra props (title, aria-label, etc.)
    >
      {tag}
    </button>
  );
}
