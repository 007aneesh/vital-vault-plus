import { API_BASE_URL, ADMIN_ENDPOINTS } from './constant'
import axiosInstance from '@/lib/axios';

export const employee_management = {
    getEmployeeById: async (id: string) => {
        try {
            const response = await axiosInstance.get(
              `${API_BASE_URL}${ADMIN_ENDPOINTS.EMPLOYEE}/`,
            )
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllEmployees: async () => {
        try {
            const response = await axiosInstance.get(
              `${API_BASE_URL}${ADMIN_ENDPOINTS.EMPLOYEE}/all`,
            )
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};