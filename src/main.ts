import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import ProductDetail from "./components/ProductDetail.vue";
import NotFound from "./components/NotFound.vue";
import ProductSearch from "./components/ProductSearch.vue";
import User from "./components/User.vue";
import UserProfile from "./components/UserProfile.vue";
import UserOrder from "./components/UserOrder.vue";
import UserWishlist from "./components/UserWishlist.vue";
import UserHeader from "./components/UserHeader.vue";
import UserOrderFooter from "./components/UserOrderFooter.vue";
import UserWishlistFooter from "./components/UserWishlistFooter.vue";

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
      component: User,
      children: [
        {
          path: "",
          name: "user",
          components: {
            default: UserProfile,
            header: UserHeader,
          },
        },
        {
          path: "profile",
          name: "user-profile",
          components: {
            default: UserProfile,
            header: UserHeader,
          },
        },
        {
          path: "order",
          name: "user-order",
          components: {
            default: UserOrder,
            header: UserHeader,
            footer: UserOrderFooter,
          },
        },
        {
          path: "wishlist",
          name: "user-wishlist",
          components: {
            default: UserWishlist,
            header: UserHeader,
            footer: UserWishlistFooter,
          },
        },
      ],
    },
    {
      path: "/:notfound*",
      component: NotFound,
    },
  ],
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
