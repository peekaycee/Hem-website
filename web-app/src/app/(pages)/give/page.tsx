"use client";

import Hero from "@/app/components/Hero";
import styles from './give.module.css';
import Button from "@/app/components/Button";

export default function Give() {
  return (
     <section className={styles.givePage}>
        <Hero title='Give' id={styles.give}/>
      <section className={styles.giveContainer}>
        <div className={styles.leftSide}>
              <Button tag="Offering" className={styles.categoryBtn}/>
              <Button tag="Tithe" className={styles.categoryBtn}/>
              <Button tag="Building Project" className={styles.categoryBtn}/>
              <Button tag="Mission" className={styles.categoryBtn}/>
        </div>
       
        <div className={styles.rightSide}>
            <form>
                <h1>Details</h1>
                <div className={styles.formDivs}>
                    <label htmlFor="FullName">Full Name:</label>
                    <input type="text" id="FullName" name="FullName" />
                </div>

                <div className={styles.formDivs}>
                    <label htmlFor="Email">Email:</label>
                    <input type="text" id="Email" name="Email" />
                </div>

                <div className={styles.formDivs}>
                    <label htmlFor="PhoneNumber">Phone Number:</label>
                    <input type="text" id="PhoneNumber" name="PhoneNumber" />
                </div>

                <div className={styles.formDivs}>
                    <label htmlFor="Country">Country:</label>
                    <input type="text" id="Country" name="Country"/>
                </div>

                <div className={styles.formDivs}>
                    <label htmlFor="Address">Address:</label>
                    <input type="text" id="Address" name="Address" /> 
                </div>
                
                <div className={styles.formDivs}>
                  <Button tag={"submit"} className={styles.giveButton}/>
                </div>
            </form>
        </div>
      </section>
    </section>
  ); 
}