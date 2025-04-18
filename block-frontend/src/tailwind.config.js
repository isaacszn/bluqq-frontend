// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],      // enable class‑based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',       // Next.js pages dir
    './components/**/*.{js,ts,jsx,tsx}',  // all your React components
    './layouts/**/*.{js,ts,jsx,tsx}',     // if you use layout files
    './app/**/*.{js,ts,jsx,tsx}',         // for the new app‑dir in Next 13+
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(220, 90%, 56%)',      // your brand blue
          foreground: 'hsl(0, 0%, 100%)',     // text/icon on primary
        },
        secondary: {
          DEFAULT: 'hsl(340, 82%, 52%)',      // accent pink
          foreground: 'hsl(0, 0%, 100%)',
        },
        accent: {
          DEFAULT: 'hsl(48, 100%, 67%)',      // highlight yellow
          foreground: 'hsl(0, 0%, 20%)',
        },
        muted: {
          DEFAULT: 'hsl(210, 16%, 82%)',      // light gray
          foreground: 'hsl(215, 20%, 35%)',   // for muted text
        },
        border: 'hsl(215, 20%, 90%)',
        input: 'hsl(210, 20%, 96%)',
        ring: 'hsl(215, 20%, 65%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(215, 20%, 20%)',
      },
      // **Typography scale** if you need custom font‑sizes or spacing
      spacing: {
        '9/16': '56.25%',    // handy for 16:9 iframes & videos
      },
      borderRadius: {
        lg: '0.75rem',      // a smidge more round
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),         // better form inputs
    require('@tailwindcss/typography'),    // prose classes for blog/copy
    require('@tailwindcss/aspect-ratio'),  // aspect‑ratio utilities
    require('@tailwindcss/line-clamp'),    // line‑clamp for text truncation
  ],
}
