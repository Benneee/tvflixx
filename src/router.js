import { createRouter, createWebHistory } from 'vue-router';


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
            component: () => import('./pages/NotFound.vue')
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