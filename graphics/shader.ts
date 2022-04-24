export function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('Unable to create shader');
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error('An error occurred compiling the shader: ' + gl.getShaderInfoLog(shader));
  }

  return shader;
}

export function createVertexShader(
  gl: WebGL2RenderingContext,
  source: string,
): WebGLShader {
  return createShader(gl, gl.VERTEX_SHADER, source);
}

export function createFragmentShader(
  gl: WebGL2RenderingContext,
  source: string,
): WebGLShader {
  return createShader(gl, gl.FRAGMENT_SHADER, source);
}

export function createProgram(
  gl: WebGL2RenderingContext,
  vs: WebGLShader,
  fs: WebGLShader,
): WebGLProgram {
  const program = gl.createProgram();
  if (!program) {
    throw new Error('Unable to create WebGL program');
  }
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.validateProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var info = gl.getProgramInfoLog(program);
    throw new Error('Could not compile WebGL program. \n\n' + info);
  }

  return program;
}
