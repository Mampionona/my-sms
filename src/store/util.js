export const updateUser = (state, newState) => {
  Object.keys(state).forEach((key) => {
    if (key in newState) {
      state[key] = newState[key];
    }
  });
  return state;
};
