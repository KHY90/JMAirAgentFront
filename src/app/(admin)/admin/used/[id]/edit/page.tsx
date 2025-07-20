"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminUsedEditPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [usageTime, setUsageTime] = useState("");
  const [year, setYear] = useState("");
  const [content, setContent] = useState("");
  const [productType, setProductType] = useState("벽걸이");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/used/${id}`,
          { withCredentials: true }
        );
        const data = res.data;
        setTitle(data.usedName || "");
        setPrice(Number(data.usedCost));
        setUsageTime(data.usedTime || "");
        setYear(data.usedYear || "");
        setContent(data.usedDescription || "");
        setProductType(data.productType || "벽걸이");
        setImages(data.usedImages || []);
      } catch (err) {
        console.error("중고 에어컨 조회 오류:", err);
        setError("중고 에어컨 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      Promise.all(
        fileArray.map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.result) {
                  resolve(reader.result.toString());
                } else {
                  reject("파일을 읽는 중 오류가 발생했습니다.");
                }
              };
              reader.onerror = (err) => reject(err);
              reader.readAsDataURL(file);
            })
        )
      )
        .then((newImages) => {
          setImages((prev) => {
            const combined = [...prev, ...newImages];
            return combined.slice(0, 3);
          });
        })
        .catch((err) => {
          console.error("이미지 인코딩 오류:", err);
        });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("정말로 수정하시겠습니까?")) return;
    setLoading(true);
    setError("");
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/used/${id}/admin/edit`,
        {
          usedName: title,
          usedCost: price,
          usedTime: usageTime,
          usedYear: year,
          usedDescription: content,
          productType,
          usedImages: images,
        },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      alert("수정이 완료되었습니다.");
      router.push(`/admin/used/${id}`);
    } catch (err) {
      console.error("중고 에어컨 수정 오류:", err);
      setError("중고 에어컨 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("수정을 취소하시겠습니까?")) {
      router.back();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-8 font-gowun">
      <h1 className="text-2xl font-bold mb-6">중고 에어컨 수정</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl border border-gray-300 rounded-md p-6"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium" htmlFor="price">
              가격 (원)
            </label>
            <input
              id="price"
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium" htmlFor="usageTime">
              사용기간
            </label>
            <input
              id="usageTime"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={usageTime}
              onChange={(e) => setUsageTime(e.target.value)}
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium" htmlFor="year">
              연식
            </label>
            <input
              id="year"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-medium" htmlFor="productType">
              제품 종류
            </label>
            <select
              id="productType"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="벽걸이">벽걸이</option>
              <option value="스탠드">스탠드</option>
              <option value="시스템">시스템</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="images">
              이미지 (최대 3장)
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            {images.length > 0 && (
              <div className="mt-2 flex gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={img}
                      alt={`미리보기 ${index + 1}`}
                      width={150}
                      height={150}
                      className="object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-danger text-white rounded-full p-1 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="content">
              상세 설명
            </label>
            <textarea
              id="content"
              className="w-full border border-gray-300 rounded px-3 py-2 h-40"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-6 flex space-x-4 justify-center">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            수정하기
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

