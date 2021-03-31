import { OrderState } from "../enums/enums";

export default {
  state: {
    orders: [
      {
        id: "4325C4744T",
        status: OrderState.TO_PREPARE,
        productsOrdered: [
          {
            model: "KeyNetic",
            version: "1",
            scanned: false,
            productScanned: undefined
          },
          {
            model: "KeyNetic",
            version: "1",
            scanned: false,
            productScanned: undefined
          },
          {
            model: "KeyVibe",
            version: "1",
            scanned: false,
            productScanned: undefined
          },
          {
            model: "KeyVibe",
            version: "1",
            scanned: false,
            productScanned: undefined
          }
        ],
        // List IDs
        packages: [
        ]
      }
    ]
  },

  getters: {
    getAllOrders: (state) => {
      return state.orders;
    },
    getOrderById: (state) => (searchedId) => {
      return state.orders.find((order) => order.id === searchedId);
    }
  },

  mutations: {
  },
};