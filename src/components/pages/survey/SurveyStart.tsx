'use client'

import Link from 'next/link'

import SurveyHeader from './SurveyHeader'
import HOBBINGLogo from '@/components/images/HOBBINGLogo'
import Monster1 from '@/components/images/monsters/Monster1'
import Start from '@/components/images/Start'

interface surveyQuestions {
    questionId: number
    question: string
    questionType: string
}

export default function SurveyStart({
    surveyFrom,
    surveyQuestions,
}: {
    surveyFrom: number
    surveyQuestions: surveyQuestions[]
}) {
    return (
        <>
            {surveyFrom > 0 && surveyFrom < 3 && <SurveyHeader surveyFrom={surveyFrom} surveyStep={0} />}
            <main
                className={`w-full ${surveyFrom > 0 && surveyFrom < 3 ? 'h-[calc(100dvh-60px)]' : 'h-dvh'} bg-hobbing-bg-pink px-10 flex flex-col justify-between space-y-10`}
            >
                <section className="w-full h-[50dvh] flex justify-center items-end">
                    <div className="w-2/3 h-2/3 mb-10">
                        <HOBBINGLogo />
                    </div>
                </section>
                <section className="w-full h-[20dvh] flex justify-center items-end">
                    <Link
                        href={`/survey?step=1&from=${surveyFrom}`}
                        passHref
                        scroll={false}
                        onClick={() => sessionStorage.setItem('surveyQuestions', JSON.stringify(surveyQuestions))}
                        className="w-[230px] h-[80px] mb-10 px-8 bg-hobbing-red rounded-full flex justify-center items-center"
                    >
                        <Start />
                    </Link>
                </section>
                <section className="w-full h-[30dvh] overflow-hidden flex justify-center relative">
                    <div className="w-full h-full absolute -bottom-10">
                        <Monster1 />
                    </div>
                </section>
            </main>
        </>
    )
}
