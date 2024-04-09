import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./App.css";

// Компонент высшего порядка - HOC - начинается всегда с with
const withSlider = (BaseComponent, getData) => {
  return (props) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
      setSlide(getData());
    }, []);

    function changeSlide(i) {
      setSlide((slide) => slide + i);
    }

    return (
      <BaseComponent
        {...props}
        slide={slide}
        autoplay={autoplay}
        setAutoplay={setAutoplay}
        changeSlide={changeSlide}
      />
    );
  };
};

const getDataFormFirstFetch = () => {
  return 10;
};
const getDataFormSecondFetch = () => {
  return 20;
};

const SliderFirst = (props) => {
  const { slide, changeSlide } = props;
  return (
    <Container>
      <div className="slider w-50 m-auto">
        <img
          className="d-block w-100"
          src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          alt="slide"
        />
        <div className="text-center mt-5">Active slide {slide}</div>
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
        </div>
      </div>
    </Container>
  );
};

const SliderSecond = (props) => {
  const { slide, changeSlide, autoplay, setAutoplay } = props;
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
          {autoplay ? "auto" : null}
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
            onClick={() => setAutoplay((autoplay) => !autoplay)}
          >
            toggle autoplay
          </button>
        </div>
      </div>
    </Container>
  );
};

// Здесь HOC подключает разные компоненты по одной логике
const SliderWithFirstFetch = withSlider(SliderFirst, getDataFormFirstFetch);
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFormSecondFetch);

// Здесь HOC дополняет компонент Hello своей логикой, не меняя его самого (применяется, например, для подключения метрики)
// Это сокращенный вид компонента высшего порядка - HOC
const withLogger = (WrappedComponent) => (props) => {
  useEffect(() => {
    console.log("first render!");
  }, []);
  return <WrappedComponent {...props} />;
};

const Hello = () => {
  return <h1>Hello</h1>;
};

const HelloWithLogger = withLogger(Hello);

function App() {
  return (
    <>
      <HelloWithLogger />
      <SliderWithFirstFetch />
      <SliderWithSecondFetch />
    </>
  );
}

export default App;
