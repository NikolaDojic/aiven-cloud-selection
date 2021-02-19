import thunkMiddleware from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducers";

var createStoreWithMiddleware = compose(applyMiddleware(thunkMiddleware))(
  createStore
);
const store = createStoreWithMiddleware(
  reducer(),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
