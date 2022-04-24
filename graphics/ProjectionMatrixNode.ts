import { ScreenSettings } from './ScreenSettingsNode';
import { CameraPose } from './CameraPoseNode';
import { Matrix4 } from './Matrix4';
import { createFunctionalNode } from '@datagraph/dgf';

function updateProjectionMatrix(
  mat4: Matrix4,
  tanRatio: number,
  pixelRatio: number,
  screenWidth: number,
  screenHeight: number,
) {
  const halfWidth = tanRatio * screenWidth / (2 * pixelRatio);
  const halfHeight = tanRatio * screenHeight / (2 * pixelRatio);

  mat4.setPerspective(-halfWidth, halfWidth, halfHeight, -halfHeight, 0.5, 10000);
}

type Props = {
  cameraPose: CameraPose;
  screenSettings: ScreenSettings;
};

export const ProjectionMatrixNode = createFunctionalNode<Matrix4, Props>(
  (props: Props) => {
    const projectionMatrix = new Matrix4();

    updateProjectionMatrix(
      projectionMatrix,
      Math.PI / (2 * 1440),
      props.screenSettings.devicePixelRatio,
      props.screenSettings.sizeCssPixels[0],
      props.screenSettings.sizeCssPixels[1],
    );

    return projectionMatrix;
  },
);
