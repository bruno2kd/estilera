<template>
  <v-card
    class="mx-auto"
    style="max-width: 500px;"
  >
    <v-system-bar
      color="deep-purple darken-4"
      dark
    >
      <v-spacer></v-spacer>
      <v-icon small>mdi-square</v-icon>
      <v-icon
        class="ml-1"
        small
      >mdi-circle</v-icon>
      <v-icon
        class="ml-1"
        small
      >mdi-triangle</v-icon>
    </v-system-bar>
    <v-toolbar
      color="deep-purple accent-4"
      cards
      dark
      flat
    >
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="title font-weight-regular">Login</v-card-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form
      ref="form"
      v-model="form"
      class="pa-3 pt-4"

    >
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        box
        color="yellow lighten-3"
        label="Email address"
        type="email"
        autocomplete="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        box
        color="yellow lighten-3"
        label="Password"
        style="min-height: 96px"
        type="password"
        autocomplete="password"
      ></v-text-field>
      <p v-if="errorForm">{{errorForm}}</p>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="yellow lighten-3 accent-4"
        @click="login"
        depressed
      >Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export default {
  data: () => ({
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    errorForm: undefined,
    rules: {
      email: v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
      length: len => v =>
        (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!v || 'This field is required',
      // (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
      // 'Password must contain an upper case letter, a numeric character, and a special character',
      required: v => !!v || 'This field is required',
    },
  }),
  methods: {
    async login() {
      if (this.form) {
        try {
          const res = await axios.post(
            'http://localhost:8000/api/users/login',
            {
              email: this.email,
              password: this.password,
            },
          );
          console.log(res);
          const { token } = res.data;
          // Set token to Local storage
          localStorage.setItem('jwtToken', token);
          // Set token to Auth header
          setAuthToken(token);
          // Decote token with jwt_decode
          // const decoded = jwt_decode(token);
          // Set current user in app state
          // dispatch(setCurrentUser(decoded));
          // this.$router.push('/');
        } catch (error) {
          console.log(error.response.data.message);
          this.errorForm = error.response.data.message;
        }
      }
    },
  },
};
</script>
