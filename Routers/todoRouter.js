import express from "express";
import { createtodo, deletetodo, edittodo, gettodos, todotoedit } from "../Controllers/todoController.js";

import {verifyToken} from '../Middleware/verifyToken.js';

const router = express.Router();

router.post('/createtodo',verifyToken,createtodo);
router.get('/gettodo/:id',gettodos);
router.put('/edittodo/:id',verifyToken,edittodo);
router.delete('/deletetodo/:id',verifyToken,deletetodo);
router.get('/:id',todotoedit);
export default router;
