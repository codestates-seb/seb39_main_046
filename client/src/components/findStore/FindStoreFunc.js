import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import region from "../../assets/data/findStore/FindRegion";

const { kakao } = window;

const StoreLocation = () => {
    const [Places, setPlaces] = useState([]);
    const [add, setAdd] = useState("");
    const [gungu, setGungu] = useState([]);
    const [address, setAddress] = useState("");
    const [inputText, setInputText] = useState("");
    const [place, setPlace] = useState("");

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
                            '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>",
                        );
                        infowindow.open(map, marker);
                    });
                }
            }
        });
    }, [place]);

    return (
        <MapContainer>
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
                                </Detail>
                            </div>
                        ))}
                        <div id="pagination"></div>
                    </div>
                </section>
            </div>
        </MapContainer>
    );
};

export default StoreLocation;
const MapContainer = styled.section`
    #result-list {
        height: 300px;
        overflow: auto;
    }

    #pagination {
        margin-top: 3rem;
    }

    #pagination a {
        color: black;
        font-size: 20px;
        text-decoration: none;
        margin: 0 10px;
    }

    #pagination a.on {
        color: lightblue;
        font-weight: bold;
    }

    #searchwrite {
        margin-right: 36px;
        font-weight: 700;
        color: #000000;
    }

    #searchStore {
        margin-right: 36px;
        font-weight: 700;
    }

    #myMap {
        border-radius: 30px;
    }

    #searchInput {
        width: 420px;
        border: 0 solid black;
        background: #f2f2f2;
        border-radius: 35px;
        padding: 13px 16px;
    }
    .serchBtn {
        border: none;
        background-color: transparent;
        padding-top: 3px;
    }
    #pagination {
        text-align: center;
    }

    .mapsection {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 18px;
        margin-bottom: 150px;
    }

    .detailContent {
        width: 100%;
    }

    .listSection {
        width: 50%;
        height: 500px;
        margin-left: 30px;
    }

    .searchbar1 {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
    }

    .searchbar2 {
        display: flex;
        width: 100%;
        height: 40px;
        margin-top: 18px;
        margin-bottom: 46px;
        line-height: 40px;
    }

    .searchunit {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 36px;
        border-radius: 35px;
    }

    .searchSelect {
        border: none;
        font-weight: 400;
        font-size: 14px;
        line-height: 100%;
        background-color: rgba(242, 242, 242, 1);
        padding: 13px 16px;
        border-radius: 35px;
    }
`;

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
