import { combineReducers } from 'redux';
import { SET_CONFIGS, SET_CUR_QUERY_FILE, SET_QUERY_FILE, SET_CUR_EP, ADD_RESPONSE, SET_CUR_RESPONSE_KEY, SET_LOADING } from './actions';
const initResponseState = {
};

function response(state = initResponseState, action) {
  switch (action.type) {
    case ADD_RESPONSE:
      return {
        ...state,
        [action.key]: action.response
      }
    default:
      return state;
  }
}

const initAppState = {
  configs: null,
  loading: false
};

function app(state = initAppState, action) {
  switch (action.type) {
    case SET_CONFIGS:
      return {
        ...state,
        configs: action.payload
      };
    case SET_CUR_QUERY_FILE:
      return {
        ...state,
        curQueryFile: action.payload
      }
    case SET_QUERY_FILE:
      return {
        ...state,
        queryFile: action.payload
      }
    case SET_CUR_EP:
      return {
        ...state,
        curEp: action.payload
      }
    case SET_CUR_RESPONSE_KEY:
      return {
        ...state,
        curResponseKey: action.key
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app,
  response
});

export default rootReducer;

export const getLoading = state => state.app.loading;
export const getConfigs = state => state.app.configs;
export const getCurQueryFile = state => state.app.curQueryFile;
export const getQueryFile = state => state.app.queryFile;
export const getCurEp = state => state.app.curEp;
export const getCurResponseKey = state => state.app.curResponseKey;
export const getCurResponse = state => state.response[state.app.curResponseKey];
export const getResponse = (state, key) => state.response[key];
