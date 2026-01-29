import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

/**
 * API 에러 응답 형식
 */
interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

/**
 * Axios
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

/**
 * 요청 인터셉터
 */
apiClient.interceptors.request.use(
  (config) => {
    // Authorization 헤더 추가 (필요시)
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 공통 API 함수
 * @param endpoint - API 엔드포인트
 * @param options - Axios 요청 옵션
 * @returns API 응답 데이터
 */
export async function fetchApi<T = unknown>(
  endpoint: string, 
  options: AxiosRequestConfig = {}
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await apiClient({
      url: endpoint,
      ...options,
    });

    return response.data;
    
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error)) {
      
      
      console.error("[API Error]", error.response?.data?.message || error.message || "API 요청 실패");
      throw error;
    }
    
    // Axios 에러가 아닌 경우
    console.error("[Unexpected Error]", error);
    throw error;
  }
}