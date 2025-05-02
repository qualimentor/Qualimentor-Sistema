import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores Qualimentor
        turquoise: "#2A9285", // Verde Escuro
        "green-leaf": "#76B947", // Verde Folha
        "dark-green": "#2A9285", // Verde Escuro (repetido para consistência)
        gray: "#4B4F56", // Cinza Texto
        "light-beige": "#F5F2EA",
        white: "#FFFFFF",
        // Cores secundárias
        "light-turquoise": "#3AAFA0",
        "light-green": "#8BC95B",
        "dark-gray": "#3A4247",
        "light-gray": "#E5E5E5",
        // Cores para módulos IA (exemplo)
        "mentor-blue": "#3B82F6", // Azul para Mentor-IA
        "insight-green": "#10B981", // Verde para Insight-IA
        "auditor-purple": "#8B5CF6", // Roxo para Auditor-IA
      },
      // REMOVIDO fontFamily extension para teste - fontes serão controladas apenas pelo globals.css
      // fontFamily: {
      //   primary: ["var(--font-primary)", "sans-serif"],
      //   secondary: ["var(--font-secondary)", "sans-serif"],
      // },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // Para estilos de texto (prose)
    require("@tailwindcss/forms"), // Para estilos de formulário
  ],
};
export default config;

