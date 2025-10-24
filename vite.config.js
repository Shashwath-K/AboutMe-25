import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' // Ensure @tailwindcss/vite is installed

// https://vite.dev/config/
export default defineConfig({
  // The 'plugins' property expects an array of plugin functions.
  plugins: [
    react(),      // Correct: First plugin function
    tailwindcss() // Correct: Second plugin function, separated by a comma
  ],
})