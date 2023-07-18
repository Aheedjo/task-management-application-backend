import { Router } from 'express';
import labelController from "../controller/label.js"

const { getAllLabels, getOneLabel, addLabel, updateLabel, deleteLabel } = labelController;
const router = Router();

router.get('/all', getAllLabels);
router.get('/:id', getOneLabel);
router.post('/add', addLabel);
router.patch('/update/:id', updateLabel);
router.delete('/delete/:id', deleteLabel);

export default router;