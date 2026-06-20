(() => {
  const block = (name) => () => {
    throw new Error(`${name} is disabled in the AsciiDoc preview.`);
  };
  const setBlockedGlobal = (name) => {
    try {
      Object.defineProperty(globalThis, name, {
        value: block(name),
        configurable: false,
        writable: false,
      });
    } catch {
      globalThis[name] = block(name);
    }
  };

  setBlockedGlobal('fetch');
  setBlockedGlobal('XMLHttpRequest');
  setBlockedGlobal('WebSocket');
  setBlockedGlobal('EventSource');

  if (navigator && typeof navigator === 'object') {
    try {
      Object.defineProperty(navigator, 'sendBeacon', {
        value: block('sendBeacon'),
        configurable: false,
        writable: false,
      });
    } catch {
      navigator.sendBeacon = block('sendBeacon');
    }
  }
})();
