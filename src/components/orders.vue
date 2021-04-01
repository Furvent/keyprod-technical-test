<template>
  <div class="d-flex justify-center blue-grey darken-4">
    <OrdersList :orders="orders" @load-order-details="loadOrderDetails" />
    <OrderDetail
      v-if="orderSelected"
      :order-details="orderSelected"
      class="ml-4"
    />
  </div>
</template>

<script>
import OrdersList from "./orders/orders-list";
import OrderDetail from "./orders/order-detail";

export default {
  components: {
    OrdersList,
    OrderDetail,
  },

  data() {
    return {
      orderSelected: null,
    };
  },

  computed: {
    orders() {
      return this.$store.getters.getAllOrders;
    },
  },

  mounted() {
    if (this.orders.length) {
      this.orderSelected = this.orders[0];
    }
  },

  methods: {
    loadOrderDetails(orderId) {
      this.orderSelected = this.$store.getters.getOrderById(orderId);
    },
  },
};
</script>