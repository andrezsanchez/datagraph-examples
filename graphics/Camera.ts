import { Vector3 } from './Vector3';
import { Matrix4 } from './Matrix4';

export class Camera {
  private pose: Matrix4;
  public readonly poseInverse: Matrix4;
  public readonly groundPosition: Vector3;
  public distance: number;
  public xRotationAngle: number;
  public zRotationAngle: number;
  public readonly xRotation: Matrix4;
  public readonly zRotation: Matrix4;

  constructor() {
    // The final resulting pose of the camera
    this.pose = new Matrix4();
    this.pose.setIdentity();

    // The inverse of the final pose
    this.poseInverse = new Matrix4();
    this.poseInverse.setIdentity();

    this.groundPosition = new Vector3(0, 0, 0);
    this.distance = 60;
    this.xRotationAngle = 0;
    this.zRotationAngle = Math.PI;
    this.xRotation = new Matrix4();
    this.zRotation = new Matrix4();
  }

  updatePose() {
    const position = this.pose.getPosition();
    this.pose.setIdentity();

    this.xRotation.setRotateX(this.xRotationAngle);
    this.zRotation.setRotateZ(this.zRotationAngle);

    // pose = z * x * translateZ(-dist)
    position.copy(this.groundPosition);
    this.pose.setPosition(position);
    Matrix4.multiply(this.pose, this.pose, this.zRotation);
    Matrix4.multiply(this.pose, this.pose, this.xRotation);

    const translation = new Matrix4();
    translation.setIdentity();
    translation.setV(14, this.distance);

    Matrix4.multiply(this.pose, this.pose, translation);

    Matrix4.invertPose(this.poseInverse, this.pose);
  }
}
