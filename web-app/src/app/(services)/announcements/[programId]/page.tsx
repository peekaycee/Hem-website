import { Image12, Image13, Image14 } from '../../../../../public/images';
import Image from 'next/image';
import ProgramData from '../../../data/announcements.json';

type Props = {
  params: { programId: string };
};

const imageMap: Record<string, any> = {
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

// ✅ Make the function async, even if you’re not using await directly
export default async function ProgramId({ params }: Props) {
  const { programId } = await params;
  const program = ProgramData.find(p => p.id === parseInt(programId));

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

export async function generateStaticParams() {
  return ProgramData.map(program => ({
    programId: program.id.toString(),
  }));
}
