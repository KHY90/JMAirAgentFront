import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/(common)/**/*.{js,ts,jsx,tsx,mdx}",  
    "./src/styles/globals.css", 
  ],
  theme: { 
    extend: { 
      fontFamily: {
        sans: ["Geist", "sans-serif"],  
        mono: ["Geist Mono", "monospace"], 
      },
    },
  },
  plugins: [],
} satisfies Config;
