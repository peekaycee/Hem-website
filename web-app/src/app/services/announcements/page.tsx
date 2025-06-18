"use client";

import Image from 'next/image';
import Button from '../../components/Button';
import  styles  from "./announcement.module.css";
import Hero from "@/app/components/Hero";
import { Image12, Image13 } from '../../../../public/images';

export default function Announcement() { 
  return (
    <section className={styles.announcementPage}>
      <Hero title='Announcements' id={styles.announcement}/>
      <div className= {styles.announcementWrapper}>
        
        {/* Next Service */}
        <div className={styles.announcementContent}>
          <div className={styles.next}>
            <h1>Next Service</h1>
            <div className={styles.nextAnnouncement}>
              <div className={styles.announcementThumbnail}>
                <Image src={Image12} alt='Image Placeholder' />
              </div>
              <div className={styles.announcementBriefs}>
                <h2>Life of Prayer <span>- By Pst. Gbade</span></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis distinctio magnam officia in exercitationem voluptatibus facere quis vel blanditiis fugit!</p>
                <div className={styles.seeMoreButton}>
                  <Button tag="see more"/>
                </div>
              </div>
            </div>
          </div>
          {/* scheduled */}
          <div className={styles.scheduled}>
            <h1>Scheduled Services</h1>
            <div className={styles.scheduledService}>
              <div className={styles.announcementThumbnail}>
                <Image src={Image12} alt='Image Placeholder' />
              </div>
              <div className={styles.announcementBriefs}>
                <h2>Life of Prayer <span>- By Pst. Gbade</span></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis distinctio magnam officia in exercitationem voluptatibus facere quis vel blanditiis fugit!</p>
                <div className={styles.seeMoreButton}>
                  <Button tag="see more"/>
                </div>
              </div>
            </div>

            <div className={styles.nextAnnouncement}>
              <div className={styles.announcementThumbnail}>
                <Image src={Image13} alt='Image Placeholder' />
              </div>
              <div className={styles.announcementBriefs}>
                <h2>The Rebirth <span>- By Pst. Sanjo</span></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis distinctio magnam officia in exercitationem voluptatibus facere quis vel blanditiis fugit!</p>
                <div className={styles.seeMoreButton}>
                  <Button tag="see more"/>
                </div>
              </div>
            </div>
          </div>
        
          </div>
        </div>
    </section>
  );
}
