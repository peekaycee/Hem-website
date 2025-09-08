"use client";

import styles from "./home.module.css";
import Button from "./components/Button";
import Image from "next/image";
// import fallbackImage from "@/public/fallback.png"; // ✅ add fallback.png inside /public
import { Pic2, ChurchLogo } from "../../public/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/app/lib/supabaseClient";

// Testimonies
const testimonies = [
  "At HEMA, God transformed my life with healing, peace, and renewed strength through worship, prayer, and the power of His Word.",
  "I came broken, but through HEMA’s prayers and teachings, God restored my joy, and gave me new purpose.",
  "Through heartfelt worship at HEMA, I encountered God’s presence deeply, and found strength to overcome life’s challenges victoriously.",
  "HEMA has been a source of hope, and spiritual growth, helping me draw closer to God and experience lasting transformation.",
  "Prayer services at HEMA connected me to God’s power, miracles, and testimonies I never imagined possible in my life.",
  "My faith was strengthened at HEMA through Bible study, worship, and filling me with courage, hope, and spiritual renewal.",
  "God answered my long-awaited prayers during a HEMA service, proving His mercy, and love to me in miraculous ways.",
  "Attending HEMA filled my heart with gratitude, joy, and peace as God lifted my burdens and gave me fresh direction.",
  "Through fellowship and prayer at HEMA, I found healing, and strength to keep walking in God’s divine purpose daily.",
];

// Reusable fade-in animation
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  const router = useRouter();
  const [testimony, setTestimony] = useState(1);
  type Program = {
    id: number;
    title: string;
    date: string;
    image?: string;
    [key: string]: unknown;
  };
  const [programs, setPrograms] = useState<Program[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Hero video autoplay setup
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.setAttribute("muted", "true");
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");

      setTimeout(() => {
        video.play().catch((err) => console.warn("Autoplay prevented:", err));
      }, 200);
    }
  }, []);

  // Fetch announcements from Supabase
  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching announcements:", error);
        return;
      }

      const enriched = (data || []).map((program) => ({
        ...program,
        image: program.image || "", // leave blank, handle in render with fallback
      }));

      setPrograms(enriched);
    };

    fetchPrograms();
  }, []);

  const redirectToGivePage = () => router.push("/give");
  const redirectToAnnouncement = () => router.push("/announcements");
  const redirectToPrayer = () => router.push("/prayers");

  const previousTestimonies = () =>
    setTestimony((prev) => Math.max(prev - 1, 1));
  const nextTestimonies = () =>
    setTestimony((prev) => Math.min(prev + 1, 3));

  // Smooth infinite scroll setup
  const [trackWidth, setTrackWidth] = useState(0);
  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2); // half because we duplicate items
    }
  }, [programs]);

  return (
    <main>
      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
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
            We are a faith-driven ministry dedicated to inspiring hope, nurturing
            spiritual growth, and transforming lives. Through heartfelt worship,
            fervent prayer, engaging Bible study, and impactful community
            outreach, HEMA empowers individuals to draw closer to God, live
            victoriously, and positively influence the world with unwavering
            faith.
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

      {/* Events Section (Infinite Scroll + Lazy-Load + Responsive) */}
      <section className={styles.event}>
        <h2>Upcoming Programs</h2>
        <div className={styles.eventsWrapper}>
          <motion.div
            ref={trackRef}
            className={styles.track}
            animate={{ x: ["0px", `-${trackWidth}px`] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            {[...programs, ...programs].map((program, index) => (
              <div className={styles.eventImageWrapper} key={index}>
                <Image
                  src={program.image || fallbackImage}
                  alt={program.title || "Announcement image"}
                  width={200}
                  height={200}
                  priority={index < programs.length}
                  sizes="(max-width: 768px) 150px, (max-width: 1024px) 180px, 200px"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  loading={index >= programs.length ? "lazy" : "eager"}
                />
              </div>
            ))}
          </motion.div>
        </div>
        <Button tag="View all" onClick={redirectToAnnouncement} />
      </section>

      {/* Ministers Section */}
      <section className={styles.minister}>
        <h2>Meet Our Ministers</h2>
        <div className={styles.ministers}>
          {[1, 2, 3, 4].map((n) => (
            <div className={styles.minDetails} key={n}>
              <div className={styles.name}>
                <Image src={Pic2} alt="New Events" width={0} height={0} />
                <h3>
                  Bro {["Godwin", "Peter", "Sanjo", "Sanjo"][n - 1]}
                </h3>
                <p>
                  {
                    [
                      "Asst. Parish Pastor",
                      "Church Admin",
                      "Hospitality",
                      "Hospitality",
                    ][n - 1]
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonies Section */}
      <section className={styles.testimony}>
        <h2>Testimonies</h2>
        <div className={styles.testifiersDetails}>
          <ChevronLeft
            size={24}
            className={styles.dir}
            onClick={previousTestimonies}
          />
          {[1, 2, 3].map((n) =>
            testimony === n ? (
              <div
                className={`${styles.testimonyWrapper} ${styles.first}`}
                key={n}
              >
                {testimonies
                  .slice((n - 1) * 3, n * 3)
                  .map((text, i) => (
                    <div className={styles.testimonies} key={i}>
                      <div>
                        <p>{text}</p>
                      </div>
                      <div className={styles.testifier}>
                        <h3>John Doe {i + 1}</h3>
                        <Image src={Pic2} alt="testifier" />
                      </div>
                    </div>
                  ))}
              </div>
            ) : null
          )}
          <ChevronRight
            size={24}
            className={styles.dir}
            onClick={nextTestimonies}
          />
        </div>
      </section>

      {/* Prayer CTA */}
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
