# 🧊 Modal window

This package is designed to simplify the process of adding modal windows to your web applications by providing
both a modal window controller and the modal window component itself.

## Installation and controller usage

Package installation is done in the standard way:
```shell
yarn[npm, pnpm] add -D @opendapps/modal-window@latest
```

<br />
For any actions with modal windows, you will need a modal window key, which can be created in two ways:

```ts
const controller = useModalWindowController()

const mykey = controller.getModalKey() // Generates random modal key

// Or create modal key from specified string

const myCustomkey = controller.getModalKey("Any string")
```
This function call will return an instance of the `ModalWindowKey` class, which can be used as a modal
window key or transformed into a string by calling the `toString` method.

<br />
If there is no need for a React component, you can use only the controller:

```ts
const controller = useModalWindowController()
        
// Add modal window key to modals map
controller.connectModalWindow("Modal window key")

// Open modal window if not opened
controller.openModal("Modal window key")

// Close modal window if not closed
controller.closeModal("Modal window key")

// Switch modal window open/close states
controller.switchModal("Modal window key") // => boolean

// Get current modal window state
controller.getModalState("Modal window key") // => ModalWindowState

// Remove modal window from modals map
controller.disconnectModal("Modal window key")

// Returns all connected modal keys
controller.connectedModalKey
```
<br />
If you need to change the basic controller parameters, you can do so like this:

```ts
const controller = useModalWindowController({
  animationDuration: 300, // time in ms, default is 300
  outerClickClose: true // close modal if clicked outside of box
})
```

<br />
However, such a call will overwrite the global controller settings and change the behavior of all modal windows. 
To avoid such behavior, you can configure the configuration for specific keys:

```ts
const controller = useModalWindowController({
  animationDuration: 300, // time in ms, default is 300
  outerClickClose: true // close modal if clicked outside of box
}, ["Modal window key 1", "Modal window key 2", /* ... */])

// Or

controller.updateConfig({
    /* new configuration */ 
}, ["Modal window keys..."])
```

## Modal window states

Each modal window can be in several specific states, which are defined by the `enum ModalWindowState` object:

| State         | Description                                  |
|---------------|----------------------------------------------|
| PREPARE       | Modal window preparing to be opened          |
| OPENING       | Playing modal window open animation          |
| OPEN          | Modal window opened                          |
| CLOSING       | Playing modal window close animation         |
| CLOSE         | Modal window closed                          |
| NOT_CONNECTED | Modal window not connected to the controller |

The `PREPARE` state is set for the component before it is opened, allowing you to start the animation.
After 10ms, the `PREPARE` state is changed to `OPENING`.

## Modal window component usage

The modal window component provides the foundation for building modal windows: a background layer, a centered block with
the ability to change the header, and a close button for the modal window.

```tsx
function MyModalWindow () {
  return (
    <ModalWindow modalKey={MyModalKey}>
      <ModalWindowHeader showClose={false}>
        My cool modal window
      </ModalWindowHeader>
      <ModalWindowBody>
        Hello world!
      </ModalWindowBody>
    </ModalWindow>
  )
}
```

Modal window component accepts following props:

| Prop               | Type           | Description                                                               |
|--------------------|----------------|---------------------------------------------------------------------------|
| modalKey           | ModalWindowKey | Key of the modal window                                                   |
| onClose            | Function       | Fires when modal window state changes to `CLOSED`                         |
| onOpen             | Function       | Fires when modal window state changes to `OPEN`                           |
| overrideCloseEvent | Function       | Overrides close event, fires when modal window state changes to `CLOSING` |
