import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Register from '@/components/Register';
import Login from '@/components/Login';
import CreateSeller from '@/components/CreateSeller';
import UpdateSeller from '@/components/UpdateSeller';
import CreateProduct from '@/components/CreateProduct';
import AuthGuard from './auth-guard';

Vue.use(Router);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/users/createSeller',
    name: 'CreateSeller',
    component: CreateSeller,
    beforeEnter: AuthGuard,
  },
  {
    path: '/users/updateSeller',
    name: 'UpdateSeller',
    component: UpdateSeller,
    beforeEnter: AuthGuard,
  },
  {
    path: '/products/add',
    name: 'CreateProduct',
    component: CreateProduct,
    beforeEnter: AuthGuard,
  },
];

export default new Router({
  mode: 'history',
  routes,
});
