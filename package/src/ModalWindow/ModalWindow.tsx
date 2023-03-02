/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps/modal-window
 *
 */

import { classNames } from "@knownout/lib"
import { observer } from "mobx-react-lite"
import React, { createContext, forwardRef, useCallback, useEffect } from "react"
import "./ModalWindow.scss"
import { createPortal } from "react-dom"
import useModalWindowController, { ModalWindowState } from "../modal-window-controller"
import ModalWindowKey from "../modal-window-key"

export interface IModalWindowProps {
  modalKey: ModalWindowKey
  children: any

  onClose? (): void

  onOpen? (): void

  onSwitch? (state: boolean): void

  overrideCloseEvent? (): void
}

export interface IModalWindowContext {
  modalKey?: ModalWindowKey
}

export const ModalWindowContext = createContext<IModalWindowContext>({})

const ModalWindow = forwardRef<HTMLDivElement, IModalWindowProps>((
  props,
  ref
) => {
  const controller = useModalWindowController()

  const windowState = controller.getModalState(props.modalKey)

  useEffect(() => {
    controller.connectModalWindow(props.modalKey)

    return () => {
      controller.disconnectModalWindow(props.modalKey)
    }
  }, [ props.modalKey ])

  useEffect(() => {
    if (windowState === ModalWindowState.OPEN && props.onOpen) props.onOpen()

    if (windowState === ModalWindowState.CLOSE && props.onClose) props.onClose()

    if (windowState === ModalWindowState.OPEN || windowState === ModalWindowState.CLOSE) {
      if (props.onSwitch) props.onSwitch(windowState === ModalWindowState.OPEN)
    }
  }, [ windowState ])

  const onModalWindowClose = useCallback(() => {
    if (props.overrideCloseEvent) {
      props.overrideCloseEvent()
      return
    }

    controller.closeModal(props.modalKey)
  }, [ props.overrideCloseEvent ])

  const onBackgroundClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    if (target.classList.contains(props.modalKey.toString())) onModalWindowClose()
  }, [ props.modalKey, props.overrideCloseEvent ])

  return createPortal(
    (
      <ModalWindowContext.Provider value={ { modalKey: props.modalKey } }>
        <div className={ classNames("od-modal-window", props.modalKey.toString(), windowState) } ref={ ref }
             onClick={ onBackgroundClick }>
          <div className="od-modal-window-container">
            { props.children }
          </div>
        </div>
      </ModalWindowContext.Provider>
    ),
    document.body
  )
})

export default observer(ModalWindow)
