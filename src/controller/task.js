import { Task } from "../model/index.js";

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
        
        if(task) {
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
        const { name, userId ,bucketId, labels } = req.body;
        const task = await Task.create({
            name: name,
            userId: userId,
            bucketId: bucketId,
            status: 'New task',
            labels: labels,
        });

        if(!bucketId) {
            return res.status(404).json({
                status: 'error',
                message: 'Bucket Id not provided',
            });
        }

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

        if(!task) {
            return res.status(404).json({
                status: 'error',
                message: `task with id ${id} not found`
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
            task.labels = Array.from(new Set((task.labels).concat(labels)));
        }

        const updatedTask = await task.save();

        return res.status(200).json({
            status: 'success',
            message: `Successfully updated task with id ${id}`,
            data: updatedTask
        })
    },

    deleteTask: async (req, res) => {
        const { id } = req.params;
        let task = await Task.findOneAndDelete({ _id: id });

        if(!task) {
            return res.status(404).json({
                status: 'error',
                message: `Task with id ${id} not found`
            });
        }

        return res.status(200).json({
            status: 'success',
            message: `Successfully deleted task with id ${id}`,
        })
    },

    getLabels: async (req, res) => {
        const { id } = req.params;
        const tasks = await Task.find({ _id: id }).populate('labels');

        if(!tasks) {
            return res.status(404).json({
                status: 'error',
                message: `Task labels not found`
            });
        }

        if(tasks.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `There are no labels under the task with Id: ${id}`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully requested tasks label for user with Id: ${id}`,
            data: tasks
        });
    }
}