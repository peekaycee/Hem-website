// components/DataFormModal.tsx
"use client"

import React, { useState, useEffect } from "react";
import Button from "./Button";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-[90%] max-w-md">
        <h2 className="text-xl mb-4 font-semibold">
          {mode === "create" ? "Add New Item" : "Edit Item"}
        </h2>

        {fields.map((field) => (
          <div key={String(field.key)} className="mb-4">
            <label className="block mb-1 text-sm font-medium">{field.label}</label>
            <input
              type={field.type || "text"}
              value={(formData[field.key] as any) || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className={`w-full border p-2 rounded ${
                errors[field.key as string] ? "border-red-500" : ""
              }`}
            />
            {errors[field.key as string] && (
              <p className="text-red-600 text-sm mt-1">{errors[field.key as string]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
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
