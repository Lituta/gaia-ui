import axios from 'axios';

import { server_base } from './resources/constants';

export const SET_CONFIGS = 'SET_CONFIGS';
export const SET_QUERY_FILE = 'SET_QUERY_FILE';
export const SET_CUR_QUERY_FILE = 'SET_CUR_QUERY_FILE';
export const SET_CUR_EP = 'SET_CUR_EP';
export const ADD_RESPONSE = 'ADD_RESPONSE';
export const SET_CUR_RESPONSE_KEY = 'SET_CUR_RESPONSE_KEY';
export const SET_LOADING = 'SET_LOADING';

export function fetchConfigs(cb) {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios.get(`${server_base}configs`)
      .then(response => {
        console.log(' * Success! fetch configs 0000');
        if (!response.data || response.data.length === 0) {
          dispatch(setLoading(false));
          if (cb) cb(true, 'failed fetchConfigs');
          return;
        }
        dispatch(setConfigs(response.data));
        dispatch(setLoading(false));
        if (cb) cb(false, 'success fetchConfigs');
      })
      .catch(error => {
        console.log('Error fetchConfigs data', error);
        if (cb) cb(true, error);
        dispatch(setLoading(false));
      });
  }
}

// @app.route('/query_instance/<query_key>', methods=['GET'])
export function fetchQueryFile(queryKey, sample, cb) {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios.get(`${server_base}query_instance/${queryKey}${sample ? '/sample' : '/'}`)
      .then(response => {
        console.log(' * Success! fetchQueryFile 0000', queryKey);
        if (!response.data || response.data.length === 0) {
          dispatch(setLoading(false));
          if (cb) cb(true, 'failed fetchQueryFile');
          return;
        }
        dispatch(setQueryFile(response.data));
        dispatch(setCurQueryFile(queryKey));
        dispatch(setLoading(false));
        if (cb) cb(false, 'success fetchQueryFile');
      })
      .catch(error => {
        console.log('Error fetchQueryFile data', error);
        if (cb) cb(true, error);
        dispatch(setLoading(false));
      });
  }
}

export function findResponse(combinedKey, cb) {
  console.log('--- action findResponse called ---', combinedKey);
  // combinedKey = curQueryFile/query_idx/curEp
  return (dispatch) => {
    dispatch(setLoading(true));
    axios.get(`${server_base}find/${combinedKey}`)
      .then(response => {
        console.log(' * Success! findResponse 0000', combinedKey);
        if (!response.data) {
          dispatch(setLoading(false));
          if (cb) cb(true, 'failed');
          return;
        }
        console.log(response.data);
        dispatch(addResponse(combinedKey, response.data));
        dispatch(setCurResponseKey(combinedKey));
        dispatch(setLoading(false));
        if (cb) cb(false, 'success findResponse');
      })
      .catch(error => {
        console.log('Error findResponse', error);
        dispatch(setLoading(false));
        if (cb) cb(true, error);
      });
  }
}

export function setConfigs(data) {
  console.log('--- action setConfigs called ---');
  return {
    type: SET_CONFIGS,
    payload: data,
  };
}

export function setQueryFile(data) {
  console.log('--- action setQueryFile called ---');
  return {
    type: SET_QUERY_FILE,
    payload: data,
  };
}

export function setCurQueryFile(data) {
  console.log('--- action setCurQueryFile called ---', data);
  return {
    type: SET_CUR_QUERY_FILE,
    payload: data,
  };
}

export function setCurEp(data) {
  console.log('--- action setCurEp called ---', data);
  return {
    type: SET_CUR_EP,
    payload: data,
  };
}

export function addResponse(key, response) {
  console.log('--- action addResponse called ---', key);
  return {
    type: ADD_RESPONSE,
    key,
    response
  };
}

export function setCurResponseKey(key) {
  console.log('--- action setCurResponseKey called ---', key);
  return {
    type: SET_CUR_RESPONSE_KEY,
    key,
  };
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    payload: loading
  };
}
