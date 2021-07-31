import { useQuery, gql } from "@apollo/client"
import { TaskFragmentDoc } from "../generated/graphql"
import styled from "styled-components"
import CreateTask from "./CreateTask"
import TaskList from "./TaskList"
import { useState, useEffect } from "react"
import { TasksDocument, TasksQuery } from "../graphql/cache-queries"

const Section = styled.section`
    flex:1;
    overflow: hidden;
    position:relative;
`
const ToggleButton = styled.button`
    position: absolute;
    right: 0;
`
const TaskInfo = styled.span`
    height: 11vh;
    flex-shrink: 0;
    width: 70%;
    margin: 0.5vh auto;
    background: #000000;
    font-size: 0.85vw;
    border: groove 0.1vw white;
    border-radius: 2.5vw;
    box-shadow: 0 0 0.2vw 0.05vw rgb(0 0 0);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`
type TaskViewProps = {
    toggleCalendar?: () => void,
    isHidden: boolean
}
const TaskView: React.FC<TaskViewProps> = () => {
    const {data, error} = useQuery<TasksQuery>(TasksDocument, {
        fetchPolicy: 'cache-only',
    });

    return(
        <Section>
            {!data?.tasks.length ? 
                <TaskInfo>No tasks for selected date.</TaskInfo>
                :
                <>
                    <ToggleButton>toggle</ToggleButton>
                    <TaskList />
                </>
            }
            <CreateTask />
        </Section>
    )
}
export default TaskView