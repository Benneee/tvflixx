import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotFound from "@/pages/NotFound.vue";
import TVShows from "@/pages/TVShows.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        redirect: 'shows'
    },
    {
        path: '/shows',
        name: 'shows',
        component: TVShows
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: () => import('../pages/Favorites.vue')
    },
    {
        path: '/shows/:showId',
        name: 'show-details',
        component: () => import('../pages/TVShowDetails.vue'),
    },
    { 
        path: '/:notFound(.*)', 
        component: NotFound
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { 
            left: 0, 
            behavior: 'smooth',
            top: 0
        };
    }
});

export default router;