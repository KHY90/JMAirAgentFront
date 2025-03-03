"use client";
import React from "react";
import Image from "next/image";

export default function NaverLoginButton() {
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
  const state = "random_generated_state"; 

  const handleNaverLogin = () => {
    const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleNaverLogin}
      className="w-1/2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center h-12 relative overflow-hidden"
    >
      <Image src="/images/login/naver_mi.png" alt="Naver" fill className="object-cover" />
    </button>
  );
}
