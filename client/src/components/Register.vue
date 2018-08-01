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
      <v-card-title class="title font-weight-regular">Sign up</v-card-title>
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
        v-model="name"
        :rules="[rules.required]"
        box
        color="yellow lighten-3"
        label="Full Name"
        type="text"
        autocomplete="name"
      ></v-text-field>
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
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
        autocomplete="new-password"
      ></v-text-field>
      <v-text-field
        v-model="password2"
        :rules="[rules.password, rules.length(6)]"
        box
        color="yellow lighten-3"
        counter="6"
        label="Confirm Password"
        style="min-height: 96px"
        type="password"
        autocomplete="new-password"
      ></v-text-field>
      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="yellow lighten-3"
      >
        <template slot="label">
          I agree to the&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>
          &nbsp;and&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>*
        </template>
      </v-checkbox>
      <p v-if="errorForm">{{errorForm}}</p>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        flat
        @click="$refs.form.reset()"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="yellow lighten-3 accent-4"
        @click="register"
        depressed
      >Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    agreement: false,
    email: undefined,
    name: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    password2: undefined,
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
    async register() {
      if (this.form) {
        try {
          const res = await axios({
            method: 'post',
            data: {
              name: this.name,
              email: this.email,
              password: this.password,
              password2: this.password2,
            },
            url: 'http://localhost:8000/api/users/register',
          });
          console.log(res);
          this.$router.push('/');
        } catch (error) {
          console.log('ERROR AQUI');
          console.log(error.response.data.email);
          this.errorForm = error.response.data.email;
        }
      }
    },
  },
};
</script>
