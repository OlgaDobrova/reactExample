import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";

import reducer from "./reducer";
// import { inc, dec, rnd } from "./action";
import * as actions from "./action";

//store - единственное хранилище на весь проект (можно создавать их несколько, но не нужно!)
const store = configureStore({ reducer });

const { dispatch, subscribe, getState } = store;

const update = () => {
  document.getElementById("counter").textContent = getState().value;
};

//ф-ция сработает при изменениях внутри store, т.е. при вызове dispatch
subscribe(update);

//было:
// document.getElementById("inc").addEventListener("click", () => {
//   store.dispatch(inc());
// });

// document.getElementById("rnd").addEventListener("click", () => {
//   const value = Math.round(Math.random() * 100) + 1;
//   store.dispatch(rnd(value));
// });

// У нас двойной вызов ф-ции: () => { store.dispatch(rnd(value)) }

//если мы сами напишем ф-цию bindActionCreator
//где creator - это inc или dec или rnd
//...args - это массив аргументов переданных в creator (это value в rnd(value))
// dispatch - это store.dispatch
//конструкция bindActionCreator = (creator, dispatch) => () => {} - значит, что в реультате будет тоже ф-ция

// const bindActionCreator =
//   (creator, dispatch) =>
//   (...args) => {
//     dispatch(creator(...args));
//   };

//Заменим нашу ф-цию на аналогичную из redux
// const { incDispatch, decDispatch, rndDispatch } = bindActionCreators(
//   {
//     incDispatch: inc,
//     decDispatch: dec,
//     rndDispatch: rnd,
//   },
//   dispatch
// );

// это мы можем заменить на (ключи объекта можем называть как хотим...)
// const { incDispatch, decDispatch, rndDispatch } = bindActionCreators(
//   {
//     inc: inc,
//     dec: dec,
//     rnd: rnd,
//   },
//   dispatch
// );

// а это в свою очередь на
// const { incDispatch, decDispatch, rndDispatch } = bindActionCreators(
//   { inc,dec,rnd },
//   dispatch
// );

// в итоге:
const { inc, dec, rnd } = bindActionCreators(actions, dispatch);

document.getElementById("inc").addEventListener("click", inc);

document.getElementById("dec").addEventListener("click", dec);

document.getElementById("rnd").addEventListener("click", () => {
  const value = Math.round(Math.random() * 100) + 1;
  rnd(value);
});

ReactDOM.render(
  <React.StrictMode>
    <></>
  </React.StrictMode>,
  document.getElementById("root")
);
