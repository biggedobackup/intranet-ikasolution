/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,html}',
    './dev/**/*.{ts,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        ikaBlue: '#1270b8',
        ikaBlueDark: '#0d4a7e',
        ikaRed: '#e51a37',
        ikaInk: '#111827',
        ikaSoft: '#f4f7fb'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial']
      },
      boxShadow: {
        premium: '0 24px 70px rgba(4, 31, 77, 0.14)',
        clean: '0 12px 40px rgba(17, 24, 39, 0.10)'
      }
    }
  },
  plugins: []
};
