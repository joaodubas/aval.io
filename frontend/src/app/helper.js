export function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

export function text(response) {
  return response.text();
}

export function updateState(key, value, currState) {
  var state = {}
  Object
    .keys(currState)
    .map(k => state[k] = key === k ? value : currState[k]);
  return state;
}

