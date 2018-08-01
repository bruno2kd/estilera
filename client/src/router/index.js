import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Register from '@/components/Register';
import Test from '@/components/Test';

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
      path: '/test',
      name: 'Test',
      component: Test,
    },
  ],
});
