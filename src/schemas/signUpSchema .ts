import { z } from 'zod'

export const signUpStep2Schema = z
    .object({
        name: z
            .string()
            .min(1, {
                message: '이름은 최소 1자 이상이어야 합니다.',
            })
            .max(20, {
                message: '이름은 최대 20자 이하이어야 합니다.',
            }),
        id: z
            .string()
            .min(8, {
                message: '아이디는 영문/숫자 8자 이상 20자 이하로 입력해주세요.',
            })
            .max(20, {
                message: '아이디는 영문/숫자 8자 이상 20자 이하로 입력해주세요.',
            })
            .regex(/^[a-zA-Z0-9]+$/, {
                message: '아이디는 영문과 숫자로만 이루어져야 합니다.',
            }),
        password: z
            .string()
            .min(8, {
                message: '비밀번호는 영문/숫자 8자 이상 20자 이하로 입력해주세요.',
            })
            .max(20, {
                message: '비밀번호는 영문/숫자 8자 이상 20자 이하로 입력해주세요.',
            })
            .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, {
                message: '비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다.',
            }),
        confirmPassword: z
            .string()
            .min(8, {
                message: '비밀번호 확인은 영문/숫자 8자 이상 20자 이하로 입력해주세요.',
            })
            .max(20, {
                message: '비밀번호 확인은 영문/숫자 8자 이상 20자 이하로 입력해주세요.',
            })
            .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, {
                message: '비밀번호 확인은 영어, 숫자, 특수문자를 모두 포함해야 합니다.',
            }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '입력하신 비밀번호와 일치하지 않습니다.',
                path: ['confirmPassword'],
            })
        }
    })

export const signUpStep3Schema = z.object({
    phoneNumber: z
        .string()
        .min(10, {
            message: '전화번호는 10자 이상 11자 이하로 입력해주세요',
        })
        .max(11, {
            message: '전화번호는 10자 이상 11자 이하로 입력해주세요',
        }),
    email: z.string().email({
        message: '유효한 이메일 주소를 입력해주세요.',
    }),
    gender: z
        .string()
        .min(4, {
            message: '성별을 입력해주세요.',
        })
        .max(6, {
            message: '성별을 정확히 입력해주세요.',
        }),
    birthDate: z.string().length(10, {
        message: '생년월일은 YYYY-MM-DD 형식으로 정확히 10자여야 합니다.',
    }),
})
