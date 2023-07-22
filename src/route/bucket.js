import { Router } from 'express';
import bucketController from "../controller/bucket.js"

const { getAllBuckets, getOneBucket, addBucket, updateBucket, deleteBucket, getTasks } = bucketController;
const router = Router();

router.get('/all', getAllBuckets);
router.get('/:id', getOneBucket);
router.get('/:id/tasks', getTasks);
router.post('/add', addBucket);
router.patch('/update/:id', updateBucket);
router.delete('/delete/:id', deleteBucket);

export default router;