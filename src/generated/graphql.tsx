import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** DateType object date scalar type */
  DateType: any;
};



export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  delete: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
  forgotPassword: UserResponse;
  login: UserResponse;
  register: UserResponse;
  updateTask: Task;
};


export type MutationCreateTaskArgs = {
  taskInput: TaskInput;
};


export type MutationDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  userInput: UserInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationUpdateTaskArgs = {
  taskInput: TaskInput;
};

export type Query = {
  __typename?: 'Query';
  getTasksByState: Array<Task>;
  taskById?: Maybe<Task>;
  tasksByDate: Array<Task>;
  userById: User;
};


export type QueryGetTasksByStateArgs = {
  state: Scalars['String'];
};


export type QueryTaskByIdArgs = {
  id: Scalars['Int'];
};


export type QueryTasksByDateArgs = {
  date: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  age: Scalars['DateTime'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  alertAt?: Maybe<Scalars['DateTime']>;
  eventDate?: Maybe<Scalars['DateType']>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  owner: User;
};

export type TaskInput = {
  id?: Maybe<Scalars['Float']>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  alertAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  eventDate?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  role: Scalars['String'];
  tasks?: Maybe<Array<Task>>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type TaskFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'name' | 'alertAt' | 'eventDate' | 'from' | 'to' | 'state'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'age' | 'email' | 'role'>
);

export type TaskByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TaskByIdQuery = (
  { __typename?: 'Query' }
  & { taskById?: Maybe<(
    { __typename?: 'Task' }
    & TaskFragment
  )> }
);

export type TasksByDateQueryVariables = Exact<{
  date: Scalars['String'];
}>;


export type TasksByDateQuery = (
  { __typename?: 'Query' }
  & { tasksByDate: Array<(
    { __typename?: 'Task' }
    & TaskFragment
  )> }
);

export type CreateTaskMutationVariables = Exact<{
  taskInput: TaskInput;
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & TaskFragment
  ) }
);

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById: (
    { __typename?: 'User' }
    & UserFragment
  ) }
);

export type DeleteMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'delete'>
);

export type LoginMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export const TaskFragmentDoc = gql`
    fragment Task on Task {
  id
  name
  alertAt
  eventDate
  from
  to
  state
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  firstName
  lastName
  age
  email
  role
}
    `;
export const TaskByIdDocument = gql`
    query taskById($id: Int!) {
  taskById(id: $id) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTaskByIdQuery__
 *
 * To run a query within a React component, call `useTaskByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskByIdQuery(baseOptions: Apollo.QueryHookOptions<TaskByIdQuery, TaskByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TaskByIdQuery, TaskByIdQueryVariables>(TaskByIdDocument, options);
      }
export function useTaskByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TaskByIdQuery, TaskByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TaskByIdQuery, TaskByIdQueryVariables>(TaskByIdDocument, options);
        }
export type TaskByIdQueryHookResult = ReturnType<typeof useTaskByIdQuery>;
export type TaskByIdLazyQueryHookResult = ReturnType<typeof useTaskByIdLazyQuery>;
export type TaskByIdQueryResult = Apollo.QueryResult<TaskByIdQuery, TaskByIdQueryVariables>;
export const TasksByDateDocument = gql`
    query tasksByDate($date: String!) {
  tasksByDate(date: $date) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTasksByDateQuery__
 *
 * To run a query within a React component, call `useTasksByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksByDateQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useTasksByDateQuery(baseOptions: Apollo.QueryHookOptions<TasksByDateQuery, TasksByDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TasksByDateQuery, TasksByDateQueryVariables>(TasksByDateDocument, options);
      }
export function useTasksByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksByDateQuery, TasksByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TasksByDateQuery, TasksByDateQueryVariables>(TasksByDateDocument, options);
        }
export type TasksByDateQueryHookResult = ReturnType<typeof useTasksByDateQuery>;
export type TasksByDateLazyQueryHookResult = ReturnType<typeof useTasksByDateLazyQuery>;
export type TasksByDateQueryResult = Apollo.QueryResult<TasksByDateQuery, TasksByDateQueryVariables>;
export const CreateTaskDocument = gql`
    mutation createTask($taskInput: TaskInput!) {
  createTask(taskInput: $taskInput) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      taskInput: // value for 'taskInput'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UserByIdDocument = gql`
    query userById($id: Int!) {
  userById(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export const DeleteDocument = gql`
    mutation delete($id: Int!) {
  delete(id: $id)
}
    `;
export type DeleteMutationFn = Apollo.MutationFunction<DeleteMutation, DeleteMutationVariables>;

/**
 * __useDeleteMutation__
 *
 * To run a mutation, you first call `useDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMutation, { data, loading, error }] = useDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMutation, DeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMutation, DeleteMutationVariables>(DeleteDocument, options);
      }
export type DeleteMutationHookResult = ReturnType<typeof useDeleteMutation>;
export type DeleteMutationResult = Apollo.MutationResult<DeleteMutation>;
export type DeleteMutationOptions = Apollo.BaseMutationOptions<DeleteMutation, DeleteMutationVariables>;
export const LoginDocument = gql`
    mutation login($username: String, $email: String, $password: String!) {
  login(userInput: {username: $username, password: $password, email: $email}) {
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;