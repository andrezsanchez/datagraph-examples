export const fragmentShaderSource = `#version 300 es
precision highp float;

out vec4 color;

void main() {
  // vec2 position = gl_PointCoord - vec2(0.5, 0.5);

  color = vec4(0.0, 0.0, 0.0, 1.0);
}
`;