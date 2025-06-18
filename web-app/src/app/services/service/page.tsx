// app/announcement/page.tsx
import Hero from "@/app/components/Hero";
import styles from "./services.module.css";
// import Image from 'next/image';
// import { Pic1 } from '../../../../public/images/index';

export default function Services() {
  return (
    <section className={styles.servicePage}>
      <Hero title='Services' id={styles.service}/>
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
          <h3>DIGGING DEEP |<span> Bible Study</span> </h3>
          <b><em>Tuesdays @ 6PM</em></b>
          <p>Discover Deeper Faith and Real-Life Answers Through Engaging Bible Study-Join Us To Grow, Connect, And Be Inspired By God&apos;s Word.</p>
        </div>
        <div className={`${styles.pic} ${styles.left}`}></div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.left}`} >
          <h3>DIGGING DEEP |<span> Bible Study</span> </h3>
          <b><em>Tuesdays @ 6PM</em></b>
          <p>Discover Deeper Faith and Real-Life Answers Through Engaging Bible Study-Join Us To Grow, Connect, And Be Inspired By God&apos;s Word.</p>
        </div>
        <div className={`${styles.pic} ${styles.right}`}></div>
      </div>
      <div className={styles.service}>
        <div className={`${styles.dig} ${styles.right}`}>
          <h3>DIGGING DEEP |<span> Bible Study</span> </h3>
          <b><em>Tuesdays @ 6PM</em></b>
          <p>Discover Deeper Faith and Real-Life Answers Through Engaging Bible Study-Join Us To Grow, Connect, And Be Inspired By God&apos;s Word.</p>
        </div>
        <div className={`${styles.pic} ${styles.left}`} ></div>
      </div>
     
     
     
     
     
     
     
     
     
     
     
     
      {/* <div className={`${styles.dig} ${styles.right}`} >
       <div className={styles.dig}>
        <h3>DIVINE ENCOUNTER</h3>
         <b><i>Wednesdays @ 9AM</i></b>
         <p>Experience God&apos;s Power And Presence Like Never <br/> Before-Join DIVINE ENCOUNTER,A life-Changing<br/>Prayer Gathering Where Heaven Meets Earth</p></div>
        <div className={styles.pic}>images</div>
      </div>
      <div className={styles.service}>
       <div className={styles.dig}>
        <h3>FAITH CLINIC</h3>
         <b><i>Thursday @ 6PM</i></b>
         <p>Experience God&apos;s Power And Presence Like Never <br/> Before-Join DIVINE ENCOUNTER,A life-Changing<br/>Prayer Gathering Where Heaven Meets Earth</p></div>
        <div className={styles.pic}>images</div>
      </div>
      <div className={styles.service}>
       <div className={styles.dig}>
        <h3>THANKSGIVING</h3>
         <b><i>First Sundays @ 8:30AM</i></b>
         <p>Experience God&apos;s Power And Presence Like Never <br/> Before-Join DIVINE ENCOUNTER,A life-Changing<br/>Prayer Gathering Where Heaven Meets Earth</p></div>
        <div className={styles.pic}>images</div>
      </div> */}
    </section>
  );
}  
