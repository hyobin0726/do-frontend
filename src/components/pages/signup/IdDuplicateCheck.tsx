import Alert from '@/components/common/Alert'
import { useState, useEffect } from 'react'

interface IdDuplicateCheckProps {
    id: string
    isIdDuplicateCheckOpen: boolean
    onAlertChange: () => void
    onIdAvailableCheck: () => void
}

export default function IdDuplicateCheck({
    id,
    isIdDuplicateCheckOpen,
    onAlertChange,
    onIdAvailableCheck,
}: IdDuplicateCheckProps) {
    const [idUseable, setIdUseable] = useState<boolean>(false)

    useEffect(() => {
        const checkId = async () => {
            if (isIdDuplicateCheckOpen) {
                const isAvailable = await checkIdDuplicate(id)
                setIdUseable(isAvailable)
                if (isAvailable) {
                    onIdAvailableCheck()
                    console.log('아이디 사용 가능 + 다음 버튼 활성화')
                }
            }
        }

        checkId()
    }, [isIdDuplicateCheckOpen])

    const checkIdDuplicate = async (id: string): Promise<boolean> => {
        // 여기에 실제 아이디 중복 확인 로직을 추가하세요.
        // 사용가능한 아이디이면 true, 그렇지 않으면 false를 반환합니다.
        console.log('checkIdDuplicate', id)
        // 예시: 서버로부터 응답을 받는 코드
        // const response = await fetch(`/api/check-id?id=${id}`)
        // const data = await response.json()
        // return data.isAvailable

        // 임시로 항상 true를 반환합니다.
        // return new Promise((resolve) => setTimeout(() => resolve(true), 1000))
        return true
    }
    return idUseable ? (
        <Alert type="success" isAlertOpen={isIdDuplicateCheckOpen}>
            <p className="font-Pretendard text-balance text-center text-[15px]">
                <span className="font-Pretendard text-hobbing-red font-bold">{id}</span>
                은(는)
                <br />
                사용할 수 있는 아이디입니다.
            </p>
            <button
                onClick={onAlertChange}
                className="bg-hobbing-red rounded-xl w-1/2 h-[40px] flex justify-center items-center"
            >
                <p className="font-Pretendard text-white font-bold text-[15px]">확인</p>
            </button>
        </Alert>
    ) : (
        <Alert type="warning" isAlertOpen={isIdDuplicateCheckOpen}>
            <p className="font-Pretendard text-balance text-center text-[15px]">
                <span className="font-Pretendard text-hobbing-red font-bold">{id}</span>
                은(는)
                <br />
                사용할 수 없는 아이디입니다.
                <br />
                다시 입력해주세요.
            </p>
            <button
                onClick={onAlertChange}
                className="bg-hobbing-red rounded-xl w-1/2 h-[40px] flex justify-center items-center"
            >
                <p className="font-Pretendard text-white font-bold text-[15px]">확인</p>
            </button>
        </Alert>
    )
}
