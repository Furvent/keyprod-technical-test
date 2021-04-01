<template>
  <v-card flat dark tile>
    <v-card-title> LISTES DES COLIS </v-card-title>
    <v-card-text>
      <v-card v-for="pack in packagesWithProducts" :key="pack.trackingNumber">
        <v-card-title> Colis numéro {{ pack.trackingNumber }} </v-card-title>
        <v-card-text>
          État :
          {{ getPackStatus(pack.status) }}
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr
                  v-for="product in pack.products"
                  :key="product.productScanned"
                >
                  <td>
                    {{ product.model }}
                  </td>
                  <td>V{{ product.version }}</td>
                  <td>
                    {{ product.productScanned }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { PackageStatus } from "../enums/enums.js";

export default {
  computed: {
    packagesWithProducts() {
      const packages = this.$store.getters.getAllPackages;
      packages.forEach((pack) => {
        pack.products = this.$store.getters.getProductsWithPackagesTrackingId(
          pack.trackingNumber
        );
      });
      return packages;
    },
  },

  methods: {
    getPackStatus(status) {
      switch (status) {
        case PackageStatus.BEING_PREPARED:
          return "en préparation";
        case PackageStatus.IN_TRANSIT:
          return "en cours de livraison";
        case PackageStatus.RECEIVED:
          return "livré";
        default:
          break;
      }
    },
  },
};
</script>