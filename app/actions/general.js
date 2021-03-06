import * as types from './../action_types.js';

export const setAuthPending = () => ({
  type: types.SET_AUTH_PENDING,
});

export const authSuccess = user_id => ({
  type: types.AUTH_SUCCESS,
  user_id: user_id,
});

export const authFailure = () => ({
  type: types.AUTH_FAILURE,
});

export const receiveDbData = data => ({
  type: types.RECEIVE_DB_DATA,
  goals: JSON.parse(data),
});

export const setPendingSyncOpen = goal => ({
  type: types.SET_PENDING_SYNC_OPEN,
  id: goal.id,
});

export const updateSyncSuccess = goalId => ({
  type: types.UPDATE_SYNC_SUCCESS,
  id: goalId,
});

export const updateSyncFailure = goalId => ({
  type: types.UPDATE_SYNC_FAILURE,
  id: goalId,
});

export const resetUpdateCount = goalId => ({
  type: types.RESET_UPDATE_COUNT,
  id: goalId,
});

export const setScreenHeight = height => ({
  type: types.SET_SCREEN_HEIGHT,
  height: height,
});
