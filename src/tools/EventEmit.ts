class EventEmit {
  private readonly events: DynamicObjectKey<Array<Function>>;

  private maxWatchers: number;

  constructor() {
    this.events = {};
    this.maxWatchers = 10;
  }

  on(event: string, handler: Function) {
    if (this.events[event]) {
      if (this.events[event].length >= this.maxWatchers) {
        console.error(`${event} watchers out of maxHandlers`);
      }
      this.events[event].push(handler);
    } else this.events[event] = [handler];
  }

  addEventListener(event: string, handler: Function) {
    this.on(event, handler);
  }

  once(event: string, handler: Function) {
    const wrapper = (...rest: Array<any>) => {
      handler.apply(this, rest);
      this.removeHandler(event, wrapper);
    };
    this.on(event, wrapper);
  }

  removeHandler(event: string, handler: Function) {
    const events = this.events[event];
    if (!events) return;
    this.events[event] = events.filter((item) => item !== handler);
  }

  removeAllHandlers(event: string) {
    this.events[event] = [];
  }

  setMaxWatchers(maxWatchers: number) {
    this.maxWatchers = maxWatchers;
  }

  emit(event: string, ...rest: Array<any>) {
    const events = this.events[event];
    if (!events) return;
    events.forEach((item) => item.apply(this, rest));
  }

  static getInstance() {
    let instance: EventEmit | null = null;
    return () => {
      if (instance === null) instance = new EventEmit();
      return instance;
    };
  }
}

export default EventEmit.getInstance()();
