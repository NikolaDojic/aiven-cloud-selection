import thunkMiddleware from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducers";

export const middleware = [thunkMiddleware];
const createStoreWithMiddleware = compose(applyMiddleware(...middleware))(
  createStore
);
const store = createStoreWithMiddleware(
  reducer(),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
