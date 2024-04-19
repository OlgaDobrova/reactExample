import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as actions from "../action";

//Ф-ция connect - это компонент высшего порядка - HOC
//эта ф-ция в себе содержит другие ф-ции: mapStateToProps, mapDispatchToProps
const Counter = ({ counter, inc, dec, rnd }) => {
  return (
    <div className="jumbotron">
      <h1>{counter}</h1>
      <button onClick={dec} className="btn btn-primary">
        DEC
      </button>
      <button onClick={inc} className="btn btn-primary">
        INC
      </button>
      <button onClick={rnd} className="btn btn-primary">
        RND
      </button>
    </div>
  );
};

//mapStateToProps - чистая и синхронная ф-ция
//mapStateToProps - вытащит state (в хранилище store) и передаст их в props компонента Counter (в данном случае как counter)
//state прописан в reducer.js
const mapStateToProps = (state) => {
  // state - это store.state
  return { counter: state.value };
};

//mapDispatchToProps - вытащит действия - actions (в хранилище store) и передаст их в props компонента Counter (в данном случае как inc, dec, rnd)
//прописаны в reducer.js
// const mapDispatchToProps = (dispatch) => {
//   // dispatch - это store.dispatch
//   const { inc, dec, rnd } = bindActionCreators(actions, dispatch);
//   return {
//     // без actions мы написали бы так:
//     // inc: () => dispatch({ type: "INC" }),

//     // без bindActionCreators(actions, dispatch) мы написали бы так:
//     // inc: () => dispatch(actions.inc()),

//     //сейчас это
//     // inc: inc,
//     // т.е просто inc

//     inc,
//     dec,
//     rnd,
//   };
// };

// в итоге получилось
// const mapDispatchToProps = (dispatch) => {
//   const { inc, dec, rnd } = bindActionCreators(actions, dispatch);
//   return { inc, dec, rnd };
// };

// что можно заменить на
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(actions, dispatch);
// };

// т.е.
// const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

// получается, что mapDispatchToProps - это объект - { inc, dec, rnd }

// из документации - если второй аргумент ф-ции connect возвращает объект, то его можно передавать вместо mapDispatchToProps
// а ф-ция connect сама обернет все action в dispatch

//поэтому
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);

export default connect(mapStateToProps, actions)(Counter);
