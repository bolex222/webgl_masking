precision mediump float;

uniform sampler2D fixGridTexture;
uniform sampler2D mask;
uniform float fov;

varying vec2 vUv;
varying float vPosZ;
varying vec4 vProjectedPosition;

const float Pi = 3.1415926535897932384626433832795;


float degToRad(float deg) {
    float a = (Pi / 180.);
    return a * deg;
}


/*

SOH CAH TOA

T = O/A
A = O/T

*/

void main()
{

    float a = tan(degToRad(fov / 2.)) * (vProjectedPosition.z);
    float scale = a * 3.5;
    float offset = (((1. / scale) * (scale - 1.)) / 2.) * scale;
    vec4 uvTexture = texture2D(fixGridTexture, vec2((vUv + (offset)) / scale));
    vec4 uvMask = texture2D(mask, vUv);
    gl_FragColor = uvTexture * uvMask;
}


