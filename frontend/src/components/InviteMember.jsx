import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiSend, 
  FiMail, 
  FiUserPlus, 
  FiBriefcase,
  FiShield,
  FiPlus,
  FiTrash2,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';

const InviteMember = () => {
  const navigate = useNavigate();
  const [invites, setInvites] = useState([
    { email: '', role: 'Member', permissions: ['view'] }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const roles = ['Admin', 'Project Manager', 'Team Lead', 'Member', 'Viewer'];
  
  const permissionOptions = [
    { id: 'view', label: 'View Projects', description: 'Can view all projects' },
    { id: 'create', label: 'Create Tasks', description: 'Can create and edit tasks' },
    { id: 'edit', label: 'Edit Projects', description: 'Can edit project details' },
    { id: 'delete', label: 'Delete Items', description: 'Can delete projects and tasks' },
    { id: 'invite', label: 'Invite Members', description: 'Can invite new team members' },
    { id: 'manage', label: 'Manage Roles', description: 'Can manage roles and permissions' }
  ];

  const addInvite = () => {
    setInvites([...invites, { email: '', role: 'Member', permissions: ['view'] }]);
  };

  const removeInvite = (index) => {
    if (invites.length > 1) {
      setInvites(invites.filter((_, i) => i !== index));
    }
  };

  const updateInvite = (index, field, value) => {
    const updatedInvites = [...invites];
    updatedInvites[index][field] = value;
    setInvites(updatedInvites);
  };

  const togglePermission = (inviteIndex, permission) => {
    const updatedInvites = [...invites];
    const permissions = updatedInvites[inviteIndex].permissions;
    
    if (permissions.includes(permission)) {
      updatedInvites[inviteIndex].permissions = permissions.filter(p => p !== permission);
    } else {
      updatedInvites[inviteIndex].permissions = [...permissions, permission];
    }
    
    setInvites(updatedInvites);
  };

  const validateEmails = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const invite of invites) {
      if (!emailRegex.test(invite.email)) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmails()) {
      alert('Please enter valid email addresses');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Invites sent:', invites);
      setIsSubmitting(false);
      setSuccessMessage(`Invitations sent to ${invites.length} ${invites.length === 1 ? 'person' : 'people'}`);
      setTimeout(() => {
        navigate('/team/members');
      }, 2000);
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
                Invite Team Members
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Invite colleagues to collaborate on your projects
              </p>
            </div>
            <button
              onClick={() => navigate('/team/members')}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
            >
              <FiCheckCircle className="text-green-600 dark:text-green-400" size={20} />
              <span className="text-green-700 dark:text-green-300">{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {invites.map((invite, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Invite #{index + 1}
                </h2>
                {invites.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInvite(index)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={invite.email}
                      onChange={(e) => updateInvite(index, 'email', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-colors"
                      placeholder="colleague@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={invite.role}
                      onChange={(e) => updateInvite(index, 'role', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-colors"
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Permissions
                  </label>
                  <div className="space-y-2">
                    {permissionOptions.map(permission => (
                      <label
                        key={permission.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={invite.permissions.includes(permission.id)}
                          onChange={() => togglePermission(index, permission.id)}
                          className="mt-1 w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {permission.label}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {permission.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Another Button */}
          <button
            type="button"
            onClick={addInvite}
            className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-center gap-2"
          >
            <FiPlus size={20} />
            Add Another Member
          </button>

          {/* Summary */}
          <div className="bg-linear-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <FiShield className="text-cyan-600" />
              Summary
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You are about to invite <strong>{invites.length}</strong> {invites.length === 1 ? 'person' : 'people'} to your team.
              They will receive an email invitation with instructions to join.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate('/team/members')}
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
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={18} />
                  Send Invitations
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMember;