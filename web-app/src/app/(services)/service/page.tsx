// app/announcement/page.tsx
import Hero from "@/app/components/Hero";
import styles from "./services.module.css";
// import Image from 'next/image';
// import { Pic1 } from '../../../../public/images/index';

export default function Services() {
  return (
    <section className={styles.servicePage}>
      <Hero title='Our Services' id={styles.service}/>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.left}`}>
          <h3>DIGGING DEEP |<span> Bible Study</span> </h3>
          <b><em>Tuesdays @ 6PM</em></b>
          <p>Discover Deeper Faith and Real-Life Answers Through Engaging Bible Study-Join Us To Grow, Connect, And Be Inspired By God&apos;s Word.</p>
        </div>
        <div className={`${styles.pic} ${styles.program1} ${styles.right}`}></div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.right}`}>
          <h3>DIVINE ENCOUNTER |<span> Prayer Service</span> </h3>
          <b><em>Wednesdays&apos; @ 9AM</em></b>
          <p>Experience Gods presence at Divine Encounter Prayer Service through prayer, Bible study, and teachings that inspire faith, growth, and transformation.</p>
        </div>
        <div className={`${styles.pic} ${styles.program2} ${styles.left}`}></div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.left}`} >
          <h3>Faith Clinic |<span> Prayer Service</span> </h3>
          <b><em>Thursdays @ 6PM</em></b>
          <p>Join our Faith Clinic for prayer, Bible study, and teachings that inspire, strengthen faith, and provide answers to life’s challenges.</p>
        </div>
        <div className={`${styles.pic} ${styles.program3} ${styles.right}`}></div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.right}`}>
          <h3>THANKSGIVING SERVICE |<span> Gratitude</span> </h3>
          <b><em>First Sundays @ 9AM</em></b>
          <p>Celebrate God with gratitude through praise, worship, singing, and joyful dancing that uplift your spirit, inspire faith, and unlock greatness.</p>
        </div>
        <div className={`${styles.pic} ${styles.program4} ${styles.left}`} ></div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.left}`}>
          <h3>POWER SWALLOW POWER |<span> Prayer</span> </h3>
          <b><em>Third Sundays @ 6:15AM</em></b>
          <p>This is a pre-dawn prayer program of intense intercession where God&apos;s power swallows every opposing power against destiny.</p>
        </div>
        <div className={`${styles.pic} ${styles.program5} ${styles.right}`} ></div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.right}`}>
          <h3>YOUTH CELEBRATION SERVICE |<span> YCS</span> </h3>
          <b><em>Last Sundays @ 10:00AM</em></b>
          <p>This is a service where the young adults and youths are given the opportunity to lead and demonstrate their spiritual gifts and talents as they coordinate the service on that day. You cannot afford to miss it.</p>
        </div>
        <div className={`${styles.pic} ${styles.program6} ${styles.left}`} ></div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.left}`}>
          <h3>HOLY COMMUNION SERVICE |<span> Communion</span> </h3>
          <b><em>First Sundays @ 6:00PM</em></b>
          <p>This is a special Holy Communion service where believers gather to partake in the Lord’s Table, reflecting on Christ’s sacrifice and renewing their faith. It’s a time of worship, thanksgiving, and spiritual connection. You don’t want to miss this sacred experience.</p>
        </div>
        <div className={`${styles.pic} ${styles.program7} ${styles.right}`} ></div>
      </div>
    </section>
  );
}  
