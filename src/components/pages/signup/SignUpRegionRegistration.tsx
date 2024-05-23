'use client'

import { useSignUpStore } from '@/hooks/useSignUpStore'

export default function SignUpRegionRegistration() {
    const { name, id, password, confirmPassword, phoneNumber, email, gender, birthDate } = useSignUpStore()

    // console.log('name:', name)
    // console.log('id:', id)
    // console.log('password:', password)
    // console.log('confirmPassword:', confirmPassword)
    // console.log('phoneNumber:', phoneNumber)
    // console.log('email:', email)
    // console.log('gender:', gender)
    // console.log('birthDate:', birthDate)

    return (
        <>
            <div>활동지역 등록 페이지</div>
        </>
    )
}
