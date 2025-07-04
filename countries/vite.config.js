import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.keyAPI": JSON.stringify(process.env.keyAPI),
    "process.env.apiHelsinki": JSON.stringify(process.env.apiHelsinki)
  }
})
