import {
  createND,
  GND,
  ND,
  createContainerNode,
  NodeClass,
  DescriptorProps,
  WUnknown,
  NDFC,
  NodeSelection,
} from '@datagraph/dgf';
import { ScreenSettingsNode } from './ScreenSettingsNode';
import { ProjectionMatrixNode } from './ProjectionMatrixNode';
import { CameraPoseNode } from './CameraPoseNode';
import { PositionControllerNode } from './PositionControllerNode';

export const RootNode = createContainerNode(() => {
  const nodeSet = new Set<GND>();

  function node<N extends WUnknown>(
    Node: NodeClass<N>,
    props: DescriptorProps<N["props"]>,
  ): ND<N> {
    const nd = createND(Node, props);
    nodeSet.add(nd as unknown as GND);

    return nd;
  }

  const position = node(PositionControllerNode, {});
  const cameraPose = node(CameraPoseNode, {});
  const screenSettings = node(ScreenSettingsNode, {});
  const projectionMatrix = node(ProjectionMatrixNode, { cameraPose, screenSettings });

  return {
    nodeSet,
    outputNode: null,
    refs: {
      position,
      cameraPose,
      projectionMatrix,
      screenSettings,
    },
  };
});

export type Graph = NodeSelection<NDFC<typeof RootNode>>;
