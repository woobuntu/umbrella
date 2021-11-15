export default function addressReducer(state, action) {
  const { type, value } = action;

  return {
    ...state,
    [type]: value,
  };
}
