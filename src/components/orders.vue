<template>
  <div class="d-flex">
    <OrdersList/>
    <OrderDetail class="ml-4"/>
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
  computed: {
    orders() {
      return this.$store.getters.getAllOrders;
    },
  },
};
</script>