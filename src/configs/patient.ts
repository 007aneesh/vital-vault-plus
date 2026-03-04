import { API_BASE_URL, ADMIN_ENDPOINTS } from './constant'
import axiosInstance from '@/lib/axios'
import type { ParseTranscriptResponse } from '@/@types/patient_types'

export interface SSRMParams {
  pageSize: number
  sortModel?: {
    sort_by: string
    type: 'asc' | 'desc'
  }
  filterModel?: Record<string, any>
}

export const patient_management = {
  getPatientById: async (id: string) => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}${ADMIN_ENDPOINTS.PATIENT}/${id}`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  getSSRMPatients: async (params: SSRMParams) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}${ADMIN_ENDPOINTS.PATIENT}/ssrm`,
        params,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  createVisit: async (data: {
    patient_id: string
    visit_date: string
    reason_for_visit?: string
    doctor_name?: string
    department?: string
    hospital_name?: string
    notes?: string
  }) => {
    const response = await axiosInstance.post(
      `${API_BASE_URL}${ADMIN_ENDPOINTS.PATIENT}/visit/create`,
      data,
    )
    return response.data
  },

  createPrescription: async (data: {
    prescribed_by: string
    prescription_date: string
    visit_id: string
    notes?: string
  }) => {
    const response = await axiosInstance.post(
      `${API_BASE_URL}${ADMIN_ENDPOINTS.PRESCRIPTION}/add`,
      data,
    )
    return response.data
  },

  createMedication: async (data: {
    name: string
    dose: string
    prescription_id: string
    frequency?: string
    duration?: string
    notes?: string
  }) => {
    const response = await axiosInstance.post(
      `${API_BASE_URL}${ADMIN_ENDPOINTS.MEDICATION}/add`,
      data,
    )
    return response.data
  },

  getPrescriptions: async () => {
    const response = await axiosInstance.get(
      `${API_BASE_URL}${ADMIN_ENDPOINTS.PRESCRIPTION}/`,
    )
    return response.data
  },

  getMedications: async () => {
    const response = await axiosInstance.get(
      `${API_BASE_URL}${ADMIN_ENDPOINTS.MEDICATION}/`,
    )
    return response.data
  },

  parseTranscript: async (transcript: string): Promise<{ data?: ParseTranscriptResponse }> => {
    const response = await axiosInstance.post(
      `${API_BASE_URL}${ADMIN_ENDPOINTS.AUDIO}/parse-transcript`,
      { transcript },
    )
    return response.data
  },

  addPatient: async (data: {
    aadhar_number: number
    email: string
    username: string
    first_name: string
    last_name: string
    gender: 'MALE' | 'FEMALE' | 'OTHER'
    contact_number: number
    emergency_contact: number
    date_of_birth: string
    age: number
    blood_group: string
    guardian_name?: string
    profile?: string
    added_by: string
    organisation_id: string
    image?: string
  }) => {
    const response = await axiosInstance.post(
      `${API_BASE_URL}${ADMIN_ENDPOINTS.EMPLOYEE}/add-patient`,
      data,
    )
    return response.data
  },

  uploadPatientImage: async (file: File): Promise<{ data?: { url: string } }> => {
    const formData = new FormData()
    formData.append('image', file)
    const response = await axiosInstance.post(
      `${API_BASE_URL}${ADMIN_ENDPOINTS.UPLOAD}/patient-image`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return response.data
  },

  updatePatient: async (id: string, data: Record<string, unknown>) => {
    const response = await axiosInstance.put(
      `${API_BASE_URL}${ADMIN_ENDPOINTS.PATIENT}/${id}`,
      data,
    )
    return response.data
  },
}
