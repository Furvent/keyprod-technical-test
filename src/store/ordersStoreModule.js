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
            package: "4114H8974L",
          },
          {
            model: "KeyNetic",
            version: "1",
            scanned: false,
            productScanned: undefined,
            package: undefined,
          },
          {
            model: "KeyVibe",
            version: "1",
            scanned: true,
            productScanned: "KeyVibe_V1_AAEDFR",
            package: "4114H8974L",
          },
          {
            model: "KeyVibe",
            version: "1",
            scanned: false,
            productScanned: undefined,
            package: undefined,
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
    getOrderById: (state) => (orderId) => {
      return state.orders.find((order) => order.id === orderId);
    },
    // Maybe not the right place, put it in utils.js ?
    getProductWeightWithModelAndVersion: (state) => (model, version) => {
      model = model.toLowerCase();
      version = "v" + version;
      const weight = productsCatalogWeight[model][version];
      if (!weight) {
        console.error(
          "In function getProductWeight(), model or version is unknown"
        );
        return undefined;
      } else return weight;
    },
    getProductsWithPackagesTrackingId: (state) => (trackingId) => {
      const productsToReturn = [];
      state.orders.forEach((order) => {
        if (order.packages.find((pack) => pack === trackingId)) {
          order.productsOrdered.forEach((product) => {
            if (product.package === trackingId) {
              productsToReturn.push(product);
            }
          });
        }
      });
      console.log("productsToReturn", productsToReturn);
      return productsToReturn;
    },
  },

  mutations: {
    updateProductsOrderedWithOrderId: (state, { productsOrdered, id }) => {
      const orderSearched = state.orders.find((order) => order.id === id);
      orderSearched.productsOrdered = productsOrdered;
    },
    addnewPackageToOrderWithId: (state, { newPackageId, id }) => {
      const orderSearched = state.orders.find((order) => order.id === id);
      orderSearched.packages.push(newPackageId);
    },
  },
};

const productsCatalogWeight = {
  keynetic: {
    v1: 280,
    v2: 250,
  },
  keyvibe: {
    v1: 240,
    v2: 210,
  },
};
