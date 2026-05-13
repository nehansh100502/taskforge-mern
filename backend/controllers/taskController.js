import Project from '../models/project.js';
import Task from '../models/task.js';

const canAccessProject = (project, userId) => {
  const uid = userId.toString();
  if (project.owner.toString() === uid) return true;
  return project.members?.some((m) => m.user?.toString() === uid);
};

const loadProjectForUser = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project || !canAccessProject(project, userId)) return null;
  return project;
};

export const listTasksForProject = async (req, res) => {
  try {
    const project = await loadProjectForUser(req.params.projectId, req.user._id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const tasks = await Task.find({ project: project._id })
      .populate('assignee', 'name email')
      .sort({ updatedAt: -1 })
      .lean();

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load tasks' });
  }
};

export const listMyTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find({
      $or: [{ owner: userId }, { 'members.user': userId }],
    }).distinct('_id');

    const tasks = await Task.find({
      project: { $in: projects },
      assignee: userId,
    })
      .populate('project', 'name')
      .populate('assignee', 'name email')
      .sort({ dueDate: 1 })
      .lean();

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load tasks' });
  }
};

export const listAllAccessibleTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find({
      $or: [{ owner: userId }, { 'members.user': userId }],
    }).distinct('_id');

    const tasks = await Task.find({ project: { $in: projects } })
      .populate('project', 'name')
      .populate('assignee', 'name email')
      .sort({ updatedAt: -1 })
      .lean();

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load tasks' });
  }
};

export const createTask = async (req, res) => {
  try {
    const project = await loadProjectForUser(req.params.projectId, req.user._id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const {
      title,
      description,
      dueDate,
      priority,
      column,
      labels,
      estimatedHours,
      assignee,
      assigneeName,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      project: project._id,
      title: title.trim(),
      description: description || '',
      dueDate: dueDate || undefined,
      priority: priority || 'Medium',
      column: column || 'To Do',
      labels: Array.isArray(labels) ? labels : [],
      estimatedHours:
        estimatedHours === '' || estimatedHours == null ? undefined : Number(estimatedHours),
      assignee: assignee || null,
      assigneeName: assigneeName || '',
      createdBy: req.user._id,
    });

    const populated = await Task.findById(task._id)
      .populate('assignee', 'name email')
      .populate('project', 'name')
      .lean();

    res.status(201).json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (!canAccessProject(task.project, req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const allowed = [
      'title',
      'description',
      'column',
      'dueDate',
      'priority',
      'labels',
      'estimatedHours',
      'assignee',
      'assigneeName',
    ];

    allowed.forEach((key) => {
      if (req.body[key] !== undefined) {
        if (key === 'estimatedHours') {
          task[key] =
            req.body[key] === '' || req.body[key] == null ? undefined : Number(req.body[key]);
        } else {
          task[key] = req.body[key];
        }
      }
    });

    await task.save();

    const populated = await Task.findById(task._id)
      .populate('assignee', 'name email')
      .populate('project', 'name')
      .lean();

    res.json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};
