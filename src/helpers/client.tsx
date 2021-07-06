import { dedupExchange, cacheExchange, fetchExchange } from "urql"

export const createClient = (ssrExchange: any ) => ({
    url: 'http://localhost:8099/graphql',
    exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange]
})