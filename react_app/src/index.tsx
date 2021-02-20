import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { fetchClouds } from "./actions/clouds";
import { fetchPlatforms } from "./actions/platforms";
import { fetchRegions } from "./actions/regions";
import { askForGeolocation } from "./actions/location";
import store from "./store";
import { Provider } from "react-redux";

store.dispatch(fetchPlatforms());
store.dispatch(fetchRegions());
store.dispatch(askForGeolocation());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
