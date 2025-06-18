"use client";

import Image from 'next/image';
import Button from '../components/Button';
import Hero from '../components/Hero';
import styles from './sermons.module.css';
import { Image12, Image13, VideoIcon, AudioIcon, ScriptIcon } from '../../../public/images';
import { useState } from 'react';

// =============NOTE: Persist this page data==============
export default function Sermons() {
  const [activeTab, setActiveTab] = useState("recent");

  // const handleToggle = () => {
  //   setState((prev) => (prev === "show" ? "hide" : "show"));
  // };

  return (
    <section className={styles.sermonPage}>
      <Hero title='Sermons' id={styles.sermon}/>
      <div className= {styles.sermonWrapper}>
        <div className={styles.sideBar}>
          <div className={styles.search}>
            <input name="searchTopic" id="searchTopic" placeholder="Search by topic..." />
            <input name="searchPreacher" id="searchPreacher" placeholder="Search by preacher..." />
          </div>
          <Button tag={'Recent'} onClick={() => setActiveTab("recent")} />
          <Button tag={'Library'} onClick={() => setActiveTab("library")}/>
        </div>

        {/* Recent Sermons */}
        <div className={styles.sermonContent}>
          <div className={`${styles.recent} ${activeTab === "recent" ? styles.show : styles.hide}`}>
            <h1>Recent Sermons</h1>
            <div className={styles.recentSermon}>
              <div className={styles.sermonThumbnail}>
                <Image src={Image12} alt='Image Placeholder' />
              </div>
              <div className={styles.sermonBriefs}>
                <h2>Life of Prayer <span>- By Pst. Gbade</span></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis distinctio magnam officia in exercitationem voluptatibus facere quis vel blanditiis fugit!</p>
                <div className={styles.mediaIcons}>
                  <Image src={VideoIcon} alt="Video Icon" width={20} height={20} />
                  <Image src={AudioIcon} alt="Audio Icon" width={20} height={20} />
                  <Image src={ScriptIcon} alt="Script Icon" width={20} height={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Library Sermons */}
          <div className={`${styles.library} ${activeTab === 'library' ? styles.show : styles.hide}`}>
            <h1>Sermon Library</h1>
            <div className={styles.librarySermon}>
              <div className={styles.sermonThumbnail}>
                <Image src={Image12} alt='Image Placeholder' />
              </div>
              <div className={styles.sermonBriefs}>
                <h2>Life of Prayer <span>- By Pst. Gbade</span></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                <div className={styles.mediaIcons}>
                  <Image src={VideoIcon} alt="Video Icon" width={20} height={20} />
                  <Image src={AudioIcon} alt="Audio Icon" width={20} height={20} />
                  <Image src={ScriptIcon} alt="Script Icon" width={20} height={20} />
                </div>
              </div>
            </div>

            <div className={styles.librarySermon}>
              <div className={styles.sermonThumbnail}>
                <Image src={Image13} alt='Image Placeholder' />
              </div>
              <div className={styles.sermonBriefs}>
                <h2>God&apos;s Mercies <span>- By Sis. Adeyemo</span></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                <div className={styles.mediaIcons}>
                  <Image src={VideoIcon} alt="Video Icon" width={20} height={20} />
                  <Image src={AudioIcon} alt="Audio Icon" width={20} height={20} />
                  <Image src={ScriptIcon} alt="Script Icon" width={20} height={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
