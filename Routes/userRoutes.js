import express from 'express';
import { showAllUsers } from '../Controller/userController.js';

export const router = express.Router();

router.get('/users',showAllUsers);