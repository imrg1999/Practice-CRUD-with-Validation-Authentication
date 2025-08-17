import express from 'express';
import {registerUser, login} from '../Controller/authController.js';

export const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);