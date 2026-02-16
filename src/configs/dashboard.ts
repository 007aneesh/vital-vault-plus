import { API_BASE_URL, ADMIN_ENDPOINTS } from './constant'
import axiosInstance from '@/lib/axios'

export const dashboard_service = {
    getStats: async () => {
        try {
            const response = await axiosInstance.get(
                `${API_BASE_URL}${ADMIN_ENDPOINTS.DASHBOARD}`,
            )
            return response.data
        } catch (error) {
            throw error
        }
    },
}
