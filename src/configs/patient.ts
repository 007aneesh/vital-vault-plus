import { API_BASE_URL, ADMIN_ENDPOINTS } from './constant'
import axiosInstance from '@/lib/axios'

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

  getAllPatients: async () => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}${ADMIN_ENDPOINTS.PATIENT}/all`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
}
