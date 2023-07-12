import { buckets } from "../route/bucket.js";
import { tasks } from "../route/task.js";

export default {
    getAllBuckets: (req, res) => {
        return res.status(200).json({
            status: 'success',
            message: 'Successfully requested all buckets',
            data: buckets
        });
    },
    
    getOneBucket: (req, res) => {
        const { id } = req.params;
        const bucket = buckets.find((bucket) => bucket.id == id)

        return res.status(200).json({
            status: 'success',
            message: `Successfully requested bucket with id ${id}`,
            data: bucket
        });
    },

    addBucket: (req, res) => {
        try {
            const { name, tasks } = req.body;
            const newBucket = { id: buckets.length + 1, name: name, tasks: tasks };
            buckets.push(newBucket);

            return res.status(200).json({
                status: 'success',
                message: `Successfully added a bucket`,
                data: newBucket
            });
        } catch {
            return res.status(404).json({
                status: 'error'
            });
        }
    },
    
    updateBucket: (req, res) => {
        const { id } = req.params;
        const { name, tasks } = req.body;
        const bucket = buckets.find(bucket => bucket.id == id);

        if(!bucket) {
            return res.status(404).json({
                status: 'error',
                message: `Bucket with id ${id} not found`
            });
        }

        if (name) {
            bucket.name = name;
        }
        
        if (tasks) {
            bucket.tasks = Array.from(new Set((bucket.tasks).concat(tasks)));
        }

        return res.status(200).json({
            status: 'success',
            message: `Successfully updated bucket with id ${id}`,
            data: bucket
        })
    },
    
    deleteBucket: (req, res) => {
        const { id } = req.params;
        let indexToDelete = buckets.findIndex(bucket => bucket.id == id);

        if(!indexToDelete) {
            return res.status(404).json({
                status: 'error',
                message: `Bucket with id ${id} not found`
            });
        }

        buckets.splice(indexToDelete, 1);

        return res.status(200).json({
            status: 'success',
            message: `Successfully deleted bucket with id ${id}`,
            data: buckets
        })
    },

    getTasks: (req, res) => {
        const { id } = req.params;
        const bucket = buckets.find(bucket => bucket.id == id);
        const bucketTasks = tasks.filter(task => bucket.tasks.includes(task.id));

        if(!bucketTasks) {
            return res.status(404).json({
                status: 'error',
                message: `Task not found`
            });
        }

        if(bucketTasks.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `There are no tasks under the bucket with Id: ${id}`
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: `Successfully requested tasks of bucket with Id: ${id}`,
            data: bucketTasks
        });
    }
}