"use client";

import { useEffect, useState } from "react";
import Hero from "@/app/components/Hero";
import styles from './prayers.module.css';
import Button from "@/app/components/Button";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PrayersAndCounselling() {
  const [prayers, setPrayers] = useState([""]);
  const [counselling, setCounselling] = useState("");
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleAddPrayer = () => {
    setPrayers([...prayers, ""]);
  };

  const handlePrayerChange = (index: number, value: string) => {
    const updated = [...prayers];
    updated[index] = value;
    setPrayers(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasValidPrayer = prayers.some(p => p.trim() !== "");
    const hasValidCounselling = counselling.trim() !== "";

    if (!hasValidPrayer && !hasValidCounselling) {
      toast.warning("Please fill in at least one prayer point or counselling request.");
      return;
    }

    const templateParams = {
      name: name.trim() || "Anonymous",
      tel: tel.trim() || "Not provided",
      email: "-", // placeholder if your template expects it
      message: "-", // placeholder if your template expects it
      prayers: prayers.filter(p => p.trim()).join("\n") || "None",
      counselling: counselling.trim() || "None",
      time: new Date().toLocaleString(),
    };

    setSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams
      );

      toast.success("Your request has been sent successfully!");
      setPrayers([""]);
      setCounselling("");
      setName("");
      setTel("");
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      toast.error(`Failed to send: ${error?.message || "Unknown error"}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.prayerPage}>
      <ToastContainer position="top-right" autoClose={4000} />
      <Hero title='Prayers & Counselling' id={styles.prayer} />

      <form onSubmit={handleSubmit}>
        <div className={styles.prayerForm}>
          <h1>Do you have prayer points?</h1>
          <div className={styles.prayerPoints}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <input
              type="tel"
              placeholder="Your phone number"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
            {prayers.map((prayer, idx) => (
              <input
                key={idx}
                placeholder="Prayer point"
                value={prayer}
                onChange={(e) => handlePrayerChange(idx, e.target.value)}
              />
            ))}
            <p>Click + to add more prayer points</p>
          </div>
          <div className={styles.add} onClick={handleAddPrayer}>+</div>
          <Button tag={sending ? "Sending..." : "Pray For Me"} type={"submit"}/>
        </div>

        <div className={styles.counsellingForm}>
          <h1>Need counselling?</h1>
          <textarea
            placeholder="Your counselling request..."
            rows={5}
            cols={120}
            value={counselling}
            onChange={(e) => setCounselling(e.target.value)}
          />
          <Button tag={sending ? "Sending..." : "Counsel Me"} type={"submit"} />
        </div>
      </form>
    </section>
  );
}
