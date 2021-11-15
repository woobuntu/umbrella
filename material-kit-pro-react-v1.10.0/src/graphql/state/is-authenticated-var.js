const { makeVar } = require("@apollo/client");

const isAuthenticatedVar = makeVar(false);

export default isAuthenticatedVar;
