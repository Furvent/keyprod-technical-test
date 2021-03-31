<template>
  <v-card flat dark>
    <v-card-title> COMMANDE SÉLECTIONNÉE : {{orderDetails.id}}</v-card-title>
    <v-card-text>
      <!-- Products details -->
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr
              v-for="(product, index) in orderDetails.productsOrdered"
              :key="index"
            >
              <td>
                {{ product.model }}
              </td>
              <td>V{{ product.version }}</td>
              <td>{{ getProductWeight(product.model, product.version) }}g</td>
              <!-- SCAN -->
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
              <!-- Package -->
              <td>
                <div v-if="product.scanned">
                  <span v-if="product.package === 'En préparation'">
                    En préparation
                  </span>
                  <span v-else-if="product.package">
                    Envoyé avec le colis numéro {{ product.package }}
                  </span>
                  <span v-else-if="currentPackage">
                    <v-btn
                      text
                      color="blue"
                      @click.stop="addProductToCurrentPackage(product)"
                      >Ajouter au colis</v-btn
                    >
                  </span>
                  <span v-else>
                    Commencer un nouveau colis pour attribuer ce produit
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!-- Packages -->
      <div class="mt-2 ml-1">
        <!-- Ongoing -->
        <div>COLIS EN COURS</div>
        <v-simple-table v-if="currentPackage">
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Colis en cours</td>
                <td>Poids : {{ currentPackage.weight }}g</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn v-if="!currentPackage" small dark color="grey" @click.stop="addPackage()"
          >Commencer un colis</v-btn
        >
        <v-btn v-else small dark color="green" @click.stop="sendPackage()"
          >Envoyer le colis</v-btn
        >
        <!-- Send -->
        <div>COLIS ENVOYÉS</div>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="pack in getOrderPackages" :key="pack.trackingNumber">
                <td>Colis numéro {{ pack.trackingNumber }}</td>
                <td>Poids : {{ pack.weight }}g</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { PackageStatus } from "../../enums/enums";

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

  data() {
    return {
      currentPackage: null,
    };
  },

  computed: {
    // Unused
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
    addPackage() {
      this.currentPackage = {
        id: "",
        weight: 0,
        status: PackageStatus.BEING_PREPARED,
        products: [],
      };
    },
    sendCurrentPackage() {
      // generate id,
      // change products package to id,
      // push package to package store
      // put at null currentPackage
      // Not here but remove colis en cours if all products are send
    },
    addProductToCurrentPackage(product) {
      product.package = "En préparation";
      this.currentPackage.products.push;
      const {model, version} = product;
      this.currentPackage.weight += this.getProductWeight(model, version)
    },
  },
};
</script>