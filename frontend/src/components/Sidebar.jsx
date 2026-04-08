import { NavLink } from "react-router-dom";
import { 
  FiHome, 
  FiFolder, 
  FiCheckSquare, 
  FiUsers, 
  FiCalendar, 
  FiBarChart2, 
  FiSettings,
  FiX,
  FiPlus,
  FiArchive,
  FiUserPlus,
  FiLogOut,
  FiUser,
  FiBell,
  FiChevronRight
} from "react-icons/fi";

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarLinks = [
    {
      section: "MAIN",
      items: [
        { to: "/", icon: FiHome, label: "Dashboard" }
      ]
    },
    {
      section: "PROJECTS",
      items: [
        { to: "/projects", icon: FiFolder, label: "All Projects" },
        { to: "/projects/create", icon: FiPlus, label: "Create Project" },
        { to: "/projects/my", icon: FiUser, label: "My Projects" },
        { to: "/projects/archived", icon: FiArchive, label: "Archived" }
      ]
    },
    {
      section: "TASKS",
      items: [
        { to: "/tasks", icon: FiCheckSquare, label: "All Tasks" },
        { to: "/tasks/my", icon: FiUser, label: "My Tasks" },
        { to: "/tasks/completed", icon: FiCheckSquare, label: "Completed" },
        { to: "/tasks/pending", icon: FiBarChart2, label: "Pending" }
      ]
    },
    {
      section: "TEAM",
      items: [
        { to: "/team/members", icon: FiUsers, label: "Members" },
        { to: "/team/invite", icon: FiUserPlus, label: "Invite Member" },
        { to: "/team/roles", icon: FiSettings, label: "Roles & Permissions" }
      ]
    },
    {
      section: "REPORTS",
      items: [
        { to: "/reports/task", icon: FiBarChart2, label: "Task Report" },
        { to: "/reports/progress", icon: FiBarChart2, label: "Progress Report" },
        { to: "/reports/activity", icon: FiBarChart2, label: "Activity Log" }
      ]
    },
    {
      section: "OTHER",
      items: [
        { to: "/calendar", icon: FiCalendar, label: "Calendar" },
        { to: "/profile", icon: FiUser, label: "Profile" },
        { to: "/settings", icon: FiSettings, label: "Settings" }
      ]
    }
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400"
    }`;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header - Fixed */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">TF</span>
            </div>
            <h2 className="text-lg font-semibold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              TaskForge
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* User Profile Section - Fixed */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-md shrink-0">
              <span className="text-white text-sm font-semibold">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                john.doe@example.com
              </p>
            </div>
            <FiChevronRight className="text-gray-400 shrink-0" size={16} />
          </div>
        </div>

        {/* Navigation Links - Scrollable Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          {sidebarLinks.map((section) => (
            <div key={section.section} className="mb-6">
              <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {section.section}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={linkClass}
                    onClick={onClose}
                  >
                    <item.icon size={18} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section - Fixed */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 shrink-0">
          <NavLink
            to="/logout"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            onClick={onClose}
          >
            <FiLogOut size={18} className="shrink-0" />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;