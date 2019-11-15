import {fetchForLogin, fetchUserById, getUsers, trySaveUser, tryUpdatePassword} from "../controllers/users";
import express from 'express';
import secureEndpoint from "./secureEndpoint";

const router = express.Router();

router.get('/', secureEndpoint, getUsers);
router.get('/:id', secureEndpoint, fetchUserById);
router.post('/userSession', fetchForLogin);
router.post('/', secureEndpoint, trySaveUser);
router.patch('/', secureEndpoint, tryUpdatePassword);

export default router;