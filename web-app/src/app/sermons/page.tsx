"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "../components/Hero";
import Button from "../components/Button";
import styles from "./sermons.module.css";
import { VideoIcon, AudioIcon, ScriptIcon, Image12, Image13, Image14 } from "../../../public/images";

interface Sermon {
  id: number;
  topic: string;
  preacher: string;
  description: string;
  date: string;
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
      const res = await fetch("/api/sermon");
      const data: Sermon[] = await res.json();
      const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setSermons(sorted);
    };
    fetchSermons();
  }, []);

  const filteredSermons = sermons.filter(s =>
    s.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.preacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentSermons = filteredSermons.slice(0, 3);
  const librarySermons = filteredSermons.slice(3);
  const paginatedLibrary = librarySermons.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(librarySermons.length / PAGE_SIZE);

  const renderSermon = (sermon: Sermon, index: number) => (
    <div key={sermon.id} className={styles.librarySermon}>
      <div className={styles.sermonThumbnail}>
        <Image src={imageMap[index % 3]} alt="Sermon Flyer" />
      </div>
      <div className={styles.sermonBriefs}>
        <h2>{sermon.topic} <span>- By {sermon.preacher}</span></h2>
        <pre>{sermon.date}</pre>
        <p>{sermon.description}</p>
        <div className={styles.mediaIcons}>
          <Image src={VideoIcon} alt="Video" width={20} height={20} />
          <Image src={AudioIcon} alt="Audio" width={20} height={20} />
          <Image src={ScriptIcon} alt="Script" width={20} height={20} />
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.sermonPage}>
      <Hero title="Sermons" id={styles.sermon} />
      <div className={styles.sermonWrapper}>
        <div className={styles.sideBar}>
          <div className={styles.search}>
            <input
              name="searchTopic"
              id="searchTopic"
              placeholder="Search by topic or preacher..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on new search
              }}
            />
          </div>
          <Button tag="Recent" onClick={() => setActiveTab("recent")} />
          <Button tag="Library" onClick={() => setActiveTab("library")} />
        </div>

        <div className={styles.sermonContent}>
          {/* Recent Tab */}
          {activeTab === "recent" && (
            <div className={styles.recent}>
              <h1>Recent Sermons</h1>
              {recentSermons.map(renderSermon)}
            </div>
          )}

          {/* Library Tab with Pagination */}
          {activeTab === "library" && (
            <div className={styles.library}>
              <h1>Sermon Library</h1>
              {paginatedLibrary.map(renderSermon)}

              {/* Pagination Controls */}
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ""}`}
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
