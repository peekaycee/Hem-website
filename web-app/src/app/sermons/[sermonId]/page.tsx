"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Image12, Image13, Image14 } from "../../../../public/images";
import styles from './sermonid.module.css';
import Button from "@/app/components/Button";

export default function SermonId() {
  const searchParams = useSearchParams();

  const topic = searchParams.get("topic");
  const preacher = searchParams.get("preacher");
  const description = searchParams.get("description");
  const date = searchParams.get("date");

  const videoUrl = searchParams.get("videoUrl");
  const audioUrl = searchParams.get("audioUrl");
  const scriptUrl = searchParams.get("scriptUrl");
  const imageIndex = parseInt(searchParams.get("imageIndex") || "0");

  const imageMap = [Image12, Image13, Image14];
  const selectedImage = imageMap[imageIndex % 3];

  const isVideo = !!videoUrl;
  const isAudio = !!audioUrl;
  const isScript = !!scriptUrl;

  // Function to trigger download
  const handleDownload = () => {
    if (!scriptUrl) return;
    const link = document.createElement("a");
    link.href = scriptUrl;
    link.download = scriptUrl.split("/").pop() || "sermon-script.docx"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.sermonPage}>
      <div className={styles.headerText}>
        {isVideo && <h1 className={styles.mediaTitle}>Sermon Video</h1>}
        {isAudio && <h1 className={styles.mediaTitle}>Sermon Audio</h1>}
        {isScript && <h1 className={styles.mediaTitle}>Sermon Script</h1>}
      </div>

      <div className={styles.details}>
        {topic && <h2 className={styles.topic}>Topic: {topic}</h2>}
        {preacher && <p><strong>Preacher:</strong> {preacher}</p>}
        {description && <p><strong>Description:</strong> {description}</p>}
        {date && <p><strong>Date:</strong> {date}</p>}
      </div>

      {isVideo && (
        <div className={styles.videoWrapper}>
          <video src={videoUrl!} controls className={styles.video} />
        </div>
      )}

      {isAudio && (
        <div className={styles.audioWrapper}>
          <audio src={audioUrl!} controls className={styles.audio} />
        </div>
      )}

      {isScript && (
        <div className={styles.scriptWrapper}>
          <Image
            src={selectedImage}
            alt="Script Thumbnail"
            className={styles.scriptImage}
            width={400}
            height={500}
          />
          <div className={styles.downloadWrapper}>
            <Button tag="Download Script" onClick={handleDownload} />
          </div>
        </div>
      )}
    </div>
  );
}
