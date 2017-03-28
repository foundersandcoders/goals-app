import * as steps from './../steps.js';
import * as types from './../action_types.js';

const defaultState = {
  goals: [],
  step: steps.GOALS_LIST,
  previousStep: null,
  newGoal: {},
  currentGoal: {},
};

const mapWithId = (arr, id, fn) =>
  arr.map(elem =>
    elem.id === id
      ? fn(elem)
      : elem );

export default (state = defaultState, action) => {
  switch(action.type) {
  case types.STEP_ADD_GOAL:
    return {
      ...state,
      step: steps.ADD_GOAL,
      previousStep: steps.GOALS_LIST,
    };
  case types.INPUT_GOAL:
    return {
      ...state, newGoal: {
        ...state.newGoal, name: action.input,
      },
    };
  case types.SELECT_AVATAR:
    return {
      ...state, newGoal: {
        ...state.newGoal, avatar: action.avatar,
      },
    };
  case types.SAVE_NEW_GOAL:
    return {
      ...state,
      goals: state.goals.concat([action.goal,]),
      step: steps.GOALS_LIST,
      previousStep: null,
      newGoal: {},
    };
  case types.SELECT_GOAL:
    return {
      ...state,
      step: steps.VIEW_GOAL,
      previousStep: steps.GOALS_LIST,
      currentGoal: {
        ...action.goal,
        newRating: {},
      },
    };
  case types.STEP_RATE_GOAL:
    return {
      ...state,
      step: steps.RATE_GOAL,
      previousStep: steps.VIEW_GOAL,
    };

  case types.MOVE_SLIDER:
    return {
      ...state,
      currentGoal: {
        ...state.currentGoal,
        newRating: {
          ...state.currentGoal.newRating,
          score: action.rating,
        },
      },
    };
  case types.STEP_FEEDBACK:
    return {
      ...state,
      step: steps.FEEDBACK,
      previousStep: steps.RATE_GOAL,
    };
  case types.INPUT_FEEDBACK:
    return {
      ...state,
      currentGoal: {
        ...state.currentGoal,
        newRating: {
          ...state.currentGoal.newRating,
          comment: action.input,
        },
      },
    };
  case types.SET_PENDING_SYNC_OPEN:
    return {
      ...state,
      goals: state.goals.map((goal) => {
        return action.id === goal.id
            ? { ...goal, pendingSync: {open: true,}, }
            : goal;
      }),
    };
  case types.UPDATE_SYNC_SUCCESS:
    return {
      ...state,
      goals: mapWithId(state.goals, action.id, (goal) => {
        return {
          ...goal,
          syncDBCount: goal.syncDBCount + 1,
          pendingSync: { open: false, },
        };
      }),
    };
  case types.UPDATE_SYNC_FAILURE:
    return {
      ...state,
      goals: mapWithId(state.goals, action.id, (goal) => {
        return { ...goal, pendingSync: { open: false, }, };
      }),
    };
  case types.RESET_UPDATE_COUNT:
    return {
      ...state,
      goals: mapWithId(state.goals, action.id, (goal) => {
        return { ...goal, updateCount:0, syncDBCount: 0, };
      }),
    };
  default:
    return state;
  }
};
