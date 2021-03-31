<template>
  <v-card flat dark>
    <v-card-title>
      COMMANDE SÉLECTIONNÉE
    </v-card-title>
  </v-card>
</template>

<script>
  export default {
    props: {
      orderDetails: {
        type: Object,
        required: true,
        default: () => {
          return {}
        }
      },
    },
  }
</script>