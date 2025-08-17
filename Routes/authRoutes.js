import express from 'express';
import {registerUser} from '../Controller/authController.js';

export const router = express.Router();

router.post('/register', registerUser);