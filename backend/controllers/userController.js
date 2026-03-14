import User from "../models/User.js";

export const makeAdmin = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.role = "admin";

        await user.save();

        res.json({
            message: "User promoted to admin",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};