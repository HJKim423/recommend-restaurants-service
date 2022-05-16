import { useState } from "react";
import styled from 'styled-components';



function GetUser() {
    const [nickname, setNickname] = useState("");
    const [profileImg, setProfileImg] = useState("");

    window.Kakao.API.request({
        url: "/v2/user/me",
        success: function ({ kakao_account }) {
          //어떤 정보 넘어오는지 확인
            const {profile} = kakao_account;
            setNickname(profile.nickname);
            setProfileImg(profile.profile_image_url);
        },
        fail: function (error) {
          console.log(error);
        },
      });

      localStorage.setItem("nickname", nickname);
      localStorage.setItem("profileImg", profileImg);

      return( 
        <UserStyle>
            <div className="user-img">
                <img src={profileImg} alt="profile_img" title="img_title" />
            </div>  
            <div className="user-name">{nickname}님, 환영합니다.</div>    
      </UserStyle>
      )
}

const UserStyle = styled.div`
display:flex;
align-items:center;

.user-name{
    font-size:16px;
    font-weight:600;
}

.user-img{
    border-radius:50%;
    width: 50px;
    height:50px;
    margin-right:12px;

    img{
        object-fit:cover;
        border-radius:50%;
        width: 50px;
        height:50px;
    }
}
`;

export default GetUser;