"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Image12, Image13, Image14 } from "../../../../public/images";
import styles from "./sermonid.module.css";
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
  // ✅ Render exact image passed from sermon page
  const selectedImage = imageMap[imageIndex % imageMap.length];

  const isVideo = Boolean(videoUrl);
  const isAudio = Boolean(audioUrl);
  const isScript = Boolean(scriptUrl);

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-")
    : "";

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
        {topic && (
          <h2 className={styles.topic}>
            Topic: <span>{topic}</span>
          </h2>
        )}
        {preacher && (
          <p>
            <strong>Preacher:</strong> {preacher}
          </p>
        )}
        {description && (
          <p>
            <strong>Description:</strong> {description}
          </p>
        )}
        {date && (
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
        )}
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
          <div style={{ position: "relative", width: 400, height: 500, borderRadius: 8, overflow: "hidden" }}>
            <Image
              src={selectedImage}
              alt="Sermon Thumbnail"
              fill
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
            {topic && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#fff",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                  padding: "0 10px",
                }}
              >
                {topic}
              </div>
            )}
          </div>

          <div className={styles.downloadWrapper}>
            <Button tag="Download Script" onClick={handleDownload} />
          </div>
        </div>
      )}
    </div>
  );
}
