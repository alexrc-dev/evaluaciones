import {fetchForLogin, fetchUserById, getUsers, trySaveUser, tryUpdatePassword} from "../controllers/users";
import express from 'express';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', fetchUserById);
router.post('/login', fetchForLogin);
router.post('/', trySaveUser);
router.patch('/', tryUpdatePassword);

export default router;