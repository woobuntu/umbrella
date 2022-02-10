import { makeStyles } from "@material-ui/styles";
import ContainerWithZindex1 from "atoms/Container/ContainerWithZindex1";
import BaseParallax from "atoms/Parallax/BaseParallax";
import React, { Fragment, useEffect, useRef } from "react";
import { getIsMobile } from "utils";
const useStyles = makeStyles({
  bigMap: {
    height: "100vh",
    maxHeight: "65vh",
    width: "100%",
    display: "block",
  },
});

export default function ContactUs() {
  const classes = useStyles();
  const mapRef = useRef();

  const { naver } = window;

  const mapOptions = {
    center: new naver.maps.LatLng(37.3790665, 126.9729814),
    zoom: 15,
    scaleControl: false,
    logoControl: false,
    mapDataControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: naver.maps.Position.RIGHT_CENTER,
    },
    minZoom: 6,
  };
  const logoSrc =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/navigation-removebg-preview.png";
  useEffect(() => {
    if (mapRef.current) {
      const routeWebSrc =
        "https://map.naver.com/v5/directions/-/14134567.633951765,4492076.305050787,%ED%95%A8%EA%BB%98%EC%93%B0%EB%8A%94%EC%9A%B0%EC%82%B0,1591409074,PLACE_POI/-/transit?c=14134567.6339518,4492076.3050508,15,0,0,0,dh";
      const routeMobileSrc =
        "https://m.search.naver.com/search.naver?query=%EB%B9%A0%EB%A5%B8%EA%B8%B8%EC%B0%BE%EA%B8%B0&nso_path=placeType%5Eplace%3Bname%5E%3Baddress%5E%3Blongitude%5E%3Blatitude%5E%3Bcode%5E%7Ctype%5Eplace%3Bname%5E%ED%95%A8%EA%BB%98%EC%93%B0%EB%8A%94%EC%9A%B0%EC%82%B0%3Baddress%5E%3Blongitude%5E126.9729814%3Blatitude%5E37.3790665%3Bcode%5E%7Cobjtype%5Epath%3Bby%5Epubtrans";
      const routeSrc = getIsMobile() ? routeMobileSrc : routeWebSrc;
      const map = new naver.maps.Map(mapRef.current, mapOptions);
      const customMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3790665, 126.9729814),
        map,
        icon: {
          content: `<a href="${routeSrc}"><img src="${logoSrc}" style="display: block; position: absolute; width: 4rem; left: -2rem; top: -2rem;" /></a>`,
        },
      });
    }
  }, [mapRef.current]);

  return (
    <Fragment>
      <div ref={mapRef} className={classes.bigMap}></div>
      <ContainerWithZindex1>
        <a
          href="https://www.flaticon.com/free-icons/navigation"
          title="navigation icons"
        >
          Navigation icons created by Flat Icons - Flaticon
        </a>
      </ContainerWithZindex1>
    </Fragment>
  );
}
