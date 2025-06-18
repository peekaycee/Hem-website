"use client";

import styles from './components.module.css';
// import Link from "next/link";
interface TitleProps{
 title: string;
 id: string;
}
export default function Hero( {title, id}: TitleProps) {
  return(
    <section className={styles.heroSlide} id={id}>
      <div className={styles.overlay}></div>
      <h1>{title}</h1>
    </section>
  )
}