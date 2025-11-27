import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const getUploadUrl = async (req, res) => {
    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
    try{
    const {file, fileType} = req.body;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `content/${file}`,
    ContentType: fileType,
  })

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 }); // 5 minutes
    res.status(200).json({ uploadUrl });
    }catch(err){
        console.log("Error generating upload URL", err);
        res.status(500).json({ error: "Error generating upload URL" });
    }
}