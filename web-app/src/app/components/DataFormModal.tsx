// components/DataFormModal.tsx
"use client"

import React, { useState, useEffect } from "react";
import Button from "./Button";
import styles from './components.module.css'

interface FormModalProps<T> {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: Partial<T>) => void
  initialData?: Partial<T>
  fields: { key: keyof T; label: string; type?: string }[]
  mode?: "create" | "update"
}
export default function DataFormModal<T>({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  fields,
  mode = "create",
}: FormModalProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setFormData(initialData)
    setErrors({})
  }, [initialData, isOpen])

  const handleChange = (key: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key as string]: "" })) // Clear error on change
  }

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}
    fields.forEach(field => {
      if (!formData[field.key]) {
        newErrors[field.key as string] = `${field.label} is required`
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.dataModalTable}>
      <div>
        <h2>
          {mode === "create" ? "Add New Item" : "Edit Item"}
        </h2>

        {fields.map((field) => (
          <div key={String(field.key)} className={styles.table}>
            <label htmlFor="inputValue">{field.label}</label>
            <input
              type={field.type || "text"}
              value={(formData[field.key] as any) || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className={styles.inputValue}
              // placeholder={field.label}
              title={field.label}
            />
            {errors[field.key as string] && (
              <p>{errors[field.key as string]}</p>
            )}
          </div>
        ))}

        <div className={styles.buttons}>
          <Button
            tag ={"Cancel"}
            onClick={onClose}
          />
          <Button
            tag={mode === "create" ? "Create" : "Update"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
