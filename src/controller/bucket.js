import { Bucket, Task, User } from "../model/index.js";
import { idsAreValidObjectIds, areIdsValid } from "../helper/validate.js";

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
        const bucket = await Bucket.findOne({_id: id});

        if(bucket) {
            return res.status(200).json({
                status: 'success',
                message: `Successfully requested bucket`,
                data: bucket
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Bucket not found`
            });
        }
    },

    addBucket: async (req, res) => {
        const { name, tasks, user_id } = req.body;
        const user = await User.findOne({ _id: user_id });
        
        if(!user_id) {
            return res.status(404).json({
                status: 'error',
                message: `user_id is required`
            });
        }

        if(!user) {
            return res.status(404).json({
                status: 'error',
                message: `User not found`
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

        const bucket = await Bucket.create({
            name: name, 
            tasks: tasks
        }).catch((err) => {
            return res.status(400).json({
                status: 'error',
                message: `Invalid values passed`,
            })
        });

        user.buckets.push(bucket._id);
        await user.save();

        return res.status(200).json({
            status: 'success',
            message: `Successfully added a bucket`,
            data: bucket
        });
    },
    
    updateBucket: async (req, res) => {
        const { id } = req.params;
        const { name, tasks } = req.body;
        const bucket = await Bucket.findOne({ _id: id });

        if(!bucket) {
            return res.status(404).json({
                status: 'error',
                message: `Bucket not found`
            });
        }

        if (name) {
            bucket.name = name;
        }

        if (tasks) {
            bucket.tasks = removeDuplicates(bucket.tasks, tasks);
        }

        const updatedBucket = await bucket.save();

        return res.status(200).json({
            status: 'success',
            message: `Successfully updated bucket`,
            data: updatedBucket
        });
    },
    
    deleteBucket: async (req, res) => {
        const { id } = req.params;
        let bucket = await Bucket.findOneAndDelete({_id: id});

        if(!bucket) {
            return res.status(404).json({
                status: 'error',
                message: `Bucket not found`
            });
        }

        await User.findOne({buckets: bucket._id})
            .then(async user => {
                user.buckets = user.buckets.filter(bucket_id => bucket_id.toString() != bucket._id);
                await user.save();
            })
            .catch(err => {
                return res.status(404).json({
                    status: 'error',
                    message: `User not found`
                });
            })

        return res.status(200).json({
            status: 'success',
            message: `Successfully deleted bucket`,
        })
    },

    getTasks: async (req, res) => {
        const { id } = req.params;
        const tasks = await Bucket.find({ _id: id }).populate('tasks');

        if(!tasks) {
            return res.status(404).json({
                status: 'error',
                message: `Task not found`
            });
        }

        return res.status(200).json({
            status: 'success',
            message: `Successfully requested tasks of bucket`,
            data: tasks
        });
    }
}