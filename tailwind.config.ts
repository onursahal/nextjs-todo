import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "background-image-light": "url('/background_light.svg')",
        "background-image-dark": "url('/public/background_dark.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
export default config;
