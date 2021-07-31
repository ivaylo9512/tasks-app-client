import styled from "styled-components"
import TaskView from "../components/TasksView"
import { useTasksByStateQuery, TasksByStateQuery } from "../generated/graphql"
import { TasksDocument } from "../graphql/cache-queries"
import { globalApolloClient } from "../helpers/create-with-apollo"

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`
const Section: React.FC = styled.section`
    height: 100%;
`
const Goals = () => {
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
            state: 'goals'
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
export default Goals