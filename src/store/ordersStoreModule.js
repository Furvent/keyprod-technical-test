import { OrderStatus } from "../enums/enums";

export default {
  state: {
    orders: [
      {
        id: "4325C4744T",
        status: OrderStatus.ONGOING,
        productsOrdered: [
          {
            model: "KeyNetic",
            version: "1",
            scanned: true,
            productScanned: "KeyNetic_V1_DGAHHM",
          },
          {
            model: "KeyNetic",
            version: "1",
            scanned: false,
            productScanned: undefined,
          },
          {
            model: "KeyVibe",
            version: "1",
            scanned: true,
            productScanned: "KeyVibe_V1_AAEDFR",
          },
          {
            model: "KeyVibe",
            version: "1",
            scanned: false,
            productScanned: undefined,
          },
        ],
        packages: ["4114H8974L"],
      },
    ],
  },

  getters: {
    getAllOrders: (state) => {
      return state.orders;
    },
    getOrderById: (state) => (searchedId) => {
      return state.orders.find((order) => order.id === searchedId);
    },
  },

  mutations: {},
};
