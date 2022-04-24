import { MoveAction, MovementToggleAction } from './Actions';
import { Graph } from './RootNode';

export function createKeydownEventHandler(graph: Graph) {
  return (event: KeyboardEvent) => {
    const positionContext = graph.select((root) => root.position);
    switch (event.key) {
      case 'ArrowLeft': {
        positionContext.queueDispatch(MoveAction.create(-1));
        break;
      }
      case 'ArrowRight': {
        positionContext.queueDispatch(MoveAction.create(1));
        break;
      }
      case ' ': {
        positionContext.queueDispatch(MovementToggleAction.create());
        break;
      }
    }
  };
}
