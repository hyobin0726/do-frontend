export default function getCurrentPos() {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            console.log(pos)
            return pos
        },
        () => alert('위치 정보를 가져오는데 실패했습니다.'),
        {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000,
        },
    )
}
