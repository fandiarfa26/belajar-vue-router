import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import ProductDetail from "./components/ProductDetail.vue";
import NotFound from "./components/NotFound.vue";
import ProductSearch from "./components/ProductSearch.vue";

const router = createRouter({
  routes: [
    {
      path: "/",
      component: Home,
      props: {
        title: "Home Page",
      },
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/about",
      component: About,
      sensitive: true,
    },
    {
      path: "/product/search",
      component: ProductSearch,
      name: "product-search",
      props: (route) => ({
        product: route.query.product,
      }),
    },
    {
      path: "/product/search/:keyword",
      redirect: (thisRoute) => {
        return {
          name: "product-search",
          query: { product: thisRoute.params.keyword },
        };
      },
    },
    {
      path: "/product/:id(\\d+)?",
      component: ProductDetail,
      props: true,
    },
    {
      path: "/users",
      component: () => import("./components/User.vue"),
      children: [
        {
          path: "",
          name: "user",
          components: {
            default: () => import("./components/UserProfile.vue"),
            header: () => import("./components/UserHeader.vue"),
          },
        },
        {
          path: "profile",
          name: "user-profile",
          components: {
            default: () => import("./components/UserProfile.vue"),
            header: () => import("./components/UserHeader.vue"),
          },
        },
        {
          path: "order",
          name: "user-order",
          components: {
            default: () => import("./components/UserOrder.vue"),
            header: () => import("./components/UserHeader.vue"),
            footer: () => import("./components/UserOrderFooter.vue"),
          },
        },
        {
          path: "wishlist",
          name: "user-wishlist",
          components: {
            default: () => import("./components/UserWishlist.vue"),
            header: () => import("./components/UserHeader.vue"),
            footer: () => import("./components/UserWishlistFooter.vue"),
          },
        },
      ],
    },
    {
      path: "/:notfound*",
      component: NotFound,
      beforeEnter: (to, from, next) => {
        console.info(`not found page: ${to.fullPath}`);
        next();
      },
    },
  ],
  history: createWebHistory(),
  /**
   * Vue Router menyediakan 3 history modes:
   * 1. HTML5 History Mode
   *    - menggunakan createWebHistory()
   *    - seperti biasa dilakukan
   * 2. Hash Mode
   *    - menggunakan createWebHashHistory()
   *    - harus ada tanda "#" di URL setelah domain: (contoh: http://localhost:8080/#/about)
   * 3. Memory Mode
   *    - menggunakan createMemoryHistory()
   *    - tidak mengubah url pada browser
   *    - setiap navigasi menggunakan fungsi router.push()
   */
});

router.beforeEach((to, from, next) => {
  console.info(`before navigate to ${to.fullPath} from ${from.fullPath}`);
  next();
});

router.afterEach((to, from) => {
  console.info(`after navigate to ${to.fullPath} from ${from.fullPath}`);
});

createApp(App).use(router).mount("#app");
