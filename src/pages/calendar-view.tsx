import { useState, useEffect, createContext, useMemo } from "react";
import Calendar from '../components/Calendar';
import styled from 'styled-components';
import TaskView from '../components/TasksView';
import { withApollo } from "../helpers/create-with-apollo";
import { useTasksByDateQuery, useCreateTaskMutation, TasksByDateQuery, TasksByDateDocument } from "../generated/graphql";
import { useRouter } from 'next/router'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

`
const Section = styled.section`
    height: 100%;
    overflow: hidden;
`
type DateContext = {
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>
} 

const CalendarView: React.FC = () => {
    const value = useMemo(() => ({date, setDate}), [date, setDate]);
    const [dateString, setDateString] = useState<string>('');
    const router = useRouter();

    const { data: tasks, error, loading, refetch } = useTasksByDateQuery({
        variables: {
            date: dateString
        },
        skip: !dateString,
        notifyOnNetworkStatusChange: true,
    });

    return(
        <Section>
            <Container>
                <Calendar />
                <TaskView />
            </Container>
        </Section>
    )
}
export default withApollo({ssr: true})(CalendarView);