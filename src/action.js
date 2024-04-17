//action creator - их принято создавать
//если его не использовать и указать в store.dispatch({ type: "тип которого нет" }), то reducer выкинет default и ошибки не случится
//если при использовании action creator указать в store.dispatch("action которого нет"), то выйдет ошибка и мы о ней будем знать!
export const inc = () => ({ type: "INC" });
export const dec = () => ({ type: "DEC" });
export const rnd = (value) => ({ type: "RND", payload: value });
