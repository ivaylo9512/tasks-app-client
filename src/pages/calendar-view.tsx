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
    const [dateString, setDateString] = useState<string>('');
    const router = useRouter();

    const { data: tasks, error, loading, refetch } = useTasksByDateQuery({
        variables: {
            date: dateString
        },
        skip: !dateString,
        notifyOnNetworkStatusChange: true,
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