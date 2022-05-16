import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const { kakao } = window;

const Map = ({ searchPlace }) => {
    // 검색결과 배열에 담아줌
    const [Places, setPlaces] = useState([]);
    const { lat, lon } = useSelector((state) => state.placeReducer);

    

    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(lat, lon),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);

        const ps = new kakao.maps.services.Places(); 
        let infowindow = new kakao.maps.InfoWindow({zIndex:1});

        //키워드로 장소를 검색(현재위치 기준)
        ps.keywordSearch(searchPlace, placesSearchCB, {
            radius : 10000,
            location: new kakao.maps.LatLng(lat, lon),
        }); 


        // 키워드 검색 완료 시 호출되는 콜백함수
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // console.log(data);

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가
                let bounds = new kakao.maps.LatLngBounds();

                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정
                map.setBounds(bounds);
                // 페이지 목록 보여주는 displayPagination() 추가
                displayPagination(pagination);
                setPlaces(data);
            } 
        }

            // 검색결과 목록 하단에 페이지 번호 표시
        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i
    
            // 기존에 추가된 페이지 번호 삭제
            while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild)
            }
    
            for (i = 1; i <= pagination.last; i++) {
            var el = document.createElement('a')
            el.href = '#'
            el.innerHTML = i
    
            if (i === pagination.current) {
                el.className = 'on'
            } else {
                el.onclick = (function (i) {
                return function () {
                    pagination.gotoPage(i)
                }
                })(i)
            }
    
            fragment.appendChild(el)
            }
            paginationEl.appendChild(fragment)
        }

        
        function displayMarker(place, name) {
            // 마커를 생성하고 지도에 표시
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });

            kakao.maps.event.addListener(marker, 'mouseover', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출
                infowindow.close();
            });

    
        }

    }, [searchPlace]);

    const onclick = (e) =>{
        let gotoPage = e.place_url;
        window.open(gotoPage);
    }

    return (
        <MapAndListStyle>
        <div id='myMap' style={{
            width: '100%', 
            height: '600px'
        }}></div>
        <div className='list'>
            <div className='list-menu'>{searchPlace}</div>
            <div id="result-list">
                {Places.map((item, i) => (
                <ItemStyle key={i} id="listEl" onClick={e => onclick(item)}>
                    <div >
                    <h4 className='name'>{item.place_name}</h4>
                    {item.road_address_name ? (
                        <div>
                        <span>{item.road_address_name}</span>
                        <span>{item.address_name}</span>
                        </div>
                    ) : (
                        <span>{item.address_name}</span>
                    )}
                    <span>{item.phone}</span>
                    </div>
                </ItemStyle>
                ))}
                <div id="pagination"></div>
            </div>
        </div>
        
        </MapAndListStyle>
        
    );
}

const ItemStyle = styled.div`
display:flex;
padding:16px;
align-items:center;
justify-content:center;


:hover{
    background-color:#f7f7f7;
}

span{
    font-size:14px;
    color:#222222;
}

`;

const MapAndListStyle = styled.div`
display:grid;
grid-template-columns: 2fr 1fr;
padding-bottom: 100px;

#result-list{
    margin-top:60px;
}

.list{
    height: 600px;
    overflow: auto;
}

.list-menu{
    font-size:22px;
    font-weight:600;
    padding:16px;
    background-color: #8bd3dd;
    color:#172c66;
    position:fixed;
    width:500px
    
}

#pagination{
    padding:24px;
    
    a{
        padding: 0 12px;
        text-decoration:none;
        font-weight:600;
        color:#172c66;

       
    }
    .on{
        color: #001858;
    }

    
}
`;

export default Map; 