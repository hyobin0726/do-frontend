'use client'
import BasicNextButton from '@/components/common/BasicNextButton'

export default function LoginButton() {
    return (
        <div
            onClick={() => {
                console.log('click')
            }}
        >
            <BasicNextButton text="로그인" theme="red" />
        </div>
    )
}
