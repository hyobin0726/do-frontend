import { z } from 'zod'

export const FindIdSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: '이름은 최소 1자 이상이어야 합니다.',
        })
        .max(20, {
            message: '이름은 최대 20자 이하이어야 합니다.',
        }),
    email: z.string().email({
        message: '유효한 이메일 주소를 입력해주세요.',
    }),
})

export const FindPasswordSchema = z.object({
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
    name: z
        .string()
        .min(1, {
            message: '이름은 최소 1자 이상이어야 합니다.',
        })
        .max(20, {
            message: '이름은 최대 20자 이하이어야 합니다.',
        }),
    email: z.string().email({
        message: '유효한 이메일 주소를 입력해주세요.',
    }),
})
