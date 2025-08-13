import { notFound } from "next/navigation";

interface ProgramPageProps {
  params: Record<string, string | undefined>;
}

export default function ProgramPage({ params }: ProgramPageProps) {
  const programId = params?.programId;

  if (!programId) {
    notFound();
  }

  return (
    <div>
      <h1>Program ID: {programId}</h1>
    </div>
  );
}
