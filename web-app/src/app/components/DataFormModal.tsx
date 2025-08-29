/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DataFormModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./components.module.css";
import { supabase } from "@/app/lib/supabaseClient";
import toast from "react-hot-toast";

interface FormModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<T>;
  fields: { key: keyof T; label: string; type?: string }[];
  mode?: "create" | "update";
  tableName: string; // 👈 Supabase table name
  rowId?: number; // 👈 for updates
}

export default function DataFormModal<T>({
  isOpen,
  onClose,
  initialData = {},
  fields,
  mode = "create",
  tableName,
  rowId,
}: FormModalProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialData);
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (key: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key as string]: "" }));
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      if (!formData[field.key]) {
        newErrors[field.key as string] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const toastId = toast.loading(
      mode === "create" ? "Saving new item…" : "Updating item…"
    );

    try {
      if (mode === "create") {
        const { error } = await supabase.from(tableName).insert([formData]);
        if (error) throw error;
        toast.success("Item added successfully", { id: toastId });
      } else {
        const { error } = await supabase
          .from(tableName)
          .update(formData)
          .eq("id", rowId);
        if (error) throw error;
        toast.success("Item updated successfully", { id: toastId });
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.dataModalTable}>
      <div>
        <h2>{mode === "create" ? "Add New Item" : "Edit Item"}</h2>

        {fields.map((field) => (
          <div key={String(field.key)} className={styles.table}>
            <label htmlFor={String(field.key)}>{field.label}</label>
            <input
              id={String(field.key)}
              type={field.type || "text"}
              value={(formData[field.key] as any) || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className={styles.inputValue}
              title={field.label}
              disabled={loading}
            />
            {errors[field.key as string] && (
              <p style={{ color: "red" }}>{errors[field.key as string]}</p>
            )}
          </div>
        ))}

        <div className={styles.buttons}>
          <Button tag={"Cancel"} onClick={onClose} disabled={loading} />
          <Button
            tag={mode === "create" ? "Create" : "Update"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
