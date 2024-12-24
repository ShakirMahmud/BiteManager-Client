import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          primary: '#FF6B35',     // Warm orange - for primary buttons and CTAs
          secondary: '#2EC4B6',   // Teal - for secondary elements
          accent: '#FF9F1C',      // Golden yellow - for accent elements
          background: '#FFFFFF',   // Pure white - main background
          card: '#F7F7F7',        // Light gray - card backgrounds
          text: {
            primary: '#1A1A1A',   // Near black - primary text
            secondary: '#4A5568',  // Dark gray - secondary text
            muted: '#718096',     // Medium gray - muted text
          }
        },
        // Dark mode colors
        dark: {
          primary: '#FF8B5E',     // Lighter orange - more visible in dark mode
          secondary: '#40E0D0',   // Brighter teal - for contrast
          accent: '#FFB649',      // Brighter gold - for visibility
          background: '#1A1A1A',  // Dark background
          card: '#2D2D2D',        // Slightly lighter dark - for cards
          text: {
            primary: '#F7F7F7',   // Off-white - primary text
            secondary: '#E2E8F0',  // Light gray - secondary text
            muted: '#A0AEC0',     // Medium gray - muted text
          }
        },
        // Semantic colors
        success: '#10B981',       // Green - success states
        warning: '#F59E0B',       // Amber - warning states
        error: '#EF4444',         // Red - error states
        info: '#3B82F6',          // Blue - info states
      }
    },
  },
  plugins: [daisyui],
  darkMode: 'class',
}