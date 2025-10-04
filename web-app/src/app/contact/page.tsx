"use client";

import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Button from "../components/Button";
import Hero from "../components/Hero";
import styles from "./contact.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current
      );

      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.contactPage}>
      <ToastContainer position="top-right" autoClose={4000} />
      <Hero title="Contact" id={styles.contact} />
      <div className={styles.contactInfo}>
        <form className={styles.contactForm} onSubmit={handleSubmit} ref={formRef}>
          <h2>Reach Out To Us</h2>

          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required autoFocus />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tel">Phone Number:</label>
            <input type="text" id="tel" name="tel" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Feedback:</label>
            <textarea id="message" name="message" rows={4}></textarea>
          </div>

          {/* Hidden fields to satisfy shared template */}
          <input type="hidden" name="prayers" value="" />
          <input type="hidden" name="counselling" value="" />
          <input type="hidden" name="time" value={new Date().toLocaleString()} />

          <Button
            tag={sending ? "Sending..." : "Submit"}
            className={styles.contactButton}
            type={"submit"}
          />
        </form>
        <div className={styles.overlay}></div>
      </div>
    </section>
  );
}
