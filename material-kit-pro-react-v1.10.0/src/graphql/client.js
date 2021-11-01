import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

// https://www.apollographql.com/docs/react/networking/authentication/#cookie
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
  link: httpLink,
});

export default client;
