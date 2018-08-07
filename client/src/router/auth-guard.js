import { store } from '../store/store';

export default (to, from, next) => {
  console.log(store);
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next('/login');
  }
};
