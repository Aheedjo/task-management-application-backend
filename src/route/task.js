import { Router } from 'express';
import taskController from "../controller/task.js"

const { getAllTasks, getOneTask, getLabels, addTask, updateTask, deleteTask } = taskController;
const router = Router();

router.get('/all', getAllTasks);
router.get('/:id', getOneTask);
router.get('/:id/labels', getLabels);
router.post('/add', addTask);
router.patch('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export const tasks = [
    {
        id: 1,
        userId: 2,
        bucketId: 2,
        name: "task 1",
        bucket: 'bucket 1',
        labels: [1, 3]
    },
    {
        id: 2,
        userId: 1,
        bucketId: 1,
        name: "task 2",
        bucket: 'bucket 1',
        labels: [1, 2]
    },
    {
        id: 3,
        bucketId: 4,
        userId: 5,
        name: "task 3",
        bucket: 'bucket 1',
        labels: [5]
    },
    {
        id: 4,
        userId: 3,
        bucketId: 1,
        name: "task 4",
        bucket: 'bucket 1',
        labels: [2]
    },
    {
        id: 5,
        userId: 4,
        bucketId: 2,
        name: "task 5",
        bucket: 'bucket 1',
        labels: [1, 2, 3, 5]
    },
]

export default router;