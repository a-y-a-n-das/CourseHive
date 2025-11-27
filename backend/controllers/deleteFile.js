import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const deleteFile = async (req, res) => {
  const file = req.body.file;

  console.log("Deleting file:", file);
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file,
    });
    await s3Client.send(command);
    res.status(200).json({ message: "File deleted successfully." });
  } catch (err) {
    console.log("Error deleting file", err);
    res.status(500).json({ error: "Error deleting file" });
  }
};
