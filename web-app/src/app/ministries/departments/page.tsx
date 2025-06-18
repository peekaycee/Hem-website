"use client";
import Hero from "@/app/components/Hero";
import styles from './departments.module.css';

// app/faq/page.tsx
export default function Departments() {
  return (
    <section className={styles.departmentPage}>
      <Hero title='Departments' id={styles.department}/>
      {/* church departments and their activities */}
    </section>
  );
}
