import { IVector3 } from './IVector3';

export class Vector3 implements IVector3 {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0,
  ) {}

  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  copy(vec: Vector3) {
    this.x = vec.x;
    this.y = vec.y;
    this.z = vec.z;
  }

  clone(): Vector3 {
    return new Vector3(
      this.x,
      this.y,
      this.z,
    );
  }

  equals(
    other: Vector3,
  ): boolean {
    return (
      this.x === other.x &&
      this.y === other.y &&
      this.z === other.z
    );
  }

  magnitude2(): number {
    return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
  }

  magnitude(): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
  }

  normalize() {
    const magnitude = this.magnitude();
    this.divideScalar(magnitude);
  }

  dot(vec: Vector3): number {
    return (this.x * vec.x) + (this.y * vec.y) + (this.z * vec.z);
  }

  multiplyScalar(value: number) {
    this.x *= value;
    this.y *= value;
    this.z *= value;
  }

  divideScalar(value: number) {
    this.x /= value;
    this.y /= value;
    this.z /= value;
  }

  add(vec: Vector3) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
  }

  subtract(vec: Vector3) {
    this.x -= vec.x;
    this.y -= vec.y;
    this.z -= vec.z;
  }

  cross(vec: Vector3) {
    const x = (this.y * vec.z) - (this.z * vec.y);
    const y = (this.z * vec.x) - (this.x * vec.z);
    const z = (this.x * vec.y) - (this.y * vec.x);
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
