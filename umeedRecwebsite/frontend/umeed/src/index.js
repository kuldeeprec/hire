import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import "bootstrap/dist/css/bootstrap.min.css";
import { configureStore } from "./store";
import App from "./components/App";

const store = configureStore();
console.log(store);
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
