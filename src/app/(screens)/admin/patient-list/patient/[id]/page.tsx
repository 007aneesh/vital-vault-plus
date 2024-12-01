'use client'

import { DataTable } from '@/components/ui/data-table'
import {
  medical_history_config,
  medications_config,
} from '@/configs/PatientProfileConfig'
import _ from 'lodash'

import Image from 'next/image'
import { columns } from './columns'
import { useEffect, useState } from 'react'
import { get_patient_data } from '@/lib/patientrender'

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params

  const [data, setData] = useState<any>([])

  useEffect(() => {
    const response = get_patient_data()
    setData(response)
  }, [])
  console.log('patient_data:', id, data)

  const handle_render_patient_profile = (payload: any) => {
    return (
      <div className='flex flex-col md:flex-row items-center md:items-start gap-6 border p-4 rounded-lg mb-6 shadow-sm bg-white'>
        <Image
          src=''
          alt='Patient'
          className='w-28 h-28 rounded-full object-cover border'
        />
        <div>
          <h2 className='text-2xl font-bold'>
            {`${payload?.first_name} ${payload?.last_name}`}
          </h2>
          <p className='text-gray-600'>
            {payload?.gender} | {payload?.address?.city} | {payload?.occupation}
          </p>
          <p className='text-gray-600'>
            Date of Birth: {payload?.date_of_birth}
          </p>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>
              <strong>Aadhar Number:</strong> {payload?.aadhar_number}
            </div>
            <div>
              <strong>Email:</strong> {payload?.email}
            </div>
            <div>
              <strong>Weight:</strong> {payload?.weight}kg
            </div>
            <div>
              <strong>Height:</strong> {payload?.height}cm
            </div>
            <div>
              <strong>Blood Group:</strong> {payload?.blood_group}
            </div>
          </div>
          <div className='mt-2'>
            <strong>Habits:</strong>{' '}
            {_.map(payload?.habits, (habit, index) => (
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

  const handle_render_timeline = (payload: any) => {
    return (
      <div className='border p-4 rounded-lg mb-6 shadow-sm bg-white'>
        <h2 className='text-xl font-bold mb-2'>Visit History</h2>
        {_.map(payload, (item, index) => (
          <div key={index} className='flex flex-col w-full'>
            <div className='font-semibold'>
              <span className='font-semibold text-gray-700'>
                {item?.visit_date}
              </span>
              : {item?.reason_for_visit}
            </div>
            <div className='text-gray-300'>
              {item?.doctor_name} - {item?.department}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const handle_render_medical_history = ({
    data,
  }: {
    data: typeof medical_history_config
  }) => {
    return (
      <div className='border p-4 rounded-lg mb-6 shadow-sm bg-white'>
        <h2 className='text-xl font-bold mb-2'>Medical History</h2>
        <div>
          <strong>Chronic Diseases:</strong> {data.chronic_diseases.join(', ')}
        </div>
        <div>
          <strong>Diabetes Emergencies:</strong>{' '}
          {data.diabetes_emergencies.join(', ')}
        </div>
        <div>
          <strong>Surgeries:</strong>{' '}
          {!_.isEmpty(data?.surgeries) ? data.surgeries.join(', ') : '--'}
        </div>
        <div>
          <strong>Family Diseases:</strong> {data.family_diseases.join(', ')}
        </div>
        <div>
          <strong>Diabetes Complications:</strong>{' '}
          {data.diabetes_complications.join(', ')}
        </div>
      </div>
    )
  }

  const handle_render_medications = ({
    data,
  }: {
    data: typeof medications_config
  }) => {
    return (
      <div className='border p-4 rounded-lg mb-6 shadow-sm bg-white'>
        <h2 className='text-xl font-bold mb-2'>Medications</h2>
        <DataTable columns={columns} data={data} />
      </div>
    )
  }

  return (
    <div className='py-5'>
      {handle_render_patient_profile(data?.personal_info)}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {handle_render_timeline(data?.visit_history)}
        {handle_render_medical_history({ data: medical_history_config })}
      </div>
      {handle_render_medications({ data: medications_config })}
    </div>
  )
}

export default Page
