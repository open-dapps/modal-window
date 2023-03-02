/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps/modal-window
 *
 */

import { action, makeObservable, observable } from "mobx"
import ModalWindowKey from "./modal-window-key"

export enum ModalWindowState {
  NOT_CONNECTED = "not_connected",
  PREPARE = "prepare",
  OPEN = "open",
  OPENING = "opening",
  CLOSE = "close",
  CLOSING = "closing"
}

export interface IModalWindowControllerConfig {
  animationDuration?: number
  outerClickClose?: boolean
  prepareDuration?: number
}

export class ModalWindowController {
  /** Объект, содержащий данные о подключенных модальных окнах */
  @observable private connectedModals: Map<string, ModalWindowState> = new Map()

  /**
   * Конфигурация контроллера
   */
  @observable private controllerConfig: Required<IModalWindowControllerConfig> = {
    animationDuration: 200,
    outerClickClose: true,
    prepareDuration: 30,
  }

  /**
   * Контроллер, управляющий всеми модальными окнами приложения, за исключением
   * тех, которые были добавлены сторонними пакетами.
   */
  constructor () {
    makeObservable(this)
  }

  /**
   * Метод для подключения модального окна к контроллеру.
   *
   * Уникальный ключ модального окна должен быть задан в файле ".modal.keys.ts".
   *
   * @param {ModalWindowKey} key уникальный ключ модального окна.
   */
  @action
  public connectModalWindow (key: ModalWindowKey): void {
    this.connectedModals.set(key.toString(), ModalWindowState.CLOSE)
  }

  /**
   * Метод для отключения модального окна от контроллера.
   * @param {ModalWindowKey} key уникальный ключ модального окна.
   */
  @action
  public disconnectModalWindow (key: ModalWindowKey): void {
    this.connectedModals.delete(key.toString())
  }

  /**
   * Метод для получения текущего состояния модального окна.
   * @param {ModalWindowKey} key уникальный ключ модального окна.
   * @return {ModalWindowState} текущее состояние модального окна.
   */
  @observable
  public getModalState (key: ModalWindowKey): ModalWindowState {
    if (!this.connectedModals.has(key.toString())) return ModalWindowState.NOT_CONNECTED

    return this.connectedModals.get(key.toString()) as ModalWindowState
  }

  /**
   * Метод для открытия модального окна.
   *
   * Если модальное окно уже открыто или не подключено, метод ничего не сделает.
   *
   * @param {ModalWindowKey} key уникальный ключ модального окна.
   */
  @action
  public openModal (key: ModalWindowKey): void {
    if (!this.connectedModals.get(key.toString())) return
    if (!this.modalAvailable(key) || this.connectedModals.get(key.toString()) === ModalWindowState.OPEN) return

    this.changeModalState(key, ModalWindowState.PREPARE)

    setTimeout(() => {
      this.changeModalState(key, ModalWindowState.OPENING)

      setTimeout(() => {
        this.changeModalState(key, ModalWindowState.OPEN)
      },this.controllerConfig.animationDuration)
    }, this.controllerConfig.prepareDuration)
  }

  /**
   * Метод для переключения состояния модального окна.
   *
   * Если модальное окно находится в промежуточном состоянии или не подключено, метод ничего не сделает.
   *
   * @param {ModalWindowKey} key уникальный ключ модального окна.
   */
  @action
  public closeModal (key: ModalWindowKey): void {
    if (!this.connectedModals.get(key.toString())) return
    if (!this.modalAvailable(key) || this.connectedModals.get(key.toString()) === ModalWindowState.CLOSE) return

    this.changeModalState(key, ModalWindowState.CLOSING)

    setTimeout(() => {
      this.changeModalState(key, ModalWindowState.CLOSE)
    }, this.controllerConfig.animationDuration)
  }

  /**
   * Метод для закрытия открытого модального окна.
   *
   * Если модальное окно закрыто или не подключено, метод ничего не сделает.
   *
   * @param {string} key уникальный ключ модального окна.
   */
  @action
  public switchModal (key: ModalWindowKey): void {
    if (!this.modalAvailable(key)) return

    if (this.getModalState(key) === ModalWindowState.OPEN) this.closeModal(key)
    else this.openModal(key)
  }

  /**
   * Метод изменения скорости обновления состояний модальных окон.
   *
   * @param {IModalWindowControllerConfig} config
   */
  @action
  public updateConfig(config: IModalWindowControllerConfig) {
    this.controllerConfig = { ...this.controllerConfig, ...config }
  }

  /**
   * Метод для проверки, не находится ли определенное модальное окно в переходном состоянии.
   * @param {ModalWindowKey} key уникальный ключ модального окна.
   * @return {boolean} True если окно находится в статичном состоянии.
   * @private
   */
  @observable
  private modalAvailable (key: ModalWindowKey): boolean {
    const notAvailableStates: ModalWindowState[] = [
      ModalWindowState.OPENING,
      ModalWindowState.NOT_CONNECTED,
      ModalWindowState.CLOSING,
      ModalWindowState.PREPARE,
    ]

    return !notAvailableStates.includes(this.connectedModals.get(key.toString()) as ModalWindowState)
  }

  /**
   * Метод для изменения состояния модального окна.
   * @param {ModalWindowKey} key уникальный ключ модального окна.
   * @param {ModalWindowState} state новое состояние модального окна.
   * @private
   */
  @action
  private changeModalState (key: ModalWindowKey, state: ModalWindowState): void {
    this.connectedModals.set(key.toString(), state)
  }
}

const modalWindowController = new ModalWindowController()

export default function useModalWindowController(config?: IModalWindowControllerConfig) {
  if (config) modalWindowController.updateConfig(config)

  return modalWindowController
}
