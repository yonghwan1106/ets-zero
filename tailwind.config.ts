import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A3A52',
        secondary: '#00BCD4',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
    },
  },
  plugins: [],
}
export default config
