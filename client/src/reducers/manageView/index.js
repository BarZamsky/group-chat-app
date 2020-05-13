import initialState from '../../store/initialState';
import {INIT_MANAGE_VIEW, CHANNEL_VIEW, DIRECT_MESSAGE_VIEW} from '../../actions/actionTypes'

export default (state = initialState.manageView, { type, payload }) => {
  switch (type) {
    case INIT_MANAGE_VIEW: {
      return {
        ...state,
        id: null,
        type: null,
        name: null
      };
    }
    case CHANNEL_VIEW: {
      return {
        ...state,
        id: payload.id,
        type: 'channel',
        name: payload.name
      };
    }
    case DIRECT_MESSAGE_VIEW: {
      return {
        ...state,
        id: payload.id,
        type: 'direct_message',
        name: payload.name
      };
    }
    default: {
      return { ...state };
    }
  }
};
