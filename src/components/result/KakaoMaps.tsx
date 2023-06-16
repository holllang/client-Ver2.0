import React, { useEffect, useRef, useState } from 'react';
import Marker1 from '@public/static/marker1.svg';
import Marker2 from '@public/static/marker2.svg';
import Marker3 from '@public/static/marker3.svg';
import { CONFIG } from '@config';

function KakaoMaps({ hobbyName }: { hobbyName: string }) {
  const container = useRef(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [roundHobbies, setRoundHobbies] = useState<any[]>();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${CONFIG.KAKAO_APP_KEY}&libraries=services&autoload=false`;
    script.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild(script);
  }, []);
  navigator.geolocation;

  useEffect(() => {
    if (!mapLoaded) return;
    const { kakao } = window;
    kakao.maps.load(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude,
            ),
            level: 5,
          };

          const map = new kakao.maps.Map(container, options);
          const ps = new kakao.maps.services.Places(map);
          ps.keywordSearch('헬스', placesSearchCB, {
            useMapBounds: true,
          });

          function placesSearchCB(data: any, status: any) {
            if (status === kakao.maps.services.Status.OK) {
              setRoundHobbies(data);
              for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
              }
            }
          }

          function displayMarker(place: any) {
            const marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.y, place.x),
            });

            kakao.maps.event.addListener(marker, 'click', function () {
              infowindow.setContent(
                '<div style="padding:5px;font-size:12px;">' +
                  place.place_name +
                  '</div>',
              );
              infowindow.open(map, marker);
            });
          }
        });
      }
    });
  }, [mapLoaded]);

  const getMarker = (index: number): React.ReactNode => {
    switch (index) {
      case 0:
        return <Marker1></Marker1>;
      case 1:
        return <Marker2></Marker2>;
      case 2:
        return <Marker3></Marker3>;
      default:
        return <Marker1></Marker1>;
    }
  };

  return (
    <div>
      <div id="map" ref={container} className="h-[15.9375rem] w-full"></div>
      <div>
        <p className="mb-8 mt-24 text-[1.5rem] font-semibold text-main-4">
          주변 위치 추천
        </p>
        <div className="flex flex-col gap-4">
          {roundHobbies
            ?.filter((item: any, index: number) => {
              if (index < 3) return item;
            })
            .map((hobby: any, index: number) => {
              return (
                <button
                  className="flex items-center rounded-[1.875rem] bg-sub-1 py-4 px-9 text-[1.125rem] font-normal text-gray-6"
                  key={hobby.id}
                >
                  <div>{getMarker(index)}</div>
                  <p className="w-full text-center">{hobby.place_name}</p>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default KakaoMaps;
