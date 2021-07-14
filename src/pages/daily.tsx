import styled from 'styled-components';
import TaskView from '../components/TasksView';

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

`
const Section = styled.section`
    height: 100%;
`

const Daily: React.FC = () => {

    return(
        <Section>
            <Container>
                <TaskView />
            </Container>
        </Section>
    )
}
export default Daily 