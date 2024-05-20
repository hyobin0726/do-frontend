// 'use client'

// import React from 'react'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'

// import { Button } from '@/components/ui/button'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Input } from '@/components/ui/input'

// const signUpSchema = z.object({
//     id: z
//         .string()
//         .min(8, {
//             message: '아이디는 영문/숫자 8자 이상 20자 이하로 입력해주세요.',
//         })
//         .max(20, {
//             message: '아이디는 영문/숫자 8자 이상 20자 이하로 입력해주세요.',
//         }),
//     password: z.string().min(6),
//     confirmPassword: z.string().min(6),
//     name: z.string().min(3).max(20),
//     phoneNumber: z.string().min(10).max(10),
//     email: z.string().email(),
//     gender: z.string().min(4).max(6),
//     birthDate: z.string().min(10).max(10),
// })

// export default function SignUpForm() {
//     const form = useForm()

//     const signUpForm = useForm<z.infer<typeof signUpSchema>>({
//         resolver: zodResolver(signUpSchema),
//         defaultValues: {
//             id: '',
//             password: '',
//             confirmPassword: '',
//             name: '',
//             phoneNumber: '',
//             email: '',
//             gender: '',
//             birthDate: '',
//         },
//     })

//     function onSubmit(data: z.infer<typeof signUpSchema>) {
//         console.log(data)
//     }

//     return (
//         <Form {...form}>
//             <form
//                 onSubmit={form.handleSubmit((data) => {
//                     onSubmit(data)
//                 })}
//                 className="space-y-5"
//             >
//                 <FormField
//                     control={form.control}
//                     name="id"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel className="font-Pretendard text-[15px] font-bold">ID</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     className="font-Pretendard text-[13px]"
//                                     placeholder="아이디를 입력해주세요"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel className="font-Pretendard text-[15px] font-bold">Password</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     className="font-Pretendard text-[13px]"
//                                     placeholder="비밀번호를 입력해주세요"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="confirmPassword"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel className="font-Pretendard text-[15px] font-bold">Confirm Password</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     className="font-Pretendard text-[13px]"
//                                     placeholder="비밀번호를 다시 입력해주세요"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel className="font-Pretendard text-[15px] font-bold">Name</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     className="font-Pretendard text-[13px]"
//                                     placeholder="이름을 입력해주세요"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="phoneNumber"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel className="font-Pretendard text-[15px] font-bold">Phone Number</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     className="font-Pretendard text-[13px]"
//                                     placeholder="전화번호를 입력해주세요"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel className="font-Pretendard text-[15px] font-bold">Email</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     className="font-Pretendard text-[13px]"
//                                     placeholder="이메일을 입력해주세요"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="type"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel className="font-Pretendard text-[15px] font-bold">Gender</FormLabel>
//                             <FormControl>
//                                 <RadioGroup
//                                     onValueChange={field.onChange}
//                                     defaultValue="male"
//                                     className="flex flex-row items-center justify-around"
//                                 >
//                                     <FormItem className="flex items-center space-x-2 space-y-0  has-[:checked]:text-hobbing-red">
//                                         <FormControl>
//                                             <RadioGroupItem value="male" className="bg-white" />
//                                         </FormControl>
//                                         <FormLabel className="font-Pretendard text-[15px] ">남자</FormLabel>
//                                     </FormItem>
//                                     <FormItem className="flex items-center space-x-2 space-y-0  has-[:checked]:text-hobbing-red">
//                                         <FormControl>
//                                             <RadioGroupItem value="female" className="bg-white" />
//                                         </FormControl>
//                                         <FormLabel className="font-Pretendard text-[15px] ">여자</FormLabel>
//                                     </FormItem>
//                                 </RadioGroup>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button type="submit" className="bg-hobbing-red text-white">
//                     SignUp
//                 </Button>
//             </form>
//         </Form>
//     )
// }
