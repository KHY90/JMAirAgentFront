"use client";
import Image from "next/image";
import { useIntersectFadeIn } from "@/hooks/useIntersectFadeIn";

export default function AboutSectionOne() {
  const { ref, isVisible } = useIntersectFadeIn();

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center w-full h-[90vh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-white z-0" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Image
            src="/images/character/character1.webp"
            alt="JMAir Character"
            width={300}
            height={300}
            className="rounded-full shadow-2xl"
          />
        </div>
        <div className="text-center md:text-left">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-800 mb-4 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            정직과 신뢰,
            <br />
            진명에어컨 에이전트의 약속
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-md transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            저희는 정직과 성실을 바탕으로 항상 고객님께 최상의 서비스를 제공하기 위해 노력하고 있습니다. 믿을 수 있는 기술력과 꼼꼼한 시공으로 최고의 만족을 드리겠습니다.
          </p>
        </div>
      </div>
    </section>
  );
}