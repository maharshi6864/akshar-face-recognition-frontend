import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
// import { dotenv } from "dotenv";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_REACT_APP_API_URL": JSON.stringify(
      process.env.VITE_REACT_APP_API_URL
    ),
  },
  server: {
    // https: {
    //   key: fs.readFileSync("./localhost.key"),
    //   cert: fs.readFileSync("./localhost.crt"),
    // },
    host: "0.0.0.0",
  },
});
