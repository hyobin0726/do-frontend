interface MypageDataType {
    category: string
    data: MypageCategoryDataType[]
}

interface MypageCategoryDataType {
    id: number
    name: string
    path?: string
}

export const MypageData: MypageDataType[] = [
    {
        category: '취미',
        data: [
            {
                id: 1,
                name: '설문조사 하기',
                path: '/survey',
            },
            {
                id: 2,
                name: '설문조사 결과',
                path: '/survey/result',
            },
        ],
    },
    {
        category: '소모임',
        data: [
            {
                id: 1,
                name: '활동지역관리',
                path: '/mypage/region',
            },
            {
                id: 2,
                name: '소모임 가입신청 확인',
                path: '/mypage/crew-apply',
            },
        ],
    },
    {
        category: '기타',
        data: [
            {
                id: 1,
                name: '내 가입정보 확인',
                path: '/mypage/infomation',
            },
            {
                id: 2,
                name: '비밀번호 변경',
                path: '/mypage/password-reset',
            },
            {
                id: 3,
                name: '로그아웃',
            },
        ],
    },
]
