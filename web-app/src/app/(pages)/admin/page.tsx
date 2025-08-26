/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Hero from "@/app/components/Hero";
import Button from "@/app/components/Button";
import DataTable from "@/app/components/Table";
import DataFormModal from "@/app/components/DataFormModal";
import styles from "./admin.module.css";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";

const admin = process.env.NEXT_PUBLIC_ADMIN?.split(",") || [];
const PAGE_SIZE = 10;

interface Announcement {
  id: number;
  title: string;
  venue: string;
  description: string;
  date: string;
  time: string;
  ministering: string;
  image?: any;
}
interface Sermon {
  id: number;
  topic: string;
  preacher: string;
  description: string;
  date: string;
  videoUrl: string;
  audioUrl: string;
  scriptUrl: string;
}
interface FollowUp {
  id: number;
  name: string;
  phone: string;
  assignedTo: string;
}
type Tab = "announcement" | "sermon" | "followUp";

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) || "announcement";

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // 👉 horizontal drag-to-scroll ref
  const tableScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    router.replace(`/admin?tab=${activeTab}`);
  }, [activeTab, router]);

  useEffect(() => {
    if (!authenticated && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [authenticated]);

  // 👉 add “grab to scroll” behavior (mouse + touch)
  useEffect(() => {
    const el = tableScrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      return !!target.closest("input, textarea, select, button, a, [role='button']");
    };

    const onPointerDown = (e: PointerEvent) => {
      if (isInteractive(e.target)) return;
      isDown = true;
      el.classList.add(styles.dragging);
      try { el.setPointerCapture?.(e.pointerId); } catch {}
      startX = e.clientX;
      scrollLeft = el.scrollLeft;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.clientX - startX;
      el.scrollLeft = scrollLeft - dx;
    };

    const onPointerUp = () => {
      isDown = false;
      el.classList.remove(styles.dragging);
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    el.addEventListener("pointermove", onPointerMove as any, { passive: false });
    el.addEventListener("pointerup", onPointerUp, { passive: true });
    el.addEventListener("pointerleave", onPointerUp, { passive: true });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown as any);
      el.removeEventListener("pointermove", onPointerMove as any);
      el.removeEventListener("pointerup", onPointerUp as any);
      el.removeEventListener("pointerleave", onPointerUp as any);
    };
  }, []);

  const openCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const bulkMessages = () => {
    router.push("https://www.bulksmsnigeria.com/app/bulksms/welcome");
  };

  const openEdit = (row: any) => {
    setEditData(row);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const triggerRefresh = () => setRefreshKey((k) => k + 1);

  const formFieldsMap = {
    announcement: [
      { key: "title", label: "Title" },
      { key: "venue", label: "Venue" },
      { key: "description", label: "Description" },
      { key: "date", label: "Date", type: "date" },
      { key: "time", label: "Time", type: "time" },
      { key: "ministering", label: "Ministering" },
      { key: "image", label: "Image" },
    ],
    sermon: [
      { key: "topic", label: "Topic" },
      { key: "preacher", label: "Preacher" },
      { key: "description", label: "Description" },
      { key: "date", label: "Date", type: "date" },
      { key: "videoUrl", label: "Video Url" },
      { key: "audioUrl", label: "Audio Url" },
      { key: "scriptUrl", label: "Script Url" },
    ],
    followUp: [
      { key: "name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "assignedTo", label: "Assigned To" },
    ],
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const columnDefs: Record<Tab, ColumnDef<any>[]> = {
    announcement: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "title", header: "Title" },
      { accessorKey: "venue", header: "Venue" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "date", header: "Date", cell: ({ row }) => formatDate(row.original.date) },
      { accessorKey: "time", header: "Time" },
      { accessorKey: "ministering", header: "Ministering" },
      { accessorKey: "image", header: "Image" },
    ],
    sermon: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "topic", header: "Topic" },
      { accessorKey: "preacher", header: "Preacher" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "date", header: "Date", cell: ({ row }) => formatDate(row.original.date) },
      { accessorKey: "videoUrl", header: "Video Url" },
      { accessorKey: "audioUrl", header: "Audio Url" },
      { accessorKey: "scriptUrl", header: "Script Url" },
    ],
    followUp: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "assignedTo", header: "Assigned To" },
    ],
  };

  const fetchMap = {
    announcement: async ({ search, page }: any) => {
      const res = await fetch(`/api/announcement`);
      const data = await res.json();
      const filtered = data.filter((item: Announcement) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      interface AnnouncementWithDateTime extends Announcement {
        date: string;
        time: string;
      }
      const sorted = (filtered as AnnouncementWithDateTime[])
        .filter((item) => item.date && item.time)
        .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
      const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      return { data: paginated, total: sorted.length };
    },
    sermon: async ({ search, page }: any) => {
      const res = await fetch(`/api/sermon`);
      const data = await res.json();
      const filtered = data.filter((item: Sermon) =>
        item.topic.toLowerCase().includes(search.toLowerCase()) ||
        item.preacher.toLowerCase().includes(search.toLowerCase())
      );
      const sorted = (filtered as Sermon[])
        .filter((item) => item.date)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      return { data: paginated, total: sorted.length };
    },
    followUp: async ({ search, page }: any) => {
      const res = await fetch(`/api/followup`);
      const data = await res.json();
      const filtered = data.filter((item: FollowUp) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.includes(search) ||
        item.assignedTo.toLowerCase().includes(search.toLowerCase())
      );
      const sorted: FollowUp[] = (filtered as FollowUp[]).sort((a, b) => b.id - a.id);
      const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      return { data: paginated, total: sorted.length };
    },
  };

  const submitMap = {
    announcement: async (form: any) => {
      try {
        const method = form.id ? "PUT" : "POST";
        await fetch("/api/announcement", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        toast.success("Saved successfully");
      } catch {
        toast.error("Failed to save");
      }
    },
    sermon: async (form: any) => {
      try {
        const method = form.id ? "PUT" : "POST";
        await fetch("/api/sermon", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        toast.success("Saved successfully");
      } catch {
        toast.error("Failed to save");
      }
    },
    followUp: async (form: any) => {
      try {
        const method = form.id ? "PUT" : "POST";
        await fetch("/api/followup", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        toast.success("Saved successfully");
      } catch {
        toast.error("Failed to save");
      }
    },
  };

  const deleteMap = {
    announcement: async (id: number) => {
      try {
        const res = await fetch(`/api/announcement?id=${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
        toast.success("Deleted successfully");
        triggerRefresh();
      } catch {
        toast.error("Failed to delete");
      }
    },
    sermon: async (id: number) => {
      try {
        const res = await fetch(`/api/sermon?id=${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
        toast.success("Deleted successfully");
        triggerRefresh();
      } catch {
        toast.error("Failed to delete");
      }
    },
    followUp: async (id: number) => {
      try {
        const res = await fetch(`/api/followup?id=${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
        toast.success("Deleted successfully");
        triggerRefresh();
      } catch {
        toast.error("Failed to delete");
      }
    },
  };

  const handleAdminAuthentication = () => {
    if (admin.includes(password.trim())) {
      setAuthenticated(true);
    } else {
      toast.error("Incorrect password. Access Denied!");
    }
  };

  return !authenticated ? (
    <div className={styles.authBox}>
      <div className={styles.authBoxCard}>
        <h1>Admins Only</h1>
        <input
          ref={passwordInputRef}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to Access"
          autoFocus
        />
        <Button tag="Submit" onClick={handleAdminAuthentication} />
      </div>
    </div>
  ) : (
    <section className={styles.adminPage}>
      <Hero title="Admin" id={styles.admin} />
      <div className={styles.adminWrapper}>
        <div className={styles.sideBar}>
          <Button tag={"Announcements"} onClick={() => setActiveTab("announcement")} />
          <Button tag={"Sermon Library"} onClick={() => setActiveTab("sermon")} />
          <Button tag={"Follow-up"} onClick={() => setActiveTab("followUp")} />
        </div>

        {/* SCROLL/DRAG CONTAINER */}
        <div className={styles.adminTable} ref={tableScrollRef}>
          <div className={styles.tableHeader}>
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 mb-2 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <Button tag={`Add ${activeTab}`} onClick={openCreate} />
            {activeTab === "followUp" && (
              <Button tag={"Send Bulk Message"} onClick={bulkMessages} />
            )}
          </div>

          {/* Give the inner content a min-width so horizontal scroll is forced */}
          <div className={styles.tableInner}>
            <DataTable<any>
              key={refreshKey + activeTab + search}
              columns={columnDefs[activeTab]}
              fetchData={(query) => fetchMap[activeTab]({ ...query, search })}
              enableEdit={openEdit}
              enableDelete={deleteMap[activeTab]}
            />
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay}>
          <DataFormModal<any>
            isOpen={modalOpen}
            onClose={closeModal}
            onSubmit={async (form) => {
              await submitMap[activeTab](form);
              triggerRefresh();
            }}
            initialData={editData || {}}
            fields={formFieldsMap[activeTab]}
            mode={editData ? "update" : "create"}
          />
        </div>
      )}
    </section>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContent />
    </Suspense>
  );
}
