import { User } from "../model/index.js";

export default {
    getUser: async (req, res) => {
        const { id } = req.params;
        const user = await User.findOne({_id: id});

        if(user) {
            return res.status(200).json({
                status: 'success',
                message: `Successfully requested user with Id: ${id}`,
                data: user
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: `user with Id: ${id} not found`
            });
        }
    },

    addUser: async (req, res) => {
            const { email, name, password, buckets, tasks } = req.body;
            const user = await User.create({ 
                name: name, 
                email: email, 
                password: password,
                buckets: buckets,
                tasks: tasks
            });
        
            return res.status(200).json({
                status: "success",
                message: `Successfully added a user`,
                data: user
            });
    },
    
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { name, email, password, buckets } = req.body;
        const user = await User.findOne({ _id: id });
        
        if(!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id ${id} not found`
            });
        }
        
        if (name) {
            user.name = name;
        }
        
        if (email) {
            user.email = email;
        }
    
        if (password) {
            user.password = password;
        }

        if (buckets) {
            user.buckets = Array.from(new Set((user.buckets).concat(buckets)));
        }

        const updatedUser = await user.save();
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully updated user with id ${id}`,
            data: updatedUser
        })
    },
    
    deleteUser: async (req, res) => {
        const { id } = req.params;
        let user = await User.findOneAndDelete({ _id: id});
        
        if(!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with Id: ${id} not found`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully deleted user with Id: ${id}`,
        });
    },
    
    getAllTasks: async (req, res) => {
        const { id } = req.params;
        const tasks = await User.find({ _id: id }).populate('tasks');


        if(!tasks) {
            return res.status(404).json({
                status: 'error',
                message: `Tasks not found`
            });
        }

        if(tasks.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `There are no tasks under the user with Id: ${id}`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully requested tasks`,
            data: tasks
        });
    },

    getAllBuckets: async (req, res) => {
        const { id } = req.params;
        const buckets = await User.find({ _id: id }).populate('buckets');

        if(!buckets) {
            return res.status(404).json({
                status: 'error',
                message: `Buckets not found`
            });
        }

        if(buckets.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `There are no buckets under the user with Id: ${id}`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully requested buckets of user with Id: ${id} `,
            data: buckets
        });
    }
}