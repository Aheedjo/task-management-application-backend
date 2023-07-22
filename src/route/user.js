import { Router } from 'express';
import userController from "../controller/user.js"

const { getUser, addUser, updateUser, deleteUser, getAllTasks, getAllBuckets } = userController;
const router = Router();

router.get('/:id', getUser);
router.get('/:id/tasks', getAllTasks);
router.get('/:id/buckets', getAllBuckets);
router.post('/add', addUser);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;