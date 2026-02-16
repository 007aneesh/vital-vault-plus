import { API_BASE_URL, AUTH_ENDPOINTS } from './constant'
import axiosInstance from '@/lib/axios'

export interface RegisterParams {
  username: string
  email: string
  contact: number
  secondary_contact?: number
  password: string
  name: string
  address: string
  city: string
  state: string
  pincode: number
  plan: string
  access_level?: string
  image?: string
}

export const auth_service = {
  register: async (params: RegisterParams) => {
    const response = await axiosInstance.post(
      `${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`,
      params
    )
    return response.data
  },
}
