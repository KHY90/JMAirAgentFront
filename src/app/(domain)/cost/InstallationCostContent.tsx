"use client";
import React from "react";
import { FiWind, FiSquare, FiGrid, FiThermometer } from "react-icons/fi";

const costData = [
  {
    id: "wall-type",
    title: "벽걸이형 에어컨 (7평 이하)",
    icon: <FiWind className="w-12 h-12 text-sky-500 mb-4" />,
    items: [
      "기본 설치비 (배관 5m 이내) 포함: 5만원",
      "실외기 거치대(앵글) 별도: 15만원부터",
      "배관 추가 (1m당): 2.5만원 / 3.5만원",
      "현장 상황에 따라 변동 가능",
    ],
  },
  {
    id: "stand-type",
    title: "스탠드형 에어컨 (15평 이하)",
    icon: <FiSquare className="w-12 h-12 text-sky-500 mb-4" />,
    items: [
      "기본 설치비 (배관 5m 이내) 포함",
      "실외기 거치대(앵글) 별도",
      "천장형 배관 공사 시 추가 비용 발생",
      "현장 상황에 따라 변동 가능",
    ],
  },
  {
    id: "system-type",
    title: "시스템에어컨",
    icon: <FiGrid className="w-12 h-12 text-sky-500 mb-4" />,
    items: [
      "천장 매립형 설치 필요",
      "배관 및 전기 공사 비용 별도",
      "실외기 및 덕트 공사 비용 협의",
      "사전 현장 실사 필수",
    ],
  },
  {
    id: "coolheat-type",
    title: "냉난방기",
    icon: <FiThermometer className="w-12 h-12 text-sky-500 mb-4" />,
    items: [
      "기본 설치비 (배관 5m 이내) 포함",
      "배수 공사 시 추가 비용 발생",
      "실외기 위치, 배관 길이에 따라 변동",
      "현장 상황에 따른 별도 견적",
    ],
  },
];

export default function InstallationCostContent() {
  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {costData.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-t-4 border-sky-500"
            >
              {section.icon}
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{section.title}</h3>
              <ul className="space-y-3 text-gray-600 text-left list-disc list-inside">
                {section.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <section className="mt-16 bg-white rounded-xl shadow-md p-8 border-t-4 border-sky-500">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">추가 안내사항</h4>
          <p className="text-gray-600 leading-relaxed">
            상기 설치 비용은 기본적인 기준이며, 실제 설치 환경(배관 길이, 실외기 위치, 전기 공사 필요 여부 등)에 따라 달라질 수 있습니다. 자세한 견적은 전화 문의 또는 방문 상담을 통해 확인해주세요.
          </p>
        </section>
      </div>
    </main>
  );
}