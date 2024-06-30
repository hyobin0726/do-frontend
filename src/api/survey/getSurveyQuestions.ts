'use server'

export default async function getSurveyQuestions(token: string) {
    const response = await fetch(`${process.env.BASE_URL}/survey-service/v1/users/survey/questions`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    return data
}
