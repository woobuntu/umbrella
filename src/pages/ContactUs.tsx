import React, { useEffect } from "react";
require("dotenv").config();

declare global {
  interface Window {
    naver: any;
  }
}

const contentString = [
  '<div class="iw_inner">',
  "   <h3>장애인복지법인 함께쓰는우산</h3>",
  "   <p>경기 의왕시 갈미2로 30(내손동 750) 미광프라자 401호</p>",
  "   <a href='https://m.map.naver.com/directions/?ename=함께쓰는우산&ex=126.9729814&ey=37.3790665' target='_blank'>네이버 지도로 길찾기</a><br />",
  // 길찾기 아이콘 추가
  "   <p>문의메일 : withus1030@naver.com</p>",
  "   <p>고객센터 : 031-342-1030</p>",
  "</div>",
].join("");

const ContactUs = () => {
  // third-party api 호출은 이후 서버 단으로 옮겨야 함
  useEffect(() => {
    const script = document.createElement("script");

    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_STATIC_MAP_CLIENT_ID}`;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      const { naver } = window;

      const coordinates = new naver.maps.LatLng(37.3790665, 126.9729814);

      const mapOptions = {
        center: coordinates,
        zoom: 15,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
        zoomControl: true,
        minZoom: 6,
      };

      const map = new naver.maps.Map("map", mapOptions);

      const marker = new naver.maps.Marker({
        position: coordinates,
        map: map,
      });

      const infowindow = new naver.maps.InfoWindow({
        content: contentString,
      });

      naver.maps.Event.addListener(marker, "click", () =>
        infowindow.getMap() ? infowindow.close() : infowindow.open(map, marker)
      );

      infowindow.open(map, marker);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "30rem" }}></div>
    </>
  );
};

export default ContactUs;
