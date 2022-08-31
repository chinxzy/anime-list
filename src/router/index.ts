import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AnimeView from "../views/AnimeView.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/Anime/:id",
        name: "Anime",
        component: AnimeView,
    },


];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;