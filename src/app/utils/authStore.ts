import { makeAutoObservable } from "mobx";

class AuthStore {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  isAuthenticated: boolean = false;
  user: { userLogin: string; userName: string } | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadTokens();
  }

  // 로그인한 사용자 정보 저장
  setUser(user: { userLogin: string; userName: string }) {
    this.user = user;
    this.isAuthenticated = true;
  }

  // 토큰 저장 (로그인 시)
  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
    this.isAuthenticated = true;
  }

  // 쿠키에서 토큰 가져오기 (초기 로드)
  loadTokens() {
    const getCookie = (name: string) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
      }
      return null;
    };

    const access = getCookie("access_token");
    const refresh = getCookie("refresh_token");

    if (access) {
      this.accessToken = access;
      this.isAuthenticated = true;
    }
    if (refresh) {
      this.refreshToken = refresh;
    }
  }

  // 로그아웃
  logout() {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    this.accessToken = null;
    this.refreshToken = null;
    this.isAuthenticated = false;
    this.user = null;
  }
}

// 전역 스토어 인스턴스 생성
const authStore = new AuthStore();
export default authStore;
