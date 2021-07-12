import styled from "styled-components"

const Container = styled.div`
    flex-basis: calc(100% / 7 - 0.3vw);
    color: white;
    text-align: center;
    padding: 0.25vw 0;
    border-radius: 0.7vw;
    margin-right: 0.3vw;
    font-size: 1vw;
    margin-bottom: 0.3vw;
    box-shadow: 0 0 0.2vw 0.05vw rgb(0 0 0);
    background: #000000;
    position: relative;
`
const WeekDays = () => {
    return(
        <>
        <Container>Mo</Container>
        <Container>Tu</Container>
        <Container>We</Container>
        <Container>Th</Container>
        <Container>Fr</Container>
        <Container>Sa</Container>
        <Container>Su</Container>
        </>
    )
}
export default WeekDays