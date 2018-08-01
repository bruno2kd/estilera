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
      <v-card-title class="title font-weight-regular">Create Seller</v-card-title>
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
        label="Product Name"
        type="text"
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
        @click="createProduct"
        depressed
      >Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    name: undefined,
    form: false,
    isLoading: false,
    errorForm: undefined,
    rules: {
      required: v => !!v || 'This field is required',
    },
  }),
  methods: {
    async createProduct() {
      try {
        const user = await axios.get('/users/current');
        const url = '/products';
        const res = await axios.post(url, {
          name: this.name,
          user: user._id,
        });
        console.log(res);
      } catch (error) {
        console.log(error.response.data);
        this.errorForm = error.response.data.message;
      }
    },
  },
};
</script>
