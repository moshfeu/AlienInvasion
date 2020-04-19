const socket = io();
socket.on('event', ({type, key, keyCode}) => {
  const evt = new KeyboardEvent(type, {
    key,
    keyCode
  });
  window.dispatchEvent(evt);
});