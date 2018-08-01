<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <router-link :to="{ name: 'Home' }">
                <v-list-tile-title>Dashboard</v-list-tile-title>
              </router-link>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="{ name: 'CreateSeller' }">
                <v-list-tile-title>Create Seller</v-list-tile-title>
              </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="{ name: 'UpdateSeller' }">
                <v-list-tile-title>Update Seller</v-list-tile-title>
              </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="{ name: 'CreateProduct' }">
                <v-list-tile-title>Create Product</v-list-tile-title>
              </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link :to="{ name: 'Home' }">Application</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'Register' }">Register</router-link>
      <router-link :to="{ name: 'Login' }"> Login</router-link>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import appFooter from '@/components/Footer';

export default {
  name: 'App',
  data: () => ({
    drawer: true,
  }),
  components: {
    appFooter,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.v-list__tile__title {
  text-decoration: none;
  color: #fff;
}
</style>
