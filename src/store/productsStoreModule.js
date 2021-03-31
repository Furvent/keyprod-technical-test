// export default {
//   state: {
//     products: [
//       {
//         serializedId: "KeyNetic_V1_DGAHHM",
//         model: "KeyNetic",
//         version: "1",
//         weight: 280,
//       },
//       {
//         serializedId: "KeyVibe_V1_AAEDFR",
//         model: "KeyVibe",
//         version: "1",
//         weight: 240,
//       },
//     ],
//   },

//   getters: {
//     getProductBySerializedId: (state) => (serializedIdSearched) => {
//       return state.products.find(
//         (product) => product.serializedId === serializedIdSearched
//       );
//     },
//   },

//   mutations: {
//     addProduct: (state, newProduct) => {
//       newProduct = {
//         ...newProduct,
//         weight: getProductWeight(newProduct.model, newProduct.version),
//       };
//       state.products.push(newProduct);
//     },
//   },
// };


