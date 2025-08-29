"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "../components/Hero";
import Button from "../components/Button";
import styles from "./sermons.module.css";
import {
  VideoIcon,
  AudioIcon,
  ScriptIcon,
  Image12,
  Image13,
  Image14,
} from "../../../public/images";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";

interface Sermon {
  id: number;
  topic: string;
  preacher: string;
  description: string;
  date: string;
  video_url: string;  // ✅ DB column names
  audio_url: string;
  script_url: string;
}

const imageMap = [Image12, Image13, Image14];
const PAGE_SIZE = 5;

export default function Sermons() {
  const [activeTab, setActiveTab] = useState("recent");
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSermons = async () => {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching sermons:", error);
        return;
      }

      setSermons(data || []);
    };

    fetchSermons();
  }, []);

  const filteredSermons = sermons.filter(
    (s) =>
      s.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.preacher?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentSermons = sermons.slice(0, 3);
  const librarySermons = sermons.slice(3);
  const paginatedLibrary = librarySermons.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const totalPages = Math.ceil(librarySermons.length / PAGE_SIZE);

  // ✅ Build query with media
  const buildMediaQuery = (
    sermon: Sermon,
    mediaType: "video" | "audio" | "script",
    imageIndex: number
  ) => {
    const params = new URLSearchParams({
      topic: sermon.topic || "",
      preacher: sermon.preacher || "",
      description: sermon.description || "",
      date: sermon.date || "",
      imageIndex: imageIndex.toString(),
    });

    if (mediaType === "video") params.append("videoUrl", sermon.video_url || "");
    if (mediaType === "audio") params.append("audioUrl", sermon.audio_url || "");
    if (mediaType === "script") params.append("scriptUrl", sermon.script_url || "");

    return `/sermons/${sermon.id}?${params.toString()}`;
  };

  const renderSermon = (sermon: Sermon, index: number) => {
    const formattedDate = sermon.date
      ? new Date(sermon.date).toLocaleDateString("en-GB").replace(/\//g, "-")
      : "";

    return (
      <div key={sermon.id} className={styles.librarySermon}>
        <div className={styles.sermonThumbnail}>
          <Image src={imageMap[index % 3]} alt="Sermon Flyer" />
        </div>
        <div className={styles.sermonBriefs}>
          <h2>
            {sermon.topic} <span>- By {sermon.preacher}</span>
          </h2>
          <pre>{formattedDate}</pre>
          <p>{sermon.description}</p>

          <div className={styles.mediaIcons}>
            <Link href={buildMediaQuery(sermon, "video", index % 3)}>
              <Image src={VideoIcon} alt="Video" width={20} height={20} />
            </Link>
            <Link href={buildMediaQuery(sermon, "audio", index % 3)}>
              <Image src={AudioIcon} alt="Audio" width={20} height={20} />
            </Link>
            <Link href={buildMediaQuery(sermon, "script", index % 3)}>
              <Image src={ScriptIcon} alt="Script" width={20} height={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.sermonPage}>
      <Hero title="Sermons" id={styles.sermon} />
      <div className={styles.sermonWrapper}>
        <div className={styles.sideBar}>
          <div className={styles.search}>
            <div className={styles.inputWrapper}>
              <input
                placeholder="Search by topic or preacher..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className={styles.clearButton}
                  type="button"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <Button
            tag="Recent"
            onClick={() => {
              setActiveTab("recent");
              setSearchTerm("");
            }}
          />
          <Button
            tag="Library"
            onClick={() => {
              setActiveTab("library");
              setSearchTerm("");
            }}
          />
        </div>

        <div className={styles.sermonContent}>
          {searchTerm ? (
            <div className={styles.recent}>
              <h1>Search Results</h1>
              {filteredSermons.length > 0 ? (
                filteredSermons.map(renderSermon)
              ) : (
                <p className={styles.searchResponse}>
                  No sermons match your search.
                </p>
              )}
            </div>
          ) : activeTab === "recent" ? (
            <div className={styles.recent}>
              <h1>Recent Sermons</h1>
              {recentSermons.map(renderSermon)}
            </div>
          ) : (
            <div className={styles.library}>
              <h1>Sermon Library</h1>
              {paginatedLibrary.map((sermon, i) => renderSermon(sermon, i))}
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`${styles.pageButton} ${
                      currentPage === i + 1 ? styles.active : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
