"use client";

import { useState } from "react";
import Hero from "@/app/components/Hero";
import styles from './prayers.module.css';
import Button from "@/app/components/Button";
import emailjs from "@emailjs/browser";

export default function PrayersAndCounselling() {
  const [prayers, setPrayers] = useState([""]);
  const [counselling, setCounselling] = useState("");
  const [sending, setSending] = useState(false);

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

  // Check if all prayers are empty and counselling is also empty
  const hasValidPrayer = prayers.some(p => p.trim() !== "");
  const hasValidCounselling = counselling.trim() !== "";

  if (!hasValidPrayer && !hasValidCounselling) {
    alert("Please fill in at least one prayer point or counselling request.");
    return;
  }

  setSending(true);

  try {
    const form = e.currentTarget as HTMLFormElement;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const telInput = form.elements.namedItem("tel") as HTMLInputElement;

    const templateParams = {
      prayers: prayers.filter(p => p.trim()).join("\n"),
      counselling,
      name: nameInput?.value || "Anonymous",
      tel: telInput?.value || "Not provided",
    };

    await emailjs.send(
      "service_ngyscvf",
      "template_6a0f2aq",
      templateParams,
      "ojvLyk8F6bulR2QjR"
    );

    alert("Your request has been sent successfully!");

    // Reset the form fields
    setPrayers(["", ""]);
    setCounselling("");
    if (nameInput) nameInput.value = "";
    if (telInput) telInput.value = "";

  } catch (error) {
    console.error("EmailJS Error:", error);
    alert("Failed to send request. Please try again.");
  } finally {
    setSending(false);
  }
};



  return (
    <section className={styles.prayerPage}>
      <Hero title='Prayers & Counselling' id={styles.prayer} />

      <form className={styles.prayerForm} onSubmit={handleSubmit}>
        <h1>Do you have prayer points you would like me to pray with you about? Tell me</h1>
        <div className={styles.prayerPoints}>
          <input type="text" name="name" id="name" placeholder="Please type in your name[optional]" />
          <input type="tel" name="tel" id="tel" placeholder="Please type in your phone number[optional]"/>
          {prayers.map((prayer, idx) => (
            <input
              key={idx}
              name={`prayer-${idx}`}
              placeholder="Type in your prayer points..."
              value={prayer}
              onChange={(e) => handlePrayerChange(idx, e.target.value)}
              required
            />
          ))}
          <p>Click the + button to add more prayer points.</p>
        </div>
        <div className={styles.add} onClick={handleAddPrayer}>+</div>
        <Button tag={sending ? "Sending..." : "Pray For Me"} />
      </form>

      <form className={styles.counsellingForm} onSubmit={handleSubmit}>
        <h1>Do you need counselling?</h1>
        <div className={styles.counselText}>
          <textarea
            name="counselRequest"
            id="counselRequest"
            placeholder="Tell me about it..."
            rows={5}
            cols={120}
            value={counselling}
            onChange={(e) => setCounselling(e.target.value)}
          ></textarea>
        </div>
        <Button tag={sending ? "Sending..." : "Counsel Me"} />
      </form>
    </section>
  );
}
