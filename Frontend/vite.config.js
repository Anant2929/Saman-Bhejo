import { defineConfig } from "vite"; // Import defineConfig from Vite
import react from "@vitejs/plugin-react"; // Import the React plugin for Vite

export default defineConfig({
  plugins: [react()], // Use the React plugin
  server: {
    port: 3000, // Set the Vite development server to listen on port 5173
    proxy: {
      "/api": {
        target: "http://localhost:5000", // The backend server address and port
        changeOrigin: true, // Change the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix when forwarding to backend
      },
    },
  },
});

