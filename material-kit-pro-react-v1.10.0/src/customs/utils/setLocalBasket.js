import { localStorageBasketVar } from "graphql/state";
import getLocalBasket from "./getLocalBasket";

export default function setLocalBasket(newBasket) {
  const { localStorage } = window;
  localStorage.setItem("basket", JSON.stringify(newBasket));
  localStorageBasketVar(getLocalBasket());
}
