import { Router } from 'express';
import bucketController from "../controller/bucket.js"
import { users } from './user.js';

const { getAllBuckets, getOneBucket, addBucket, updateBucket, deleteBucket, getTasks } = bucketController;
const router = Router();

router.get('/all', getAllBuckets);
router.get('/:id', getOneBucket);
router.get('/:id/tasks', getTasks);
router.post('/add', addBucket);
router.patch('/update/:id', updateBucket);
router.delete('/delete/:id', deleteBucket);

export const buckets = [
    {
        id: 1,
        userId: 3,
        name: "bucket 1",
        tasks: [1, 5]
    },
    {
        id: 2,
        userId: 2,
        name: "bucket 2",
        tasks: [3, 4]
    },
    {
        id: 3,
        userId: 5,
        name: "bucket 3",
        tasks: [5]
    },
    {
        id: 4,
        userId: 5,
        name: "bucket 4",
        tasks: []
    },
    {
        id: 5,
        userId: 1,
        name: "bucket 5",
        tasks: []
    },
]

export default router;