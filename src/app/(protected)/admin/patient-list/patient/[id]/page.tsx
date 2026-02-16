'use client'

import { DataTable } from '@/components/ui/data-table'
import {
  medical_history_config,
  medications_config,
} from '@/configs/PatientProfileConfig'
import _ from 'lodash'
import Image from 'next/image'
import { columns } from './columns'
import { useToastStore } from '@/store/toastStore'
import { ImageLinks } from '@/lib/imageLinks'
import useSWR from 'swr'
import { patient_management } from '@/configs/patient'

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const showToast = useToastStore((state) => state.showToast)

  const { data: response, error, isLoading } = useSWR(
    id ? ['patient', id] : null,
    () => patient_management.getPatientById(id),
    {
      onError: () => {
        showToast({ message: 'Error fetching data', type: 'error' })
      },
    },
  )

  const data = (response?.data ?? response) as Record<string, unknown> | undefined

  const handle_render_patient_profile = (payload: Record<string, unknown> | undefined) => {
    if (!payload) return null
    const image = payload?.image as string | undefined
    const address = payload?.address as Record<string, string> | undefined
    return (
      <div className='flex flex-col md:flex-row items-center md:items-start gap-6 border p-4 rounded-lg mb-6 shadow-sm bg-white'>
        <div className='h-28 w-28 rounded-full shadow-lg'>
          <Image
            src={(image as string) || ImageLinks.user_profile}
            alt='Profile'
            width={1080}
            height={1080}
            className='w-full h-full object-cover'
          />
        </div>
        <div>
          <h2 className='text-2xl font-bold'>
            {`${payload?.first_name} ${payload?.last_name}`}
          </h2>
          <p className='text-gray-600'>
            {String(payload?.gender ?? '')} | {String(address?.city ?? '')} | {String(payload?.occupation ?? '')}
          </p>
          <p className='text-gray-600'>
            Date of Birth: {String(payload?.date_of_birth ?? '')}
          </p>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>
              <strong>Aadhar Number:</strong> {String(payload?.aadhar_number ?? '')}
            </div>
            <div>
              <strong>Email:</strong> {String(payload?.email ?? '')}
            </div>
            <div>
              <strong>Weight:</strong> {String(payload?.weight ?? '')}kg
            </div>
            <div>
              <strong>Height:</strong> {String(payload?.height ?? '')}cm
            </div>
            <div>
              <strong>Blood Group:</strong> {String(payload?.blood_group ?? '')}
            </div>
          </div>
          <div className='mt-2'>
            <strong>Habits:</strong>{' '}
            {_.map(payload?.habits as string[] | undefined, (habit, index) => (
              <span
                key={index}
                className='inline-block bg-gray-200 text-gray-800 text-sm rounded-full px-3 py-1 mr-2'
              >
                {habit}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const handle_render_timeline = (payload: unknown[] | undefined) => {
    if (!payload?.length) return null
    return (
      <div className='border p-4 rounded-lg mb-6 shadow-sm bg-white'>
        <h2 className='text-xl font-bold mb-2'>Visit History</h2>
        {_.map(payload, (item: Record<string, unknown>, index) => (
          <div key={index} className='flex flex-col w-full'>
            <div className='font-semibold'>
              <span className='font-semibold text-gray-700'>
                {String(item?.visit_date ?? '')}
              </span>
              : {String(item?.reason_for_visit ?? '')}
            </div>
            <div className='text-gray-300'>
              {String(item?.doctor_name ?? '')} - {String(item?.department ?? '')}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const handle_render_medical_history = ({
    data: medData,
  }: {
    data: typeof medical_history_config
  }) => {
    return (
      <div className='border p-4 rounded-lg mb-6 shadow-sm bg-white'>
        <h2 className='text-xl font-bold mb-2'>Medical History</h2>
        <div>
          <strong>Chronic Diseases:</strong>{' '}
          {!_.isEmpty(medData?.chronic_diseases)
            ? medData?.chronic_diseases.join(', ')
            : '--'}
        </div>
        <div>
          <strong>Diabetes Emergencies:</strong>{' '}
          {!_.isEmpty(medData?.diabetes_emergencies)
            ? medData?.diabetes_emergencies?.join(', ')
            : '--'}
        </div>
        <div>
          <strong>Surgeries:</strong>{' '}
          {!_.isEmpty(medData?.surgeries) ? medData.surgeries.join(', ') : '--'}
        </div>
        <div>
          <strong>Family Diseases:</strong> {medData?.family_diseases?.join(', ')}
        </div>
        <div>
          <strong>Diabetes Complications:</strong>{' '}
          {medData?.diabetes_complications?.join(', ')}
        </div>
      </div>
    )
  }

  const handle_render_medications = ({
    data: medsData,
  }: {
    data: typeof medications_config
  }) => {
    return (
      <div className='border p-4 rounded-lg mb-6 shadow-sm bg-white'>
        <h2 className='text-xl font-bold mb-2'>Medications</h2>
        <DataTable columns={columns} data={medsData} />
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="flex items-center justify-center py-12 text-red-600">
        Failed to load patient. Please try again.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className='py-5'>
      {handle_render_patient_profile(data)}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {!_.isEmpty(data?.visits) && handle_render_timeline(data?.visits as unknown[])}
        {!_.isEmpty(data?.medical_history) &&
          handle_render_medical_history({ data: data?.medical_history as typeof medical_history_config })}
      </div>
      {handle_render_medications({ data: medications_config })}
    </div>
  )
}

export default Page
