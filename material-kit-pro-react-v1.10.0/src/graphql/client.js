import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/graphql"
    : "https://api.withus1030.co.kr";

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
