import User from "../models/user.model.js";
import { uploadInCloudinary } from "../config/cloudnary.js";


const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log("Fetching user with ID:", userId);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user, message: "User fetched successfully" });
    } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Error fetching user" });
    }
};

const updateAssistant = async (req, res) => {
  try{
    const { assistantName, imageUrl } = req.body;
    let assistantImage;

    if(req.file){
       const uploadResult = await uploadInCloudinary(req.file.path);
      assistantImage = uploadResult.url;
    } else {
      assistantImage = imageUrl;
    }

    const updatedAssistant = await User.findByIdAndUpdate(
      req.user.userId,
      { assistantName: assistantName, assistantImage: assistantImage },
      { new: true }
    ).select("-password");

    res.status(200).json({ data: updatedAssistant, message: "Assistant updated successfully" });
  } catch(err){
    console.log("Error updating assistant:", err);
    res.status(500).json({ message: "Error updating assistant" });
  }
}

export { getUser, updateAssistant };