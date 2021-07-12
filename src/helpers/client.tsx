import {Resolver, Cache, query } from "@urql/exchange-graphcache";
import {dedupExchange, cacheExchange, Exchange, fetchExchange, stringifyVariables, useQuery, makeOperation } from "urql";
import { pipe, tap } from "wonka";
import { authExchange } from '@urql/exchange-auth';

export const createClient = (ssrExchange: any ) => ({
    url: 'http://localhost:8099/graphql',
    exchanges: [dedupExchange, cacheExchange, ssrExchange, authExchange({
        getAuth, willAuthError, addAuthToOperation}), fetchExchange]})

const getAuth = async ({ authState } : {authState: {token: string, refreshToken : string | null}}) => {
    console.log('here')
    if (!authState) {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      if (token && refreshToken) {
        return { token, refreshToken };
      }
      return null;
    }
  
    return null;
};

const addAuthToOperation = ({ authState, operation }) => {
    if (!authState || !authState.token) {
      return operation;
    }
  
    const fetchOptions =
      typeof operation.context.fetchOptions === 'function'
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};
  
    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: authState.token,
        },
      },
    });
  };

const willAuthError = ({ authState }) => {
    if (!authState) return true;
    return false;
  }