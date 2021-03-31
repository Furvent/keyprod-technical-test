import { PackageStatus } from "../enums/enums";

export default {
  state: {
    packages: [
      {
        trackingNumber: "4114H8974L",
        status: PackageStatus.IN_TRANSIT,
        products: [
          "KeyNetic_V1_DGAHHM",
          "KeyVibe_V1_AAEDFR"
        ]
      }
    ]
  },

  getters: {
    getPackageByTrackingNumber: (state) => (trackingNumberSearched) => {
      return state.packages.find(
        (package) => package.trackingNumber === trackingNumberSearched
      );
    },
  },

  mutations: {
    addPackage: (state, newPackage) => {
      state.packages.push(newPackage);
    },
  },
};