"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./announcement.module.css";
import Hero from "@/app/components/Hero";
import { supabase } from "@/app/lib/supabaseClient";

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  ministering: string;
  image?: string; // Supabase URL
  fullDate?: Date;
  updated_at?: string; // cache-busting
}

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};

const formatTime = (timeStr: string) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hr = hour % 12 || 12;
  return `${hr}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

export default function Announcement() {
  const [programs, setPrograms] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const enriched = (data || []).map((program) => ({
        ...program,
        fullDate: new Date(`${program.date}T${program.time}`),
      }));

      setPrograms(enriched);
      setLoading(false);
    };

    fetchPrograms();
  }, []);

  const nextProgram = programs[programs.length - 1];
  const scheduledPrograms = programs.slice(0, programs.length - 1).reverse();

  const getCacheBustedUrl = (url?: string, timestamp?: string) => {
    if (!url) return "";
    return `${url}?t=${timestamp || Date.now()}`;
  };

  return (
    <section className={styles.announcementPage}>
      <Hero title="Programs" id={styles.announcement} />

      <div className={styles.announcementWrapper}>
        <AnimatePresence>
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              {/* Skeleton Layout */}
              <div className={styles.next}>
                <h1>Latest Program</h1>
                <div className={styles.nextAnnouncement}>
                  <div className={styles.announcementThumbnail}>
                    <div className={styles.skeleton} />
                  </div>
                  <div className={styles.announcementBriefs}>
                    <div className={styles.skeletonLine} />
                    <div className={styles.skeletonLineShort} />
                    <div className={styles.skeletonLine} />
                    <div className={styles.skeletonLineMedium} />
                  </div>
                </div>
              </div>

              <div className={styles.scheduled}>
                <h1>Scheduled Programs</h1>
                {[...Array(2)].map((_, idx) => (
                  <div className={styles.nextAnnouncement} key={idx}>
                    <div className={styles.announcementThumbnail}>
                      <div className={styles.skeleton} />
                    </div>
                    <div className={styles.announcementBriefs}>
                      <div className={styles.skeletonLine} />
                      <div className={styles.skeletonLineShort} />
                      <div className={styles.skeletonLineMedium} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
              exit={{ opacity: 0 }}
            >
              {nextProgram && (
                <div className={styles.next}>
                  <h1>Latest Program</h1>
                  <div className={styles.nextAnnouncement}>
                    <div className={styles.announcementThumbnail}>
                      {nextProgram.image ? (
                        <Image
                          src={getCacheBustedUrl(nextProgram.image, nextProgram.updated_at)}
                          alt={nextProgram.title}
                          width={500}
                          height={300}
                          style={{ objectFit: "cover", borderRadius: 8 }}
                        />
                      ) : (
                        <div className={styles.skeleton} />
                      )}
                    </div>
                    <div className={styles.announcementBriefs}>
                      <h2>
                        {nextProgram.title} <span>- happening @{nextProgram.venue}</span>
                      </h2>
                      <p className={styles.dateTime}>
                        {formatDate(nextProgram.date)} | {formatTime(nextProgram.time)}
                      </p>
                      <p className={styles.ministering}>
                        <span>Ministering :</span> {nextProgram.ministering}
                      </p>
                      <p className={styles.expectation}>{nextProgram.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {scheduledPrograms.length > 0 && (
                <div className={styles.scheduled}>
                  <h1>Scheduled Programs</h1>
                  {scheduledPrograms.map((program) => (
                    <div className={styles.nextAnnouncement} key={program.id}>
                      <div className={styles.announcementThumbnail}>
                        {program.image ? (
                          <Image
                            src={getCacheBustedUrl(program.image, program.updated_at)}
                            alt={program.title}
                            width={500}
                            height={300}
                            style={{ objectFit: "cover", borderRadius: 8 }}
                          />
                        ) : (
                          <div className={styles.skeleton} />
                        )}
                      </div>
                      <div className={styles.announcementBriefs}>
                        <h2>
                          {program.title} <span>- happening @{program.venue}</span>
                        </h2>
                        <p className={styles.dateTime}>
                          {formatDate(program.date)} | {formatTime(program.time)}
                        </p>
                        <p className={styles.ministering}>
                          <span>Ministering : </span>
                          {program.ministering}
                        </p>
                        <p className={styles.expectation}>{program.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
