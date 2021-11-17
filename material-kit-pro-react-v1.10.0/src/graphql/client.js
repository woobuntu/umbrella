import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = process.env.REACT_APP_API_URL;

// https://www.apollographql.com/docs/react/networking/basic-http-networking/#including-credentials-in-requests
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
