
const { default: ShopActionTypes } = require("./shop.types");

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.fetchCollectionsStart,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.fetchCollectionsSuccess,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (error) => ({
  type: ShopActionTypes.fetchCollectionsFailure,
  payload: error.message,
});

