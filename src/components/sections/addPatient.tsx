'use client'

import { z } from 'zod'
import { Button } from '../ui/button'
import { FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { add_patient } from '@/data/PatientConfig'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { patient_management } from '@/configs/patient'
import { useToastStore } from '@/store/toastStore'
import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'
import { FileUpload } from '../ui/file-upload'

const BLOOD_GROUPS = [
  'A_POSITIVE',
  'A_NEGATIVE',
  'B_POSITIVE',
  'B_NEGATIVE',
  'AB_POSITIVE',
  'AB_NEGATIVE',
  'O_POSITIVE',
  'O_NEGATIVE',
] as const

const schema = z.object({
  aadharNumber: z.string().min(12, 'Aadhar must be 12 digits').max(12),
  email: z.string().email('Invalid email'),
  guardianName: z.string().min(1, 'Guardian name required'),
  name: z.string().min(1, 'Full name required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], { required_error: 'Select gender' }),
  contact: z.string().min(10, 'Contact must be 10 digits').max(10),
  emergencyContact: z.string().min(10, 'Emergency contact must be 10 digits').max(10),
  address: z.string().min(1, 'Address required'),
  dateOfBirth: z.string().min(1, 'Date of birth required'),
  age: z.coerce.number().min(0, 'Age required'),
  bloodGroup: z.enum(BLOOD_GROUPS, { required_error: 'Select blood group' }),
})

type FormValues = z.infer<typeof schema>

interface AddPatientProps {
  onSuccess?: () => void
}

export default function AddPatient({ onSuccess }: AddPatientProps) {
  const showToast = useToastStore((s) => s.showToast)
  const user = useAuthStore((s) => s.user)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      aadharNumber: '',
      email: '',
      guardianName: '',
      name: '',
      gender: undefined,
      contact: '',
      emergencyContact: '',
      address: '',
      dateOfBirth: '',
      age: 0,
      bloodGroup: undefined,
    },
  })

  async function onSubmit(values: FormValues) {
    const addedBy = (user as { id?: string })?.id
    const organisationId =
      (user as { organisation_id?: string })?.organisation_id

    if (!addedBy || !organisationId) {
      showToast({
        message: 'Session missing. Please log in again.',
        type: 'error',
      })
      return
    }

    setSubmitting(true)
    try {
      let imageUrl: string | undefined
      if (imageFile) {
        const uploadRes = await patient_management.uploadPatientImage(imageFile)
        const payload = uploadRes as { data?: { url: string } }
        imageUrl = payload?.data?.url
      }

      const nameParts = values.name.trim().split(/\s+/)
      const first_name = nameParts[0] ?? ''
      const last_name = nameParts.slice(1).join(' ') || first_name

      await patient_management.addPatient({
        aadhar_number: Number(values.aadharNumber),
        email: values.email,
        username: values.email,
        first_name,
        last_name,
        gender: values.gender,
        contact_number: Number(values.contact),
        emergency_contact: Number(values.emergencyContact),
        guardian_name: values.guardianName || undefined,
        profile: values.address || undefined,
        added_by: addedBy,
        organisation_id: organisationId,
        date_of_birth: values.dateOfBirth,
        age: values.age,
        blood_group: values.bloodGroup,
        image: imageUrl,
      })

      showToast({ message: 'Patient added successfully', type: 'success' })
      form.reset()
      setImageFile(null)
      onSuccess?.()
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Failed to add patient'
      showToast({ message, type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const textFields = add_patient.filter(
    (f: { type: string }) => f.type !== 'file',
  )

  return (
    <div className="mb-20">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {textFields
              .sort((a: { priority: number }, b: { priority: number }) => a.priority - b.priority)
              .map((fieldConfig: { id: string; name: string; placeholder: string; type: string }) => (
                <FormField
                  key={fieldConfig.id}
                  control={form.control}
                  name={fieldConfig.name as keyof FormValues}
                  render={({ field }) => (
                    <FormItem>
                      <Label>{fieldConfig.placeholder}</Label>
                      {fieldConfig.name === 'gender' ? (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={fieldConfig.type === 'text' ? 'text' : 'text'}
                          placeholder={fieldConfig.placeholder}
                          {...field}
                        />
                      )}
                        {form.formState.errors[fieldConfig.name as keyof FormValues] && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors[fieldConfig.name as keyof FormValues]?.message}
                          </p>
                        )}
                    </FormItem>
                  )}
                />
              ))}

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <Label>Date of birth</Label>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select date of birth"
                  />
                  {form.formState.errors.dateOfBirth && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.dateOfBirth.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <Label>Age</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Age"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                  />
                  {form.formState.errors.age && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.age.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <Label>Blood group</Label>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOOD_GROUPS.map((bg) => (
                        <SelectItem key={bg} value={bg}>
                          {bg.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.bloodGroup && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.bloodGroup.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <div className="space-y-2 md:col-span-2">
              <Label>Patient image (optional)</Label>
              <FileUpload
                onChange={(files) => setImageFile(files?.[0] ?? null)}
              />
              {imageFile && (
                <p className="text-sm text-muted-foreground">
                  {imageFile.name} – will be uploaded when you submit
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="border-border mt-5"
            disabled={submitting}
          >
            {submitting ? 'Adding…' : 'Add Patient'}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
