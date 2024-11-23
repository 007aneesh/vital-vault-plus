import {
  patient_profile_config,
  timeline_config,
  medical_history_config,
  medications_config,
} from '@/configs/PatientProfileConfig'
import _ from 'lodash'

import Image from 'next/image'

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params
  console.log('patient_id: ', id)

  const handle_render_patient_profile = ({
    data,
  }: {
    data: typeof patient_profile_config
  }) => {
    return (
      <div className='flex flex-col md:flex-row items-center md:items-start gap-6 border p-4 rounded-lg mb-6 shadow-sm bg-white'>
        <Image
          src=''
          alt='Patient'
          className='w-28 h-28 rounded-full object-cover border'
        />
        <div>
          <h2 className='text-2xl font-bold'>{data.name}</h2>
          <p className='text-gray-600'>
            {data.gender} | {data.location} | {data.occupation}
          </p>
          <p className='text-gray-600'>Date of Birth: {data.dob}</p>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>
              <strong>BMI:</strong> {data.bmi} ({data.bmi_change})
            </div>
            <div>
              <strong>Weight:</strong> {data.weight}kg ({data.weight_change})
            </div>
            <div>
              <strong>Height:</strong> {data.height}cm
            </div>
            <div>
              <strong>Blood Pressure:</strong> {data.blood_pressure} (
              {data.bp_change})
            </div>
          </div>
          <div className='mt-2'>
            <strong>Habits:</strong>{' '}
            {_.map(data?.habits, (habit, index) => (
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

  const handle_render_timeline = ({
    data,
  }: {
    data: typeof timeline_config
  }) => {
    return (
      <div className='border p-4 rounded-lg mb-6 shadow-sm bg-white'>
        <h2 className='text-xl font-bold mb-2'>Timeline</h2>
        {_.map(data, (item, index) => (
          <div key={index} className='mb-2'>
            <span className='font-semibold text-gray-700'>{item.date}</span>:{' '}
            {item.label} (A1C: {item.a1c})
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
          <strong>Surgeries:</strong> {!_.isEmpty(data?.surgeries) ? data.surgeries.join(', ') : '--'}
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
        {data.map((medication, index) => (
          <div key={index} className='mb-2'>
            <span className='font-semibold text-gray-700'>
              {medication.name}
            </span>
            : {medication.status} | Assigned by: {medication.assigned_by}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='py-5'>
      {handle_render_patient_profile({ data: patient_profile_config })}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {handle_render_timeline({ data: timeline_config })}
        {handle_render_medical_history({ data: medical_history_config })}
      </div>
      {handle_render_medications({ data: medications_config })}
    </div>
  )
}

export default Page
