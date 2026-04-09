// import { useState, useEffect } from 'react';
// import { 
//   FiGrid, 
//   FiFolder, 
//   FiCheckCircle, 
//   FiClock, 
//   FiUsers, 
//   FiCalendar, 
//   FiTrendingUp,
//   FiArrowRight,
//   FiPlus,
//   FiStar,
//   FiAlertCircle,
//   FiBarChart2,
//   FiActivity,
//   FiAward,
//   FiTarget,
//   FiBriefcase
// } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';


// const UserDashboard = () => {
//   const [greeting, setGreeting] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting('Good Morning');
//     else if (hour < 18) setGreeting('Good Afternoon');
//     else setGreeting('Good Evening');

//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);

//     return () => clearInterval(timer);
//   }, []);

//   // Stats data
//   const stats = [
//     {
//       title: 'Active Projects',
//       value: '12',
//       change: '+2',
//       icon: FiFolder,
//       color: 'from-blue-500 to-cyan-500',
//       bgColor: 'bg-blue-50 dark:bg-blue-900/20',
//       textColor: 'text-blue-600 dark:text-blue-400'
//     },
//     {
//       title: 'Completed Tasks',
//       value: '48',
//       change: '+8',
//       icon: FiCheckCircle,
//       color: 'from-green-500 to-emerald-500',
//       bgColor: 'bg-green-50 dark:bg-green-900/20',
//       textColor: 'text-green-600 dark:text-green-400'
//     },
//     {
//       title: 'Pending Tasks',
//       value: '23',
//       change: '-3',
//       icon: FiClock,
//       color: 'from-yellow-500 to-orange-500',
//       bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
//       textColor: 'text-yellow-600 dark:text-yellow-400'
//     },
//     {
//       title: 'Team Members',
//       value: '8',
//       change: '+1',
//       icon: FiUsers,
//       color: 'from-purple-500 to-pink-500',
//       bgColor: 'bg-purple-50 dark:bg-purple-900/20',
//       textColor: 'text-purple-600 dark:text-purple-400'
//     }
//   ];

//   // Recent projects
//   const recentProjects = [
//     {
//       id: 1,
//       name: 'Mobile App Development',
//       progress: 75,
//       deadline: '2024-12-15',
//       team: 4,
//       priority: 'High',
//       status: 'In Progress'
//     },
//     {
//       id: 2,
//       name: 'Website Redesign',
//       progress: 45,
//       deadline: '2024-12-20',
//       team: 3,
//       priority: 'Medium',
//       status: 'In Progress'
//     },
//     {
//       id: 3,
//       name: 'API Integration',
//       progress: 90,
//       deadline: '2024-12-10',
//       team: 2,
//       priority: 'High',
//       status: 'Review'
//     },
//     {
//       id: 4,
//       name: 'Database Migration',
//       progress: 30,
//       deadline: '2025-01-05',
//       team: 3,
//       priority: 'Low',
//       status: 'Planning'
//     }
//   ];

//   // Upcoming tasks
//   const upcomingTasks = [
//     {
//       id: 1,
//       title: 'Complete user authentication',
//       project: 'Mobile App Development',
//       dueDate: '2024-12-05',
//       priority: 'High'
//     },
//     {
//       id: 2,
//       title: 'Design system documentation',
//       project: 'Website Redesign',
//       dueDate: '2024-12-07',
//       priority: 'Medium'
//     },
//     {
//       id: 3,
//       title: 'API endpoint testing',
//       project: 'API Integration',
//       dueDate: '2024-12-06',
//       priority: 'High'
//     },
//     {
//       id: 4,
//       title: 'Team meeting',
//       project: 'General',
//       dueDate: '2024-12-05',
//       priority: 'Low'
//     }
//   ];

//   // Recent activity
//   const recentActivity = [
//     {
//       id: 1,
//       user: 'John Doe',
//       action: 'completed task',
//       target: 'User authentication',
//       time: '2 hours ago',
//       icon: FiCheckCircle
//     },
//     {
//       id: 2,
//       user: 'Sarah Smith',
//       action: 'added comment',
//       target: 'Design review',
//       time: '4 hours ago',
//       icon: FiActivity
//     },
//     {
//       id: 3,
//       user: 'Mike Johnson',
//       action: 'created new project',
//       target: 'Marketing Campaign',
//       time: '1 day ago',
//       icon: FiFolder
//     },
//     {
//       id: 4,
//       user: 'Emma Wilson',
//       action: 'updated task status',
//       target: 'Content creation',
//       time: '1 day ago',
//       icon: FiBarChart2
//     }
//   ];

//   // Performance metrics
//   const performanceMetrics = [
//     { label: 'Task Completion Rate', value: 78, color: 'from-cyan-500 to-blue-500' },
//     { label: 'On-Time Delivery', value: 85, color: 'from-green-500 to-emerald-500' },
//     { label: 'Team Productivity', value: 92, color: 'from-purple-500 to-pink-500' },
//     { label: 'Project Success Rate', value: 88, color: 'from-orange-500 to-red-500' }
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* Animated Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
//           className="mb-8"
//         >
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <motion.h1 
//                 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent"
//                 animate={{ 
//                   backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
//                 }}
//                 transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
//                 style={{ backgroundSize: '200% 200%' }}
//               >
//                 {greeting}, Abhinav! 👋
//               </motion.h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-1">
//                 Here's what's happening with your projects today.
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/projects/create"
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
//                 >
//                   <FiPlus size={18} />
//                   New Project
//                 </Link>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm"
//               >
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </p>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//         >
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               whileHover={{ y: -5, transition: { duration: 0.2 } }}
//               className={`${stat.bgColor} rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg`}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color} bg-opacity-20`}>
//                   <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
//                 </div>
//                 <span className={`text-sm font-semibold ${
//                   stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {stat.change}
//                 </span>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.title}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Recent Projects */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="lg:col-span-2"
//           >
//             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
//               <div className="p-6 border-b border-gray-200 dark:border-gray-800">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <FiBriefcase className="text-cyan-600 dark:text-cyan-400" size={20} />
//                     <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       Recent Projects
//                     </h2>
//                   </div>
//                   <Link to="/projects" className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm flex items-center gap-1">
//                     View All <FiArrowRight size={14} />
//                   </Link>
//                 </div>
//               </div>
//               <div className="divide-y divide-gray-200 dark:divide-gray-800">
//                 {recentProjects.map((project, index) => (
//                   <motion.div
//                     key={project.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//                   >
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
//                       <div>
//                         <h3 className="font-semibold text-gray-900 dark:text-white">
//                           {project.name}
//                         </h3>
//                         <div className="flex items-center gap-3 mt-1">
//                           <span className={`text-xs px-2 py-1 rounded-full ${
//                             project.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
//                             project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
//                             'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
//                           }`}>
//                             {project.priority}
//                           </span>
//                           <span className="text-xs text-gray-500 dark:text-gray-400">
//                             Due: {new Date(project.deadline).toLocaleDateString()}
//                           </span>
//                           <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
//                             <FiUsers size={12} />
//                             {project.team} members
//                           </span>
//                         </div>
//                       </div>
//                       <Link 
//                         to={`/projects/${project.id}`}
//                         className="text-cyan-600 dark:text-cyan-400 text-sm font-medium hover:underline"
//                       >
//                         View Details
//                       </Link>
//                     </div>
//                     <div className="relative pt-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
//                           Progress
//                         </span>
//                         <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
//                           {project.progress}%
//                         </span>
//                       </div>
//                       <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${project.progress}%` }}
//                           transition={{ duration: 1, delay: 0.5 }}
//                           className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-linear-to-r ${
//                             project.progress >= 70 ? 'from-green-500 to-emerald-500' :
//                             project.progress >= 40 ? 'from-cyan-500 to-blue-500' :
//                             'from-yellow-500 to-orange-500'
//                           }`}
//                         />
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Column */}
//           <div className="space-y-6">
            
//             {/* Upcoming Tasks */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
//             >
//               <div className="p-6 border-b border-gray-200 dark:border-gray-800">
//                 <div className="flex items-center gap-2">
//                   <FiTarget className="text-cyan-600 dark:text-cyan-400" size={20} />
//                   <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     Upcoming Tasks
//                   </h2>
//                 </div>
//               </div>
//               <div className="divide-y divide-gray-200 dark:divide-gray-800">
//                 {upcomingTasks.map((task, index) => (
//                   <motion.div
//                     key={task.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 + index * 0.1 }}
//                     className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="mt-1">
//                         <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-gray-900 dark:text-white">
//                           {task.title}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                           {task.project}
//                         </p>
//                         <div className="flex items-center gap-2 mt-2">
//                           <span className={`text-xs px-2 py-0.5 rounded-full ${
//                             task.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
//                             task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
//                             'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
//                           }`}>
//                             {task.priority}
//                           </span>
//                           <span className="text-xs text-gray-500 dark:text-gray-400">
//                             Due: {new Date(task.dueDate).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//               <div className="p-4 bg-gray-50 dark:bg-gray-800">
//                 <Link to="/tasks" className="text-cyan-600 dark:text-cyan-400 text-sm font-medium flex items-center justify-center gap-1">
//                   View All Tasks <FiArrowRight size={14} />
//                 </Link>
//               </div>
//             </motion.div>

//             {/* Performance Metrics */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6"
//             >
//               <div className="flex items-center gap-2 mb-4">
//                 <FiTrendingUp className="text-cyan-600 dark:text-cyan-400" size={20} />
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Performance Metrics
//                 </h2>
//               </div>
//               <div className="space-y-4">
//                 {performanceMetrics.map((metric, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 + index * 0.1 }}
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</span>
//                       <span className="text-sm font-semibold text-gray-900 dark:text-white">{metric.value}%</span>
//                     </div>
//                     <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${metric.value}%` }}
//                         transition={{ duration: 1, delay: 0.8 }}
//                         className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-linear-to-r ${metric.color}`}
//                       />
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Recent Activity */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//               className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
//             >
//               <div className="p-6 border-b border-gray-200 dark:border-gray-800">
//                 <div className="flex items-center gap-2">
//                   <FiActivity className="text-cyan-600 dark:text-cyan-400" size={20} />
//                   <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     Recent Activity
//                   </h2>
//                 </div>
//               </div>
//               <div className="divide-y divide-gray-200 dark:divide-gray-800">
//                 {recentActivity.map((activity, index) => (
//                   <motion.div
//                     key={activity.id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.6 + index * 0.1 }}
//                     className="p-4 flex items-start gap-3"
//                   >
//                     <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
//                       <activity.icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-900 dark:text-white">
//                         <span className="font-semibold">{activity.user}</span>
//                         {' '}{activity.action}{' '}
//                         <span className="font-medium">{activity.target}</span>
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                         {activity.time}
//                       </p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
//         >
//           {[
//             { icon: FiPlus, label: 'Create Task', color: 'from-cyan-500 to-blue-500', link: '/tasks/create' },
//             { icon: FiUsers, label: 'Invite Team', color: 'from-purple-500 to-pink-500', link: '/team/invite' },
//             { icon: FiCalendar, label: 'Schedule Meeting', color: 'from-orange-500 to-red-500', link: '/calendar' },
//             { icon: FiBarChart2, label: 'Generate Report', color: 'from-green-500 to-emerald-500', link: '/reports' }
//           ].map((action, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ y: -3 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link
//                 to={action.link}
//                 className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all"
//               >
//                 <div className={`p-3 rounded-xl bg-linear-to-br ${action.color} bg-opacity-10`}>
//                   <action.icon className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   {action.label}
//                 </span>
//               </Link>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;





// src/pages/user/UserDashboard.jsx - Corrected version
import { useState, useEffect } from 'react';
import { 
  FiGrid, 
  FiFolder, 
  FiCheckCircle, 
  FiClock, 
  FiUsers, 
  FiCalendar, 
  FiTrendingUp,
  FiArrowRight,
  FiPlus,
  FiStar,
  FiAlertCircle,
  FiBarChart2,
  FiActivity,
  FiAward,
  FiTarget,
  FiBriefcase
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../auth/LogoutButton'

const UserDashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Stats data
  const stats = [
    {
      title: 'Active Projects',
      value: '12',
      change: '+2',
      icon: FiFolder,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Completed Tasks',
      value: '48',
      change: '+8',
      icon: FiCheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Pending Tasks',
      value: '23',
      change: '-3',
      icon: FiClock,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      title: 'Team Members',
      value: '8',
      change: '+1',
      icon: FiUsers,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  // Recent projects
  const recentProjects = [
    {
      id: 1,
      name: 'Mobile App Development',
      progress: 75,
      deadline: '2024-12-15',
      team: 4,
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: 2,
      name: 'Website Redesign',
      progress: 45,
      deadline: '2024-12-20',
      team: 3,
      priority: 'Medium',
      status: 'In Progress'
    },
    {
      id: 3,
      name: 'API Integration',
      progress: 90,
      deadline: '2024-12-10',
      team: 2,
      priority: 'High',
      status: 'Review'
    },
    {
      id: 4,
      name: 'Database Migration',
      progress: 30,
      deadline: '2025-01-05',
      team: 3,
      priority: 'Low',
      status: 'Planning'
    }
  ];

  // Upcoming tasks
  const upcomingTasks = [
    {
      id: 1,
      title: 'Complete user authentication',
      project: 'Mobile App Development',
      dueDate: '2024-12-05',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Design system documentation',
      project: 'Website Redesign',
      dueDate: '2024-12-07',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'API endpoint testing',
      project: 'API Integration',
      dueDate: '2024-12-06',
      priority: 'High'
    },
    {
      id: 4,
      title: 'Team meeting',
      project: 'General',
      dueDate: '2024-12-05',
      priority: 'Low'
    }
  ];

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      user: 'John Doe',
      action: 'completed task',
      target: 'User authentication',
      time: '2 hours ago',
      icon: FiCheckCircle
    },
    {
      id: 2,
      user: 'Sarah Smith',
      action: 'added comment',
      target: 'Design review',
      time: '4 hours ago',
      icon: FiActivity
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'created new project',
      target: 'Marketing Campaign',
      time: '1 day ago',
      icon: FiFolder
    },
    {
      id: 4,
      user: 'Emma Wilson',
      action: 'updated task status',
      target: 'Content creation',
      time: '1 day ago',
      icon: FiBarChart2
    }
  ];

  // Performance metrics
  const performanceMetrics = [
    { label: 'Task Completion Rate', value: 78, color: 'from-cyan-500 to-blue-500' },
    { label: 'On-Time Delivery', value: 85, color: 'from-green-500 to-emerald-500' },
    { label: 'Team Productivity', value: 92, color: 'from-purple-500 to-pink-500' },
    { label: 'Project Success Rate', value: 88, color: 'from-orange-500 to-red-500' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // SINGLE RETURN STATEMENT - The full dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">     
      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <motion.h1 
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 200%' }}
              >
                {greeting}, {user?.name?.split(' ')[0] || 'User'}! 👋
              </motion.h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's what's happening with your projects today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/projects/create"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                >
                  <FiPlus size={18} />
                  New Project
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`${stat.bgColor} rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <span className={`text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiBriefcase className="text-cyan-600 dark:text-cyan-400" size={20} />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Recent Projects
                    </h2>
                  </div>
                  <Link to="/projects" className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm flex items-center gap-1">
                    View All <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {recentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            project.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                            project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                            {project.priority}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Due: {new Date(project.deadline).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <FiUsers size={12} />
                            {project.team} members
                          </span>
                        </div>
                      </div>
                      <Link 
                        to={`/projects/${project.id}`}
                        className="text-cyan-600 dark:text-cyan-400 text-sm font-medium hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          Progress
                        </span>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${
                            project.progress >= 70 ? 'from-green-500 to-emerald-500' :
                            project.progress >= 40 ? 'from-cyan-500 to-blue-500' :
                            'from-yellow-500 to-orange-500'
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <FiTarget className="text-cyan-600 dark:text-cyan-400" size={20} />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Upcoming Tasks
                  </h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {upcomingTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {task.project}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            task.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <Link to="/tasks" className="text-cyan-600 dark:text-cyan-400 text-sm font-medium flex items-center justify-center gap-1">
                  View All Tasks <FiArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <FiTrendingUp className="text-cyan-600 dark:text-cyan-400" size={20} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Performance Metrics
                </h2>
              </div>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{metric.value}%</span>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${metric.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <FiActivity className="text-cyan-600 dark:text-cyan-400" size={20} />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recent Activity
                  </h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-4 flex items-start gap-3"
                  >
                    <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                      <activity.icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-semibold">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { icon: FiPlus, label: 'Create Task', color: 'from-cyan-500 to-blue-500', link: '/tasks/create' },
            { icon: FiUsers, label: 'Invite Team', color: 'from-purple-500 to-pink-500', link: '/team/invite' },
            { icon: FiCalendar, label: 'Schedule Meeting', color: 'from-orange-500 to-red-500', link: '/calendar' },
            { icon: FiBarChart2, label: 'Generate Report', color: 'from-green-500 to-emerald-500', link: '/reports' }
          ].map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={action.link}
                className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} bg-opacity-10`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {action.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;