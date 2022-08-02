import { createRouter, createWebHistory } from 'vue-router';
import NotFound from "./pages/NotFound.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            redirect: 'shows'
        },
        {
            path: '/shows',
            name: 'shows',
            component: () => import('./pages/Shows.vue')
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: () => import('./pages/Favorites.vue')
        },
        {
            path: '/shows/:showId',
            name: 'show-details',
            component: () => import('./pages/ShowDetails.vue')
        },
        { 
            path: '/:notFound(.*)*', 
            name: "not-found",
            component: NotFound
        }
    ],

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top };
    },
});

export default router;