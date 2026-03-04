'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { VoiceInput, type ExtractedMedication } from '@/components/sections/VoiceInput'
import { cn } from '@/lib/utils'
import type { VisitHistory } from '@/@types/patient_types'

export interface PrescriptionFormValues {
  prescribed_by: string
  prescription_date: string
  visit_id: string
  notes: string
}

interface PrescriptionFormProps {
  visits: VisitHistory[]
  defaultValues?: Partial<PrescriptionFormValues>
  onSubmit: (values: PrescriptionFormValues) => void
  onVoiceMedications?: (medications: ExtractedMedication[]) => void
  loading?: boolean
  className?: string
}

export function PrescriptionForm({
  visits,
  defaultValues,
  onSubmit,
  onVoiceMedications,
  loading = false,
  className,
}: PrescriptionFormProps) {
  const [prescribedBy, setPrescribedBy] = useState(
    defaultValues?.prescribed_by ?? '',
  )
  const [prescriptionDate, setPrescriptionDate] = useState(
    defaultValues?.prescription_date ?? new Date().toISOString().slice(0, 10),
  )
  const [visitId, setVisitId] = useState(defaultValues?.visit_id ?? '')
  const [notes, setNotes] = useState(defaultValues?.notes ?? '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prescribedBy.trim() || !prescriptionDate || !visitId.trim()) return
    onSubmit({
      prescribed_by: prescribedBy.trim(),
      prescription_date: prescriptionDate,
      visit_id: visitId,
      notes: notes.trim(),
    })
  }

  const valid = prescribedBy.trim() !== '' && prescriptionDate !== '' && visitId !== ''

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-4', className)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prescribed_by">Prescribed by *</Label>
          <Input
            id="prescribed_by"
            value={prescribedBy}
            onChange={(e) => setPrescribedBy(e.target.value)}
            placeholder="Doctor name"
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prescription_date">Prescription date *</Label>
          <DatePicker
            id="prescription_date"
            value={prescriptionDate}
            onChange={setPrescriptionDate}
            disabled={loading}
            placeholder="Select date"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Visit *</Label>
        <Select
          value={visitId || undefined}
          onValueChange={setVisitId}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a visit" />
          </SelectTrigger>
          <SelectContent>
            {visits.map((v) => (
              <SelectItem key={v.id} value={v.id}>
                {new Date(v.visit_date).toLocaleDateString()} – {v.reason_for_visit ?? 'Visit'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {visits.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Create a visit first from the section below.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="prescription_notes">Notes</Label>
        <textarea
          id="prescription_notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Prescription notes"
          disabled={loading}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {onVoiceMedications && (
        <VoiceInput
          onTranscriptionResult={({ medications }) => onVoiceMedications(medications)}
          disabled={loading}
        />
      )}

      <Button type="submit" disabled={!valid || loading}>
        {loading ? 'Saving…' : 'Save prescription'}
      </Button>
    </form>
  )
}
