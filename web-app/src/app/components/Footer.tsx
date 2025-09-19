"use client";
import Image  from 'next/image';
import styles from './components.module.css';
import { Youtube, Instagram, Facebook, Tiktok } from '../../../public/images/index';
import Link from "next/link";

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.churchDetails}>
          <h2>His Everlasting Mercy Area HEMA</h2>
          <p>HEMA is a faith-driven ministry inspiring hope, growth, and transformation through worship, prayer, Bible study, and impactful community outreach.
          </p>
          <div className={styles.socials}>
            <h2>Follow Us</h2>
            <div className={styles.socialIcons}>
              <a href="https://twitter.com/HEMA_Church" target="_blank" rel="noopener noreferrer" title="twitter">
                <Image src={Youtube} alt="Twitter" width={22} height={22} />
              </a>
              <a href="https://instagram.com/HEMA_Church" target="_blank" rel="noopener noreferrer" title="instagram">
                <Image src={Instagram} alt="Instagram" width={22} height={22} />
              </a>
              <a href="https://facebook.com/HEMA_Church" target="_blank" rel="noopener noreferrer" title="facebook">
                <Image src={Facebook} alt="Facebook" width={22} height={22} />
              </a>
              <a href="https://facebook.com/HEMA_Church" target="_blank" rel="noopener noreferrer" title="tiktok">
                <Image src={Tiktok} alt="Tiktok" width={22} height={22} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.quicklinks}>
          <h3>Quicklinks</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/service">Services</Link></li>
            <li><Link href="/sermons">Sermons</Link></li>
            <li><Link href="/departments">Ministries</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/admin">Admin</Link></li>
          </ul>
        </div>
        <div className={styles.connect}>
          <h3>Connect</h3>
          <ul>
            <li><Link href="/announcements">Announcements</Link></li>
            <li><Link href="/departments">Departments</Link></li>
            <li><Link href="/followUp">Follow-up</Link></li>
            <li><Link href="/prayers">Prayers</Link></li>
            <li><Link href="/give">Give</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div className={styles.serviceHour}>
          <div>
            <h3>Service Hour</h3>
            <p>Sunday Services</p>
            <pre>
              First-Service:
              8:00AM - 9:00AM
            </pre>
            <pre>
              Second-Service:
              9:00AM - 11:30AM
            </pre>
          </div>
          <div className={styles.footerAddress}>
            <h3>Address</h3>
            <address>9, Redeemed Avenue, Off Remlek, Badore, Ajah, Lagos.</address>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>© 2025 HEMA Parish. All rights reserved.</p>
        <p>Created and Inspired by Homes &apos;n&apos; Codes Limited.</p>
      </div>
    </footer>
  ) 
}