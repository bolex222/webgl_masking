import GUI from "lil-gui";


export const globalValues = {
  cameraZ: 1,
  fullScreen: true,
  wireframe: false
}


export const setUpUi = () => {
  const gui = new GUI()
  gui.add(globalValues, 'cameraZ', 0, 5)
  gui.add(globalValues, 'fullScreen')
  gui.add(globalValues, 'wireframe')
}
