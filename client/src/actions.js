// @flow

export type Action =
  | { type: 'SWITCH_VIEW_MODE' }
  | { type: 'MOTION_DETECTED' }
  | { type: 'NO_MOTION_DETECTED' }
  | { type: 'FACIAL_RECOGNITION_TO GGLED' }
  | { type: 'NEXT_BOARD' }
  | { type: 'PREVIOUS_BOARD' }
  | { type: 'UNKNOWN_BUTTON_PAYLOAD', payload: number };
