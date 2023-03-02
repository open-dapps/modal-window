/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps/modal-window
 *
 */

import React, { forwardRef } from "react"

interface IProps {
  children: any
}

const ModalWindowBody = forwardRef<HTMLDivElement, IProps>((
  props,
  ref
) => {
  return (
    <div className="od-modal-window-container-body" ref={ref}>
      { props.children }
    </div>
  )
})

export default ModalWindowBody
