import { users } from "../route/user.js";
import { tasks } from "../route/task.js";
import { buckets } from "../route/bucket.js";

export default {
    getAllUsers: (req, res) => {
        return res.status(200).json({
            status: 'success',
            message: 'Successfully requested all users',
            data: users
        })
    },
    
    getUser: (req, res) => {
        const { id } = req.params;

        const user = users.find((user) => user.id == id)

        if(user) {
            return res.status(200).json({
                status: 'success',
                message: `Successfully requested user with id ${id}`,
                data: user
            })
        } else {
            return res.status(404).json({
                status: 'error',
                message: `user with id: ${id} not found`
            })
        }
    },

    addUser: async (req, res) => {
        try {
            const { email, name, password } = req.body;
            const newUser = { id: users.length + 1, email: email, name: name, password: password };
            users.push(newUser);
        
            return res.status(200).json({
                status: "success",
                message: `Successfully added a user`,
                data: newUser
            });

        } catch (err) {
            return res.status(404).json({
                status: "error",
            });
        }
    },
    
    updateUser: (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        const user = users.find(user => user.id == id);
        
        if(!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id ${id} not found`
            });
        }
        
        if (updateData.name) {
            user.name = updateData.name;
        }
        
        if (updateData.email) {
            user.email = updateData.email;
        }
    
        if (updateData.password) {
            user.password = updateData.password;
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully updated user with id ${id}`,
            data: user
        })
    },
    
    deleteUser: (req, res) => {
        const { id } = req.params;
        let indexToDelete = users.findIndex(user => user.id == id);
        
        if(!indexToDelete) {
            return res.status(404).json({
                status: 'error',
                message: `User with id ${id} not found`
            });
        }
        
        users.splice(indexToDelete, 1)
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully deleted user with id ${id}`,
            data: users
        });
    },
    
    getAllTasks: (req, res) => {
        const { id } = req.params;
        const userTasks = tasks.find(task => task.userId == id);

        if(!userTasks) {
            return res.status(404).json({
                status: 'error',
                message: `Tasks not found`
            });
        }

        if(userTasks.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `There are no tasks under the user with Id: ${id}`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully requested tasks`,
            data: userTasks
        });
    },

    getAllBuckets: (req, res) => {
        const { id } = req.params;
        const userBuckets = buckets.find(bucket => bucket.userId == id);

        if(!userBuckets) {
            return res.status(404).json({
                status: 'error',
                message: `Buckets not found`
            });
        }

        if(userBuckets.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `There are no buckets under the user with Id: ${id}`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully requested buckets of user with Id: ${id} `,
            data: userBuckets
        });
    }
}