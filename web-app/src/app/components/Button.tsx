"use client";

// import Link from "next/link";
import styles from './components.module.css';

interface ButtonProps{
 tag: string;
 onClick?: () => void;
 // href?: string;
}

export default function Button({ tag, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles.button}>
      {tag}
    </button>
  );
}