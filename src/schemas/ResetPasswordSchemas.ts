import { z } from 'zod'

export const ResetPasswordSchemas = z
    .object({
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
