export default function ordererReducer(state, action) {
  const { type, value } = action;

  return {
    ...state,
    [type]: value,
  };
}
