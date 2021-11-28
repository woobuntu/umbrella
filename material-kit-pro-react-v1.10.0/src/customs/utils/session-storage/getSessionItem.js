export default function getSessionItem(itemName) {
  const { sessionStorage } = window;

  const item = sessionStorage.getItem(itemName);

  return item ? JSON.parse(item) : null;
}
