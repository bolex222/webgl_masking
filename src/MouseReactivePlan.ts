import {Mesh, PlaneGeometry, RawShaderMaterial, TextureLoader, Vector2} from "three";
import {ScreenManager} from "./ScreenManager.ts";
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import {globalValues} from "./ui.ts";


const SEGMENT_AMOUNT = 48;

export class MouseReactivePlan {

  public mesh
  public geometry
  public material
  private mouse: {x: number, y: number} = {x: 0, y: 0}

  constructor() {
    this.geometry = this.createPlan();
    const textureLoader = new TextureLoader();
    const uv_gird = textureLoader.load('/webgl_masking/uv_grid.png')
    const mask = textureLoader.load('/webgl_masking/mask.jpg')
    // uv_gird.colorSpace = SRGBColorSpace;
    this.material = new RawShaderMaterial({
      vertexShader,
      fragmentShader,
      wireframe: true,
      uniforms: {
        fixGridTexture: {value: uv_gird},
        mask: {value: mask},
        fov: {value: 50},
        mouse: {value: new Vector2(0, 0)}
      }
    });
    this.mesh = new Mesh(this.geometry, this.material)

    document.addEventListener('mousemove', this.handleMouseMove)
  }

  createPlan = (): PlaneGeometry => {
    const {width, height} = ScreenManager.instance
    const h = height / width;
    return new PlaneGeometry(1, h, h >= 1 ? SEGMENT_AMOUNT : (SEGMENT_AMOUNT * (1 / h)), h >= 1 ? h * SEGMENT_AMOUNT : SEGMENT_AMOUNT);
  }

  handleMouseMove = (e: MouseEvent) => {
    this.mouse = {
      x: e.clientX,
      y: e.clientY
    }
  }

  tick = () => {
    this.material.uniforms.mouse.value = new Vector2(this.mouse.x / ScreenManager.instance.width, this.mouse.y / ScreenManager.instance.height);
    this.material.wireframe = globalValues.wireframe
  }


  handleResize = () => {
    this.geometry = this.createPlan();
    this.mesh.geometry.dispose();
    this.mesh.geometry = this.geometry;
  }


}
