// // src/utils/cloudinary.js

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// // path module is useful for general path handling,
// // though we'll use localFilePath directly for deletion.
// import path from "path";

// // 🚨 Cloudinary config se pehle check karein
// console.log("CLOUDINARY_API_KEY value:", process.env.CLOUDINARY_API_KEY ? "LOADED" : "NOT FOUND");

// // 1. Cloudinary Configuration (Ensure .env is loaded correctly in index.js)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   // Check 1: Is a path provided?
//   if (!localFilePath) {
//     console.log("No local file path provided.");
//     return null;
//   } // Helper function to safely delete the local file

//   const safeUnlink = (path) => {
//     try {
//       // 2. FIX: Use the path directly as provided by Multer/req.files
//       fs.unlinkSync(path);
//       console.log(`Successfully deleted local file: ${path}`);
//     } catch (unlinkError) {
//       // Log a warning if deletion fails (e.g., if file was never saved or is already gone)
//       console.warn(
//         `Could not delete local file: ${path}. Error: ${unlinkError.message}`
//       );
//     }
//   };

//   try {
//     // Upload the file on Cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     }); // File has been uploaded successfully

//     console.log("File is uploaded on cloudinary:", response.url); // 3. Clean up: Delete the local file after successful upload

//     safeUnlink(localFilePath);
//     return response;
//   } catch (error) {
//     // Cloudinary upload failed (likely due to missing API keys)
//     console.error("--- CLOUDINARY UPLOAD FAILED ---");
//     console.error(error.message);
//     console.error("------------------------------"); // 4. Clean up: Delete the local file even if upload fails

//     safeUnlink(localFilePath);
//     return null;
//   }
// };

// export { uploadOnCloudinary };

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Cloudinary Configuration: Now that the .env spelling is fixed, this will work.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  // Check 1: Is a path provided?
  if (!localFilePath) {
    console.log("No local file path provided.");
    return null;
  } // Helper function to safely delete the local file

  const safeUnlink = (path) => {
    try {
      // Use the path directly as provided by Multer/req.files
      fs.unlinkSync(path);
      console.log(`Successfully deleted local file: ${path}`);
    } catch (unlinkError) {
      // Log a warning if deletion fails (which won't happen now since we fixed the filename collision)
      console.warn(
        `Could not delete local file: ${path}. Error: ${unlinkError.message}`
      );
    }
  };

  try {
    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File is uploaded on cloudinary:", response.url); // Clean up: Delete the local file after successful upload
    safeUnlink(localFilePath);
    return response;
  } catch (error) {
    // Log Cloudinary failure (now hopefully due to connection/internet, not API keys)
    console.error("--- CLOUDINARY UPLOAD FAILED ---");
    console.error(error.message);
    console.error("------------------------------"); // Clean up: Delete the local file even if upload fails

    safeUnlink(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
