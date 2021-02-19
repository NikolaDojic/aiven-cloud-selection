import { applyMiddleware, createStore } from "redux";
import reducer from "../src/reducers";
import { middleware } from "../src/store";

export const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const testStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(reducer(), initialState);
};
