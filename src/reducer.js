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

export default reducer;
