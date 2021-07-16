import { NextPageContext } from "next";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const userServer = createHttpLink({
  uri: 'http://localhost:8056/graphql',
});
const taskServer = createHttpLink({
  uri: 'http://localhost:8099/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('Authorization');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const createApolloClient = (ctx: NextPageContext) => new ApolloClient({
    ssrMode: Boolean(ctx),
    link: authLink.concat(taskServer),
    cache: new InMemoryCache(),
})
export const createUserClient = new ApolloClient({
    link: authLink.concat(userServer),
    cache: new InMemoryCache()
})