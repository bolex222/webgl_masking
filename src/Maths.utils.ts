export const calculateHorizontalFov = (verticalFov: number, screenRatio: number) => 2 * Math.atan(Math.tan(verticalFov * Math.PI / 180 / 2) * screenRatio) * 180 / Math.PI;

export const degToRad = (deg: number) => (Math.PI / 180) * deg;

export const calculateAdjacent = (angle: number, opposite: number) => {
  return opposite / Math.tan(angle);
}

export const calculateOpposite = (angle: number, adjacent: number) => {
  return adjacent * Math.tan(angle);
}

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
}
