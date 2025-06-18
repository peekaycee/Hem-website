import Hero from "@/app/components/Hero";
import styles from './prayers.module.css'
import Button from "@/app/components/Button";
// import styles from "./prayers.module.css";
export default function PrayersAndCounselling() {
  return (
    <section className={styles.prayerPage}>
      <Hero title='Prayers & Counselling' id={styles.prayer}/>
        <form className={styles.prayerForm}>
          <h1>Do you have prayer points you would like me to pray with you about? Tell me</h1>
          <div className={styles.prayerPoints}>
            <input name={"prayer"} placeholder={"Type in your prayer points..."}/>
            <input name={"prayer"} placeholder={"Type in your prayer points..."}/>
          </div>
          <div className={styles.add}>+</div>
          <Button tag="Pray For Me"/>
        </form>
        <form className={styles.counsellingForm}>
          <h1>Do you need counselling?</h1>
          <div className={styles.counselText}>
            <textarea name="counselRequest" id="counselRequest" placeholder="Tell me about it..." rows={5} cols={120}></textarea>
          </div>
          <Button tag="Counsel Me"/>
        </form>
      {/* Map, Form, Clergy Info */}
    </section>
  );
}
