import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import {
  useModalWindowController,
  ModalWindowKey,
  ModalWindow, ModalWindowHeader, ModalWindowBody
} from "../package/modal-window"

const modalKey = new ModalWindowKey()

function App () {
  const controller = useModalWindowController()

  useEffect(() => {
    controller.connectModalWindow(modalKey);

    return () => {
      controller.disconnectModalWindow(modalKey);
    }
  }, []);

  return <>
    <h1>React modal window component @opendapps/modal-window</h1>

    <button onClick={ () => {
      controller.openModal(modalKey);
    } }>
      Open modal window
    </button>

    <ModalWindow modalKey={modalKey}>
      <ModalWindowHeader>
        Modal window title
      </ModalWindowHeader>
      <ModalWindowBody>
        This is modal body
      </ModalWindowBody>
    </ModalWindow>
  </>;
}

const root = ReactDOM.createRoot(document.querySelector("#app-root")!);
root.render(<App />);
