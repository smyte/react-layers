import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();
const eventsBeingListenedTo = {};

function emitDomEvent(event) {
  eventEmitter.emit(event.type, event);
}

// Since DOM event handlers are expensive, we use event delegation.
const DocumentEventListener = {
  addEventListener(eventName, listener) {
    if (!eventsBeingListenedTo[eventName]) {
      document.addEventListener(eventName, emitDomEvent, true);
    }

    eventEmitter.addListener(eventName, listener);
  },

  removeEventListener(eventName, listener) {
    eventEmitter.removeListener(eventName, listener);
  },
};

export default DocumentEventListener;
