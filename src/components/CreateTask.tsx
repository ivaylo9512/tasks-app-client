import useInput from "../hooks/useInput"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useCreateTaskMutation, TasksByDateDocument, TasksByDateQuery } from "../generated/graphql";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router'

const Container = styled.div`
    height: 11vh;
    width: 87%;
    margin: 0.5vh auto;
    background: #000000;
    border-style: groove;
    border-color: white;
    box-shadow: 0 0 0.2vw 0.05vw rgb(0 0 0);
    display: flex;
    border-radius: 1.9vw;
    align-items: center;
    justify-content: center;
    color: white;
`

const CreateTask: React.FC = () => {
    const {route} = useRouter();
    const [{name, time, alertAt}, {nameInput, timeInput, alertAtInput}] = createInputs();
    const [isAlertAtView, setIsAlertAtView] = useState<boolean>(false);
    
    const [post] = useCreateTaskMutation({
        update: (cache, { data: task }) => {
            if(!task){
                return;
            }

            const tasks = cache.readQuery<TasksByDateQuery>({ query: TasksByDateDocument, variables: {
                date: task?.createTask.eventDate
            }})?.tasksByDate || [];

            cache.writeQuery<TasksByDateQuery>({
                query: TasksByDateDocument,
                data: {
                    __typename: "Query",
                    tasksByDate: [...tasks, task.createTask]
                },
                variables:{
                    date: task.createTask.eventDate                
                }
            });
          }
    }); 

    const setView = () => {
        setIsAlertAtView(!isAlertAtView);
    }

    const addTask = () => {
        let state = route;
        if(route == 'create-view'){
            state = 'event'
        }
        const task = {
            alerAt: new Date(`${alertAt} ${time}`),
            name,
            state
        }

        post({
            variables:{
                taskInput: task
            }
        })
    }

    return(
        <Container>
            {isAlertAtView ? <>
                {timeInput}
                {alertAtInput} 
                <button onClick={setView}>back</button>
            </> : <>
                {nameInput}
                <button onClick={addTask}>add</button>
                {route == '/calendar-view' && 
                    <button onClick={setView}>
                        <FontAwesomeIcon icon={faBell} />
                    </button>
                }
            </>}
        </Container>
    )
}
type Values = {
    name: string,
    time: string,
    alertAt: string
}
type Inputs = {
    nameInput: JSX.Element,
    timeInput: JSX.Element,
    alertAtInput: JSX.Element
}

const createInputs = (): [Values, Inputs] => {
    const [name, nameInput] = useInput({
        name: 'name',
        placeholder: 'name',
    })
    const [time, timeInput] = useInput({
        name: 'time',
        initialValue: '00:00',
        type: 'time'
    })
    const [alertAt, alertAtInput] = useInput({
        name: 'alertAt',
        initialValue: new Date().toISOString().split('T')[0],
        type: 'date'
    })

    return [{name, time, alertAt}, {nameInput, timeInput, alertAtInput}]
}
export default CreateTask;