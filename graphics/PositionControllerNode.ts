import { createStateMachineNode } from '@datagraph/dgf';
import { MoveAction, MovementToggleAction } from './Actions';

export type PositionState = [number, number, number];

function positionStateEquals(a: PositionState, b: PositionState): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

export type PositionControllerState = {
  position: PositionState;
  movementEnabled: boolean;
}

function positionControllerStateEquals(a: PositionControllerState, b: PositionControllerState): boolean {
  return (
    a.movementEnabled === b.movementEnabled &&
    positionStateEquals(a.position, b.position)
  );
}

export const PositionControllerNode = createStateMachineNode<PositionControllerState, MoveAction.KeyValue>({
  getInitialValue: () => ({
    position: [0, 0, 0],
    movementEnabled: true,
  }),
  actionHandlers: {
    ...MoveAction.handler((state, action) => {
      if (state.movementEnabled) {
        state.position[0] += action.payload;
      }
      return state;
    }),
    ...MovementToggleAction.handler((state) => {
      state.movementEnabled = !state.movementEnabled;
      return state;
    }),
  },
  equals: positionControllerStateEquals,
});
