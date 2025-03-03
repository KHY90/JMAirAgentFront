"use client";
import { useEffect } from "react";
import axios from "axios";
import authStore from "./authStore";

export function useAuthUpdate() {
  useEffect(() => {

    authStore.loadTokens();

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/naver/current`,
          { withCredentials: true }
        );
        console.log("현재 사용자 조회 결과:", response.data);
        if (response.data && response.data.user) {
          authStore.setUser(response.data.user);
        } else {
          authStore.logout();
        }
      } catch (error) {
        console.error("현재 사용자 조회 오류:", error);
        authStore.logout();
      }
    };
    fetchCurrentUser();
  }, []);
}
