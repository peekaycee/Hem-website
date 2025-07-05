"use client";

import { useState } from "react";
import Hero from "@/app/components/Hero";
import styles from './give.module.css';
import Button from "@/app/components/Button";

export default function Give() {
  const [formTitle, setFormTitle] = useState("Offering");

  const handleCategoryClick = (category: string) => {
    setFormTitle(category);
  };

  return (
    <section className={styles.givePage}>
      <Hero title='Give' id={styles.give} />

      <section className={styles.giveContainer}>
        <div className={styles.leftSide}>
          <Button tag="Offering" className={styles.categoryBtn} onClick={() => handleCategoryClick("Offering")} />
          <Button tag="Tithe" className={styles.categoryBtn} onClick={() => handleCategoryClick("Tithe")} />
          <Button tag="Building Project" className={styles.categoryBtn} onClick={() => handleCategoryClick("Building Project")} />
          <Button tag="Mission" className={styles.categoryBtn} onClick={() => handleCategoryClick("Mission")} />
        </div>

        <div className={styles.rightSide}>
          <form>
            <h1>{formTitle}</h1>

            <div className={styles.formDivs}>
              {/* <label htmlFor="FullName">Full Name:</label> */}
              <input type="text" id="FullName" name="FullName" placeholder="Full Name" required />
            </div>

            <div className={styles.formDivs}>
              {/* <label htmlFor="Email">Email:</label> */}
              <input type="text" id="Email" name="Email" placeholder="Email" required />
            </div>

            <div className={styles.formDivs}>
              {/* <label htmlFor="PhoneNumber">Phone Number:</label> */}
              <input type="text" id="PhoneNumber" name="PhoneNumber" placeholder="Phone Number" required />
            </div>

            <div className={styles.formDivs}>
              {/* <label htmlFor="amount">Amount:</label> */}
              <input type="text" id="amount" name="amount" placeholder="Amount (₦----)" required />
            </div>

            {/* <div className={styles.formDivs}>
              <label htmlFor="Address">Address:</label>
              <input type="text" id="Address" name="Address" required />
            </div> */}

            <div className={styles.formDivs}>
              <Button tag={"Submit"} className={styles.giveButton} />
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}
