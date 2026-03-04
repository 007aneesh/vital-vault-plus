'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { MedicationRecord } from '@/@types/patient_types'
import { Plus, Trash2 } from 'lucide-react'

const defaultMedication: MedicationRecord = {
  name: '',
  dose: '',
  frequency: '',
  duration: '',
  notes: '',
}

interface MedicationFormProps {
  medications: MedicationRecord[]
  onChange: (medications: MedicationRecord[]) => void
  disabled?: boolean
  className?: string
}

export function MedicationForm({
  medications,
  onChange,
  disabled = false,
  className,
}: MedicationFormProps) {
  const updateOne = (index: number, field: keyof MedicationRecord, value: string) => {
    const next = [...medications]
    next[index] = { ...next[index], [field]: value }
    onChange(next)
  }

  const addRow = () => {
    onChange([...medications, { ...defaultMedication }])
  }

  const removeRow = (index: number) => {
    if (medications.length <= 1) return
    onChange(medications.filter((_, i) => i !== index))
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Medications</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRow}
          disabled={disabled}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add medication
        </Button>
      </div>
      <div className="space-y-4">
        {medications.map((med, index) => (
          <div
            key={index}
            className="rounded-lg border border-input bg-muted/20 p-3 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Medication {index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeRow(index)}
                disabled={disabled || medications.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor={`med-name-${index}`}>Name *</Label>
                <Input
                  id={`med-name-${index}`}
                  value={med.name}
                  onChange={(e) => updateOne(index, 'name', e.target.value)}
                  placeholder="e.g. Metformin"
                  disabled={disabled}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`med-dose-${index}`}>Dose *</Label>
                <Input
                  id={`med-dose-${index}`}
                  value={med.dose}
                  onChange={(e) => updateOne(index, 'dose', e.target.value)}
                  placeholder="e.g. 500mg"
                  disabled={disabled}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`med-frequency-${index}`}>Frequency</Label>
                <Input
                  id={`med-frequency-${index}`}
                  value={med.frequency ?? ''}
                  onChange={(e) => updateOne(index, 'frequency', e.target.value)}
                  placeholder="e.g. twice daily"
                  disabled={disabled}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`med-duration-${index}`}>Duration</Label>
                <Input
                  id={`med-duration-${index}`}
                  value={med.duration ?? ''}
                  onChange={(e) => updateOne(index, 'duration', e.target.value)}
                  placeholder="e.g. 7 days"
                  disabled={disabled}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`med-notes-${index}`}>Notes</Label>
              <textarea
                id={`med-notes-${index}`}
                value={med.notes ?? ''}
                onChange={(e) => updateOne(index, 'notes', e.target.value)}
                placeholder="Additional instructions"
                disabled={disabled}
                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
