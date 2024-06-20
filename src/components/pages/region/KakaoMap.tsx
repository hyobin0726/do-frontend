import React, { useEffect, useState } from 'react'

declare global {
    interface Window {
        kakao: any
    }
}

interface KakaoMapProps {
    currentLatitude: number
    currentLongitude: number
    selectedRange: number
    onRegionChange: (regionName: string, regionCode: number, regionLatitude: number, regionLongitude: number) => void
}

export default function KakaoMap({ currentLatitude, currentLongitude, selectedRange, onRegionChange }: KakaoMapProps) {
    const [map, setMap] = useState<any>(null)
    const [marker, setMarker] = useState<any>(null)
    const [circle, setCircle] = useState<any>(null)

    useEffect(() => {
        // 카카오 지도 API 로드 후 초기화
        window.kakao.maps.load(() => {
            getLocationInfo(currentLatitude, currentLongitude)

            const container = document.getElementById('map')
            const options = {
                center: new window.kakao.maps.LatLng(currentLatitude, currentLongitude),
                level: selectedRange === 3000 ? 7 : selectedRange === 5000 ? 8 : selectedRange === 7000 ? 9 : 9,
            }

            const newMap = new window.kakao.maps.Map(container, options)
            const newMarker = new window.kakao.maps.Marker()

            newMap.setZoomable(false)
            newMap.setDraggable(false)

            setMap(newMap)
            setMarker(newMarker)

            const markerImageUrl =
                'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1717756574833_Group+1000001930.png' // 마커 이미지 URL
            const markerImageSize = new window.kakao.maps.Size(30, 38) // 마커 이미지 크기 설정
            const markerImage = new window.kakao.maps.MarkerImage(markerImageUrl, markerImageSize)

            // 기존 마커를 제거하고 새로운 마커를 추가
            newMarker.setMap(null)
            newMarker.setPosition(options.center)
            newMarker.setImage(markerImage) // 마커 이미지 설정
            newMarker.setMap(newMap)

            // 현재 위치에 원을 생성
            const newCircle = new window.kakao.maps.Circle({
                center: options.center, // 원의 중심좌표
                radius: selectedRange, // 미터 단위의 원의 반지름
                strokeWeight: 2, // 선의 두께
                strokeColor: '#F76D67', // 선의 색깔
                strokeOpacity: 1, // 선의 불투명도
                strokeStyle: 'solid', // 선의 스타일
                fillColor: '#FFDBD7', // 채우기 색깔
                fillOpacity: 0.3, // 채우기 불투명도
            })

            // 지도에 원을 표시
            newCircle.setMap(newMap)
            setCircle(newCircle)
        })
    }, [selectedRange])

    const getLocationInfo = async (latitutude: number, longitute: number) => {
        const res = await fetch(
            `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitute}&y=${latitutude}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
                },
            },
        )
        const data = await res.json()
        const regionName = data.documents[0].region_2depth_name + ' ' + data.documents[0].region_3depth_name
        onRegionChange(regionName, data.documents[0].code, data.documents[0].y, data.documents[0].x)
    }

    return <div id="map" className="w-full h-full" />
}
