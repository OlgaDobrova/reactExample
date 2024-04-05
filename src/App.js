import { useState, useReducer } from "react";
import { Container } from "react-bootstrap";
import "./App.css";

// ф-ция модификации state
//аргументы - state (сост до модификации), action (название действия, кот будем совершать со state)
function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      return { autoplay: !state.autoplay };
    case "slow":
      return { autoplay: 300 };
    case "fast":
      return { autoplay: 700 };
    case "custom":
      return { autoplay: action.payload };
    default:
      throw new Error();
  }
}

function init(inital) {
  //что то там делаем
  return { autoplay: inital };
}

const Slider = ({ inital }) => {
  const [slide, setSlide] = useState(0);
  // const [autoplay, setAutoplay] = useState(false);
  //useReducer() - state и dispatch - ф-ция, меняющая его (обяз. нач с dispatch)
  //аргументы - ф-ция, нач.состояние, ленивое создание нач.состояния
  //можно так:
  //const [autoplay, dispatch] = useReducer(reducer, { autoplay: false });
  //можно так:
  const [autoplay, dispatch] = useReducer(reducer, inital, init);

  function changeSlide(i) {
    setSlide((slide) => slide + i);
  }

  return (
    <Container>
      <div className="slider w-50 m-auto">
        <img
          className="d-block w-100"
          src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          alt="slide"
        />
        <div className="text-center mt-5">
          Active slide {slide} <br />
          {autoplay.autoplay ? "auto" : null}
        </div>
        <div className="buttons mt-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => changeSlide(-1)}
          >
            -1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => changeSlide(1)}
          >
            +1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => dispatch({ type: "toggle" })}
          >
            toggle autoplay
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => dispatch({ type: "slow" })}
          >
            sliw autoplay
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => dispatch({ type: "fast" })}
          >
            fast autoplay
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={(e) =>
              dispatch({ type: "custom", payload: +e.target.textContent })
            }
          >
            3000
          </button>
        </div>
      </div>
    </Container>
  );
};

function App() {
  return <Slider inital={false} />;
}

export default App;
