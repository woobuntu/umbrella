export default function profileReducer(state, action) {
  const { type, value } = action;

  return {
    ...state,
    [type]: value,
  };
}
