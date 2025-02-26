import { useState } from "react";
import { useRouter } from "next/navigation";
import authStore from "@/app/utils/authStore";

export function useLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ userLogin: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userLogin || !formData.password) {
      setErrorMessage("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
      }

      // 로그인 성공 시 응답 데이터 받아오기
      const data = await response.json();
      console.log("로그인 응답 데이터:", data);

      if (data.user) {
        authStore.setUser(data.user); // MobX 스토어 업데이트
      }

      alert("로그인 성공!");
      router.push("/");
    } catch (error) {
      console.error("로그인 오류:", error);
      setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return { formData, errorMessage, handleChange, handleSubmit };
}
