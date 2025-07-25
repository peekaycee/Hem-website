/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Hero from "@/app/components/Hero";
import Button from "@/app/components/Button";
import DataTable from "@/app/components/Table";
import DataFormModal from "@/app/components/DataFormModal";
import styles from "../../(pages)/admin/admin.module.css";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";

const followUpTeam = process.env.NEXT_PUBLIC_FOLLOW_UP_TEAM?.split(",") || [];
const PAGE_SIZE = 10;

interface FollowUp {
  id: number;
  name: string;
  phone: string;
  assignedTo: string;
}

type Tab = "followUp";

export default function Admin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) || "followUp";
  const [activeTab] = useState<Tab>(initialTab);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [showNumbers, setShowNumbers] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ loading state

  useEffect(() => {
    if (!authenticated && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [authenticated]);

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
    followUp: [
      { key: "name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "assignedTo", label: "Assigned To" },
    ],
  };

  const columnDefs: Record<Tab, ColumnDef<any>[]> = {
    followUp: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "assignedTo", header: "Assigned To" },
    ],
  };

  const fetchMap = {
    followUp: async ({ search, page }: any) => {
      const res = await fetch(`/api/followup`);
      const data = await res.json();
      const filtered = data.filter((item: FollowUp) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.includes(search) ||
        item.assignedTo.toLowerCase().includes(search.toLowerCase())
      );
      const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      return { data: paginated, total: filtered.length };
    },
  };

  const submitMap = {
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
    followUp: async (id: number) => {
      await fetch(`/api/followup?id=${id}`, { method: "DELETE" });
      triggerRefresh();
    },
  };

  const handleAuthentication = () => {
    if (followUpTeam.includes(password.trim())) {
      setAuthenticated(true);
    } else {
      toast.error("Incorrect password. Access Denied!");
    }
  };

  const copyToClipboard = () => {
    if (phoneNumbers.length === 0) {
      toast.error("No phone numbers to copy.");
      return;
    }

    const textToCopy = phoneNumbers.join(", ");
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast.success("Phone numbers copied to clipboard!"))
      .catch(() => toast.error("Failed to copy phone numbers."));
  };

  const extractNumbers = async () => {
    setLoading(true); // Start loading
    try {
      const res = await fetch("/api/followup");
      const data = await res.json();
      const numbers = data.map((item: FollowUp) => item.phone);
      setPhoneNumbers(numbers);
      setShowNumbers(true);
    } catch (error) {
      console.error("Failed to extract numbers:", error);
      toast.error("Could not fetch phone numbers.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      {!authenticated ? (
        <div className={styles.authBox}>
          <div className={styles.authBoxCard}>
            <h1>Follow Up Team Only</h1>
            <input
              ref={passwordInputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password to Access"
              autoFocus
            />
            <Button tag="Submit" onClick={handleAuthentication} />
          </div>
        </div>
      ) : (
        <section className={styles.adminPage}>
          <Hero title="Follow up" id={styles.admin} />
          <div className={styles.adminWrapper}>
            <div className={styles.adminTable}>
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
                <Button tag="Send Bulk Message" onClick={bulkMessages} />
              </div>

              <DataTable<any>
                key={refreshKey + activeTab + search}
                columns={columnDefs[activeTab]}
                fetchData={(query) =>
                  fetchMap[activeTab]({ ...query, search })
                }
                enableEdit={openEdit}
                enableDelete={deleteMap[activeTab]}
              />
            </div>

            {/* Phone Numbers Display */}
            <div className={styles.phoneNumbersSection}>
              <Button
                tag={loading ? "Extracting..." : "Extract Phone Numbers"}
                onClick={extractNumbers}
                disabled={loading}
              />
              {showNumbers && phoneNumbers.length > 0 && (
                <div className={styles.phoneNumbers}>
                  <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {phoneNumbers.join(", ")}
                  </p>
                  <div className={styles.controlBtns}>
                    <Button tag="Copy" onClick={copyToClipboard} />
                    <Button tag="Close" onClick={() => setShowNumbers(false)} />
                  </div>
                </div>
              )}
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
      )}
    </>
  );
}
