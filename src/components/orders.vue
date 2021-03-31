<template>
  <div class="d-flex">
    <OrdersList
      :orders="orders"
      @load-order-details="loadOrderDetails"
    />
    <OrderDetail :order-detail="orderSelected" class="ml-4" />
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
      orderSelected: null
    }
  },

  computed: {
    orders() {
      return this.$store.getters.getAllOrders;
    },
  },

  methods: {
    loadOrderDetails(orderId) {
      console.log("Order clicked", orderId);
      this.orderSelected = this.$store.getters.getOrderById(orderId);
    },
  },
};
</script>