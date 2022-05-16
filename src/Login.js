import * as React from 'react';
import { useState } from 'react';
import GetUser from "./GetUser";
	
import styled from 'styled-components';
const { kakao } = window;


const Login = () => {
    const [isClicked, setIsClicked] = useState(false);
    const btnClick = () =>{
        setIsClicked(true);
    }

    const [loginResult, setLoginResult] = useState(false);
    const scope = "profile_nickname,profile_image";
    if(isClicked){
        window.Kakao.Auth.login({
            scope,
          // success는 인증 정보를 응답(response)으로 받는다. 
            success: function (response) {
           //카카오 SDK에 사용자 토큰을 설정한다.
            window.Kakao.Auth.setAccessToken(response.access_token);
            console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);
            setLoginResult(true);
            var ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();
            
            },
            fail: function (error) {
            console.log(error);
            },
        });

    }
   

    const jsKey = "90138a9dfab3401f5b0181cc35933644";

    // SDK는 한 번만 초기화해야 한다.
    // 중복되는 초기화를 막기 위해 isInitialized()로 SDK 초기화 여부를 판단한다.
    if (!window.Kakao.isInitialized()) {
      // JavaScript key를 인자로 주고 SDK 초기화
        window.Kakao.init(jsKey);
      // SDK 초기화 여부를 확인하자.
        console.log(window.Kakao.isInitialized());
    }

   

    return(
        
        <div>
             <h1>{loginResult ? <GetUser/> : ""}</h1>
                <LoginBtnStyle loginResult={loginResult}>
                    <div id="custom-login-btn" onClick={btnClick}>
                        <img src="./img/kakao.png"  />
                    </div>
                </LoginBtnStyle>
               
            </div>
    )

    };

const LoginBtnStyle = styled.div`
display: ${(props) => (props.loginResult ? "none" : "block")};
width:200px;
cursor:pointer;
img{
    width:200px;
}
`;

export default Login;