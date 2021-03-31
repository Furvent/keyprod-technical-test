<template>
  <v-card flat dark>
    <v-card-title> COMMANDE SÉLECTIONNÉE </v-card-title>
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
                  Envoyé avec le colis numéro {{ product.package }}
                </span>
                <span v-else-if="tempPackages.length > 0">
                  <v-select
                    :items="tempPackages"
                    item-text="number"
                    @change="getChange(product)"
                    return-object
                  >
                  </v-select>
                </span>
                <span v-else>
                  Commencer un nouveau colis pour attribuer ce produit
                </span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!-- Packages -->
      <div class="mt-2 ml-1">
        <!-- Ongoing -->
        <div>COLIS EN COURS</div>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="(pack, index) in tempPackages" :key="index">
                <td>Colis en cours</td>
                <td>Poids : {{ pack.weight }}g</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn small dark color="grey" @click.stop="addPackage()"
          >Commencer un colis</v-btn
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
      tempPackages: [],
      selectedInput: null,
    };
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
      this.tempPackages.push({
        number: "Colis numéro " + (this.tempPackages.length + 1),
        id: "",
        weight: 0,
        status: PackageStatus.BEING_PREPARED,
      });
      this.selectedInput = this.tempPackages[0];
    },

    getChange(product) {
      console.log("select input change", product);
      
    },
  },
};
</script>