export const vertexShaderSource = `#version 300 es
precision highp float;

in vec3 position;
uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

void main() {
  vec3 p = position;
  gl_Position = projection * view * model * vec4(p, 1.0);
}
`;