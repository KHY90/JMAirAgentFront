import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import authStore from "./authStore";

axios.defaults.withCredentials = true;

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) =>
    error ? prom.reject(error) : prom.resolve(true)
  );
  failedQueue = [];
};

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { config, response } = error;
    if (!response || !config) {
      return Promise.reject(error);
    }
    const retryConfig = config as RetryConfig;

    if (response.status === 401 && !retryConfig._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axios(retryConfig))
          .catch((err) => Promise.reject(err));
      }

      retryConfig._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/current`,
          { withCredentials: true }
        );

        if (res.data && res.data.user) {
          authStore.setUser(res.data.user);
          processQueue(null);
          return axios(config);
        }

        // 세션 갱신 실패 시
        authStore.logout();
        const refreshError = new Error("Session refresh failed");
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } catch (refreshError) {
        authStore.logout();
        processQueue(refreshError as Error);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
