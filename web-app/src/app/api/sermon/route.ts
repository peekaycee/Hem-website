// app/api/announcement/route.ts
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'src/app/data/sermons.json');

async function readData() {
  const file = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(file);
}

type Sermon = {
  id: number;
  title?: string;
  date?: string;
  speaker?: string;
  [key: string]: string | number | undefined;
};

async function writeData(data: Sermon[]) {
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
  const index = data.findIndex((i: Sermon) => i.id === updatedItem.id);
  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  data[index] = updatedItem;
  await writeData(data);
  return NextResponse.json(updatedItem);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");
  let data = await readData();
  data = data.filter((i: Sermon) => i.id !== id);
  await writeData(data);
  return NextResponse.json({ message: "Deleted" });
}
