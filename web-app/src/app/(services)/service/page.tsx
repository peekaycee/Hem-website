// app/announcement/page.tsx
import Hero from "@/app/components/Hero";
import styles from "./services.module.css";
// import Image from 'next/image';
// import { Pic1 } from '../../../../public/images/index';

export default function Services() {
  return (
    <section className={styles.servicePage}>
      <Hero title='Our Services' id={styles.service}/>
      {/* Bulletin Posts + Event Calendar */}
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.left}`}>
          <h3>DIGGING DEEP |<span> Bible Study</span> </h3>
          <b><em>Tuesdays @ 6PM</em></b>
          <p>Discover Deeper Faith and Real-Life Answers Through Engaging Bible Study-Join Us To Grow, Connect, And Be Inspired By God&apos;s Word.</p>
        </div>
        <div className={`${styles.pic} ${styles.right}`} >
          {/* <Image src={Pic1} alt='testifier'/> */}
        </div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.right}`}>
          <h3>DIVINE ENCOUNTER |<span> Prayer Service</span> </h3>
          <b><em>Wednesdays&apos; @ 9AM</em></b>
          <p>Experience Gods presence at Divine Encounter Prayer Service through prayer, Bible study, and teachings that inspire faith, growth, and transformation.</p>
        </div>
        <div className={`${styles.pic} ${styles.left}`}></div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.left}`} >
          <h3>Faith Clinic |<span> Prayer Service</span> </h3>
          <b><em>Thursdays @ 6PM</em></b>
          <p>Join our Faith Clinic for prayer, Bible study, and teachings that inspire, strengthen faith, and provide answers to life’s challenges.</p>
        </div>
        <div className={`${styles.pic} ${styles.right}`}></div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.right}`}>
          <h3>THANKSGIVING SERVICE |<span> Gratitude</span> </h3>
          <b><em>First Sundays @ 9AM</em></b>
          <p>Celebrate God with gratitude through praise, worship, singing, and joyful dancing that uplift your spirit, inspire faith, and unlock greatness.</p>
        </div>
        <div className={`${styles.pic} ${styles.left}`} ></div>
      </div>
    </section>
  );
}  
