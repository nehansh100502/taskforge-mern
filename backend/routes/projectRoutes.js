import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  listProjects,
  createProject,
  getProject,
  getWorkspaceSummary,
  addProjectMember,
} from '../controllers/projectController.js';

const router = express.Router();

router.use(protect);

router.get('/workspace/summary', getWorkspaceSummary);
router.get('/', listProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.post('/:id/members', addProjectMember);

export default router;
