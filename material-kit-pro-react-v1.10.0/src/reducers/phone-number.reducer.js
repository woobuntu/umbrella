export default function phoneNumberReducer(state, action) {
  const { type, value } = action;
  if (isNaN(Number(value)) || value.length > 4) return state;

  return {
    ...state,
    [type]: value,
  };
}
