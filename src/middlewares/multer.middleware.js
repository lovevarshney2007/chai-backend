// import multer  from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp")
//   },
//   filename: function (req, file, cb) {
//      console.log("FIELD RECEIVED:", file.fieldname); // 👈 Add this
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.originalname)
//   }
// })

// export const upload = multer({
//     storage,
// })

import multer from "multer";
import path from "path"; // Path module for extension utility

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    console.log("FIELD RECEIVED:", file.fieldname);

    // FIX: Generate a unique filename to avoid collision on upload failure
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Extract the original file extension
    const fileExtension = path.extname(file.originalname); // Use fieldname + unique suffix + original extension

    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

export const upload = multer({
  storage,
});
