import User from "../models/user.model.js";


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
    res.status(500).json({ message: "Internal server error" });
    }
};

export { getUser };