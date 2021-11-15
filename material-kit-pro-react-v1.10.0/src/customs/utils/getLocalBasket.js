export default function getLocalBasket() {
  const { localStorage } = window;

  const basket = localStorage.getItem("basket");

  if (typeof basket === "object") {
    let count = 0;
    for (const key in basket) count++;
    if (count == 0) return {};
  }

  return basket ? JSON.parse(basket) : {};
}
