/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps/modal-window
 *
 */

export default class ModalWindowKey {
  private readonly key: string

  constructor (key?: string) {
    if (!key) this.key = String(Date.now()) + String(Math.random()).split('.')[1].slice(0, 6)
    else this.key = key
  }

  public toString(): string {
    return this.key
  }
}
