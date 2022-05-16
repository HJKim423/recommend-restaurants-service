import styled from 'styled-components';
import Login from './Login';

function Header(){
    return(
        <HeaderStyle>
            <div className='title'>🙄 오늘 날씨에 뭐 먹지?</div>
            <Login/>

        </HeaderStyle>

    )
}

const HeaderStyle = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding: 12px 80px;
height:80px;

.title{
    font-size: 22px;
    font-weight:600;
    color:#001858;
}
`;

export default Header;