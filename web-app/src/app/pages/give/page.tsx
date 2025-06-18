"use client";

import Hero from "@/app/components/Hero";
import styles from './give.module.css';

export default function Give() {
  return (
    <section className={styles.givePage}>
      <Hero title='Give' id={styles.give}/>
      {/* Payment Gateway Integration */}
    </section>
  );
}
