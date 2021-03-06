import { OrderStatus } from "../enums/enums";
import { generateRandomId } from "../utils";

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
    generateMockedOrder: (state) => {
      state.orders.push(generateNewMockedOrder());
    },
  },
};

function generateNewMockedOrder() {
  const newOrder = {};
  newOrder.id = generateRandomId();
  newOrder.status = OrderStatus.TO_PREPARE;
  newOrder.productsOrdered = generateMockedProductsOrdered(
    Math.floor(Math.random() * 6)
  );
  newOrder.packages = [];
  return newOrder;
}

function generateMockedProductsOrdered(number) {
  const model = ["KeyNetic", "KeyVibe"];
  const version = ["1", "2"];
  const productsOrdered = [];
  for (let i = 0; i < number; i++) {
    const newProduct = {
      model: model[Math.floor(Math.random() * model.length)],
      version: version[Math.floor(Math.random() * version.length)],
      scanned: false,
      productScanned: undefined,
      package: undefined,
    };
    productsOrdered.push(newProduct);
  }
  return productsOrdered;
}

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
