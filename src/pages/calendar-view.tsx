import { useState, useEffect, createContext, useMemo } from "react";
import Calendar from '../components/Calendar';
import styled from 'styled-components';
import TaskView from '../components/TasksView';
import { withApollo } from "../helpers/create-with-apollo";
import { useTasksByDateQuery, Task, useCreateTaskMutation, TasksByDateQuery, TasksByDateDocument } from "../generated/graphql";

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
export const DateProvider = createContext<DateContext>({
    date: new Date(), 
    setDate: () => null,
});

const CalendarView: React.FC = () => {
    const [date, setDate] = useState<Date>(() => new Date());
    const value = useMemo(() => ({date, setDate}), [date, setDate]);
    const [dateString, setDateString] = useState<string>('');
    const { data: tasks} = useTasksByDateQuery({
        variables: {
            date: dateString
        },
        skip: !dateString,
        notifyOnNetworkStatusChange: true,
    });

    

    useEffect(() => {
        const utcDate = new Date(date);
        utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset());
        setDateString(utcDate.toISOString().split('T')[0]);
    },[date])


    return(
        <DateProvider.Provider value={value}>
        <Section>
            <Container>
                <Calendar date={date} setDate={setDate} />
                <TaskView tasks={tasks} />
            </Container>
        </Section>
        </DateProvider.Provider>
    )
}
export default withApollo({ssr: true})(CalendarView);