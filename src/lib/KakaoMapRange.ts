interface KakaoMapRangeType {
    id: number
    range: number
    name: string
}

export const KakaoMapRange: KakaoMapRangeType[] = [
    {
        id: 1,
        range: 3000,
        name: '가까운 동네',
    },
    {
        id: 2,
        range: 5000,
        name: '조금 가까운 동네',
    },
    {
        id: 3,
        range: 7000,
        name: '조금 먼 동네',
    },
    {
        id: 4,
        range: 10000,
        name: '먼 동네',
    },
]
