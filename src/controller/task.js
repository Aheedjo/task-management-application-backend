import { tasks } from "../route/task.js";
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
        const task = await Task.findOne({_id: id});
        
        if(task) {
            return res.status(200).json({
                status: 'success',
                message: `Successfully requested task with id ${id}`,
                data: task
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Task with id: ${id} not found`
            });
        }
    },

    addTask: async (req, res) => {
        const { name, userId ,bucketId, labels } = req.body;
        const bucketObjectId = mongoose.Types.ObjectId(bucketId);
        const userObjectId = mongoose.Types.ObjectId(userId);
        const task = await Task.create({
            bucketId: bucketObjectId,
            userId: userObjectId,
            name: name,
            status: 'New task',
            labels: labels,
        });

        if(!bucketId) {
            return res.status(404).json({
                status: 'error',
                message: 'Bucket id not provided',
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
        const { name, bucket, labels } = req.body;
        const task = tasks.find(task => task.id == id);

        if(!task) {
            return res.status(404).json({
                status: 'error',
                message: `task with id ${id} not found`
            });
        }

        if (name) {
            task.name = name;
        }
        
        if (bucket) {
            task.bucket = bucket;
        }

        if (labels) {
            task.labels = Array.from(new Set((task.labels).concat(labels)));
        }

        return res.status(200).json({
            status: 'success',
            message: `Successfully updated task with id ${id}`,
            data: task
        })
    },

    deleteTask: async (req, res) => {
        const { id } = req.params;
        let indexToDelete = tasks.findIndex(task => task.id == id);

        if(!indexToDelete) {
            return res.status(404).json({
                status: 'error',
                message: `Task with id ${id} not found`
            });
        }

        tasks.splice(indexToDelete, 1);

        return res.status(200).json({
            status: 'success',
            message: `Successfully deleted task with id ${id}`,
            data: tasks
        })
    },

    getLabels: async (req, res) => {
        const { id } = req.params;
        const task = tasks.find(task => task.id == id);
        const taskLabels = labels.filter(label => task.labels.includes(label.id));

        if(!taskLabels) {
            return res.status(404).json({
                status: 'error',
                message: `Task labels not found`
            });
        }

        if(taskLabels.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `There are no labels under the task with Id: ${id}`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully requested tasks label for user with Id: ${id}`,
            data: taskLabels
        });
    }
}