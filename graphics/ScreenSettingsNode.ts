import { createStateMachineNode } from '@datagraph/dgf';
import { UpdateScreenSettingsAction } from './Actions';

export type ScreenSettings = {
  sizeCssPixels: [number, number];
  devicePixelRatio: number;
}

type Actions = UpdateScreenSettingsAction.KeyValue;

export const ScreenSettingsNode = createStateMachineNode<ScreenSettings, Actions>({
  getInitialValue: () => ({
    sizeCssPixels: [1222, 888],
    devicePixelRatio: window.devicePixelRatio,
  }),

  actionHandlers: {
    ...UpdateScreenSettingsAction.handler((_, action) => {
      return action.payload;
    }),
  },
});
