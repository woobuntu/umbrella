const { makeVar } = require("@apollo/client");

const isAuthLoadingVar = makeVar(false);

export default isAuthLoadingVar;
