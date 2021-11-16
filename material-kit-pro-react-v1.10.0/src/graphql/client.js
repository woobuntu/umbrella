import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const uri = process.env.REACT_APP_API_URL;

// https://www.apollographql.com/docs/react/networking/authentication/#cookie
const httpLink = createHttpLink({
  uri,
  credentials: "include",
});

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  link: httpLink,
});

export default client;
