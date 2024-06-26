// import AWS from 'aws-sdk'

// export async function POST(req: Request) {
//     AWS.config.update({
//         region: process.env.AWS_REGION as string,
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
//     })

//     const formData = await req.formData()
//     const files = formData.getAll('img') as File[]
//     // const body = (await files[0].arrayBuffer()) as Buffer

//     const fileName = 'image_' + Date.now() + '_' + files[0].name
//     const params = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME as string,
//         Key: process.env.AWS_S3_BUCKET_NAME + '/' + fileName,
//         Body: files[0],
//         ContentType: 'image',
//         ACL: 'public-read',
//     }
//     try {
//         const data = await new AWS.S3.ManagedUpload({
//             params: params,
//         }).promise()
//         console.log(data)
//         return data
//     } catch (error) {
//         console.log(error)
//         return error
//     }
// }
