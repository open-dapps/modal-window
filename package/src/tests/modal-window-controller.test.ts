/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps/modal-window
 *
 */

import { ModalWindowController, ModalWindowState } from "../modal-window-controller"
import ModalWindowKey from "../modal-window-key"

describe("ModalWindowController", () => {
  let controller: ModalWindowController
  const modalKey1 = new ModalWindowKey()

  beforeEach(() => {
    controller = new ModalWindowController()
  })

  it("should connect modal window", () => {
    controller.connectModalWindow(modalKey1)

    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.CLOSE)
  })

  it("should disconnect modal window", () => {
    controller.connectModalWindow(modalKey1)
    controller.disconnectModalWindow(modalKey1)

    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.NOT_CONNECTED)
  })

  it("should not allow to open an unavailable modal window", () => {
    controller.openModal(modalKey1)

    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.NOT_CONNECTED)
  })

  it("should not allow to open an already open modal window", async () => {
    controller.connectModalWindow(modalKey1)
    controller.openModal(modalKey1)

    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.PREPARE)

    await new Promise<void>(r => setTimeout(r, 300))

    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.OPEN)
  })

  it("should open a closed modal window", async () => {
    controller.connectModalWindow(modalKey1)
    controller.openModal(modalKey1)

    await new Promise<void>(r => setTimeout(r, 50))
    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.OPENING)

    await new Promise<void>(r => setTimeout(r, 300))

    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.OPEN)
  })

  it("should not allow to close an unavailable modal window", () => {
    controller.closeModal(modalKey1)

    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.NOT_CONNECTED)
  })

  it("should not allow to close a closed modal window", () => {
    controller.connectModalWindow(modalKey1)
    controller.closeModal(modalKey1)

    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.CLOSE)
  })

  it("should close an open modal window", async () => {
    controller.connectModalWindow(modalKey1)
    controller.openModal(modalKey1)

    await new Promise<void>(r => setTimeout(r, 300))
    controller.closeModal(modalKey1)

    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.CLOSING)
  })

  it("should switch a closed modal window to open state", async () => {
    controller.connectModalWindow(modalKey1)
    controller.switchModal(modalKey1)
    await new Promise<void>(r => setTimeout(r, 40))
    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.OPENING)
  })

  it("should switch an open modal window to closed state", async () => {
    controller.connectModalWindow(modalKey1)
    controller.openModal(modalKey1)

    await new Promise<void>(r => setTimeout(r, 300))
    controller.switchModal(modalKey1)

    expect(controller.getModalState(modalKey1)).toEqual(ModalWindowState.CLOSING)
  })

  test("should switch modal window", async () => {
    const key = new ModalWindowKey("test")
    controller.connectModalWindow(key)
    controller.switchModal(key)

    await new Promise<void>(r => setTimeout(r, 300))
    expect(controller.getModalState(key)).toEqual(ModalWindowState.OPEN)

    controller.switchModal(key)
    await new Promise<void>(r => setTimeout(r, 300))

    expect(controller.getModalState(key)).toEqual(ModalWindowState.CLOSE)
  })

  test("should update controller config", () => {
    controller.updateConfig({ animationDuration: 100 })
    expect(controller["controllerConfig"].animationDuration).toEqual(100)
  })
})
