import React, { useState, useReducer, useEffect } from "react";
import Map from "./Map";
import { useSelector } from "react-redux";
import styled from 'styled-components';

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const { menu } = useSelector((state) => state.userReducer);


  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };


  useEffect(() => {
    setPlace(`${menu} 맛집`);
  },[menu]);

  // console.log(place);

  return (
    <>
      <InputStyle className="inputForm" onSubmit={handleSubmit}>
        <h2>내 주변 맛집 찾기</h2>
        <input
          placeholder="메뉴 직접 입력"
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </InputStyle>
      <Map searchPlace={place} />
    </>
  );
};

const InputStyle = styled.form`
padding-bottom:20px;

h2{
  color:#172c66;
}

input{
  height: 40px;
  width:200px;
  border:2px solid #8bd3dd;
  border-radius:8px;
  background-color:#fef6e4;
}


button{
  padding:10px 20px;
  background-color: #8bd3dd;
  border:none;
  border-radius:8px;
  margin-left: 8px;
  color:white;
  font-size:18px;
  font-weight:600;
}
`

export default SearchPlace;