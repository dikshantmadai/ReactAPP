import Users from "../models/userModel.js";
export const login = async (req, res) => {


    const { email, password } = req.body;
    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
        return res.status(404).send("User not found");
    } else {
        if (password != user?.password) {
            return res.status(400).send("Invalid Password");
        } else {
            return res.status(200).json({
                success: "true",
                message: "Login Successful",
                user:{
                    id:user._id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                },

            })

        }

    }
}

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const newUser = new Users({ firstName, lastName, email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}