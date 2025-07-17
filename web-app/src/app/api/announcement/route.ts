// app/api/announcement/route.ts
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'src/app/data/announcements.json');

async function readData() {
  const file = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(file);
}

interface Announcement {
  id: number;
  [key: string]: unknown;
}

async function writeData(data: Announcement[]) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = await readData();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const newItem = await req.json();
  const data = await readData();
  const id = data.length ? data[data.length - 1].id + 1 : 1;
  const newRecord = { ...newItem, id };
  await writeData([...data, newRecord]);
  return NextResponse.json(newRecord);
}

export async function PUT(req: Request) {
  const updatedItem = await req.json();
  const data = await readData();
  const index = data.findIndex((i: Announcement) => i.id === updatedItem.id);
  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  data[index] = updatedItem;
  await writeData(data);
  return NextResponse.json(updatedItem);
}

// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id = parseInt(searchParams.get("id") || "0");
//   let data = await readData();
//   data = data.filter((i: any) => i.id !== id);
//   await writeData(data);
//   return NextResponse.json({ message: "Deleted" });
// }

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    let data = await readData();
    const initialLength = data.length;

    data = data.filter((item: Announcement) => item.id !== id);
    if (data.length === initialLength) {
      return NextResponse.json({ error: "ID not found" }, { status: 404 });
    }

    await writeData(data);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

