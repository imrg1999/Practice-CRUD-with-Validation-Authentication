import express from 'express';
import { showAllUsers, createNewUsers } from '../Controller/userController.js';

export const router = express.Router();

router.get('/users', showAllUsers);
router.post('/newUser', createNewUsers);