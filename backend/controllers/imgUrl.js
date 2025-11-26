import multer from "multer";
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const imageUrl = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No image file provided" });
  }
  const base64Image = file.buffer.toString("base64");

  const params = new URLSearchParams();
  params.append("image", base64Image);
  const image_res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}&expiration=15552000`,
    {
      method: "POST",
      body: params,
    }
  );

  const image_data = await image_res.json();
  const image_url = image_data.data.display_url;

  if (image_url) {
    req.imgUrl = image_url;
    next();
  } else {
    res.status(401).json({ message: "error in file upload!" });
    return;
  }
};