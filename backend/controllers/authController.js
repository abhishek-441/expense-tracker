// const User = require('../models/User')

// const jwt = require("jsonwebtoken");;

// //Generate JWT token
// const generateToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
// };

// //Register User
// exports.registerUser = async (req, res) => {
//     const { fullName, email, password, profileImageUrl } = req.body;

//     // validastion check for missing fields

//     if(!fullName || !email || !password) {
//         return res.status(400).json({message: "All fields are required"});
//     }

//     try {
//         //check if email already exists
//         const existingUser = await User.findOne({ email });
//         if(existingUser) {
//             return res.status(400).json({ message: "Email already exist"});
//         }

//         // Create the User
//         const user = await User.create({
//             fullName,
//             email,
//             password,
//             profileImageUrl,
//         });

//         res.status(201).json({
//             id: user.id,
//             user,
//             token: generateToken(user._id),
//         });
//     } catch (err) {
//         res
//         .status(500)
//         .json({message: "Error registering user", error: err.message});
//     }
// };

// //LOgin User
// exports.loginUser = async (req, res) => {};

// // getUserInfo  
// exports.getUserInfo = async (req, res) => {};











const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    // Log body for debugging
    console.log("REQ BODY:", req.body);

    const { fullName, email, password, profileImageUrl } = req.body;

    // Validation check for missing fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create the user
    const user = await User.create({
      fullName,
      email,
      password, // hash this before saving
      profileImageUrl,
    });

    // Respond with user + token
    // res.status(201).json({
    //   id: user._id,
    //   fullName: user.fullName,
    //   email: user.email,
    //   token: generateToken(user._id),
    // });

res.status(201).json({
  success: true,
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
  },
  token: generateToken(user._id),
});

  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};
//Login User
exports.loginUser = async (req, res) => {
    const {email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({ message: "Invalid credentials "})
        }

    res.status(200).json({
        id: user._id,
        user,
        token: generateToken(user._id),
    });
} catch (err) {
    res
    .status(500)
    .json({ message: "Error registering user", error: err.message })
}
};

// get User Info  
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }catch (err) {
    res
    .status(500)
    .json({ message: "Error registering user", error: err.message});

  }
};