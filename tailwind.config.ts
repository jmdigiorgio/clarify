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
        highlighted: '#d6d3d1',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: 'bold',
              marginBottom: '1.25em',
              color: '#0c0a09',
            },
            p: {
              marginBottom: '1.25em',
              lineHeight: '1.75',
            },
            a: {
              color: '#f59e0b',
              textDecoration: 'underline',
              '&:hover': {
                color: '#d97706',
              },
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: '#d97706',
              paddingLeft: '1em',
              color: '#555',
            },
            ul: {
              marginBottom: '1.25em',
            },
            li: {
              marginBottom: '0.5em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add the typography plugin here
  ],
};

export default config;
