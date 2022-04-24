import invariant from 'invariant';
import { Matrix4 } from './Matrix4';
import { Mat4Uniform } from './Mat4Uniform';

export class Object3D {
  public readonly model: Matrix4 = new Matrix4();
  public modelUniform: Mat4Uniform;
  public shaderProgam: WebGLProgram | null;
  public arrayType: GLenum | null;
  public buffer: WebGLBuffer | null;
  public data: Float32Array | null;
  public vao: WebGLVertexArrayObject;
  public positionAttribute?: number;
  constructor(
    private gl: WebGL2RenderingContext,
  ) {
    this.model.setIdentity();
    this.modelUniform = { name: 'model', data: this.model };
    this.shaderProgam = null;
    this.arrayType = null;
    this.buffer = null
    this.data = null;

    const vao = this.gl.createVertexArray();
    if (!vao) {
      throw new Error('Unable to create VAO');
    }
    this.vao = vao;
  }
  setup() {
    invariant(this.shaderProgam, 'Object must have shader defined');

    this.gl.bindVertexArray(this.vao);

    {
      this.positionAttribute = this.gl.getAttribLocation(this.shaderProgam, 'position');
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);

      this.gl.enableVertexAttribArray(this.positionAttribute);
      this.gl.vertexAttribPointer(this.positionAttribute, 3, this.gl.FLOAT, false, 0, 0);
    }

    this.gl.bindVertexArray(null);
  }

  render() {
    invariant(this.shaderProgam, 'Object must have shader defined');
    this.gl.useProgram(this.shaderProgam);
    // No need to bind the buffer, because it is already associated with the VAO.
    //this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bindVertexArray(this.vao);

    invariant(this.arrayType !== null, 'Object must have arrayType defined');
    invariant(this.data, 'Object must have data defined');
    this.gl.drawArrays(this.arrayType, 0, this.data.length / 3);

    this.gl.bindVertexArray(null);
  }
}

interface VertexArrayObject {
  vao: WebGLVertexArrayObject;
  arrayBuffer: WebGLBuffer;
  shaderProgram: WebGLProgram;
  attributeName: string;
  size: number;
  type: typeof WebGL2RenderingContext.FLOAT;
}

function createVertexArray(
  gl: WebGL2RenderingContext,
  arrayBuffer: WebGLBuffer,
  shaderProgram: WebGLProgram,
  attributeName: string,
  size: number,
): VertexArrayObject {
  const vao = gl.createVertexArray();

  if (!vao) {
    throw new Error('Unable to create VAO');
  }

  gl.bindVertexArray(vao);

  {
    const attributeLocation = gl.getAttribLocation(shaderProgram, attributeName);
    gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);

    // gl.enableVertexAttribArray(attributeLocation);
    gl.disableVertexAttribArray(attributeLocation);
    gl.vertexAttribPointer(attributeLocation, size, gl.FLOAT, false, 0, 0);
  }

  gl.bindVertexArray(null);

  return {
    vao,
    arrayBuffer,
    shaderProgram,
    attributeName,
    size,
    type: gl.FLOAT,
  }
}

export function render(
  gl: WebGL2RenderingContext,
  shaderProgam: WebGLProgram,
  vao: WebGLVertexArrayObject,
  arrayType: GLenum,
  data: Float32Array,
) {
  gl.useProgram(shaderProgam);
  // No need to bind the buffer, because it is already associated with the VAO.
  //gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bindVertexArray(vao);

  invariant(arrayType !== null, 'Object must have arrayType defined');
  invariant(data, 'Object must have data defined');
  gl.drawArrays(arrayType, 0, data.length / 3);

  gl.bindVertexArray(null);
}
