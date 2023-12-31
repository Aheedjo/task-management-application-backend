import { Task, Bucket, User, Label } from "../model/index.js";
import { idsAreValidObjectIds, areIdsValid } from "../helper/validate.js";

export default {
    getAllTasks: async (req, res) => {
        const allTasks = await Task.find();

        return res.status(200).json({
            status: 'success',
            message: 'Successfully requested all tasks',
            data: allTasks
        });
    },
    
    getOneTask: async (req, res) => {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id });
        
        if (task) {
            return res.status(200).json({
                status: 'success',
                message: `Successfully requested task with Id: ${id}`,
                data: task
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Task with Id: ${id} not found`
            });
        }
    },

    addTask: async (req, res) => {
        const { name, userId, bucketId, labels } = req.body;
        
        if (!bucketId) {
            return res.status(400).json({
                status: 'error',
                message: 'Bucket Id not provided',
            });
        }

        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User Id not provided',
            });
        }

        const user = await User.findOne({_id: userId});
        const bucket = await Bucket.findOne({_id: bucketId});

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }
        
        if (!bucket) {
            return res.status(404).json({
                status: 'error',
                message: 'Bucket not found',
            });
        }

        if (!idsAreValidObjectIds(labels)) {
            if (!areIdsValid(labels, Label)) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Labels not valid',
                });
            }
        }

        const task = await Task.create({
            name: name,
            userId: userId,
            bucketId: bucketId,
            status: 'none',
            labels: labels,
        }).catch((err) => {
            return res.status(400).json({
                status: 'error',
                message: `Invalid values passed`,
            })
        });

        user.tasks.push(task._id);
        bucket.tasks.push(task._id);
        await user.save();
        await bucket.save();

        return res.status(200).json({
            status: 'success',
            message: `Successfully added task`,
            data: task
        });
    },
    
    updateTask: async (req, res) => {
        const { id } = req.params;
        const { name, status, labels, bucketId } = req.body;
        const task = await Task.findOne({ _id: id });
        
        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: `task not found`
            });
        }

        if (name) {
            task.name = name;
        }
        
        if (bucketId) {
            task.bucketId = bucketId;
        }
        
        if (status) {
            task.status = status;
        }

        if (labels) {
            task.labels = removeDuplicates(task.labels, labels);
        }

        const updatedTask = await task.save();
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully updated task`,
            data: updatedTask
        })
    },

    updateTaskStatus: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        const task = await Task.findOneAndUpdate(
            { 
                _id: id
            },
            {
                $set: {
                    orderStatus: status,
                },
            },
            {
                new: true,
            }
        );

        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: `task not found`
            });
        }

        if (status) {
            task.status = status;
        }

        const updatedTask = await task.save();

        return res.status(200).json({
            status: 'success',
            message: `Successfully updated task status.`,
            data: updatedTask
        })        
    },

    deleteTask: async (req, res) => {
        const { id } = req.params;
        let task = await Task.findOneAndDelete({ _id: id });

        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: `Task not found`
            });
        }

        await Bucket.findOne({tasks: task._id})
            .then(async bucket => {
                bucket.tasks = bucket.tasks.filter(task_id => task_id.toString() != task._id);
                await bucket.save();
            })
            .catch(err => {
                return res.status(404).json({
                    status: 'error',
                    message: `Bucket not found`
                });
            })

        return res.status(200).json({
            status: 'success',
            message: `Successfully deleted task`,
        })
    },

    getLabels: async (req, res) => {
        const { id } = req.params;
        const tasks = await Task.findOne({ _id: id }).populate('labels');

        if (!tasks) {
            return res.status(404).json({
                status: 'error',
                message: `Task labels not found`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully requested tasks label for user with Id: ${id}`,
            data: tasks
        });
    }
}