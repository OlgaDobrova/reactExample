import { useState } from "react";
import { Container } from "react-bootstrap";
import { Transition } from "react-transition-group";
import "./App.css";

const Modal = (props) => {
  const { show } = props;
  const duration = 500;

  // св-во display не поддается анимации
  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
    visibility: "hidden",
  };

  const transitionStyles = {
    entering: { opacity: 1, visibility: "visible" },
    entered: { opacity: 1, visibility: "visible" },
    exiting: { opacity: 0, visibility: "hidden" },
    exited: { opacity: 0, visibility: "hidden" },
  };

  //   unmountOnExit - когда модалка закрыта, то ее нет в дом-дереве
  // onEnter - метод применяется, как только началась загрузка эл-та - перед стартом анимации скрыли кнопку
  // onExited - метод применяется, как только эл-т полностью завершил работу - после всей анимации показали кнопку
  return (
    <Transition
      in={show}
      timeout={duration}
      onEnter={() => props.setShowButton(false)}
      onExited={() => props.setShowButton(true)}
      unmountOnExit
    >
      {(state) => (
        <div
          className="modal mt-5 d-block"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Типичное модальное окно</h5>
                <button
                  onClick={() => props.onClose(false)}
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Содержимое модального окна</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => props.onClose(false)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Закрыть
                </button>
                <button
                  onClick={() => props.onClose(false)}
                  type="button"
                  className="btn btn-primary"
                >
                  Сохранить изменения
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(true);

  return (
    <Container>
      <Modal
        show={showModal}
        onClose={setShowModal}
        setShowButton={setShowButton}
      />
      {showButton ? (
        <button
          type="button"
          className="btn btn-warning mt-5"
          onClick={() => setShowModal(true)}
        >
          Открыть модальное окно
        </button>
      ) : null}
    </Container>
  );
}

export default App;
