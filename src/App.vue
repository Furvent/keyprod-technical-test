<template>
  <v-app>
    <v-card flat class="blue-grey darken-4">
      <!-- Nav -->
      <v-toolbar flat dark tile class="d-flex">
        <v-img
          src="./assets/KeyProd-Logo-Black--Transparent-SMALL.png"
          contain
          max-height="60"
          max-width="300"
        >
        </v-img>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="red darken-4"></v-tabs-slider>
          <v-tab> Commandes </v-tab>
          <v-tab> Colis </v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="tab" class="mx-10 mt-2">
        <v-tab-item>
          <Orders />
        </v-tab-item>
        <v-tab-item>
          <Packages />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
import Orders from "./components/orders";
import Packages from "./components/packages";

export default {
  name: "App",

  components: { Orders, Packages },

  data: () => ({
    tab: null,
  }),

  methods: {},
};
</script>

<style scoped>
#app {
  background-color: #263238;
}
</style>
