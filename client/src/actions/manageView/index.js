import {INIT_MANAGE_VIEW, DIRECT_MESSAGE_VIEW, CHANNEL_VIEW} from "../actionTypes";

const initManageViewAction = payload => ({
  type: INIT_MANAGE_VIEW,
  payload
});

const setDirectMessageViewAction = payload => ({
  type: DIRECT_MESSAGE_VIEW,
  payload
});

const setChannelViewAction = payload => ({
  type: CHANNEL_VIEW,
  payload
});

export const initManageView = () => (dispatch) => {
  dispatch(initManageViewAction());
};

export const setDirectMessageView = (data) => (dispatch) => {
  dispatch(setDirectMessageViewAction(data));
};

export const setChannelView = (data) => (dispatch) => {
  dispatch(setChannelViewAction(data));
};
