uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 mouse;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying float vPosZ;
varying vec4 vProjectedPosition;


void main()
{

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // code here
    float mouse = distance(vec2(modelPosition.x, modelPosition.y), vec2(mouse.x, 1. - mouse.y) - 0.5);
    modelPosition.z = mouse * -0.7;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;
    vPosZ = modelPosition.z;
    vProjectedPosition = projectedPosition;
}
