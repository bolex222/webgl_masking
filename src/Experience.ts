import {Camera} from "./Camera.ts";
import {Scene} from "./Scene.ts";
import {ScreenManager} from "./ScreenManager.ts";
// import {AxesHelper} from "three";
import {Ticker} from "./Ticker.ts";
import {MouseReactivePlan} from "./MouseReactivePlan.ts";
import {globalValues, setUpUi} from "./ui.ts";

export class Experience {

  private scene: Scene;

  constructor(canvas: HTMLCanvasElement) {

    canvas.height = ScreenManager.instance.height
    canvas.width = ScreenManager.instance.width

    this.scene = new Scene(canvas)
    const camera = new Camera()

    camera.position.z = 1
    camera.lookAt(0, 0, 0)

    const Plan = new MouseReactivePlan()

    // const helper = new AxesHelper(1)

    this.scene.add(Plan.mesh)
    // this.scene.add(helper)

    setUpUi()


    const tick = () => {
      camera.position.z = globalValues.fullScreen
        ? camera.getDistanceFromCameraForFullScreen(Plan.geometry.parameters.height)
        : globalValues.cameraZ
      Plan.material.uniforms.fov.value = camera.verticalFov;
      this.scene.render(camera)
    }

    Ticker.instance.subscribe(tick)
    Ticker.instance.subscribe(Plan.tick)

    ScreenManager.instance.subscribe(this.scene.handleScreenResize)
    ScreenManager.instance.subscribe(camera.handleScreenResize)
    ScreenManager.instance.subscribe(Plan.handleResize)
  }



}
