import { Bucket, Task, User } from "../model/index.js";
import { idsAreValidObjectIds, areIdsValid } from "../helper/validate.js";
import { hashPassword } from "../helper/bcrypt.js";
import { removeDuplicates } from "../helper/removeDuplicates.js";

export default {
    getUser: async (req, res) => {
        const { id } = req.params;
        const user = await User.findOne({_id: id});

        if(user) {
            return res.status(200).json({
                status: 'success',
                message: `Successfully requested user`,
                data: user
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: `user not found`
            });
        }
    },

    addUser: async (req, res) => {
            const existingUser = await User.findOne({email: req.body.email});
            const { name, email, password, buckets, tasks } = req.body;

            if(existingUser) {
                return res.status(400).json({
                    status: 'error',
                    message: `Email already in use`,
                });
            }
    
            
            if (!idsAreValidObjectIds(tasks)) {
                if (!areIdsValid(tasks, Task)) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Tasks not valid',
                    });
                }
            }

            if (!idsAreValidObjectIds(buckets)) {
                if (!areIdsValid(buckets, Bucket)) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Buckets not valid',
                    });
                }
            }

            const hashed = await hashPassword(req.body.password);
            
            const user = await User.create({ 
                name: name, 
                email: email, 
                password: hashed,
                buckets: buckets,
                tasks: tasks
            }).catch((err) => {
                return res.status(400).json({
                    status: 'error',
                    message: `Invalid values passed`,
                })
            });

            return res.status(200).json({
                status: "success",
                message: `Successfully added a user`,
                data: user
            });
        },
        
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { name, email, password, buckets, tasks } = req.body;
        const user = await User.findOne({ _id: id });
        
        if(!user) {
            return res.status(404).json({
                status: 'error',
                message: `User not found`
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
            user.buckets = new Set(Array.from((user.buckets).concat(buckets)));
        }

        if (tasks) {
            user.tasks = removeDuplicates(user.tasks, tasks);
        }

        console.log(removeDuplicates(user.tasks, tasks));

        const updatedUser = await user.save();
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully updated user`,
            data: updatedUser
        })
    },
    
    deleteUser: async (req, res) => {
        const { id } = req.params;
        let user = await User.findOneAndDelete({ _id: id});
        
        if(!user) {
            return res.status(404).json({
                status: 'error',
                message: `User not found`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully deleted user`,
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
                message: `There are no tasks under the user`
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
                message: `There are no buckets under the user`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully requested buckets of user `,
            data: buckets
        });
    }
}