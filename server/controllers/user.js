import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const googleSignIn = async (req, res) => {
    const { result } = req.body;
    const { token } = req.body;
    try {
        const email = result.email;
        const existingUser = await User.findOne({ email });
        if (existingUser == null) {
            const hashedPassword = await bcrypt.hash(result.name.split(' ')[0], 12);
            const newUser = await User.create({ email: result.email, password: hashedPassword, name: `google ${result.name}`, imageUrl: result.imageUrl });
            return res.status(200).json({ result, token })
        }
        else {
            if (existingUser.name.split(' ')[0] == 'google') {
                let tempRes = { imageUrl: existingUser.imageUrl, email: result.email, name: existingUser.name.replace('google ',""),googleId:result.googleId,familyName:result.familyName,givenName: result.givenName}
                return res.status(200).json({ result:tempRes, token })
            }
            else return res.status(200).json({ message: 'Login using your email id and password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(200).json({ message: "User doesn't exist." });
        if (existingUser.name.split(' ')[0] == 'google') return res.status(200).json({ message: "Use Google Login" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if (!isPasswordCorrect) return res.status(200).json({ message: "Invalid credentials" });
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
        
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, imageUrl } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(200).json({ message: "User already exists." });
        
        if (password != confirmPassword) return res.status(200).json({ message: "Passwords don't match" });
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, imageUrl });
        
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
        
        res.status(200).json({ result, token });
        
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    
    const { token } = req.body;
    const { isChanged } = req.body;
    if (token.length < 500) {
        try {
            const { imageUrl, name, password, __v, email } = req.body.result;
            const existingUser = await User.findOne({ email });

            if (existingUser && isChanged) return res.status(200).json({ message: "User already exists." });
            
            
            const updatedUser = { imageUrl, name, password, __v, email, _id: id };

            await User.findByIdAndUpdate(id, updatedUser, { new: true });
            
            res.status(202).json({ result: updatedUser, token });
            
        } catch (error) {
            res.status(500).json({ message: "something went wrong" });
        }
    }
    else {
        try {
            const { result } = req.body;

            const email = result.email;

            const existingUser = await User.findOne({ email });

            if (existingUser && isChanged) return res.status(200).json({ message: "User already exists." });
            
            const hashedPassword = await bcrypt.hash(result.name.split(' ')[0], 12);

            const updatedUser = { email: result.email, password: hashedPassword, name: `google ${result.name}`, imageUrl: result.imageUrl }

            await User.findByIdAndUpdate(existingUser._id, updatedUser, { new: true });

            const tempRes = { result};

            res.status(202).json({ result, token });
        }
        catch (error) {
            res.status(500).json({ message: "something went wrong with google update" });
        }

    }
}

export const changePassword = async (req, res) => {

    const { id } = req.params;
    const { imageUrl, name, password, __v, email } = req.body.result;
    const { newPassword ,token} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        const isPassswordSame = await bcrypt.compare(newPassword,existingUser.password);
        
        if (!isPasswordCorrect) return res.status(200).json({ message: "Invalid credentials" });
        if(isPassswordSame) return res.status(200).json({message:"same message as before"});
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const updatedUser = { imageUrl, name, password: hashedPassword, __v, email, _id: id };
        await User.findByIdAndUpdate(id, updatedUser, { new: true });
        res.status(202).json({ result: updatedUser, token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}