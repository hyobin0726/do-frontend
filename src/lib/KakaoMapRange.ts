interface KakaoMapRangeType {
    id: number
    selectRange: number
    range: number
    name: string
}

export const KakaoMapRange: KakaoMapRangeType[] = [
    {
        id: 1,
        selectRange: 3,
        range: 3000,
        name: '가까운 지역',
    },
    {
        id: 2,
        selectRange: 5,
        range: 5000,
        name: '조금 가까운 지역',
    },
    {
        id: 3,
        selectRange: 7,
        range: 7000,
        name: '조금 먼 지역',
    },
    {
        id: 4,
        selectRange: 10,
        range: 10000,
        name: '먼 지역',
    },
]
