import {gsap} from 'gsap'
import Stats from 'stats.js'

type ITickerCallback = (time: number, deltaTime: number, frame: number) => void

export class Ticker {

  private static _instance: Ticker;

  public static get instance() {
    if (!Ticker._instance) {
      Ticker._instance = new Ticker()
    }
    return Ticker._instance;
  }

  private subscribers: Array<ITickerCallback> = [];
  private stats: Stats

  private constructor() {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom as HTMLElement)
    gsap.ticker.add(this.tick)
  }

  public subscribe = (callback: ITickerCallback) => {
    this.subscribers.push(callback)
  }

  public unsubscribe = (callback: ITickerCallback) => {
    this.subscribers = this.subscribers.filter(c => c !== callback)
  }

  private tick = (time: number, deltaTime: number, frame: number) => {
    this.stats.begin();
    for (const s of this.subscribers) {
      s(time, deltaTime, frame);
    }
    this.stats.end()
  }

  kill = () => {
    gsap.ticker.remove(this.tick)
    this.subscribers = [];
  }

}
