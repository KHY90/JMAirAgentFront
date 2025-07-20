"use client";
import AboutSectionOne from "./components/AboutSectionOne";
import AboutSectionTwo from "./components/AboutSectionTwo";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <AboutSectionOne />
      <AboutSectionTwo />
    </main>
  );
}