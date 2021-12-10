(factory => {
  if ('object' === typeof module) {
    module.exports = factory();
  } else if ('object' === typeof window) {
    Object.assign(window, factory());
  } else {
    throw new Error("Neither 'module.exports' nor 'window' exist");
  }
})(() => ({
  plimit(concurrency) {
    const queue = [];
    return {
      push(task) {
        queue.push(task);
        if (queue.length >= concurrency) {
          return queue.shift();
        } else {
          return Promise.resolve();
        }
      },
      async flush() {
        while(queue.length) await queue.shift();
      },
    };
  }
}));
