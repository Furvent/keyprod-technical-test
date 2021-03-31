<template>
  <v-app>
    <v-card flat>
      <!-- Nav -->
      <v-toolbar flat color="grey">
        <v-toolbar-title>Your Dashboard</v-toolbar-title>
        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="black"></v-tabs-slider>

            <v-tab> Commandes </v-tab>
            <v-tab> Colis </v-tab>
          </v-tabs>
        </template>
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
