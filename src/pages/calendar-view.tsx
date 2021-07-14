import { useState, useEffect, createContext, useMemo } from "react";
import Calendar from '../components/Calendar';
import styled from 'styled-components';
import TaskView from '../components/TasksView';

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

    return(
        <DateProvider.Provider value={value}>
        <Section>
            <Container>
                <Calendar date={date} setDate={setDate} />
                <TaskView />
            </Container>
        </Section>
        </DateProvider.Provider>
    )
}
export default CalendarView 