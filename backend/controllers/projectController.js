import Project from '../models/project.js';
import Task from '../models/task.js';
import User from '../models/user.js';

const canAccessProject = (project, userId) => {
  const uid = userId.toString();
  if (project.owner.toString() === uid) return true;
  return project.members?.some((m) => m.user?.toString() === uid);
};

export const listProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find({
      $or: [{ owner: userId }, { 'members.user': userId }],
    })
      .sort({ updatedAt: -1 })
      .populate('owner', 'name email')
      .lean();

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load projects' });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      endDate,
      priority,
      status,
      budget,
      client,
      tags,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const project = await Project.create({
      name: name.trim(),
      description: description || '',
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      priority: priority || 'Medium',
      status: status || 'Planning',
      budget: budget === '' || budget == null ? undefined : Number(budget),
      client: client || '',
      tags: Array.isArray(tags) ? tags : [],
      owner: req.user._id,
      members: [{ user: req.user._id, role: 'admin' }],
    });

    const populated = await Project.findById(project._id)
      .populate('owner', 'name email')
      .lean();

    res.status(201).json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner', 'name email').populate('members.user', 'name email');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (!canAccessProject(project, req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load project' });
  }
};

export const getWorkspaceSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const filter = { $or: [{ owner: userId }, { 'members.user': userId }] };
    const projectIds = await Project.find(filter).distinct('_id');

    const activeProjects = await Project.countDocuments({
      ...filter,
      status: { $ne: 'Completed' },
    });

    const completedTasks = await Task.countDocuments({
      project: { $in: projectIds },
      column: 'Done',
    });

    const pendingTasks = await Task.countDocuments({
      project: { $in: projectIds },
      column: { $ne: 'Done' },
    });

    const memberIds = new Set();
    memberIds.add(userId.toString());
    const projects = await Project.find(filter).select('owner members').lean();
    projects.forEach((p) => {
      memberIds.add(p.owner.toString());
      (p.members || []).forEach((m) => {
        if (m.user) memberIds.add(m.user.toString());
      });
    });

    const assignees = await Task.distinct('assignee', {
      project: { $in: projectIds },
      assignee: { $ne: null },
    });
    assignees.forEach((id) => id && memberIds.add(id.toString()));

    const recentProjectsRaw = await Project.find(filter)
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean();

    const recentIds = recentProjectsRaw.map((p) => p._id);
    const taskAgg = await Task.aggregate([
      { $match: { project: { $in: recentIds } } },
      {
        $group: {
          _id: '$project',
          total: { $sum: 1 },
          done: { $sum: { $cond: [{ $eq: ['$column', 'Done'] }, 1, 0] } },
        },
      },
    ]);
    const countsByProject = Object.fromEntries(taskAgg.map((t) => [t._id.toString(), t]));

    const recentProjects = recentProjectsRaw.map((p) => {
      const c = countsByProject[p._id.toString()] || { total: 0, done: 0 };
      const progress = c.total === 0 ? 0 : Math.round((c.done / c.total) * 100);
      return {
        id: p._id,
        name: p.name,
        progress,
        deadline: p.endDate,
        team: (p.members?.length || 0) + 0,
        priority: p.priority,
        status: p.status,
      };
    });

    const upcomingTasks = await Task.find({ project: { $in: projectIds }, column: { $ne: 'Done' } })
      .sort({ dueDate: 1 })
      .limit(6)
      .populate('project', 'name')
      .lean();

    const upcoming = upcomingTasks.map((t) => ({
      id: t._id,
      title: t.title,
      project: t.project?.name || 'Project',
      dueDate: t.dueDate,
      priority: t.priority,
    }));

    res.json({
      stats: {
        activeProjects,
        completedTasks,
        pendingTasks,
        teamMembers: memberIds.size,
      },
      recentProjects,
      upcomingTasks: upcoming,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load workspace' });
  }
};

export const addProjectMember = async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!email?.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!canAccessProject(project, req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const userToAdd = await User.findOne({ email: email.trim().toLowerCase() });
    if (!userToAdd) {
      return res.status(404).json({ message: 'No user with that email' });
    }

    const exists = project.members.some((m) => m.user.toString() === userToAdd._id.toString());
    if (exists) {
      return res.status(400).json({ message: 'User is already on this project' });
    }

    project.members.push({
      user: userToAdd._id,
      role: role === 'admin' ? 'admin' : 'member',
    });
    await project.save();

    const populated = await Project.findById(project._id)
      .populate('members.user', 'name email')
      .lean();

    res.json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add member' });
  }
};
