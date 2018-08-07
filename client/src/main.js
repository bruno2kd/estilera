// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';

import { store } from './store/store';
import App from './App';
import router from './router';
import setAuthToken from './utils/setAuthToken';

Vue.use(Vuetify);

axios.defaults.baseURL = 'http://localhost:8000/api';
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth

  setAuthToken(localStorage.jwtToken);
  // Decode token to get user info and exp
  store.dispatch('tryAutoLogin');
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
