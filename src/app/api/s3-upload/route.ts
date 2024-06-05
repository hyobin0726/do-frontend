import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
    },
})

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const files = formData.getAll('img') as File[]
        const body = (await files[0].arrayBuffer()) as Buffer
        const fileName = 'image_' + Date.now() + '_' + files[0].name
        s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME as string,
                Key: fileName,
                Body: body,
                ContentType: 'image',
            }),
        )
        const imgUrl = await getSignedUrl(
            s3Client,
            new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME as string,
                Key: fileName,
            }),
            { expiresIn: 3600 },
        )

        // console.log(imgUrl)

        return Response.json({ message: 'OK', imgUrl: imgUrl })
    } catch (error) {
        return Response.error()
    }
}
