export default function setSessionItem({ key, value }) {
  const { sessionStorage } = window;
  sessionStorage.setItem(key, JSON.stringify(value));
}
