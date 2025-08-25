"use client";

import styles from './home.module.css';
import Button from './components/Button';
import Image from 'next/image';
import { Pic1, ChurchLogo } from '../../public/images';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { announcementImages } from './data/announcementImages';
import { motion } from "framer-motion";

// Reusable fade-in animation
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  const router = useRouter();
  const [testimony, setTestimony] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ensure hero video plays on mount (desktop + mobile)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.setAttribute("muted", "true");
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");

      // slight delay helps Safari autoplay
      setTimeout(() => {
        video.play().catch((err) => {
          console.warn("Autoplay prevented:", err);
        });
      }, 200);
    }
  }, []);

  const redirectToGivePage = () => {
    router.push("/give");
  };
  const redirectToAnnouncement = () => {
    router.push("/announcements");
  };
  const redirectToPrayer = () => {
    router.push("/prayers");
  };

  const previousTestimonies = () => {
    setTestimony((prev) => Math.max(prev - 1, 1));
  };

  const nextTestimonies = () => {
    setTestimony((prev) => Math.min(prev + 1, 3));
  };

  return (
    <main>
      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        variants={fadeIn}
        initial="hidden"
        animate="visible"   // plays immediately on mount
      >
        <div className={styles.video}>
          <video
            ref={videoRef}
            src="/videos/Hema-vid.mp4"
            loop
            autoPlay
            muted
            playsInline
            preload="auto"
          />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className={styles.about}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={styles.details}>
          <div className={styles.detailImage}></div>
          <div className={styles.pastorsDetails}>
            <h3>Pastor & Mrs. Gbdegheshin</h3>
            <abbr>PICA</abbr>
          </div>
        </div>
        <div className={styles.aboutContent}>
          <h2>About HEMA </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus modi iste quas hic, harum magni placeat consequatur laboriosam, nemo vel nulla alias aut quod debitis eaque, quasi rem! Quaerat rerum eaque tenetur quis, id accusamus tempora error nulla tempore officiis, eligendi aliquam quisquam. Incidunt repellat nisi facere labore amet. Velit?
          </p>
        </div>
      </motion.section>

      {/* Church Project Section */}
      <motion.section
        className={styles.prototype}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={styles.projectContent}>
          <h2>Join Us To Make The Church Building A Reality.</h2>
          <p>Partner With Us Today!</p>
          <Button tag="Donate" onClick={redirectToGivePage} />
        </div>
      </motion.section>

      {/* Events Section (Infinite Scroll with Seamless Loop) */}
      <section className={styles.event}>
        <h2>Upcoming Programs</h2>
        <div className={styles.eventsWrapper}>
          <motion.div
            className={styles.track}
            animate={{ x: ["0%", "-50%"] }} // half since it's duplicated
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            {[...announcementImages, ...announcementImages].map((img, index) => (
              <div className={styles.eventImageWrapper} key={index}>
                <Image
                  src={img}
                  alt={`Event ${index + 1}`}
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </motion.div>
        </div>
        <Button tag="view all" onClick={redirectToAnnouncement} />
      </section>

      {/* Ministers Section */}
      <section className={styles.minister}>
        <h2>Meet Our Ministers</h2>
        <div className={styles.ministers}>
          {[1, 2, 3, 4].map((n) => (
            <div className={styles.minDetails} key={n}>
              <div className={styles.name}>
                <Image src={Pic1} alt="New Events" width={0} height={0} />
                <h3>Bro {["Godwin", "Peter", "Sanjo", "Sanjo"][n - 1]}</h3>
                <p>{["Asst. Parish Pastor", "Church Admin", "Hospitality", "Hospitality"][n - 1]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonies Section (NO animation) */}
      <section className={styles.testimony}>
        <h2>Testimonies</h2>
        <div className={styles.testifiersDetails}>
          <ChevronLeft size={24} className={styles.dir} onClick={previousTestimonies} />
          {[1, 2, 3].map((n) =>
            testimony === n ? (
              <div className={`${styles.testimonyWrapper} ${styles.first}`} key={n}>
                {[...Array(3)].map((_, i) => (
                  <div className={styles.testimonies} key={i}>
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, iste.
                      </p>
                    </div>
                    <div className={styles.testifier}>
                      <h3>John Doe {n}</h3>
                      <Image src={Pic1} alt="testifier" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null
          )}
          <ChevronRight size={24} className={styles.dir} onClick={nextTestimonies} />
        </div>
      </section>

      {/* Prayer CTA (NO animation) */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Need Someone To Pray With?</h2>
          <Button tag="Reach Out To Us" onClick={redirectToPrayer} />
        </div>
      </section>

      {/* Church Logo */}
      <section className={styles.churchLogo}>
        <Image src={ChurchLogo} alt="New Events" />
      </section>
    </main>
  );
}
