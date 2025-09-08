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

// ✅ import Supabase client
import { supabase } from "@/app/lib/supabaseClient";

// ✅ Next/Image for thumbnails
import Image from "next/image";

// ✅ fallback image URL (from public folder)
const fallbackImage = "/images/fallback.png"; // place your fallback.png in public/images/

const admin = process.env.NEXT_PUBLIC_ADMIN?.split(",") || [];
const PAGE_SIZE = 10;

// ✅ Supabase public bucket base URL
const bucketBase =
  "https://lnqosogvxpjywoqjgdwx.supabase.co/storage/v1/object/public/announcements/";

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

  // horizontal drag-to-scroll ref
  const tableScrollRef = useRef<HTMLDivElement>(null);

  // full-size preview state
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const tableKeyMap: Record<Tab, "announcements" | "sermons" | "followup"> = {
    announcement: "announcements",
    sermon: "sermons",
    followUp: "followup",
  };

  useEffect(() => {
    router.replace(`/admin?tab=${activeTab}`);
  }, [activeTab, router]);

  useEffect(() => {
    if (!authenticated && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [authenticated]);

  // grab to scroll
  useEffect(() => {
    const el = tableScrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      return !!target.closest(
        "input, textarea, select, button, a, [role='button']"
      );
    };

    const onMouseDown = (e: MouseEvent) => {
      if (isInteractive(e.target)) return;
      isDown = true;
      el.classList.add(styles.dragging);
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
    };
    const onMouseUp = () => {
      isDown = false;
      el.classList.remove(styles.dragging);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isInteractive(e.target)) return;
      isDown = true;
      el.classList.add(styles.dragging);
      startX = e.touches[0].pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
    };
    const onTouchEnd = () => {
      isDown = false;
      el.classList.remove(styles.dragging);
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseUp);

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseUp);

      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
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
      { key: "video_url", label: "Video Url" },
      { key: "audio_url", label: "Audio Url" },
      { key: "script_url", label: "Script Url" },
    ],
    followUp: [
      { key: "name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "assigned_to", label: "Assigned To" },
    ],
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert 0 → 12
    return `${hour}:${minute} ${ampm}`;
  };

  const columnDefs: Record<Tab, ColumnDef<any>[]> = {
    announcement: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "title", header: "Title" },
      { accessorKey: "venue", header: "Venue" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => formatDate(row.original.date),
      },
      {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => formatTime(row.original.time),
      },
      { accessorKey: "ministering", header: "Ministering" },
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
          const rawImage = row.original.image;
          const imgUrl = rawImage?.startsWith("http")
            ? rawImage
            : rawImage
            ? `${bucketBase}${rawImage}`
            : fallbackImage;

          return (
            <div
              style={{
                width: 80,
                height: 80,
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => setPreviewImage(imgUrl)}
            >
              <Image
                src={imgUrl}
                alt={row.original.title || "announcement image"}
                fill
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            </div>
          );
        },
      },
    ],
    sermon: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "topic", header: "Topic" },
      { accessorKey: "preacher", header: "Preacher" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => formatDate(row.original.date),
      },
      { accessorKey: "video_url", header: "Video Url" },
      { accessorKey: "audio_url", header: "Audio Url" },
      { accessorKey: "script_url", header: "Script Url" },
    ],
    followUp: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "assigned_to", header: "Assigned To" },
    ],
  };

  const fetchMap: Record<
    "announcements" | "sermons" | "followup",
    (page: number, search: string) => Promise<{ data: any[]; total: number }>
  > = {
    announcements: async (page, search) => {
      const { data, error, count } = await supabase
        .from("announcements")
        .select("*", { count: "exact" })
        .ilike("title", `%${search}%`)
        .order("created_at", { ascending: false })
        .order("time", { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
      if (error) throw error;
      return { data: data || [], total: count || 0 };
    },
    sermons: async (page, search) => {
      const { data, error, count } = await supabase
        .from("sermons")
        .select("*", { count: "exact" })
        .ilike("topic", `%${search}%`)
        .order("created_at", { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
      if (error) throw error;
      return { data: data || [], total: count || 0 };
    },
    followup: async (page, search) => {
      const { data, error, count } = await supabase
        .from("followup")
        .select("*", { count: "exact" })
        .ilike("name", `%${search}%`)
        .order("created_at", { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
      if (error) throw error;
      return { data: data || [], total: count || 0 };
    },
  };

  const deleteMap: Record<Tab, (id: number) => Promise<void>> = {
    announcement: async (id) => {
      try {
        const { error } = await supabase
          .from("announcements")
          .delete()
          .eq("id", id);
        if (error) throw error;
        toast.success("Deleted successfully");
        triggerRefresh();
      } catch {
        toast.error("Failed to delete");
      }
    },
    sermon: async (id) => {
      try {
        const { error } = await supabase.from("sermons").delete().eq("id", id);
        if (error) throw error;
        toast.success("Deleted successfully");
        triggerRefresh();
      } catch {
        toast.error("Failed to delete");
      }
    },
    followUp: async (id) => {
      try {
        const { error } = await supabase.from("followup").delete().eq("id", id);
        if (error) throw error;
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
          <Button
            tag={"Announcements"}
            onClick={() => setActiveTab("announcement")}
          />
          <Button tag={"Sermon Library"} onClick={() => setActiveTab("sermon")} />
          <Button tag={"Follow-up"} onClick={() => setActiveTab("followUp")} />
        </div>

        <div className={styles.adminTable} ref={tableScrollRef}>
          <div className={styles.tableHeader}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <Button tag={`Add ${activeTab}`} onClick={openCreate} />
            {activeTab === "followUp" && (
              <Button tag={"Send Bulk Message"} onClick={bulkMessages} />
            )}
          </div>

          <div className={styles.tableInner}>
            <DataTable<any>
              key={refreshKey + activeTab + search}
              columns={columnDefs[activeTab]}
              fetchData={(query) =>
                fetchMap[tableKeyMap[activeTab]](query.page, search)
              }
              enableEdit={openEdit}
              enableDelete={deleteMap[activeTab]}
            />
          </div>
        </div>
      </div>

      {/* Fullscreen preview modal */}
      {previewImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setPreviewImage(null)}
        >
          <div
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              position: "relative",
            }}
          >
            <Image
              src={previewImage}
              alt="Preview"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}

      {modalOpen && (
        <div className={styles.modalOverlay}>
          <DataFormModal<any>
            isOpen={modalOpen}
            onClose={() => {
              closeModal();
              triggerRefresh();
            }}
            tableName={tableKeyMap[activeTab]}
            fields={formFieldsMap[activeTab]}
            initialData={editData || {}}
            mode={editData ? "update" : "create"}
            rowId={editData?.id}
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
