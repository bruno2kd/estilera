<template>
<div>
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
      <input
      style="display: none"
      id="imageFileSelec"
      type="file"
      :name="selectedFile"
      @change="onFileSelected"
      ref="fileInput"
      >
      <button @click.prevent="$refs.fileInput.click()" >Pick File</button>
      <h6>{{fileName}}</h6>
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
  <div id="preview">
    <button @click="saiImagem">BOTAO</button>
    <img v-if="imageUrl" :src="imageUrl" height="250px" width="250px"/>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    name: undefined,
    form: false,
    isLoading: false,
    errorForm: undefined,
    selectedFile: undefined,
    fileName: undefined,
    imageUrl: undefined,
    rules: {
      required: v => !!v || 'This field is required',
    },
  }),
  methods: {
    async createProduct() {
      try {
        const seller = await axios.get('/sellers');
        const fd = new FormData();
        fd.append('productImage', this.selectedFile, seller.data._id);
        fd.append('name', this.name);
        fd.append('seller', seller.data._id);
        const url = '/products';
        const res = await axios.post(url, fd, {
          onUploadProgress: uploadEvent => {
            const up = uploadEvent.loaded / uploadEvent.total;
            // eslint-disable-next-line
            console.log('Upload Progress: ', Math.round(up * 100) + '%');
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error.response.data);
        this.errorForm = error.response.data.message;
      }
    },
    onFileSelected(e) {
      console.log(e);
      const ft = e.target.files[0].type;
      console.log(ft);
      if (ft === 'image/png' || ft === 'image/jpg' || ft === 'image/jpeg') {
        console.log(ft);
        this.selectedFile = e.target.files[0];
        this.imageUrl = URL.createObjectURL(this.selectedFile);
        this.fileName = e.target.files[0].name;
      } else {
        this.errorForm = 'Imagem must be .png .jpg or .jpeg';
        this.saiImagem();
      }
    },
    saiImagem() {
      document.getElementById('imageFileSelec').value = '';
      this.selectedFile = undefined;
      this.imageUrl = undefined;
    },
  },
};
</script>
<style scoped>
</style>
