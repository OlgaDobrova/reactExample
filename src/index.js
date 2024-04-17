import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";

const initialState = { value: 0 };

// state - это текущее состояние, до его обновления (по умолчанию = 0)
// action - действие, кот применим к state - это объект, у кот есть обяз строковое св-во type

// case "RND":
//       return Math.round(Math.random() * 100) + 1;
// так написать нельзя(грубая логическая ошибка), т.к. reducer д.б. чистой ф-цией и случайных чисел быть не должно!

//Чистая ф-ця должна возвращать одинаковый рез при одинаковых входных данных!
//Чистая ф-ция не вызывает внутри себя побочных эффектов! (не включать напр, console.log, работу с DOM деревом, асинхронные ф-ции (запросы на сервер, setTimeOut, ...) и др)

//{ ...state, value: state.value + 1 } - тут соблюдается принцип иммутабельности

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INC":
      return { ...state, value: state.value + 1 };
    case "DEC":
      return { ...state, value: state.value - 1 };
    case "RND":
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

//store - единственное хранилище на весь проект (можно создавать их несколько, но не нужно!)
const store = configureStore({ reducer });

const update = () => {
  document.getElementById("counter").textContent = store.getState().value;
};

//ф-ция сработает при изменениях внутри store, т.е. при вызове dispatch
store.subscribe(update);

//action creator - их принято создавать
//если его не использовать и указать в store.dispatch({ type: "тип которого нет" }), то reducer выкинет default и ошибки не случится
//если при использовании action creator указать в store.dispatch("action которого нет"), то выйдет ошибка и мы о ней будем знать!
const inc = () => ({ type: "INC" });
const dec = () => ({ type: "DEC" });
const rnd = (value) => ({ type: "RND", payload: value });

document.getElementById("inc").addEventListener("click", () => {
  store.dispatch(inc());
});

document.getElementById("dec").addEventListener("click", () => {
  store.dispatch(dec());
});

document.getElementById("rnd").addEventListener("click", () => {
  const value = Math.round(Math.random() * 100) + 1;
  store.dispatch(rnd(value));
});

ReactDOM.render(
  <React.StrictMode>
    <></>
  </React.StrictMode>,
  document.getElementById("root")
);
