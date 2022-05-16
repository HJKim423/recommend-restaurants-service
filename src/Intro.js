import Weather from "./Weather";
import styled from 'styled-components';

function Intro(){
    return(
        <IntroStyle>
        <TitleStyle>🍕🙄🍔{"\n"}오늘 날씨에 뭐 먹지?</TitleStyle>
        <Weather/>
        </IntroStyle>
    )
}

const IntroStyle = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:200px 0 400px 0;
`;

const TitleStyle = styled.div`
font-size:48px;
font-weight:600;
color:#001858;
padding-bottom:60px;
white-space:pre-line;
line-height:80px;
`;

export default Intro;