import { PerspectiveCamera } from 'three'
import { calculateHorizontalFov} from './Maths.utils.js'
import {ScreenManager} from "./ScreenManager.ts";
import {degToRad} from "./Maths.utils.ts";

export class Camera extends PerspectiveCamera {

  private __verticalFov

  constructor (verticalFov = 50) {
    super(verticalFov, ScreenManager.instance.width / ScreenManager.instance.height, 0.001, 1000);
    this.__verticalFov = verticalFov
  }

  get verticalFov () {
    return this.__verticalFov
  }

  get horizontalFov () {
    return calculateHorizontalFov(this.__verticalFov, ScreenManager.instance.width / ScreenManager.instance.height)
  }

  getDistanceFromCameraForFullScreen = (planHeight: number) => (planHeight / 2) / Math.tan(degToRad(this.__verticalFov / 2))

  handleScreenResize = () => {
    const {width, height} = ScreenManager.instance
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}
