import { buckets } from "../route/bucket.js";
import { tasks } from "../route/task.js";
import { Bucket } from "../model/index.js";

export default {
    getAllBuckets: async (req, res) => {
        const allBuckets = await Bucket.find();

        return res.status(200).json({
            status: 'success',
            message: 'Successfully requested all buckets',
            data: allBuckets
        });
    },
    
    getOneBucket: async (req, res) => {
        const { id } = req.params;
        const bucket = await label.findOne({_id: id});

        if(bucket) {
            return res.status(200).json({
                status: 'success',
                message: `Successfully requested bucket with id ${id}`,
                data: bucket
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Bucket with id: ${id} not found`
            });
        }
    },

    addBucket: async (req, res) => {
        const { name, tasks } = req.body;
        const bucket = await Bucket.create({
            name: name, 
            tasks: tasks
        });
        return res.status(200).json({
            status: 'success',
            message: `Successfully added a bucket`,
            data: bucket
        });
    },
    
    updateBucket: (req, res) => {
        const { id } = req.params;
        const { name, tasks } = req.body;
        const bucket = Bucket.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    name: name,
                },
            },
            {
                new: true,
            }
        );

        if(!bucket) {
            return res.status(404).json({
                status: 'error',
                message: `Bucket with id ${id} not found`
            });
        }

        return res.status(200).json({
            status: 'success',
            message: `Successfully updated bucket with id ${id}`,
            data: bucket
        });
    },
    
    deleteBucket: async (req, res) => {
        const { id } = req.params;
        let bucket = Bucket.findOneAndDelete({_id: id});

        if(!indexToDelete) {
            return res.status(404).json({
                status: 'error',
                message: `Bucket with id ${id} not found`
            });
        }

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