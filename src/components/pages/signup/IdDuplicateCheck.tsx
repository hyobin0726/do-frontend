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
    const [idDuplicationCheckMessage, setIdDuplicationCheckMessage] = useState<string>('')

    useEffect(() => {
        const checkId = async () => {
            if (isIdDuplicateCheckOpen) {
                const isAvailable = await checkIdDuplicate(id)
                setIdUseable(isAvailable)
                if (isAvailable) {
                    onIdAvailableCheck()
                }
            }
        }

        checkId()
    }, [isIdDuplicateCheckOpen])

    const checkIdDuplicate = async (id: string) => {
        const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/non-users/duplication?loginId=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        console.log(data)
        setIdUseable(data.isSuccess)
        setIdDuplicationCheckMessage(data.message)
        return data.isSuccess
    }
    return (
        <Alert type={idUseable ? 'success' : 'warning'} isAlertOpen={isIdDuplicateCheckOpen}>
            <p className="font-Pretendard text-balance text-center text-[15px]">
                <span className="font-Pretendard text-hobbing-red font-bold">{id}</span>
                은(는)
                <br />
                {idDuplicationCheckMessage}
                {!idUseable && (
                    <>
                        <br />
                        다시 입력해주세요.
                    </>
                )}
            </p>
            <button
                onClick={onAlertChange}
                className="bg-hobbing-red rounded-xl w-[40%] h-[40px] flex justify-center items-center"
            >
                <p className="font-Pretendard text-white font-bold text-[15px]">확인</p>
            </button>
        </Alert>
    )
}
