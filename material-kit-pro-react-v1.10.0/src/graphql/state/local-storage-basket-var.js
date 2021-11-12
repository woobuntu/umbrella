import { getLocalBasket } from "customs/utils";

const { makeVar } = require("@apollo/client");

const localStorageBasketVar = makeVar(getLocalBasket());

export default localStorageBasketVar;
