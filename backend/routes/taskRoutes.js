import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  listTasksForProject,
  createTask,
  updateTask,
  listMyTasks,
  listAllAccessibleTasks,
} from '../controllers/taskController.js';

const router = express.Router();

router.use(protect);

router.get('/mine', listMyTasks);
router.get('/all', listAllAccessibleTasks);
router.get('/project/:projectId', listTasksForProject);
router.post('/project/:projectId', createTask);
router.patch('/:id', updateTask);

export default router;
