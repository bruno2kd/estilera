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
      multiple
      style="display: none"
      id="imageFileSelec"
      type="file"
      :name="selectedFile"
      @change="onFileSelected"
      ref="fileInput"
      >
      <button @click.prevent="$refs.fileInput.click()" >Pick File</button>
      <div v-if="images" v-for="image in images" :key="image.fileName" >
        <h6>{{image.fileName}}</h6>
      </div>
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
    <div v-if="images" v-for="(image, i) in images" :key="i" >
      <button @click="rmvImageByIndex(i)">BOTAO</button>
      <img :src="image.imageUrl" height="250px" width="250px"/>
    </div>
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
    // fileName: undefined,
    // imageUrl: undefined,
    images: [],
    rules: {
      required: v => !!v || 'This field is required',
    },
  }),
  watch: {
    // eslint-disable-next-line
    images: function() {
      console.log(this.images);
    },
  },
  methods: {
    async createProduct() {
      try {
        const seller = await axios.get('/sellers');
        const fd = new FormData();
        fd.append('name', this.name);
        fd.append('seller', seller.data._id);
        this.images.forEach(x => {
          fd.append('productImage', x.selectedFile, seller.data._id);
        });
        console.log(fd);
        const url = '/products';
        const res = await axios.post(url, fd, {
          onUploadProgress: uploadEvent => {
            const up = uploadEvent.loaded / uploadEvent.total;
            // eslint-disable-next-line
            console.log('Upload Progress: ', Math.round(up * 100) + '%');
          },
        });
        this.images = [];
        this.name = undefined;
        console.log(res);
      } catch (error) {
        console.log(error.response.data);
        this.errorForm = error.response.data.message;
      }
    },
    onFileSelected(e) {
      this.errorForm = '';
      if (e.target.files.length > 6) {
        this.errorForm = 'Maximo de 6 imagens';
        return;
      }
      const notValid = Object.values(e.target.files).filter(
        x =>
          x.type !== 'image/png' &&
          x.type !== 'image/jpg' &&
          x.type !== 'image/jpeg',
      );
      if (notValid.length > 0) {
        this.errorForm = 'Images must be .png .jpg or .jpeg';
        return;
      }
      Object.values(e.target.files).forEach(x => {
        this.images.push({
          selectedFile: x,
          imageUrl: URL.createObjectURL(x),
          fileName: x.name,
        });
      });
    },
    rmvImageByIndex(index) {
      this.images.splice(index, 1);
    },
  },
};
</script>
<style scoped>
</style>
