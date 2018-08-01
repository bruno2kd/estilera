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
      <v-card-title class="title font-weight-regular">Update Seller</v-card-title>
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
        label="Company Name"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="handle"
        :rules="[rules.required]"
        box
        color="yellow lighten-3"
        label="Handle"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="website"
        box
        color="yellow lighten-3"
        label="Website"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="location"
        :rules="[rules.required]"
        box
        color="yellow lighten-3"
        label="Location"
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
        @click="createSellerProfile"
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
    handle: undefined,
    website: undefined,
    location: undefined,
    form: false,
    isLoading: false,
    errorForm: undefined,
    rules: {
      required: v => !!v || 'This field is required',
    },
  }),
  methods: {
    async createSellerProfile() {
      // const token = window.localStorage.getItem('auth');
      try {
        const urlGetSeller = 'http://localhost:8000/api/sellers';
        const seller = await axios.get(urlGetSeller);
        const url = `http://localhost:8000/api/sellers/${seller.data._id}`;
        const res = await axios.put(url, {
          name: this.name,
          handle: this.handle,
          website: this.website,
          location: this.location,
        });
        console.log(res);
      } catch (error) {
        console.log(error.response.data);
        this.errorForm = error.response.data.message;
      }
    },
    async fetchSellerProfile() {
      try {
        const urlGetSeller = 'http://localhost:8000/api/sellers';
        const seller = await axios.get(urlGetSeller);
        console.log(seller);
        this.name = seller.data.name;
        this.handle = seller.data.handle;
        this.website = seller.data.website;
        this.location = seller.data.location;
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
  mounted() {
    this.fetchSellerProfile();
  },
};
</script>
