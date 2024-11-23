/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

const BASE_URL = String(process.env.NEXT_PUBLIC_BASE_URL);
// const COOKIEAUTHKEY = "refreshToken";

const authClient = axios.create({
  baseURL: `${BASE_URL}/auth`,
  headers: {
    "Content-type": "application/json",
  },
});

const axiosWithToken = axios.create({
  baseURL: `${BASE_URL}/adm/v1`,
  headers: {
    'Content-type': 'application/json',
  },
})

// export async function delete_cookie(name: string) {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// }

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Router.push("/login");
    }
    return Promise.reject(error);
  }
);

axiosWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosWithToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshTokenResponse = await refreshAccessToken()
        const newAccessToken = refreshTokenResponse.data.accessToken

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosWithToken(originalRequest);
      } catch (refreshError) {
        // Router.push("/login");
        localStorage.removeItem('accessToken')
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export async function login(
  data: any,
  authMode: "employee" | "patient"
): Promise<AxiosResponse> {
  try {
    const response = await authClient.post(
      authMode === "employee" ? `/employee-login-v1` : `/user-login-v1`,
      data,
      {}
    );
    return response;
  } catch (error) {
    return error as AxiosResponse<any, any>;
  }
}

export async function adminLogin(data: any): Promise<AxiosResponse> {
  try {
    const response = await authClient.post(
      `/admin-login-v1`,
      data,
      {}
    );
    return response;
  } catch (error) {
    return error as AxiosResponse<any, any>;
  }
}

export async function registerUser(data: any): Promise<any> {
   try {
     const response = await authClient.post('/register', data, {
       withCredentials: true,
     })

     localStorage.setItem('accessToken', response.data.accessToken)

     return {
       message: response.data.message,
       user: response.data.user,
     }
   } catch (error) {
     throw new Error('Registration failed')
   }
}

export async function logout(): Promise<AxiosResponse> {
  return authClient.delete("/logout", { withCredentials: true });
}

export async function refreshAccessToken(): Promise<AxiosResponse> {
  return authClient.post("/refresh-token", {}, { withCredentials: true });
}
