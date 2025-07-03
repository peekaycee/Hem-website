"use client";

import Image from 'next/image';
import styles from "./announcement.module.css";
import Hero from "@/app/components/Hero";
import { Image11, Image12, Image13, Image14 } from '../../../../public/images';
import ProgramData from '../../data/announcements.json';

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
  const imageMap: Record<string, any> = {
    Image11,
    Image12,
    Image13,
    Image14,
  };

  // Enrich each program with date and image
  const enrichedPrograms = [...ProgramData].map((program) => ({
    ...program,
    image: imageMap[program.image] || Image12,
    fullDate: new Date(`${program.date}T${program.time}`),
  }));

  // Assume the last one added is the latest
  const nextProgram = enrichedPrograms[enrichedPrograms.length - 1];
  const scheduledPrograms = enrichedPrograms
    .slice(0, enrichedPrograms.length - 1)
    .reverse(); // reverse to show most recent first

  return (
    <section className={styles.announcementPage}>
      <Hero title="Programs" id={styles.announcement} />
      <div className={styles.announcementWrapper}>
        {nextProgram && (
          <div className={styles.next}>
            <h1>Next Program</h1>
            <div className={styles.nextAnnouncement}>
              <div className={styles.announcementThumbnail}>
                <Image src={nextProgram.image} alt={nextProgram.title} />
              </div>
              <div className={styles.announcementBriefs}>
                <h2>{nextProgram.title} <span>- happening @{nextProgram.venue}</span></h2>
                <p>{formatDate(nextProgram.date)} | {formatTime(nextProgram.time)}</p>
                <p>{nextProgram.description}</p>
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
                  <Image src={program.image} alt={program.title} />
                </div>
                <div className={styles.announcementBriefs}>
                  <h2>{program.title} <span>- happening @{program.venue}</span></h2>
                  <p>{formatDate(program.date)} | {formatTime(program.time)}</p>
                  <p>{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
