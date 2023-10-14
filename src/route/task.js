import { Router } from 'express';
import taskController from "../controller/task.js"

const { getAllTasks, getOneTask, getLabels, addTask, updateTask, updateTaskStatus, deleteTask } = taskController;
const router = Router();

router.get('/all', getAllTasks);
router.get('/:id', getOneTask);
router.get('/:id/labels', getLabels);
router.post('/add', addTask);
router.patch('/update/:id', updateTask);
router.patch('/update-status/:id', updateTaskStatus);
router.delete('/delete/:id', deleteTask);

export default router;