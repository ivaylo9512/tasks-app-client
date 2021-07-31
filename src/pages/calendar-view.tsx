import { useState, useEffect, createContext, useMemo } from "react";
import Calendar from '../components/Calendar';
import styled from 'styled-components';
import TaskView from '../components/TasksView';
import { withApollo, globalApolloClient } from "../helpers/create-with-apollo";
import { useTasksByDateQuery, useCreateTaskMutation, TasksByDateQuery, TasksByDateDocument, TaskFragmentDoc } from "../generated/graphql";
import { useRouter } from 'next/router'
import { TasksDocument } from "../graphql/cache-queries";

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

`
const Section = styled.section`
    height: 100%;
    overflow: hidden;
`

const CalendarView: React.FC = () => {
    const [dateString, setDateString] = useState<string>('');
    const router = useRouter();

    const updateCache = (data: TasksByDateQuery) => {
        globalApolloClient!.writeQuery({
            query: TasksDocument,
            data: {
            __typename: "tasks",
            tasks: data.tasksByDate,
            },
        });
    }

    const { data: tasks, error, loading, refetch } = useTasksByDateQuery({
        variables: {
            date: dateString
        },
        skip: !dateString,
        notifyOnNetworkStatusChange: true,
        onCompleted: updateCache
    });

    useEffect(() => {
            const dateParam = router.query.date;

            if(!Array.isArray(dateParam) && dateParam?.match(/^\d{4}-\d{2}-\d{2}$/) && new Date(router.query.date as string).toString() != 'Invalid Date'){
                setDateString(dateParam)
                return;
            } 
    
            const utcDate = new Date();
            utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset());
            router.push({pathname: '/calendar-view', query: { date: utcDate.toISOString().split('T')[0] }});
    },[router.query.date])

    return(
        <Section>
            {dateString &&
                <Container>
                    <Calendar />
                    <TaskView />
                </Container>
            }
        </Section>
    )
}
export default withApollo({ssr: true})(CalendarView);