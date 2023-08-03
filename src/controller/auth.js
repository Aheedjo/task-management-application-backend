import { comparePassword, hashPassword } from "../helper/bcrypt.js";
import { User } from "../model/index.js";


export default {
    signIn: async (req, res) => {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            return res.status(400).json({
                status: 'error',
                message: `Email or password not correct`,
            });
        }
        
        const valid = await comparePassword(req.body.password, user.password);

        if(!valid) {
            return res.status(400).json({
                status: 'error',
                message: `Email or password not correct`,
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Successfully logged in user',
            data: user
        });
    },

    signUp: async (req, res) => {
        const existingUser = await User.findOne({email: req.body.email});

        if(existingUser) {
            return res.status(400).json({
                status: 'error',
                message: `Email already in use`,
            });
        }

        const hashed = await hashPassword(req.body.password);
        const user = await User.create({ 
            name: req.body.name, 
            email: req.body.email, 
            password: hashed,
        });

        return res.status(200).json({
            status: 'success',
            message: `Successfully signed up`,
            data: user
        });
    },
}