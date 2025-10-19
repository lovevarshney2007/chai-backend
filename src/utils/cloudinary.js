import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to safely delete a local file
const safeUnlink = (filePath) => {
  if (!filePath) return;
  try {
    fs.unlinkSync(filePath);
    console.log(`Successfully deleted local file: ${filePath}`);
  } catch (err) {
    console.warn(`Could not delete local file: ${filePath}. Error: ${err.message}`);
  }
};

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    console.log("No local file path provided.");
    return null;
  }

  try {
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log("File uploaded to Cloudinary:", response.secure_url);
    fs.unlinkSync(localFilePath);

    // Delete local file only on successful upload
    safeUnlink(localFilePath);

    return response; // return the Cloudinary response
  } catch (error) {
    console.error("--- CLOUDINARY UPLOAD FAILED ---");
    console.error(error.message);
    console.error("------------------------------");

    // **Do not delete the local file**, so retry is possible
    return null;
  }
};

export { uploadOnCloudinary };
