import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./StoreLocation.css";
import { FiSearch } from "react-icons/fi";

const { kakao } = window;

const StoreLocation = () => {
  const [Places, setPlaces] = useState([]);
  const [add, setAdd] = useState("");
  const [gungu, setGungu] = useState([]);
  const [address, setAddress] = useState("");
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const region = {
    서울: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    부산: [
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
    ],
    인천: [
      "계양구",
      "남동구",
      "동구",
      "미추홀구",
      "부평구",
      "서구",
      "연수구",
      "중구",
    ],
    대전: ["대덕구", "동구", "서구", "유성구", "중구"],
    대구: [
      "남구",
      "달서구",
      "달서군",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
    ],
    울산: ["남구", "동구", "북구", "중구", "울주군"],
    광주: ["광산구", "남구", "동구", "북구", "서구"],
    제주: ["서귀포시", "제주시"],
    세종: ["세종특별자치시"],
    경기: [
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "여주시",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
      "가평군",
      "양평군",
      "연천군",
    ],
    강원: [
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
    충북: [
      "제천시",
      "청주시",
      "충주시",
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "증평군",
      "진천군",
    ],
    충남: [
      "계룡시",
      "공주시",
      "논산시",
      "당진시",
      "보령시",
      "서산시",
      "아산시",
      "천안시",
      "금산군",
      "부여군",
      "서천군",
      "예산군",
      "청양군",
      "태안군",
      "홍성군",
    ],
    경북: [
      "경산시",
      "경주시",
      "구미시",
      "김천시",
      "문경시",
      "상주시",
      "안동시",
      "영주시",
      "영천시",
      "포항시",
      "고령군",
      "군위군",
      "봉화군",
      "성주군",
      "영덕군",
      "영양군",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
    ],
    경남: [
      "거제시",
      "김해시",
      "밀양시",
      "사천시",
      "양산시",
      "진주시",
      "창원시",
      "통영시",
      "거창군",
      "고성군",
      "남해군",
      "산청군",
      "의령군",
      "창녕군",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
    전북: [
      "군산시",
      "김제시",
      "남원시",
      "익산시",
      "전주시",
      "정읍시",
      "고창군",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "임실군",
      "장수군",
      "진안군",
    ],
    전남: [
      "광양시",
      "나주시",
      "목포시",
      "순천시",
      "여수시",
      "강진군",
      "고흥군",
      "곡성군",
      "구례군",
      "담양군",
      "무안군",
      "보성군",
      "신안군",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
  };
  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(address + inputText);
    setInputText("");
  };
  function categoryChange(e) {
    setAdd(e.target.value);
  }

  useEffect(() => {
    setGungu(region[add]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add]);
  function gunguChange(e) {
    setAddress(add + e.target.value);
  }

  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // let markers = []
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const container = document.getElementById("myMap");
      const options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 5,
      };

      const map = new kakao.maps.Map(container, options);
      const ps = new kakao.maps.services.Places(map);

      if (!place) {
        ps.categorySearch("CS2", placesSearchCB, { useMapBounds: true });
      } else {
        ps.keywordSearch(place, placesSearchCB);
      }

      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
          // 페이지 목록 보여주는 displayPagination() 추가
          displayPagination(pagination);
          setPlaces(data);
        }
        // 검색결과 목록 하단에 페이지 번호 표시
        function displayPagination(pagination) {
          let paginationEl = document.getElementById("pagination"),
            fragment = document.createDocumentFragment(),
            i;

          // 기존에 추가된 페이지 번호 삭제
          while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
          }

          for (i = 1; i <= pagination.last; i++) {
            let el = document.createElement("a");
            el.href = "#";
            el.innerHTML = i;

            if (i === pagination.current) {
              el.className = "on";
            } else {
              el.onclick = (function (i) {
                return function () {
                  pagination.gotoPage(i);
                };
              })(i);
            }

            fragment.appendChild(el);
          }
          paginationEl.appendChild(fragment);
        }

        // let imageSrc =
        //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";

        // let markerImage = new kakao.maps.MarkerImage(imageSrc);

        function displayMarker(place) {
          let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
          });

          kakao.maps.event.addListener(marker, "click", function () {
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                place.place_name +
                "</div>"
            );
            infowindow.open(map, marker);
          });
        }
      }
    });
  }, [place]);

  return (
    <div className="mapsection">
      <div
        id="myMap"
        style={{
          width: "590px",
          height: "500px",
        }}
      ></div>
      <section className="listSection">
        <form onSubmit={handleSubmit}>
          <ul className="searchbar1">
            <li id="searchwrite">지역명 검색</li>
            <li className="searchunit">
              <select className="searchSelect" onChange={categoryChange}>
                <option value>시/도 선택</option>
                {Object.keys(region).map((el) => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </li>
            <li className="searchunit">
              <select className="searchSelect" onChange={gunguChange}>
                <option>군/구 선택</option>
                {gungu &&
                  gungu.map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
              </select>
            </li>
          </ul>
          <ul className="searchbar2">
            <li id="searchStore">매장명 검색</li>
            <li className="searchunit">
              <input
                id="searchInput"
                onChange={onChange}
                type="text"
                placeholder="매장명을 입력하세요."
              />
            </li>
            <li>
              <button type="submit" className="serchBtn">
                <FiSearch size={30} />
              </button>
            </li>
          </ul>
        </form>
        <Listtitle>
          <Storenameing>매장명</Storenameing>
          <Storeadressing>주소</Storeadressing>
        </Listtitle>
        <div id="result-list">
          {Places.map((item, i) => (
            <div key={i} style={{ marginTop: "20px" }}>
              {/* <span>{i + 1}</span> */}
              <Detail>
                {item.place_name.includes("CU") ? (
                  <CUMaker />
                ) : item.place_name.includes("GS25") ? (
                  <GSMaker />
                ) : item.place_name.includes("세븐일레븐") ? (
                  <SevenMaker />
                ) : (
                  <ETCMaker />
                )}
                <Storename>{item.place_name}</Storename>
                {item.road_address_name ? (
                  <Storeadress>
                    <div>{item.road_address_name}</div>
                    <div>{item.address_name}</div>
                  </Storeadress>
                ) : (
                  <Storeadress>
                    <span>{item.address_name}</span>
                  </Storeadress>
                )}
                {/* <span>{item.phone}</span> */}
              </Detail>
            </div>
          ))}
          <div id="pagination"></div>
        </div>
      </section>
    </div>
  );
};

export default StoreLocation;

const Listtitle = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  background: #e9f1ff;
`;

const Storenameing = styled.div`
  width: 45%;
  font-weight: 500;
  color: #0946bf;
`;

const Storeadressing = styled.div`
  width: 60%;
  font-weight: 500;
  color: #0946bf;
`;

const Storename = styled.div`
  width: 40%;
  text-align: center;
  font-size: 16px;
  color: #454545;
`;
const Storeadress = styled.div`
  width: 60%;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #454545;
`;
const Detail = styled.div`
  display: flex;
`;
const CUMaker = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 13px;
  background-color: #9e10e1;
  margin-left: 20px;
`;
const GSMaker = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 13px;
  margin-left: 20px;
  background-color: #4eabef;
`;
const SevenMaker = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 13px;
  margin-left: 20px;
  background-color: #0c8f41;
`;

const ETCMaker = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 13px;
  margin-left: 20px;
  background-color: #aeaeb2;
`;
