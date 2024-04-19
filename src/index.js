import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import reducer from "./reducer";

import App from "./components/App";

//store - единственное хранилище на весь проект (можно создавать их несколько, но не нужно!)
const store = configureStore({ reducer });

//Provider следит за всеми изменениями в store, т.е. при вызове dispatch
const update = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

update();
