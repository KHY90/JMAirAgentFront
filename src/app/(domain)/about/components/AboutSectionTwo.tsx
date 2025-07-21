"use client";
import { useIntersectFadeIn } from "@/hooks/useIntersectFadeIn";

const features = [
  { title: "풍부한 현장 경험", description: "수년간의 경험으로 축적된 노하우로 최적의 솔루션을 제공합니다." },
  { title: "꼼꼼한 시공과 A/S", description: "작은 부분까지 놓치지 않는 정밀한 시공과 신속한 사후 관리를 약속합니다." },
  { title: "합리적인 비용", description: "투명하고 합리적인 견적으로 비용 부담을 덜어드립니다." },
  { title: "고객 맞춤형 컨설팅", description: "고객의 니즈를 정확히 파악하여 최적의 맞춤형 서비스를 제안합니다." },
];

export default function AboutSectionTwo() {
  const { ref, isVisible } = useIntersectFadeIn();

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center w-full min-h-[80vh] md:h-[90vh] h-auto py-20 md:py-0 bg-gray-50 px-8"
    >
      <div className="text-center mb-12">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          왜 저희를 선택해야 할까요?
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-white p-6 md:p-8 rounded-xl shadow-lg transform transition-all duration-1000 delay-${index * 200}
              ${
                isVisible
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 translate-y-20 rotate-[-5deg]"
              }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-sky-600 mb-4">{feature.title}</h3>
            <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}