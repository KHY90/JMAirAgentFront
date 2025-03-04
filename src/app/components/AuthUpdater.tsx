"use client";
import { useAuthUpdate } from "@/app/utils/useAuth";

export default function AuthUpdater() {
  useAuthUpdate();
  return null;
}
