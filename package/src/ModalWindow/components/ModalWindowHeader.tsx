/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps/modal-window
 *
 */

import React, { forwardRef, useContext } from "react"
import useModalWindowController from "../../modal-window-controller"
import { IModalWindowContext, ModalWindowContext } from "../ModalWindow"
import CloseIcon from "./CloseIcon"

interface IProps {
  children: string

  showClose?: boolean
}

const ModalWindowHeader = forwardRef<HTMLDivElement, IProps>((
  props,
  ref
) => {
  const controller = useModalWindowController()
  const context = useContext<IModalWindowContext>(ModalWindowContext)

  return (
    <div className="od-modal-window-container-header" ref={ ref }>
      <div className="od-modal-window-container-header-title">
        { props.children }
      </div>
      { props.showClose !== false && (
        <div className="od-modal-window-container-header-close"
             onClick={ () => context.modalKey && controller.closeModal(context.modalKey) }>
          <CloseIcon />
        </div>
      ) }
    </div>
  )
})

export default ModalWindowHeader
