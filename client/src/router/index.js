import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Register from '@/components/Register';
import Login from '@/components/Login';
import CreateSeller from '@/components/CreateSeller';
import UpdateSeller from '@/components/UpdateSeller';
import CreateProduct from '@/components/CreateProduct';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/users/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/users/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/users/createSeller',
      name: 'CreateSeller',
      component: CreateSeller,
    },
    {
      path: '/users/updateSeller',
      name: 'UpdateSeller',
      component: UpdateSeller,
    },
    {
      path: '/products/add',
      name: 'CreateProduct',
      component: CreateProduct,
    },
  ],
});
