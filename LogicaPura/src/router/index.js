import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; // Importamos a store para proteger rotas

// Importe seus componentes (ou defina-os no mesmo arquivo para o mock)
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: () => import('../pages/Login.vue') },
    { path: '/cadastro', name: 'Cadastro', component: () => import('../pages/Cadastro.vue') },
    {
        path: '/landing',
        name: 'Landing',
        component: () => import('../pages/Landing.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: () => import('../pages/Perfil.vue'),
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Não deixa acessar Landing/Perfil sem estar logado no Vuex
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user) {
        next('/login');
    } else {
        next();
    }
});

export default router;