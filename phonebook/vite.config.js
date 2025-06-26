import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
server: {
  host: '0.0.0.0',
  proxy: {
    '/persons': {
      target: 'http://localhost:3001/persons',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/persons/, ''),
    }
  }
}
});
