import { PackageStatus } from "../enums/enums";

export default {
  state: {
    packages: [
      {
        trackingNumber: "4114H8974L",
        status: PackageStatus.IN_TRANSIT,
        weight: 520,
        // products: [
        //   "KeyNetic_V1_DGAHHM",
        //   "KeyVibe_V1_AAEDFR"
        // ]
      }
    ]
  },

  getters: {
    getPackageByTrackingNumber: (state) => (trackingNumberSearched) => {
      return state.packages.find(
        // package is a reserved keyword so pack used 
        (pack) => pack.trackingNumber === trackingNumberSearched
      );
    },
  },

  mutations: {
    addPackage: (state, newPackage) => {
      state.packages.push(newPackage);
    },
  },
};