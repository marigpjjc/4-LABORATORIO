type Action = { type: string; payload?: any };

type Callback = (action: Action) => void;

class AppDispatcher {
  private callbacks: Callback[] = [];

  register(callback: Callback) {
    this.callbacks.push(callback);
  }

  dispatch(action: Action) {
    this.callbacks.forEach(cb => cb(action));
  }
}

export default new AppDispatcher();
