import { z } from 'zod'

export const CreateCrewSchema = z.object({
    regionId: z.string().min(1, {
        message: '지역을 선택해주세요.',
    }),
    hobbyId: z.string().min(1, {
        message: '취미를 선택해주세요.',
    }),
    crewName: z
        .string()
        .min(1, {
            message: '크루명은 최소 1자 이상으로 입력해주세요.',
        })
        .max(20, {
            message: '크루명은 최대 20자 이하로 입력해주세요.',
        }),
    introduction: z
        .string()
        .min(1, {
            message: '소개는 최소 1자 이상으로 입력해주세요.',
        })
        .max(200, {
            message: '소개는 최대 200자 이하로 입력해주세요.',
        }),

    joinType: z.union([z.literal(0), z.literal(1)]).refine((value) => [0, 1].includes(value), {
        message: '가입 형식은 자유 가입 또는 신청 가입이어야 합니다.',
    }),
})
