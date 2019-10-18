import {
    fetchTeacherById,
    fetchTeachers,
    tryDeleteTeacher,
    trySaveTeacher,
    tryUpdateTeacher
} from "../controllers/teachers";
import express from 'express';

const router = express.Router();

router.get('/', fetchTeachers);
router.get('/:id', fetchTeacherById);
router.post('/', trySaveTeacher);
router.patch('/', tryUpdateTeacher);
router.delete('/', tryDeleteTeacher);

export default router;