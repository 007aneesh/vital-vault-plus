import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
import { ImageLinks } from '@/lib/imageLinks'

const EmployeePage = ({ data }: any) => {
  return (
    <div className='min-h-screen p-4 sm:p-6'>
      <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8'>
        <div className='flex flex-row items-start mb-8 gap-5 md:gap-10'>
          <div className='h-28 w-28 rounded-full shadow-lg'>
            <Image
              src={data?.image || ImageLinks.user_profile}
              alt='Profile'
              width={1080}
              height={1080}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-lg md:text-2xl sm:text-3xl font-bold text-gray-800'>
              {data?.first_name} {data?.last_name}
            </h1>
            <p className='text-sm md:text-base text-gray-600 mt-2'>
              Hospital Employee Profile
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Section title='Personal Details'>
            <DetailItem label='First Name' value={data?.first_name} />
            <DetailItem label='Last Name' value={data?.last_name} />
            <DetailItem
              label='Date of Birth'
              value={new Date(data?.date_of_birth).toLocaleDateString('en-US')}
            />
            <DetailItem label='Age' value={data?.age} />
            <DetailItem label='Gender' value={data?.gender} />
            <DetailItem label='Blood Group' value={data?.blood_group} />
            <DetailItem label='Contact Number' value={data?.contact_number} />
            <DetailItem
              label='Emergency Contact'
              value={data?.emergency_contact}
            />
            <DetailItem
              label='Guardian Name'
              value={data?.guardian_name || 'N/A'}
            />
          </Section>

          <Section title='Employment Details'>
            <DetailItem
              label='Employee Code'
              value={data?.employment_details?.employee_code}
            />
            <DetailItem
              label='Department'
              value={data?.employment_details?.department}
            />
            <DetailItem label='Role' value={data?.employment_details?.role} />
            <DetailItem
              label='Access Level'
              value={data?.employment_details?.access_level}
            />
            <DetailItem
              label='Date of Joining'
              value={data?.employment_details?.date_of_joining}
            />
            <DetailItem
              label='Experience (Years)'
              value={data?.employment_details?.experience_years}
            />
            <DetailItem
              label='Status'
              value={data?.employment_details?.status}
            />
          </Section>

          {!_.isEmpty(data?.medical_history) && (
            <Section title='Medical History'>
              <DetailItem
                label='Allergies'
                value={data?.medical_history?.allergies || 'N/A'}
              />
              <DetailItem
                label='Chronic Conditions'
                value={data?.medical_history?.chronic_conditions || 'N/A'}
              />
              <DetailItem
                label='Medications'
                value={data?.medical_history?.medications || 'N/A'}
              />
              <DetailItem
                label='Last Checkup'
                value={data?.medical_history?.last_checkup || 'N/A'}
              />
            </Section>
          )}

          {!_.isEmpty(data?.shift_details) && (
            <Section title='Shift Details'>
              <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200'>
                  <thead>
                    <tr className='bg-gray-50'>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                        Date
                      </th>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                        Shift Type
                      </th>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                        Start Time
                      </th>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                        End Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.shift_details.map((shift: any, index: any) => (
                      <tr
                        key={index}
                        className='border-b border-gray-200 hover:bg-gray-50'
                      >
                        <td className='px-4 py-2 text-sm text-gray-700'>
                          {shift.date || 'N/A'}
                        </td>
                        <td className='px-4 py-2 text-sm text-gray-700'>
                          {shift.shift_type || 'N/A'}
                        </td>
                        <td className='px-4 py-2 text-sm text-gray-700'>
                          {shift.start_time || 'N/A'}
                        </td>
                        <td className='px-4 py-2 text-sm text-gray-700'>
                          {shift.end_time || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {!_.isEmpty(data?.qualification_details) && (
            <Section title='Qualifications'>
              <DetailItem
                label='Degree'
                value={data?.qualification_details?.degree || 'N/A'}
              />
              <DetailItem
                label='Specialization'
                value={data?.qualification_details?.specialization || 'N/A'}
              />
              <DetailItem
                label='Certifications'
                value={data?.qualification_details?.certifications || 'N/A'}
              />
              <DetailItem
                label='Institution'
                value={data?.qualification_details?.institution || 'N/A'}
              />
            </Section>
          )}

          {/* Work History Section */}
          {!_.isEmpty(data?.work_history) && (
            <Section title='Work History'>
              <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200'>
                  <thead>
                    <tr className='bg-gray-50'>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                        Organization
                      </th>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                        Role
                      </th>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.work_history.map((work: any, index: any) => (
                      <tr
                        key={index}
                        className='border-b border-gray-200 hover:bg-gray-50'
                      >
                        <td className='px-4 py-2 text-sm text-gray-700'>
                          {work.organization || 'N/A'}
                        </td>
                        <td className='px-4 py-2 text-sm text-gray-700'>
                          {work.role || 'N/A'}
                        </td>
                        <td className='px-4 py-2 text-sm text-gray-700'>
                          {work.duration || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

const Section = ({ title, children }: any) => (
  <div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
    <h2 className='text-xl font-semibold text-gray-700 mb-4'>{title}</h2>
    <div className='space-y-2'>{children}</div>
  </div>
)

const DetailItem = ({ label, value }: any) => (
  <div className='flex justify-between items-center border-b border-gray-200 py-2'>
    <span className='text-gray-600'>{label}</span>
    <span className='text-gray-800'>{value || 'N/A'}</span>
  </div>
)

export default EmployeePage
