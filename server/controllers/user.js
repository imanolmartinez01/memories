import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js'

export const signin = async(req, res) => {
    const {  email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User dosen't exist." })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {  expiresIn: "1h" })

        const result = { email: existingUser.email, name: existingUser.name, id: existingUser._id };

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.'})
    }

}

export const signinupwithgoogle = async(req, res) => {
    const { name, email } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) {
            const resultCreate = await User.create({ email, name: name })
            
            const token = jwt.sign({ email: resultCreate.email, id: resultCreate._id }, 'test', {  expiresIn: "1h" })

            const result = { email: resultCreate.email, name: resultCreate.name, id: resultCreate.id };

            res.status(200).json({ result, token });
        } else {
            
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {  expiresIn: "1h" })
            
            const result = { email: existingUser.email, name: existingUser.name, id: existingUser._id };

            res.status(200).json({ result, token });
        }

    } catch (error) {
        console.log(error)
    }
}

export const signup = async(req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exist." })

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords dont match." })

        const hashedPassword = await bcrypt.hash(password, 12);

        const resultCreate = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({ email: resultCreate.email, id: resultCreate._id }, 'test', {  expiresIn: "1h" })

        const result = { email: resultCreate.email, name: resultCreate.name, id: resultCreate._id };

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.'})

    }
}