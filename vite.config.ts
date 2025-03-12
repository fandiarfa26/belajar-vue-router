import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          users: [
            "src/components/User.vue",
            "src/components/UserHeader.vue",
            "src/components/UserWishlist.vue",
            "src/components/UserWishlistFooter.vue",
            "src/components/UserOrder.vue",
            "src/components/UserOrderFooter.vue",
            "src/components/UserProfile.vue",
          ],
        },
      },
    },
  },
});
