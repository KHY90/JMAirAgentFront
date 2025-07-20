export interface UserInfo {
  userLogin: string;
  userName: string;
  email?: string;
  phoneNumber?: string;
  joinDate: string;
  userGrade: string;
  status: boolean;
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
