import { IVector3 } from './IVector3';
import { Vector3 } from './Vector3';

export class Matrix4 {
  constructor(
    public buffer: Float64Array = new Float64Array(16)
  ) {}

  get(i: number): number {
    return this.buffer[i];
  }

  setV(i: number, value: number) {
    this.buffer[i] = value;
  }

  copy(from: Matrix4) {
    let i;
    for (i = 0; i < 16; i++) {
      this.buffer[i] = from.buffer[i];
    }
  }

  copyRotation(from: Matrix4) {
    this.setV(0, from.get(0));
    this.setV(1, from.get(1));
    this.setV(2, from.get(2));
    this.setV(4, from.get(4));
    this.setV(5, from.get(5));
    this.setV(6, from.get(6));
    this.setV(8, from.get(8));
    this.setV(9, from.get(9));
    this.setV(10, from.get(10));
  }

  setZero() {
    this.buffer.fill(0, 0, 16);
  }

  setIdentity() {
    this.setV(0, 1);
    this.setV(1, 0);
    this.setV(2, 0);
    this.setV(3, 0);
    this.setV(4, 0);
    this.setV(5, 1);
    this.setV(6, 0);
    this.setV(7, 0);
    this.setV(8, 0);
    this.setV(9, 0);
    this.setV(10, 1);
    this.setV(11, 0);
    this.setV(12, 0);
    this.setV(13, 0);
    this.setV(14, 0);
    this.setV(15, 1);
  }

  /**
   * This assumes the matrices are column-major.
   */
  static multiply(dest: Matrix4, a: Matrix4, b: Matrix4) {
    const dest0  = (a.get(0) * b.get(0))  + (a.get(4) * b.get(1))  +  (a.get(8) * b.get(2))  + (a.get(12) * b.get(3));
    const dest1  = (a.get(1) * b.get(0))  + (a.get(5) * b.get(1))  +  (a.get(9) * b.get(2))  + (a.get(13) * b.get(3));
    const dest2  = (a.get(2) * b.get(0))  + (a.get(6) * b.get(1))  + (a.get(10) * b.get(2))  + (a.get(14) * b.get(3));
    const dest3  = (a.get(3) * b.get(0))  + (a.get(7) * b.get(1))  + (a.get(11) * b.get(2))  + (a.get(15) * b.get(3));
    const dest4  = (a.get(0) * b.get(4))  + (a.get(4) * b.get(5))  +  (a.get(8) * b.get(6))  + (a.get(12) * b.get(7));
    const dest5  = (a.get(1) * b.get(4))  + (a.get(5) * b.get(5))  +  (a.get(9) * b.get(6))  + (a.get(13) * b.get(7));
    const dest6  = (a.get(2) * b.get(4))  + (a.get(6) * b.get(5))  + (a.get(10) * b.get(6))  + (a.get(14) * b.get(7));
    const dest7  = (a.get(3) * b.get(4))  + (a.get(7) * b.get(5))  + (a.get(11) * b.get(6))  + (a.get(15) * b.get(7));
    const dest8  = (a.get(0) * b.get(8))  + (a.get(4) * b.get(9))  +  (a.get(8) * b.get(10)) + (a.get(12) * b.get(11));
    const dest9  = (a.get(1) * b.get(8))  + (a.get(5) * b.get(9))  +  (a.get(9) * b.get(10)) + (a.get(13) * b.get(11));
    const dest10 = (a.get(2) * b.get(8))  + (a.get(6) * b.get(9))  + (a.get(10) * b.get(10)) + (a.get(14) * b.get(11));
    const dest11 = (a.get(3) * b.get(8))  + (a.get(7) * b.get(9))  + (a.get(11) * b.get(10)) + (a.get(15) * b.get(11));
    const dest12 = (a.get(0) * b.get(12)) + (a.get(4) * b.get(13)) +  (a.get(8) * b.get(14)) + (a.get(12) * b.get(15));
    const dest13 = (a.get(1) * b.get(12)) + (a.get(5) * b.get(13)) +  (a.get(9) * b.get(14)) + (a.get(13) * b.get(15));
    const dest14 = (a.get(2) * b.get(12)) + (a.get(6) * b.get(13)) + (a.get(10) * b.get(14)) + (a.get(14) * b.get(15));
    const dest15 = (a.get(3) * b.get(12)) + (a.get(7) * b.get(13)) + (a.get(11) * b.get(14)) + (a.get(15) * b.get(15));
    dest.setV(0, dest0);
    dest.setV(1, dest1);
    dest.setV(2, dest2);
    dest.setV(3, dest3);
    dest.setV(4, dest4);
    dest.setV(5, dest5);
    dest.setV(6, dest6);
    dest.setV(7, dest7);
    dest.setV(8, dest8);
    dest.setV(9, dest9);
    dest.setV(10, dest10);
    dest.setV(11, dest11);
    dest.setV(12, dest12);
    dest.setV(13, dest13);
    dest.setV(14, dest14);
    dest.setV(15, dest15);
  }

  setPerspective(
    left: number,
    right: number,
    top: number,
    bottom: number,
    near: number,
    far: number,
  ) {
    const x = (2 * near) / (right - left);
    const y = (2 * near) / (top - bottom);
    const a = (right + left) / (right - left);
    const b = (top + bottom) / (top - bottom);
    const c = -(far + near) / (far - near);
    const d = -2 * far * near / (far - near);

    this.setV(0, x);
    this.setV(1, 0);
    this.setV(2, 0);
    this.setV(3, 0);

    this.setV(4, 0);
    this.setV(5, y);
    this.setV(6, 0);
    this.setV(7, 0);

    this.setV(8, a);
    this.setV(9, b);
    this.setV(10, c);
    this.setV(11, -1);

    this.setV(12, 0);
    this.setV(13, 0);
    this.setV(14, d);
    this.setV(15, 0);
  }

  setPosition(vec3: IVector3) {
    this.setV(12, vec3.x);
    this.setV(13, vec3.y);
    this.setV(14, vec3.z);
  }

  getPosition(): Vector3 {
    return new Vector3(
      this.buffer[12],
      this.buffer[13],
      this.buffer[14],
    );
  }

  setXAxis(vec3: IVector3) {
    this.setV(0, vec3.x);
    this.setV(1, vec3.y);
    this.setV(2, vec3.z);
  }

  setYAxis(vec3: IVector3) {
    this.setV(4, vec3.x);
    this.setV(5, vec3.y);
    this.setV(6, vec3.z);
  }

  setZAxis(vec3: IVector3) {
    this.setV(8, vec3.x);
    this.setV(9, vec3.y);
    this.setV(10, vec3.z);
  }

  /*
   * Sets the basis of the matrix.
   */
  setBasis(x: IVector3, y: IVector3, z: IVector3) {
    this.setXAxis(x);
    this.setYAxis(y);
    this.setZAxis(z);
  }

  setRotateX(radians: number) {
    const s = Math.sin(radians);
    const c = Math.cos(radians);
    this.setV(0, 1);
    this.setV(1, 0);
    this.setV(2, 0);
    this.setV(3, 0);
    this.setV(4, 0);
    this.setV(5, c);
    this.setV(6, s);
    this.setV(7, 0);
    this.setV(8, 0);
    this.setV(9, -s);
    this.setV(10, c);
    this.setV(11, 0);
    this.setV(12, 0);
    this.setV(13, 0);
    this.setV(14, 0);
    this.setV(15, 1);
  }

  setRotateY(radians:number) {
    const s = Math.sin(radians);
    const c = Math.cos(radians);
    this.setV(0, c);
    this.setV(1, 0);
    this.setV(2, -s);
    this.setV(3, 0);
    this.setV(4, 0);
    this.setV(5, 1);
    this.setV(6, 0);
    this.setV(7, 0);
    this.setV(8, s);
    this.setV(9, 0);
    this.setV(10, c);
    this.setV(11, 0);
    this.setV(12, 0);
    this.setV(13, 0);
    this.setV(14, 0);
    this.setV(15, 1);
  }

  setRotateZ(radians: number) {
    const s = Math.sin(radians);
    const c = Math.cos(radians);
    this.setV(0, c);
    this.setV(1, s);
    this.setV(2, 0);
    this.setV(3, 0);
    this.setV(4, -s);
    this.setV(5, c);
    this.setV(6, 0);
    this.setV(7, 0);
    this.setV(8, 0);
    this.setV(9, 0);
    this.setV(10, 1);
    this.setV(11, 0);
    this.setV(12, 0);
    this.setV(13, 0);
    this.setV(14, 0);
    this.setV(15, 1);
  }

  //static lookAt(dest:Matrix4, start:Vector3, end:Vector3, up:Vector3, forward:Vector3):Vector3| {
    //dest.setPosition(start);

    //const x = dest.getXAxis();
    //const y = dest.getYAxis();
    //const z = dest.getZAxis();
    //Vector3.subtract(z, start, end);

    //if (!Vector3.safeNormalize(z, z)) {
      //return false;
    //}

    //Vector3.cross(x, up, z);
    //if (!Vector3.safeNormalize(x, x)) {
      //Vector3.cross(x, forward, z);
      //// Since we're crossing forward with z, which is collinear with up, this must be a unit
      //// normal, so there is no need to normalize.
    //}

    //Vector3.cross(y, z, x);
  //}

  static invertPose(dest:Matrix4, mat4:Matrix4) {
    // transpose the rotation submatrix
    const buffer1 = mat4.get(1);
    dest.setV(1, mat4.get(4));
    dest.setV(4, buffer1);
    const buffer2 = mat4.get(2);
    dest.setV(2, mat4.get(8));
    dest.setV(8, buffer2);
    const buffer6 = mat4.get(6);
    dest.setV(6, mat4.get(9));
    dest.setV(9, buffer6);

    // Copy the diaganol in case dest !== mat4
    dest.setV(0, mat4.get(0));
    dest.setV(5, mat4.get(5));
    dest.setV(10, mat4.get(10));
    dest.setV(15, 1);

    // zero these just in case
    dest.setV(3, 0);
    dest.setV(7, 0);
    dest.setV(11, 0);

    // find -inv(R)p
    const x = mat4.get(12);
    const y = mat4.get(13);
    const z = mat4.get(14);
    dest.setV(12, -(x * dest.get(0) + y * dest.get(4) + z * dest.get(8)));
    dest.setV(13, -(x * dest.get(1) + y * dest.get(5) + z * dest.get(9)));
    dest.setV(14, -(x * dest.get(2) + y * dest.get(6) + z * dest.get(10)));
  }
}
