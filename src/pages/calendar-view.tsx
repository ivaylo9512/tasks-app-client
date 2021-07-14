import { useState, useEffect } from "react";
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
const CalendarView: React.FC = () => {
    const [date, setDate] = useState<Date>(() => new Date());

    useEffect(() => {
        console.log('dsad');
    const fetchApi = async() => {
        const a = await fetch('http://localhost:8056/users/refreshToken', {
            credentials: 'include',
        })
        console.log(a.headers.get('Authorization'))
    }
    fetchApi()

    }, [])

    return(
        <Section>
            <Container>
                <Calendar date={date} setDate={setDate} />
                <TaskView />
            </Container>
        </Section>
    )
}
export default CalendarView 