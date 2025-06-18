"use client";

import Link from "next/link";
import styles from './components.module.css';
import Image from 'next/image';
import { Twitter, Instagram, Facebook } from '../../../public/images/index';
import { ChevronDown } from "lucide-react";
// import { useState } from "react";


export default function Navigation() {
  // const [ active, setActive] = useState('active');

  return(
    <>
      <header className={styles.address}>
        <p>9, Redeemed Avenue, Off Remlek Bus-stop, Badore</p>
        <div className={styles.socialIcons}>
          <a href="https://twitter.com/HEMA_Church" target="_blank" rel="noopener noreferrer" title='Twitter'>
            <Image src={Twitter} alt="Twitter" width={20} height={20}/>
          </a><span>|</span>
          <a href="https://instagram.com/HEMA_Church" target="_blank" rel="noopener noreferrer" title='Instagram'>
            <Image src={Instagram} alt="Instagram" width={20} height={20}/>
          </a><span>|</span>
          <a href="https://facebook.com/HEMA_Church" target="_blank" rel="noopener noreferrer" title='Facebook'>
            <Image src={Facebook} alt="Facebook" width={20} height={20}/>
          </a>
        </div>
      </header>
      <nav className={styles.navbar}>
        <div className={styles.navlinks}>
          <div className={styles.logo}>
            <Link href='/home'><h1>LOGO</h1></Link> 
          </div>
          <div className={styles.links}>
             <ul className={styles.links}>
              <li><Link href={'/home'} className={styles.active}>Home</Link></li>
              <li className={styles.dropdown}>
                <div className={styles.dropdownWrapper}>
                  Services <ChevronDown className={`${styles.rotated} ${styles.dd}`} size={12}/>
                  <ul className={styles.sublinks}>
                    <li><Link href={'/services/service'}>Services</Link></li>
                    <li><Link href={'/services/announcements'}>Announcements</Link></li>
                  </ul>
                </div>
              </li>
              <li><Link href={'/sermons'}>Sermon</Link></li>
              <li className={styles.dropdown}>
                <div className={styles.dropdownWrapper}>
                  Ministries<ChevronDown className={`${styles.rotated} ${styles.dd}`} size={12}/>
                  <ul className={styles.sublinks}>
                    <li><Link href={'/ministries/departments'}>Departments</Link></li>
                    <li><Link href={'#'}>Follow-up</Link></li>
                  </ul>
                </div>
              </li>
              <li className={styles.dropdown}>
                <div className={styles.dropdownWrapper}>
                  Pages<ChevronDown className={`${styles.rotated} ${styles.dd}`} size={12}/>
                  <ul className={styles.sublinks}>
                    <li><Link href={'/pages/give'}>Give</Link></li>
                    <li><Link href={'/pages/prayers'}>Prayer</Link></li>
                    <li><Link href={'/pages/faq'}>FAQ</Link></li>
                    <li><Link href={'/pages/admin'}>Admin</Link></li>
                  </ul>
                </div>
              </li>
              <li><Link href={'/contact'}>Contact</Link></li>
            </ul>
          </div>
          <div className={styles.login}>
            <Link href={'/'}>Login</Link>
          </div>
        </div>
      </nav>
  </>
    
  )
}
