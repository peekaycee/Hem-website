import { Image12, Image13, Image14 } from '../../../../../public/images';
import Image from 'next/image';
import ProgramData from '../../../data/announcements.json';
import type { StaticImageData } from 'next/image';

const imageMap: Record<string, StaticImageData> = {
  Image12,
  Image13,
  Image14,
};

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

type Program = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  ministering: string;
  image: string;
};

// ✅ No need to define custom PageProps anymore
export default function ProgramId({ params }: { params: { programId: string } }) {
  const programId = parseInt(params.programId);
  const program = (ProgramData as Program[]).find(p => p.id === programId);

  if (!program) return <h1>Program not found</h1>;

  const image = imageMap[program.image] || Image12;

  return (
    <section style={{ padding: "2rem" }}>
      <h1>{program.title}</h1>
      <p>Happening @{program.venue}</p>
      <p>{program.description}</p>
      <p>{formatDate(program.date)}</p>
      <p>{formatTime(program.time)}</p>
      <p>{program.ministering}</p>
      <Image src={image} alt="Program Flyer" />
    </section>
  );
}

// ✅ Leave as-is — this is fine for SSG
export async function generateStaticParams() {
  return (ProgramData as Program[]).map((program) => ({
    programId: program.id.toString(),
  }));
}
