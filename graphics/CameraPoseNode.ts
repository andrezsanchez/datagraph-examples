import { Vector3 } from './Vector3';
import { Matrix4 } from './Matrix4';
import { IVector3 } from './IVector3';
import { createFunctionalNode } from '@datagraph/dgf';

export type CameraParams = {
  ground: IVector3;
  distance: number;
  xRotationRadians: number;
  zRotationRadians: number;
};

export type CameraPose = {
  pose: Matrix4;
  poseInverse: Matrix4;
}

function poseFromParams(params: CameraParams) {
  const pose = new Matrix4();
  pose.setIdentity();

  const xRotation = new Matrix4();
  const zRotation = new Matrix4();

  xRotation.setRotateX(params.xRotationRadians);
  zRotation.setRotateZ(params.zRotationRadians);

  // pose = z * x * translateZ(-dist)
  pose.setPosition(params.ground);
  Matrix4.multiply(pose, pose, zRotation);
  Matrix4.multiply(pose, pose, xRotation);

  const translation = new Matrix4();
  translation.setIdentity();
  translation.setV(14, params.distance);

  Matrix4.multiply(pose, pose, translation);

  const poseInverse = new Matrix4();
  Matrix4.invertPose(poseInverse, pose);

  return {
    pose,
    poseInverse,
  };
}

export const CameraPoseNode = createFunctionalNode<CameraPose, {}>(
  () => {
    return poseFromParams({
      ground: new Vector3(0, 0, 0),
      distance: 10,
      xRotationRadians: 0,
      zRotationRadians: 0,
    });
  },
);
