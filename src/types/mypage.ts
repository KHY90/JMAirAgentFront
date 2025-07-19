export interface UserInfo {
  userLogin: string;
  userName: string;
  phoneNumber?: string;
  email?: string;
}

export interface EngineerStatus {
  status: string;
  appliedAt?: string;
}

export interface RequestItem {
  id: number;
  type: string;
  date: string;
  status: string;
}
