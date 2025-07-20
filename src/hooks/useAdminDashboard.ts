import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';
import {
  InstallResponse,
  ServiceResponse,
  CleanResponse,
} from '@/types/response';
import { MemberResponse, NoticeResponse } from '@/types/admin';

export interface EstimateItem {
  id: number;
  date: string;
  title: string;
  status: string;
}

export interface ServiceItem {
  id: number;
  date: string;
  title: string;
  status: string;
}

export interface CleanItem {
  id: number;
  date: string;
  title: string;
  status: string;
}

export interface MemberItem {
  id: string;
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

// 개별 데이터 요청 함수들
const fetchEstimates = async (): Promise<EstimateItem[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/install`,
    { withCredentials: true }
  );
  return res.data.map((it: InstallResponse) => ({
    id: it.installId,
    title: it.installDescription || '견적 문의',
    date: it.requestDate,
    status: it.installStatus,
  }));
};

const fetchServices = async (): Promise<ServiceItem[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/service`,
    { withCredentials: true }
  );
  return res.data.map((it: ServiceResponse) => ({
    id: it.asId,
    title: it.asDescription || 'A/S 신청',
    date: it.asStartTime,
    status: it.asStatus,
  }));
};

const fetchCleans = async (): Promise<CleanItem[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clean`,
    { withCredentials: true }
  );
  return res.data.map((it: CleanResponse) => ({
    id: it.cleanId,
    title: it.cleanDescription || '세척 신청',
    date: it.requestDate ?? it.cleanStartTime,
    status: it.cleanStatus,
  }));
};

const fetchMembers = async (): Promise<MemberItem[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/all`,
    { withCredentials: true }
  );
  return res.data.map((it: MemberResponse) => ({
    id: it.userLogin,
    userName: it.userName,
    email: it.email,
    joined: it.joinDate,
  }));
};

const fetchNotices = async (): Promise<NoticeItem[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notices`,
    { withCredentials: true }
  );
  return res.data.map((it: NoticeResponse) => ({
    id: it.id,
    title: it.title,
    date: it.postTime,
    views: it.viewCount ?? 0,
  }));
};

export const useAdminDashboard = () => {
  const estimates = useQuery({
    queryKey: ['admin', 'estimates'],
    queryFn: fetchEstimates,
    placeholderData: keepPreviousData,
    refetchInterval: 5 * 60 * 1000,
  });

  const services = useQuery({
    queryKey: ['admin', 'services'],
    queryFn: fetchServices,
    placeholderData: keepPreviousData,
    refetchInterval: 5 * 60 * 1000,
  });

  const cleans = useQuery({
    queryKey: ['admin', 'cleans'],
    queryFn: fetchCleans,
    placeholderData: keepPreviousData,
    refetchInterval: 5 * 60 * 1000,
  });

  const members = useQuery({
    queryKey: ['admin', 'members'],
    queryFn: fetchMembers,
    placeholderData: keepPreviousData,
    refetchInterval: 5 * 60 * 1000,
  });

  const notices = useQuery({
    queryKey: ['admin', 'notices'],
    queryFn: fetchNotices,
    placeholderData: keepPreviousData,
    refetchInterval: 5 * 60 * 1000,
  });

  return { estimates, services, cleans, members, notices };
};
