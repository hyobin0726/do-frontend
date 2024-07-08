import Monster1 from '@/components/images/monsters/Monster1'
import Monster6 from '@/components/images/monsters/Monster6'
import Monster7 from '@/components/images/monsters/Monster7'
import Monster8 from '@/components/images/monsters/Monster8'
import Monster9 from '@/components/images/monsters/Monster9'
import Monster10 from '@/components/images/monsters/Monster10'
import Monster11 from '@/components/images/monsters/Monster11'
import Monster12 from '@/components/images/monsters/Monster12'
import Monster13 from '@/components/images/monsters/Monster13'
import Monster14 from '@/components/images/monsters/Monster14'
import Monster15 from '@/components/images/monsters/Monster15'
import Monster16 from '@/components/images/monsters/Monster16'
import Monster17 from '@/components/images/monsters/Monster17'
import Monster18 from '@/components/images/monsters/Monster18'
import Monster19 from '@/components/images/monsters/Monster19'
import Monster20 from '@/components/images/monsters/Monster20'
import Monster21 from '@/components/images/monsters/Monster21'
import Monster22 from '@/components/images/monsters/Monster22'
import Monster23 from '@/components/images/monsters/Monster23'
import Monster24 from '@/components/images/monsters/Monster24'

export default function SurveyQuestionMonster({ surveyStep }: { surveyStep: number }) {
    return (
        <>
            <div className="absolute bottom-0 w-full h-3/6">
                {surveyStep === 1 && <Monster1 />}
                {surveyStep === 2 && <Monster24 />}
                {surveyStep === 3 && <Monster23 />}
                {surveyStep === 4 && <Monster22 />}
                {surveyStep === 5 && <Monster21 />}
                {surveyStep === 6 && <Monster6 />}
                {surveyStep === 7 && <Monster7 />}
                {surveyStep === 8 && <Monster8 />}
                {surveyStep === 9 && <Monster9 />}
                {surveyStep === 10 && <Monster10 />}
                {surveyStep === 11 && <Monster11 />}
                {surveyStep === 12 && <Monster12 />}
                {surveyStep === 13 && <Monster13 />}
                {surveyStep === 14 && <Monster14 />}
                {surveyStep === 15 && <Monster15 />}
                {surveyStep === 16 && <Monster16 />}
                {surveyStep === 17 && <Monster17 />}
                {surveyStep === 18 && <Monster18 />}
                {surveyStep === 19 && <Monster19 />}
                {surveyStep === 20 && <Monster20 />}
            </div>
        </>
    )
}
