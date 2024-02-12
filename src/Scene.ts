import {Camera, Object3D, Scene as ThreeScene, WebGLRenderer} from 'three'
import {ScreenManager} from "./ScreenManager.ts";

export class Scene {

  private readonly scene: ThreeScene
  private renderer: WebGLRenderer

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new ThreeScene();
    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
    });
  }

  handleScreenResize = () => {
    const {width, height, dpr} = ScreenManager.instance
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(dpr)
  }

  render = (camera: Camera) => {
    this.renderer.render(this.scene, camera)
  }

  add = (object: Object3D) => {
    this.scene.add(object)
  }
}
