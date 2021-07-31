import styled from 'styled-components';
import TaskView from '../components/TasksView';
import { useTasksByStateQuery, TasksByStateQuery } from '../generated/graphql'
import { globalApolloClient } from '../helpers/create-with-apollo';
import { TasksDocument } from '../graphql/cache-queries';

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

`
const Section = styled.section`
    height: 100%;
`

const Daily: React.FC = () => {
    const updateCache = (data: TasksByStateQuery) => {
        globalApolloClient!.writeQuery({
            query: TasksDocument,
            data: {
            __typename: "tasks",
            tasks: data.tasksByState,
            },
        });
    }

    const {loading} = useTasksByStateQuery({
        variables: {
            state: 'daily'
        },
        notifyOnNetworkStatusChange: true,
        onCompleted: updateCache
    }) 

    return(
        <Section>
            <Container>
                <TaskView />
            </Container>
        </Section>
    )
}
export default Daily 