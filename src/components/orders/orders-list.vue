<template>
  <v-card flat dark>
    <v-card-title> LISTES DES COMMANDES </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Numéro de commande</th>
              <th class="text-left">État</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              @click.stop="loadOrderDetails(order.id)"
            >
              <td>
                {{ order.id }}
              </td>
              <td>
                {{ getOrderStatus(order.status) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { OrderStatus } from "../../enums/enums.js";

export default {
  props: {
    orders: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },

  methods: {
    getOrderStatus(status) {
      switch (status) {
        case OrderStatus.TO_PREPARE:
          return "À préparer";
        case OrderStatus.ONGOING:
          return "En cours";
        case OrderStatus.SEND:
          return "Terminée";
        default:
          break;
      }
    },
    loadOrderDetails(orderId) {
      this.$emit("load-order-details", orderId);
    },
  },
};
</script>