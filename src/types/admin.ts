export interface MemberResponse {
  userLogin: string;
  userName: string;
  email: string;
  phoneNumber: string;
  joinDate: string;
  userGrade: string;
  status: boolean;
}

export interface NoticeResponse {
  id: number;
  title: string;
  writer: string;
  postTime: string;
  editTime?: string;
  deleteTime?: string;
  viewCount?: number;
}
