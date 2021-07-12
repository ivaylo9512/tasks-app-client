import { NextPageContext } from "next";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    cache: new InMemoryCache({
    
    })
  })
