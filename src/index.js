// src/index.js
import React from "react";
import { createRoot } from "react-dom/client"; // Update import statement
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {console.log(store)}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

