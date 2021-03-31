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
      <v-tabs-items v-model="tab">
        <v-tab-item>
          qzdqd
        </v-tab-item>
        <v-tab-item>
          ghhdtd
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    tab: null,
  }),
};
</script>
