<template>
  <v-card flat dark>
    <v-card-title> COMMANDE SÉLECTIONNÉE </v-card-title>
    <v-card-text>
      <!-- Products details -->
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr v-for="(product, index) in orderDetails.productsOrdered" :key="index">
              <td>
                {{ product.model }}
              </td>
              <td>V{{ product.version }}</td>
              <td>{{ getProductWeight(product.model, product.version) }}g</td>
              <td>
                <v-btn
                  v-if="product.scanned === false"
                  text
                  color="blue"
                  @click.stop="scanThisProduct(product)"
                  >Scanner</v-btn
                >
                <span v-else class="green--text">
                  {{ product.productScanned }}
                </span>
              </td>
              <td>
                <span v-if="product.package">
                  Envoyé avec le colis numéro {{product.package}}
                </span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!-- Packages -->
      <div class="mt-2 ml-1">
        <span>COLIS ENVOYÉS</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    orderDetails: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },

  computed: {
    getUnpackedProducts() {
      return this.orderDetails.productsOrdered.filter(
        (product) => product.package === undefined
      );
    },
    getOrderPackages() {
      const packages = this.orderDetails.packages.map((packageId) => {
        return this.$store.getters.getPackageByTrackingNumber(packageId);
      });
      return packages;
    },
  },

  data() {
    return {
      tempPackages: [],
    };
  },

  methods: {
    getProductWeight(model, version) {
      return this.$store.getters.getProductWeightWithModelAndVersion(
        model,
        version
      );
    },
    // TODO: Refacto
    scanThisProduct(product) {
      let randomSequenceSixChars = "";
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < 6; i++) {
        randomSequenceSixChars += alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
      }
      const { model, version } = product;
      const serializedId = `${model}_V${version}_${randomSequenceSixChars}`;

      product.scanned = true;
      product.productScanned = serializedId;

      // Update store
      this.$store.commit("updateProductsOrderedWithOrderId", this.orderDetails);
    },
  },
};
</script>