/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps/modal-window
 *
 */

import useModalWindowController from "./src/modal-window-controller"
import { ModalWindowState, type IModalWindowControllerConfig } from "./src/modal-window-controller"

import ModalWindowKey from "./src/modal-window-key"
import { ModalWindow, ModalWindowHeader, ModalWindowBody, ModalWindowContext } from "./src/ModalWindow"
import type { IModalWindowProps, IModalWindowContext } from "./src/ModalWindow"

export {
  useModalWindowController,
  ModalWindowState,
  ModalWindowKey,
  ModalWindow,
  ModalWindowHeader,
  ModalWindowBody,
  ModalWindowContext,
  IModalWindowContext,
  IModalWindowProps,
  IModalWindowControllerConfig
}
