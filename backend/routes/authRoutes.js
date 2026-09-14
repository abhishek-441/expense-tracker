// const express = require("express");
// const { protect } = require("../middleware/authMiddleware");

// const {
//     registerUser,
//     loginUser,
//     getUserInfo,
// } = require("../controllers/authController");
// const upload = require("../middleware/uploadMiddleware");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/getUser", protect, getUserInfo);


// router.post("/upload_image",upload.single("image"), (req, res) => {
//     if(!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//     };

//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     res.status(200).json({ imageUrl });
// });
// module.exports = router;




const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload_image", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "expense-tracker/profile-images",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(req.file.buffer);
        });

        res.status(200).json({
            imageUrl: result.secure_url,
        });

    } catch (error) {
        console.error("Cloudinary upload error:", error);

        res.status(500).json({
            message: "Image upload failed",
        });
    }
});

module.exports = router;