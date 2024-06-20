const API_BASE_URL = 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json'

export const getKakaoMapInfo = async (latitude: number, longitude: number) => {
    if (latitude === 0 || longitude === 0) {
        return
    }
    try {
        const response = await fetch(`${API_BASE_URL}?x=${longitude}&y=${latitude}`, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Error fetching location code: ${response.statusText}`)
        }

        const data = await response.json()
        return data.documents[0]
    } catch (error) {
        console.error('Failed to fetch location legal code:', error)
        throw error
    }
}
