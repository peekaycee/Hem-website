'use client';

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Hero from "@/app/components/Hero";
import Button from "@/app/components/Button";
import DataTable from "@/app/components/Table";
import DataFormModal from "@/app/components/DataFormModal";
import styles from "../../(pages)/admin/admin.module.css";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { supabase } from "@/app/lib/supabaseClient";

const followUpTeam = process.env.NEXT_PUBLIC_FOLLOW_UP_TEAM?.split(",") || [];
const PAGE_SIZE = 10;

interface FollowUp {
  id: number;
  name: string;
  phone: string;
  assigned_to: string;
}

type Tab = "followUp";

export default function FollowUpAdmin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) || "followUp";
  const [activeTab] = useState<Tab>(initialTab);

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<FollowUp | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [showNumbers, setShowNumbers] = useState(false);
  const [loadingPhones, setLoadingPhones] = useState(false);

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

  const openEdit = (row: FollowUp) => {
    setEditData(row);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const triggerRefresh = () => setRefreshKey((k) => k + 1);

  const columnDefs: ColumnDef<FollowUp>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "assigned_to", header: "Assigned To" },
  ];

  interface FetchQuery {
    search: string;
    page: number;
  }

  const fetchFollowUps = async ({ search, page }: FetchQuery) => {
    const { data, error, count } = await supabase
      .from("followup")
      .select("*", { count: "exact" })
      .or(`name.ilike.%${search}%,phone.ilike.%${search}%,assigned_to.ilike.%${search}%`)
      .order("created_at", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    if (error) {
      console.error(error);
      toast.error("Failed to fetch follow-ups");
      return { data: [], total: 0 };
    }
    return { data: data || [], total: count || 0 };
  };

  const deleteFollowUp = async (id: number) => {
    const toastId = toast.loading("Deleting...");
    try {
      const { error } = await supabase.from("followup").delete().eq("id", id);
      if (error) throw error;
      toast.success("Deleted successfully ✅", { id: toastId });
      triggerRefresh();
    } catch {
      toast.error("Failed to delete ❌", { id: toastId });
    }
  };

  const handleAuthentication = () => {
    if (followUpTeam.includes(password.trim())) {
      setAuthenticated(true);
    } else {
      toast.error("Incorrect password. Access Denied!");
    }
  };

  const extractNumbers = async () => {
    setLoadingPhones(true);
    try {
      const { data, error } = await supabase.from("followup").select("phone");
      if (error) throw error;
      const numbers = data.map((item: { phone: string }) => item.phone);
      setPhoneNumbers(numbers);
      setShowNumbers(true);
    } catch (error) {
      console.error("Failed to extract numbers:", error);
      toast.error("Could not fetch phone numbers.");
    } finally {
      setLoadingPhones(false);
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
                  className={styles.follow}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <Button tag={`Add ${activeTab}`} onClick={openCreate} />
                <Button tag="Send Bulk Message" onClick={bulkMessages} />
              </div>

              <div className={styles.followupTableInner}>
                <DataTable<FollowUp>
                  key={refreshKey + activeTab + search}
                  columns={columnDefs}
                  fetchData={(query) => fetchFollowUps({ ...query, search })}
                  enableEdit={openEdit}
                  enableDelete={deleteFollowUp}
                />
              </div>
            </div>

            {/* Phone Numbers Display */}
            <div className={styles.phoneNumbersSection}>
              <Button
                tag={loadingPhones ? "Extracting..." : "Extract Phone Numbers"}
                onClick={extractNumbers}
                disabled={loadingPhones}
              />
              {showNumbers && phoneNumbers.length > 0 && (
                <div className={styles.phoneNumbers}>
                  <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {phoneNumbers.join(", ")}
                  </p>
                  <div className={styles.controlBtns}>
                    <Button
                      tag="Copy"
                      onClick={() => {
                        if (phoneNumbers.length === 0) {
                          toast.error("No phone numbers to copy.");
                          return;
                        }
                        navigator.clipboard.writeText(phoneNumbers.join(", "))
                          .then(() => toast.success("Phone numbers copied to clipboard!"))
                          .catch(() => toast.error("Failed to copy phone numbers."));
                      }}
                    />
                    <Button tag="Close" onClick={() => setShowNumbers(false)} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {modalOpen && (
            <div className={styles.modalOverlay}>
              <DataFormModal<FollowUp>
                isOpen={modalOpen}
                onClose={() => {
                  closeModal();
                  triggerRefresh();
                }}
                tableName="followup"
                fields={[
                  { key: "name", label: "Name" },
                  { key: "phone", label: "Phone" },
                  { key: "assigned_to", label: "Assigned To" },
                ]}
                initialData={editData || {}}
                mode={editData ? "update" : "create"}
                rowId={editData?.id}
              />
            </div>
          )}
        </section>
      )}
    </>
  );
}