import styled from "styled-components";

const StyledH1Title = styled.h1`
    text-align: center;
    margin-bottom: 50px;
`

export const PageTitle = (props:{title:string}) => {
    return (
        <StyledH1Title>{props.title}</StyledH1Title>
    )
}