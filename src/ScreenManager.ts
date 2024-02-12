export class ScreenManager {

  private static _instance: ScreenManager;

  public static get instance () {
    if (!ScreenManager._instance) {
      ScreenManager._instance = new ScreenManager()
    }
    return ScreenManager._instance;
  }

  public dpr: number = 0
  public width: number = 0
  public height: number = 0

  private subscribers: Array<() => void> = [];
  private resizeObserver: ResizeObserver;

  private constructor() {
    window.addEventListener('resize', this.handleResize)
    this.resizeObserver = new ResizeObserver(this.handleResize)
    this.resizeObserver.observe(document.body)
    this.handleResize();
  }

  public subscribe = (callback: () => void) => {
    this.subscribers.push(callback)
  }

  public unsubscribe = (callback: () => void) => {
    this.subscribers = this.subscribers.filter(cb => cb !== callback)
  }

  handleResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = window.devicePixelRatio;
    for (const subscriber of this.subscribers) {
      subscriber();
    }
  }

  kill = () => {
    this.subscribers = [];
    this.resizeObserver.disconnect()
    window.removeEventListener('resize', this.handleResize)
  }

}
