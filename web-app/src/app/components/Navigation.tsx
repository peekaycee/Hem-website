"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './components.module.css';
import Image from 'next/image';
import { Youtube, Instagram, Facebook } from '../../../public/images/index';
import { ChevronDown } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const isServicesActive = ["/service", "/announcements"].includes(pathname);
  const isMinistriesActive = ["/departments", "/followUp"].includes(pathname);
  const isPagesActive = ["/give", "/prayers", "/faq", "/admin"].includes(pathname);

  return (
    <>
      <header className={styles.address}>
        <p>9, Redeemed Avenue, Off Remlek Bus-stop, Badore</p>
        <div className={styles.socialIcons}>
          <a href="https://twitter.com/HEMA_Church" target="_blank" rel="noopener noreferrer" title='Twitter'>
            <Image src={Youtube} alt="Twitter" width={20} height={20} />
          </a><span>|</span>
          <a href="https://instagram.com/HEMA_Church" target="_blank" rel="noopener noreferrer" title='Instagram'>
            <Image src={Instagram} alt="Instagram" width={20} height={20} />
          </a><span>|</span>
          <a href="https://facebook.com/HEMA_Church" target="_blank" rel="noopener noreferrer" title='Facebook'>
            <Image src={Facebook} alt="Facebook" width={20} height={20} />
          </a>
        </div>
      </header>

      <nav className={styles.navbar}>
        <div className={styles.navlinks}>
          <div className={styles.logo}>
            <Link href='/'><h1>HEMA</h1></Link>
          </div>

          <div className={styles.links}>
            <ul className={styles.links}>
              <li>
                <Link href='/' className={pathname === '/' ? styles.active : ''}>Home</Link>
              </li>

              <li className={styles.dropdown}>
                <div className={styles.dropdownWrapper}>
                  <span className={isServicesActive ? styles.active : ''}>
                    Services <ChevronDown className={`${styles.rotated} ${styles.dd}`} size={12} />
                  </span>
                  <ul className={styles.sublinks}>
                    <li><Link href='/service'>Services</Link></li>
                    <li><Link href='/announcements'>Announcements</Link></li>
                  </ul>
                </div>
              </li>

              <li>
                <Link href='/sermons' className={pathname === '/sermons' ? styles.active : ''}>Sermon</Link>
              </li>

              <li className={styles.dropdown}>
                <div className={styles.dropdownWrapper}>
                  <span className={isMinistriesActive ? styles.active : ''}>
                    Ministries <ChevronDown className={`${styles.rotated} ${styles.dd}`} size={12} />
                  </span>
                  <ul className={styles.sublinks}>
                    <li><Link href='/departments'>Departments</Link></li>
                    <li><Link href='/followUp'>Follow-up</Link></li>
                  </ul>
                </div>
              </li>

              <li className={styles.dropdown}>
                <div className={styles.dropdownWrapper}>
                  <span className={isPagesActive ? styles.active : ''}>
                    Pages <ChevronDown className={`${styles.rotated} ${styles.dd}`} size={12} />
                  </span>
                  <ul className={styles.sublinks}>
                    <li><Link href='/give'>Give</Link></li>
                    <li><Link href='/prayers'>Prayer</Link></li>
                    <li><Link href='/faq'>FAQ</Link></li>
                    <li><Link href='/admin'>Admin</Link></li>
                  </ul>
                </div>
              </li>

              <li>
                <Link href='/contact' className={pathname === '/contact' ? styles.active : ''}>Contact</Link>
              </li>
            </ul>
          </div>

          <div className={styles.login}>
            <Link href='/login' className={pathname === '/login' ? styles.active : ''}>Login</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
