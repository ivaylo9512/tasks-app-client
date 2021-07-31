import { gql } from "@apollo/client";
import { TaskFragmentDoc, TaskFragment, UserFragmentDoc, UserFragment } from "../generated/graphql";

export const TasksDocument = gql`
query tasks {
    tasks{
        ...Task
    }
} ${TaskFragmentDoc}`;

export type TasksQuery = (
    { __typename?: 'Query' }
    & { tasksByDate: Array<(
      { __typename?: 'Tasks' }
      & TaskFragment
    )> }
);

export const UserDocument = gql`
query user {
    user{
        ...User
    }
} ${UserFragmentDoc}`

export type UserQuery = (
    { __typename?: 'Query' }
    & { userById: (
      { __typename?: 'User' }
      & UserFragment
    ) }
  );