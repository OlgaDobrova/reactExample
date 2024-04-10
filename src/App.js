import { useState } from "react";
import { Container } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import "./App.css";

const Modal = (props) => {
  const { show } = props;
  const duration = 500;

  // unmountOnExit - когда модалка закрыта, то ее нет в дом-дереве
  // onEnter - метод применяется, как только началась загрузка эл-та - перед стартом анимации скрыли кнопку
  // onExited - метод применяется, как только эл-т полностью завершил работу - после всей анимации показали кнопку
  // classNames="modal" - базовый класс. В css файле д.б. прописано поведение для &-enter, &-enter-active, &-enter-done,&-exit, &-exit-active
  // верстку оборачивать ни во что не нужно
  return (
    <CSSTransition
      in={show}
      timeout={duration}
      onEnter={() => props.setShowButton(false)}
      onExited={() => props.setShowButton(true)}
      classNames="modal"
      mountOnEnter
      unmountOnExit
    >
      <div className="modal mt-5 d-block">
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
    </CSSTransition>
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
