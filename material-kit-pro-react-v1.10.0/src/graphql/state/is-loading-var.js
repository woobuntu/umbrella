const { makeVar } = require("@apollo/client");

const isLoadingVar = makeVar(false);

export default isLoadingVar;
