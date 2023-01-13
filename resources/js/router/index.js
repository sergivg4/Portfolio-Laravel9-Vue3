import { createRouter, createWebHistory } from "vue-router";

//admin
import homeAdminIndex from '../components/admin/home/index.vue';

//pages
import homePageIndex from '../components/pages/home/index.vue';
import notFound from '../components/notFound.vue';

//login
import login from '../components/auth/login.vue';


const routes = [
    //admin
    {
        path: '/admin/home',
        name: 'admin/home',
        component: homeAdminIndex,
        meta:{
            requiresAuth:true
        }
    },
    //Pages
    {
        path: '/',
        name: 'Home',
        component: homePageIndex,
        meta:{
            requiresAuth:false
        }
    },
    //Login
    {
        path: '/login',
        name: 'Login',
        component: login,
        meta:{
            requiresAuth:false
        }
    },
    //NotFound
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: notFound,
        meta:{
            requiresAuth:false
        }
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        return { name: 'Login'}
    }

    if(to.meta.requiresAuth == false && localStorage.getItem('token')){
        return { name: 'adminHome'}
    }
})

export default router