import { useState, useCallback, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import "./App.css";

const countTotal = (num) => {
  console.log("couting...");
  return num + 10;
};

const Slider = (props) => {
  const [slide, setSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  //если в завис-тях пустой массив, то ф-ция запустится 1 раз - при загрузке страницы - важно для оптимизации проекта
  //useCallback - закэшировали ф-цию!
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

  //useMemo - запускается в рендеринге
  //Значение не пересчитывается при рендере, оно запомнено (мемоизировано), если состояние (state) не входит в стек зависимостей
  //без использования useMemo значение ф-ции будет пересчитано при каждом рендере
  //useMemo - закэшировали значение ф-ции!
  const total = useMemo(() => {
    return countTotal(slide);
  }, [slide]);

  const style = useMemo(
    () => ({
      color: slide > 4 ? "red" : "green",
    }),
    [slide]
  );

  useEffect(() => {
    console.log("перем style пересчиталась");
  }, [style]);

  return (
    <Container>
      <div className="slider w-50 m-auto">
        <Slide getSomeImages={getSomeImages} />

        <div className="text-center mt-5">
          Active slide {slide} <br /> {autoplay ? "auto" : null}
        </div>
        <div style={style} className="text-center mt-5">
          Total slides: {total}
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
