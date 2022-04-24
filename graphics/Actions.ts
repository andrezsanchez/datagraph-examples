import { Action, makeActionCreator, makeFnActionHandlerCreator } from "@datagraph/dgf";
import { ScreenSettings } from "./ScreenSettingsNode";

export namespace MoveAction {
  export const name = 'MoveAction';
  export type Payload = number;

  export type Name = typeof name;
  export type KeyValue = { [name]: Payload };
  export type Type = Action<typeof name, Payload>;
  export const create = makeActionCreator<Name, Payload>(name);
  export const handler = makeFnActionHandlerCreator<KeyValue>(name);
}

export namespace UpdateScreenSettingsAction {
  export const name = 'UpdateScreenSettingsAction';
  export type Payload = ScreenSettings;

  export type Name = typeof name;
  export type KeyValue = { [name]: Payload };
  export type Type = Action<typeof name, Payload>;
  export const create = makeActionCreator<Name, Payload>(name);
  export const handler = makeFnActionHandlerCreator<KeyValue>(name);
}

export namespace MovementToggleAction {
  export const name = 'MovementToggleAction';
  export type Payload = void;

  export type Name = typeof name;
  export type KeyValue = { [name]: Payload };
  export type Type = Action<typeof name, Payload>;
  export const create = makeActionCreator<Name, Payload>(name);
  export const handler = makeFnActionHandlerCreator<KeyValue>(name);
}
