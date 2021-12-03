export default function basicReducer(state, action) {
  const { type, value } = action;

  return {
    ...state,
    [type]: value,
  };
}
