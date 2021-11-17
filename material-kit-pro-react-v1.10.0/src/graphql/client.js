import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const uri = process.env.REACT_APP_API_URL;

// https://www.apollographql.com/docs/react/networking/authentication/#cookie
const httpLink = createHttpLink({
  uri,
  credentials: "include",
});

// // https://www.apollographql.com/docs/react/networking/advanced-http-networking/#customizing-request-logic
const setDateInHeader = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      timestamp: Date.now(),
    },
  }));
  return forward(operation);
});

// https://www.apollographql.com/docs/react/networking/basic-http-networking/#including-credentials-in-requests
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(setDateInHeader, httpLink),
});

export default client;
