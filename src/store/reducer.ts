import { combineReducers } from 'redux';

import ActionsT from './types';
import { DEFAULT_COMMON_STATE } from './state';
import * as actions from './actions';

function commonReducer(state = DEFAULT_COMMON_STATE, action: ActionsT): CommonStateI {
  switch (action.type) {
    case actions.ADD_COUNT:
      return { ...state, count: action.data };
    case actions.UPDATE_USER:
      return { ...state, user: action.data };
    case actions.CLEAR_USER:
      return { ...state, user: DEFAULT_COMMON_STATE.user };
    case actions.UPDATE_MENU:
      return { ...state, menu: action.data };
    case actions.UPDATE_MENU_ROUTES:
      return { ...state, menuRoutes: action.data };
    case actions.UPDATE_DICTS:
      return { ...state, dicts: action.data };
    case actions.UPDATE_MENU_TITLES:
      return { ...state, menuTitles: action.data };
    case actions.UPDATE_FULL_SCREEN:
      return { ...state, fullScreen: action.data };
    default:
      return state;
  }
}

const rootReducer = combineReducers({ common: commonReducer });

export default rootReducer;
