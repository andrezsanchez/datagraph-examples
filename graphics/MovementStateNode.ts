import { createStateMachineNode } from '@datagraph/dgf';
import { MovementToggleAction } from './Actions';

export const MovementStateNode = createStateMachineNode<boolean, MovementToggleAction.KeyValue>({
  getInitialValue: () => true,
  actionHandlers: {
    ...MovementToggleAction.handler((state) => {
      return !state;
    }),
  },
});
