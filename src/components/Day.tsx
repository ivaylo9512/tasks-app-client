import { useEffect, SetStateAction } from "react"
import React from "react"
import styled from "styled-components"

const Button = styled.div`
    flex-basis: calc(100% / 7 - 0.3vw);
    padding-bottom: calc(100% / 7 - 0.3vw);
    border-radius: 1vw;
    margin-right: 0.3vw;
    margin-bottom: 0.3vw;
    box-shadow: 0 0 0.2vw 0.05vw rgb(0 0 0);
    background: #000000;
    position: relative;
`
const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
`
type DayProps = {
    day: number;
    hasEvent: boolean;
    setDate: () => SetStateAction<Date>;
}
const Day: React.FC<DayProps> = React.memo(({ day, hasEvent, setDate }: DayProps) => {
    return(
        <Button onClick={setDate}>
            <Container>
                {day}
                {hasEvent}
            </Container>
        </Button>
    )
})
export default Day