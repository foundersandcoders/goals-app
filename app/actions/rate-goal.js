import { createAction, } from 'redux-actions';

// action types
import * as types from '../action_types.js';

export const stepFeedback = createAction(types.STEP_FEEDBACK);

export const onMoveSlider = value => {
  return {
    type: types.MOVE_SLIDER,
    rating: value,
  };
};

export const setPreviousScore = createAction(types.SET_PREVIOUS_SCORE);
