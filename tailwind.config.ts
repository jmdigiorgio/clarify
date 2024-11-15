import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure these paths match where your components are located
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fafaf9',
        secondary: '#0c0a09',
        accent: '#f59e0b',
        muted: '#737373',
      },
    },
  },
  plugins: [],
};

export default config;
