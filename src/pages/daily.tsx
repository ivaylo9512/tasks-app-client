import styled from 'styled-components';
import TaskView from '../components/TasksView';
import { useTasksByStateQuery } from '../generated/graphql'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

`
const Section = styled.section`
    height: 100%;
`

const Daily: React.FC = () => {
    const {data: tasks, loading, error} = useTasksByStateQuery({
        variables: {
            state: 'daily'
        },
        notifyOnNetworkStatusChange: true,
    }) 
    return(
        <Section>
            <Container>
                <TaskView tasks={tasks?.tasksByState}/>
            </Container>
        </Section>
    )
}
export default Daily 