/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
      state.user = null;
    },
  },
  actions: {
    signUp({ commit }, authData) {},
    async storeLogin({ commit }, authData) {
      try {
        const res = await axios.post('/users/login', {
          email: authData.email,
          password: authData.password,
        });
        console.log(res);
        const { token } = res.data;
        // Set token to Local storage
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        commit('authUser', {
          token: res.data.token,
          userId: res.data.userId,
        });
        commit('setUser', {
          name: res.data.user.name,
          email: res.data.user.email,
        });
        // Decote token with jwt_decode
        // const decoded = jwt_decode(token);
        // Set current user in app state
        // dispatch(setCurrentUser(decoded));
        // this.$router.push('/');
      } catch (error) {
        console.log(error.response);
        // console.log(error.response.data.message);
        // this.errorForm = error.response.data.message;
      }
    },
    logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('jwtToken');
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('jwtToken');
      const jwtData = jwt_decode(token);
      if (!token || jwtData.exp < Date.now() / 1000) {
        return;
      }
      commit('authUser', {
        token: token,
        userId: jwtData.id,
      });
      commit('setUser', {
        name: jwtData.name,
        email: jwtData.email,
      });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
});
