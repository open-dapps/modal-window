/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps/modal-window
 *
 */

import ModalWindowKey from "../modal-window-key"

describe("ModalWindowKey", () => {
  it("generates a key when no key is provided", () => {
    const modalWindowKey = new ModalWindowKey()
    expect(modalWindowKey.toString()).toMatch(/^\d{13}\d{6}$/)
  })

  it("uses the provided key when one is provided", () => {
    const key = "abcd1234"
    const modalWindowKey = new ModalWindowKey(key)
    expect(modalWindowKey.toString()).toEqual(key)
  })
})
