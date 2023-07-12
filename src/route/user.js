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

export const users = [
    {
        id: 1,
        name: "person 1",
        email: "email@mail.com",
        password: "password1",
    },
    {
        id: 2,
        name: "person 2",
        email: "email@mail.com",
        password: "password2",
    },
    {
        id: 3,
        name: "person 3",
        email: "email@mail.com",
        password: "password3",
    },
    {
        id: 4,
        name: "person 4",
        email: "email@mail.com",
        password: "password4",
    },
    {
        id: 5,
        name: "person 5",
        email: "email@mail.com",
        password: "password5",
    },
]

export default router;