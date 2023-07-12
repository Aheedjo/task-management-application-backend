import { Router } from 'express';
import labelController from "../controller/label.js"

const { getAllLabels, getOneLabel, addLabel, updateLabel, deleteLabel } = labelController;
const router = Router();

router.get('/all', getAllLabels);
router.get('/:id', getOneLabel);
router.post('/add', addLabel);
router.patch('/update/:id', updateLabel);
router.delete('/delete/:id', deleteLabel);

export const labels = [
    {
        id: 1,
        name: "label 1",
    },
    {
        id: 2,
        name: "label 2",
    },
    {
        id: 3,
        name: "label 3",
    },
    {
        id: 4,
        name: "label 4",
    },
    {
        id: 5,
        name: "label 5",
    },
]

export default router;