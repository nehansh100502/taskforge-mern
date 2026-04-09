import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiX, 
  FiSave, 
  FiCalendar, 
  FiUsers, 
  FiTag, 
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
  FiTrash2
} from 'react-icons/fi';

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    status: 'Planning',
    budget: '',
    client: '',
    tags: [],
    teamMembers: []
  });

  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');
  const [newMember, setNewMember] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = ['Planning', 'In Progress', 'On Hold', 'Review', 'Completed'];
  const availableMembers = [
    'John Doe', 'Sarah Smith', 'Mike Johnson', 'Emma Wilson', 'Alex Chen'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addTeamMember = () => {
    if (newMember && !formData.teamMembers.includes(newMember)) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, newMember]
      }));
      setNewMember('');
    }
  };

  const removeTeamMember = (member) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(m => m !== member)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Project created:', formData);
      setIsSubmitting(false);
      navigate('/projects');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                Create New Project
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Fill in the details to create a new project
              </p>
            </div>
            <button
              onClick={() => navigate('/projects')}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.projectName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
                  placeholder="Enter project name"
                />
                {errors.projectName && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={14} /> {errors.projectName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
                  placeholder="Describe the project..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={14} /> {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiCalendar className="text-cyan-500" />
              Project Timeline
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-colors`}
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-colors`}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Project Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-colors"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-colors"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget ($)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-colors"
                  placeholder="Enter budget"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-colors"
                  placeholder="Enter client name"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiTag className="text-cyan-500" />
              Tags
            </h2>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-colors"
                placeholder="Add a tag and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                <FiPlus size={20} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiUsers className="text-cyan-500" />
              Team Members
            </h2>
            
            <div className="flex gap-2 mb-3">
              <select
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-colors"
              >
                <option value="">Select team member</option>
                {availableMembers.filter(m => !formData.teamMembers.includes(m)).map(member => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addTeamMember}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                <FiPlus size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              {formData.teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <span className="text-gray-700 dark:text-gray-300">{member}</span>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(member)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FiSave size={18} />
                  Create Project
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateProject;