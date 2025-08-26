"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './components.module.css';
import Image from 'next/image';
import { Youtube, Instagram, Facebook } from '../../../public/images/index';
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const isServicesActive = ["/service", "/announcements"].includes(pathname);
  const isMinistriesActive = ["/departments", "/followUp"].includes(pathname);
  const isPagesActive = ["/give", "/prayers", "/faq", "/admin"].includes(pathname);

  // Framer-motion variants for desktop caret
  const caretVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 180, transition: { duration: 0.22 } },
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  };

  const handleSubmenuToggle = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

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

      <nav className={styles.navbar} ref={navRef}>
        <div className={styles.navlinks}>
          <div className={styles.logo}>
            <Link href='/'><h1>HEMA</h1></Link>
          </div>

          {/* DESKTOP LINKS (hover dropdowns) */}
          <div className={styles.links}>
            <ul className={styles.links}>
              <li>
                <Link href='/' className={pathname === '/' ? styles.active : ''}>Home</Link>
              </li>

              {/* Services (desktop) */}
              <li className={styles.dropdown}>
                <motion.div
                  className={styles.dropdownWrapper}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <span className={isServicesActive ? styles.active : ''}>
                    Services{" "}
                    <motion.span
                      className={styles.caret}
                      variants={caretVariants}
                      aria-hidden
                    >
                      <ChevronDown size={12} />
                    </motion.span>
                  </span>
                  <ul className={styles.sublinks}>
                    <li><Link href='/service'>Services</Link></li>
                    <li><Link href='/announcements'>Announcements</Link></li>
                  </ul>
                </motion.div>
              </li>

              <li>
                <Link href='/sermons' className={pathname === '/sermons' ? styles.active : ''}>Sermon</Link>
              </li>

              {/* Ministries (desktop) */}
              <li className={styles.dropdown}>
                <motion.div
                  className={styles.dropdownWrapper}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <span className={isMinistriesActive ? styles.active : ''}>
                    Ministries{" "}
                    <motion.span
                      className={styles.caret}
                      variants={caretVariants}
                      aria-hidden
                    >
                      <ChevronDown size={12} />
                    </motion.span>
                  </span>
                  <ul className={styles.sublinks}>
                    <li><Link href='/departments'>Departments</Link></li>
                    <li><Link href='/followUp'>Follow-up</Link></li>
                  </ul>
                </motion.div>
              </li>

              {/* Pages (desktop) */}
              <li className={styles.dropdown}>
                <motion.div
                  className={styles.dropdownWrapper}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <span className={isPagesActive ? styles.active : ''}>
                    Pages{" "}
                    <motion.span
                      className={styles.caret}
                      variants={caretVariants}
                      aria-hidden
                    >
                      <ChevronDown size={12} />
                    </motion.span>
                  </span>
                  <ul className={styles.sublinks}>
                    <li><Link href='/give'>Give</Link></li>
                    <li><Link href='/prayers'>Prayer</Link></li>
                    <li><Link href='/faq'>FAQ</Link></li>
                    <li><Link href='/admin'>Admin</Link></li>
                  </ul>
                </motion.div>
              </li>

              <li><Link href='/contact' className={pathname === '/contact' ? styles.active : ''}>Contact</Link></li>
            </ul>
          </div>

          {/* LOGIN + MENU */}
          <div className={styles.login}>
            <Link href='/login' className={pathname === '/login' ? styles.active : ''}>Login</Link>
            {isMenuOpen
              ? <X size={24} className={styles.icons} onClick={toggleMenu} />
              : <Menu size={24} className={styles.icons} onClick={toggleMenu} />
            }
          </div>

          {/* MOBILE NAV (click-based dropdowns) */}
          <div className={`${styles.mobileNavWrapper} ${isMenuOpen ? styles.open : ""}`}>
            <ul className={styles.mobileNav}>
              <li><Link href="/" onClick={handleLinkClick}>Home</Link></li>

              <li>
                <button onClick={() => handleSubmenuToggle("services")}>
                  Services{" "}
                  <motion.span
                    className={styles.caretMobile}
                    animate={{ rotate: openSubmenu === "services" ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    aria-hidden
                  >
                    <ChevronDown size={12} />
                  </motion.span>
                </button>
                <ul className={`${styles.innerMobileNav} ${openSubmenu === "services" ? styles.show : ""}`}>
                  <li><Link href="/service" onClick={handleLinkClick}>Services</Link></li>
                  <li><Link href="/announcements" onClick={handleLinkClick}>Announcement</Link></li>
                </ul>
              </li>

              <li><Link href="/sermons" onClick={handleLinkClick}>Sermon</Link></li>

              <li>
                <button onClick={() => handleSubmenuToggle("ministries")}>
                  Ministries{" "}
                  <motion.span
                    className={styles.caretMobile}
                    animate={{ rotate: openSubmenu === "ministries" ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    aria-hidden
                  >
                    <ChevronDown size={12} />
                  </motion.span>
                </button>
                <ul className={`${styles.innerMobileNav} ${openSubmenu === "ministries" ? styles.show : ""}`}>
                  <li><Link href="/departments" onClick={handleLinkClick}>Departments</Link></li>
                  <li><Link href="/followUp" onClick={handleLinkClick}>Follow-up</Link></li>
                </ul>
              </li>

              <li>
                <button onClick={() => handleSubmenuToggle("pages")}>
                  Pages{" "}
                  <motion.span
                    className={styles.caretMobile}
                    animate={{ rotate: openSubmenu === "pages" ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    aria-hidden
                  >
                    <ChevronDown size={12} />
                  </motion.span>
                </button>
                <ul className={`${styles.innerMobileNav} ${openSubmenu === "pages" ? styles.show : ""}`}>
                  <li><Link href="/give" onClick={handleLinkClick}>Give</Link></li>
                  <li><Link href="/prayers" onClick={handleLinkClick}>Prayer</Link></li>
                  <li><Link href="/faq" onClick={handleLinkClick}>FAQ</Link></li>
                  <li><Link href="/admin" onClick={handleLinkClick}>Admin</Link></li>
                </ul>
              </li>

              <li><Link href="/contact" onClick={handleLinkClick}>Contact</Link></li>
              <li><Link href="/login" onClick={handleLinkClick}>Login</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
