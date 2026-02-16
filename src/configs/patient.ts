import { API_BASE_URL, ADMIN_ENDPOINTS } from './constant'
import axiosInstance from '@/lib/axios'

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
}
