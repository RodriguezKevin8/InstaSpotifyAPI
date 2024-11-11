import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let resourceType = "image";
    if (file.mimetype.startsWith("audio")) {
      resourceType = "raw";
    }
    return {
      folder: "songs",
      resource_type: resourceType,
      allowed_formats: ["jpg", "png", "mp3", "wav"],
    };
  },
});

export { cloudinary, storage };
