"use client";

import Hero from "@/app/components/Hero";
import styles from './faq.module.css';
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: '1. What is the next program inline?',
    answer: 'We shall be having bible study this weekend.',
  },
  {
    id: 2,
    question: '2. What are your service times?',
    answer: 'We Offer Sunday Services At 9.00AM to 11.00AM. Midweek Services Is On Wednesdays At 9.00AM. Special Services And Holiday.',
  },
  {
    id: 3,
    question: '3. What is the name of your church?',
    answer: 'His Everlasting Mercy parish.',
  },
  {
    id: 4,
    question: '4. What is the name of your pastor?',
    answer: 'Pastor Gbadegesin Adedamola',
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAnswer = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className={styles.faqPage}>
      <Hero title='FAQ' id={styles.faq} />
      <div className={styles.faqQuestions}>
        {faqs.map((faq) => (
          <div className={styles.faqBox} key={faq.id}>
            <div className={styles.faqQst} onClick={() => toggleAnswer(faq.id)}>
              <h3>{faq.question}</h3>
            </div>
            <div className={`${styles.ans} ${openId === faq.id ? styles.show : styles.hide}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
