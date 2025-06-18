"use client";

import Hero from "../components/Hero";
import styles from './contact.module.css'

// app/contact/page.tsx
export default function Contact() {
  return (
    <section className={styles.contactPage}>
      <Hero title={'Contact'} id={styles.contact}/>
      <h1>Contact & Location</h1>
      {/* Map, Form, Clergy Info */}
    </section>
  );
}
