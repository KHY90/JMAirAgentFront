import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';

export interface EstimateItem {
  id: number;
  date: string;
  title: string;
  status: string;
}

export interface MemberItem {
  id: number;
  userName: string;
  email: string;
  joined: string;
}

export interface NoticeItem {
  id: number;
  title: string;
  date: string;
  views: number;
}

export interface StatItem {
  date: string;
  count: number;
}

export interface DashboardData {
  estimates: EstimateItem[];
  members: MemberItem[];
  notices: NoticeItem[];
  memberStats: StatItem[];
  noticeStats: StatItem[];
}

const fetchDashboard = async (): Promise<DashboardData> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/`, {
    withCredentials: true,
  });
  return res.data;
};

export const useAdminDashboard = () =>
  useQuery({
    queryKey: ['adminDashboard'],
    queryFn: fetchDashboard,
    refetchInterval: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
