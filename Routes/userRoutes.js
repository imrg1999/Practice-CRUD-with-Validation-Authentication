import express from 'express';
import { showAllUsers, createNewUsers, findUsersById } from '../Controller/userController.js';

export const router = express.Router();

router.get('/users', showAllUsers);
router.post('/newUser', createNewUsers);
router.get('/users/:id',findUsersById);