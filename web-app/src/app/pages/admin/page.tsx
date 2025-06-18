"use client";

// import Image from 'next/image';
import Button from '../../components/Button';
import Hero from "@/app/components/Hero";
import styles from './admin.module.css';
import { useState } from 'react';


export default function Admin() {
  const [ activeTab, setActiveTab] = useState("announcement");
  
  return (
    <section className={styles.adminPage}>
      <Hero title='Admin' id={styles.admin}/>
       <div className={styles.adminWrapper}>
        <div className={styles.sideBar}>
          <Button tag={'Announcements'} onClick={()=> setActiveTab("announcement")}/>
          <Button tag={'Sermon Library'} onClick={()=> setActiveTab("sermon")}/>
          <Button tag={'Follow-up'} onClick={()=> setActiveTab("followUp")}/>
        </div>
        {/* Recent Sermons */}
        <div className={styles.adminTable}>
          <div className={`${styles.sermonCrud} ${activeTab === 'announcement'? styles.show : styles.hide}`}>
            <h1>Anouncement Table</h1>
          </div>
          <div className={`${styles.AnnouncementCrud} ${activeTab === 'sermon'? styles.show : styles.hide}`}>
            <h1>Sermon Table</h1>
          </div>
          <div className={`${styles.followUpCrud} ${activeTab === 'followUp'? styles.show : styles.hide}`}>
            <h1>Follow-up Table</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
