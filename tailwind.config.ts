import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: {
        "50": "#f1f8fe",
        "100": "#e2f0fc",
        "200": "#bee0f9",
        "300": "#84c7f5",
        "400": "#43aaed",
        "500": "#1a8fdd",
        "600": "#0d72bd", // posse appで使用カラー
        "700": "#0c5a98",
        "800": "#0e4d7e",
        "900": "#114169",
        "950": "#0c2945",
      },
      secondary: {
        "50": "#f7fce9",
        "100": "#eef8cf",
        "200": "#ddf1a5",
        "300": "#bde360", // posse appで使用カラー
        "400": "#aad744",
        "500": "#8cbc26",
        "600": "#6c961a",
        "700": "#537318",
        "800": "#435b19",
        "900": "#3a4e19",
        "950": "#1d2a09",
      },
    },
  },
  plugins: [],
};
export default config;
