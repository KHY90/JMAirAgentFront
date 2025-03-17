"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import authStore from "@/utils/authStore";

const allowedRoles = ["SUPERADMIN", "ADMIN", "ADMINWATCHER", "ENGINEER"];

const withAdminAuth = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
  const WrappedComponent: React.FC<P> = observer((props: P) => {
    const router = useRouter();

    useEffect(() => {
      if (!authStore.isAuthenticated || !authStore.user || !allowedRoles.includes(authStore.user.userGrade)) {
        router.push("/login");
      }
    }, [router]);

    if (!authStore.isAuthenticated || !authStore.user || !allowedRoles.includes(authStore.user.userGrade)) {
      return null;
    }

    return <Component {...props} />;
  });
  return WrappedComponent;
};

export default withAdminAuth;
