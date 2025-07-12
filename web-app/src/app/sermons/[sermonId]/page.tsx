"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Image12, Image13, Image14 } from "../../../../public/images";

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

  return (
    <div style={{ padding: "2rem" }}>
      <>
        {isVideo && <h1>Sermon Video</h1>}
        {isAudio && <h1>Sermon Audio</h1>}
        {isScript && <h1>Sermon Script</h1>}
      </>

      {/* <Image
        src={selectedImage}
        alt="Sermon Image"
        width={300}
        height={200}
        style={{ marginBottom: "1rem", borderRadius: "8px" }}
      /> */}

      {topic && <h2>Topic: {topic}</h2>}
      {preacher && <p><strong>Preacher:</strong> {preacher}</p>}
      {description && <p><strong>Description:</strong> {description}</p>}
      {date && <p><strong>Date:</strong> {date}</p>}

      {isVideo && (
        <div>
          <video src={videoUrl!} controls width="100%" />
        </div>
      )}

      {isAudio && (
        <div>
          <audio src={audioUrl!} controls/>
        </div>
      )}

      {isScript && (
        <div>
          <Image
            src={selectedImage}
            alt="Script Thumbnail"
            width={200}
            height={250}
          />
          <div>
            <a
              href={scriptUrl!}
              download
            >
              Download Script
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
