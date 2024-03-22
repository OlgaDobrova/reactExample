import { useState, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./App.css";

const Slider = (props) => {
  const [slide, setSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  //если в завис-тях пустой массив, то ф-ция запустится 1 раз - при загрузке страницы - важно для оптимизации проекта
  const getSomeImages = useCallback(() => {
    console.log("как будто получили от сервера ответ - массив картинок");
    return [
      "https://img.freepik.com/premium-photo/spring-flowers-on-paper_176873-6829.jpg?w=1380",
      "https://img.freepik.com/free-photo/cute-white-snowdrop-flowers-in-a-snowy-ground-the-start-of-a-spring_181624-15708.jpg?w=1380&t=st=1711113516~exp=1711114116~hmac=a85f3ccdeb2423a44209998879a305e0cdea2648dcfb8c7881653a5c499b6e81",
      "https://uprostim.com/wp-content/uploads/2021/04/image010-2.jpg",
    ];
  }, []);

  const changeSlide = (i) => {
    setSlide((slide) => slide + i);
  };

  const toggleAutoplay = () => {
    setAutoplay((autoplay) => !autoplay);
  };

  return (
    <Container>
      <div className="slider w-50 m-auto">
        {/* если использовать массив здесь, то он будет заново отрисовываться при каждом рендеринге - это плохо, например при > объеме картинок */}
        {/* {getSomeImages().map((url, i) => {
          return (
            <img key={i} className="d-block w-100" src={url} alt="slide" />
          );
        })} */}

        <Slide getSomeImages={getSomeImages} />

        <div className="text-center mt-5">
          Active slide {slide} <br /> {autoplay ? "auto" : null}
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
          <button className="btn btn-primary me-2" onClick={toggleAutoplay}>
            toggle autoplay
          </button>
        </div>
      </div>
    </Container>
  );
};

const Slide = ({ getSomeImages }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(getSomeImages());
  }, [getSomeImages]);

  return (
    <>
      {images.map((url, i) => (
        <img key={i} className="d-block w-100" src={url} alt="slide" />
      ))}
    </>
  );
};

function App() {
  const [slider, setSlider] = useState(true);

  return (
    <>
      <button onClick={() => setSlider(!slider)}>Click</button>
      {slider ? <Slider /> : null}
    </>
  );
}

export default App;
