'use client'

import React, { useState, useCallback } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import { IconX } from '@/lib/icons'
import { PrescriptionForm, type PrescriptionFormValues } from '@/components/sections/PrescriptionForm'
import { MedicationForm } from '@/components/sections/MedicationForm'
import { patient_management } from '@/configs/patient'
import { useToastStore } from '@/store/toastStore'
import type { VisitHistory, Prescription, MedicationRecord } from '@/@types/patient_types'
import type { ExtractedMedication } from '@/components/sections/VoiceInput'
import { cn } from '@/lib/utils'

interface PrescriptionMedicationSectionProps {
  patientId: string
  visits: VisitHistory[]
  prescriptions: Prescription[]
  onRefresh: () => void
  className?: string
}

export function PrescriptionMedicationSection({
  patientId,
  visits,
  prescriptions,
  onRefresh,
  className,
}: PrescriptionMedicationSectionProps) {
  const showToast = useToastStore((s) => s.showToast)
  const [open, setOpen] = useState(false)
  const [medications, setMedications] = useState<MedicationRecord[]>([
    { name: '', dose: '', frequency: '', duration: '', notes: '' },
  ])
  const [loading, setLoading] = useState(false)
  const [showCreateVisit, setShowCreateVisit] = useState(false)
  const [visitForm, setVisitForm] = useState({
    visit_date: new Date().toISOString().slice(0, 10),
    reason_for_visit: '',
    doctor_name: '',
    department: '',
    hospital_name: '',
    notes: '',
  })

  const handleVoiceMedications = useCallback((extracted: ExtractedMedication[]) => {
    if (extracted.length > 0) {
      setMedications(
        extracted.map((m) => ({
          name: m.name,
          dose: m.dose,
          frequency: m.frequency ?? '',
          duration: m.duration ?? '',
          notes: m.notes ?? '',
        })),
      )
    }
  }, [])

  const handleCreateVisit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!visitForm.visit_date) return
    setLoading(true)
    try {
      const res = await patient_management.createVisit({
        patient_id: patientId,
        visit_date: visitForm.visit_date,
        reason_for_visit: visitForm.reason_for_visit || undefined,
        doctor_name: visitForm.doctor_name || undefined,
        department: visitForm.department || undefined,
        hospital_name: visitForm.hospital_name || undefined,
        notes: visitForm.notes || undefined,
      })
      const created = (res as { data?: { id: string } })?.data
      if (created?.id) {
        showToast({ message: 'Visit created', type: 'success' })
        onRefresh()
        setShowCreateVisit(false)
        setVisitForm({
          visit_date: new Date().toISOString().slice(0, 10),
          reason_for_visit: '',
          doctor_name: '',
          department: '',
          hospital_name: '',
          notes: '',
        })
      }
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Failed to create visit'
      showToast({ message: msg, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitPrescription = async (values: PrescriptionFormValues) => {
    setLoading(true)
    try {
      const res = await patient_management.createPrescription({
        prescribed_by: values.prescribed_by,
        prescription_date: values.prescription_date,
        visit_id: values.visit_id,
        notes: values.notes || undefined,
      })
      const payload = res as { data?: { id: string } }
      const prescriptionId = payload?.data?.id
      if (!prescriptionId) {
        showToast({ message: 'Failed to create prescription', type: 'error' })
        setLoading(false)
        return
      }
      const toCreate = medications.filter((m) => m.name.trim() && m.dose.trim())
      for (const med of toCreate) {
        await patient_management.createMedication({
          name: med.name.trim(),
          dose: med.dose.trim(),
          prescription_id: prescriptionId,
          frequency: med.frequency?.trim() || undefined,
          duration: med.duration?.trim() || undefined,
          notes: med.notes?.trim() || undefined,
        })
      }
      showToast({ message: 'Prescription and medications saved', type: 'success' })
      onRefresh()
      setOpen(false)
      setMedications([{ name: '', dose: '', frequency: '', duration: '', notes: '' }])
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Failed to save prescription'
      showToast({ message: msg, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('border rounded-lg p-4 shadow-sm bg-white', className)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Prescriptions &amp; medications</h2>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="primary" size="default">
                Add prescription
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="flex items-center justify-between">
                <DrawerTitle>New prescription</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="link" className="text-xl">
                    <IconX />
                  </Button>
                </DrawerClose>
              </DrawerHeader>
              <div className="space-y-6 pb-8">
                {visits.length === 0 || showCreateVisit ? (
                  <div className="space-y-3">
                    <Label className="text-base font-medium">
                      {showCreateVisit ? 'New visit' : 'Create a visit first'}
                    </Label>
                    <form onSubmit={handleCreateVisit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="visit_date">Visit date *</Label>
                          <DatePicker
                            id="visit_date"
                            value={visitForm.visit_date}
                            onChange={(v) =>
                              setVisitForm((p) => ({ ...p, visit_date: v }))
                            }
                            disabled={loading}
                            placeholder="Select visit date"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="reason_for_visit">Reason for visit</Label>
                          <Input
                            id="reason_for_visit"
                            value={visitForm.reason_for_visit}
                            onChange={(e) =>
                              setVisitForm((p) => ({ ...p, reason_for_visit: e.target.value }))
                            }
                            placeholder="e.g. Check-up"
                            disabled={loading}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="doctor_name">Doctor name</Label>
                          <Input
                            id="doctor_name"
                            value={visitForm.doctor_name}
                            onChange={(e) =>
                              setVisitForm((p) => ({ ...p, doctor_name: e.target.value }))
                            }
                            placeholder="Dr. Name"
                            disabled={loading}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            value={visitForm.department}
                            onChange={(e) =>
                              setVisitForm((p) => ({ ...p, department: e.target.value }))
                            }
                            placeholder="e.g. General"
                            disabled={loading}
                          />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <Label htmlFor="hospital_name">Hospital name</Label>
                          <Input
                            id="hospital_name"
                            value={visitForm.hospital_name}
                            onChange={(e) =>
                              setVisitForm((p) => ({ ...p, hospital_name: e.target.value }))
                            }
                            placeholder="Hospital or clinic"
                            disabled={loading}
                          />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <Label htmlFor="visit_notes">Notes</Label>
                          <textarea
                            id="visit_notes"
                            value={visitForm.notes}
                            onChange={(e) =>
                              setVisitForm((p) => ({ ...p, notes: e.target.value }))
                            }
                            placeholder="Visit notes"
                            disabled={loading}
                            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </div>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Creating…' : 'Create visit'}
                      </Button>
                    </form>
                    {visits.length > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCreateVisit(false)}
                      >
                        Use existing visit
                      </Button>
                    )}
                  </div>
                ) : null}

                {visits.length > 0 && !showCreateVisit && (
                  <>
                    <PrescriptionForm
                      visits={visits}
                      onSubmit={handleSubmitPrescription}
                      onVoiceMedications={handleVoiceMedications}
                      loading={loading}
                    />
                    <MedicationForm
                      medications={medications}
                      onChange={setMedications}
                      disabled={loading}
                    />
                  </>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {prescriptions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Existing prescriptions
            </h3>
            <ul className="space-y-2">
              {prescriptions.map((p) => (
                <li
                  key={p.id}
                  className="rounded-md border border-input bg-muted/20 p-3 text-sm"
                >
                  <div className="font-medium">
                    {new Date(p.prescription_date).toLocaleDateString()} – {p.prescribed_by}
                  </div>
                  {p.notes && (
                    <p className="text-muted-foreground mt-1">{p.notes}</p>
                  )}
                  {p.medications && p.medications.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-muted-foreground">
                      {p.medications.map((m) => (
                        <li key={m.id ?? m.name}>
                          {m.name} – {m.dose}
                          {m.frequency ? `, ${m.frequency}` : ''}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {prescriptions.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No prescriptions yet. Add one using the button above.
          </p>
        )}
      </div>
    </div>
  )
}
