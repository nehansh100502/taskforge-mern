// import { NavLink } from "react-router-dom";
// import { useState } from "react";

// const Navbar = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (menu) => {
//     setOpenDropdown(openDropdown === menu ? null : menu);
//   };

//   const navClass = ({ isActive }) =>
//     isActive
//       ? "text-cyan-400 font-semibold"
//       : "text-white hover:text-cyan-400 transition";

//   const dropdownLinkClass = ({ isActive }) =>
//     isActive
//       ? "block px-4 py-2 bg-slate-100 text-cyan-600 font-medium"
//       : "block px-4 py-2 hover:bg-slate-100";

//   return (
//     <header className="bg-slate-900 text-white shadow-lg px-8 py-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-cyan-400">TaskForge</h1>

//         <nav>
//           <ul className="flex items-center gap-8 font-medium">
//             <li>
//               <NavLink to="/" className={navClass}>
//                 Dashboard
//               </NavLink>
//             </li>

//             {/* Projects */}
//             <li className="relative">
//               <button
//                 onClick={() => toggleDropdown("projects")}
//                 className="hover:text-cyan-400 transition"
//               >
//                 Projects ▾
//               </button>

//               {openDropdown === "projects" && (
//                 <ul className="absolute top-10 left-0 w-56 bg-white text-black rounded-xl shadow-xl py-2 z-50">
//                   <li><NavLink to="/projects" className={dropdownLinkClass}>📁 All Projects</NavLink></li>
//                   <li><NavLink to="/projects/create" className={dropdownLinkClass}>📌 Create Project</NavLink></li>
//                   <li><NavLink to="/projects/my" className={dropdownLinkClass}>My Projects</NavLink></li>
//                   <li><NavLink to="/projects/archived" className={dropdownLinkClass}>Archived Projects</NavLink></li>
//                 </ul>
//               )}
//             </li>

//             {/* Tasks */}
//             <li className="relative">
//               <button
//                 onClick={() => toggleDropdown("tasks")}
//                 className="hover:text-cyan-400 transition"
//               >
//                 Tasks ▾
//               </button>

//               {openDropdown === "tasks" && (
//                 <ul className="absolute top-10 left-0 w-56 bg-white text-black rounded-xl shadow-xl py-2 z-50">
//                   <li><NavLink to="/tasks" className={dropdownLinkClass}>📝 All Tasks</NavLink></li>
//                   <li><NavLink to="/tasks/my" className={dropdownLinkClass}>📋 My Tasks</NavLink></li>
//                   <li><NavLink to="/tasks/completed" className={dropdownLinkClass}>Completed Tasks</NavLink></li>
//                   <li><NavLink to="/tasks/pending" className={dropdownLinkClass}>Pending Tasks</NavLink></li>
//                 </ul>
//               )}
//             </li>

//             {/* Team */}
//             <li className="relative">
//               <button
//                 onClick={() => toggleDropdown("team")}
//                 className="hover:text-cyan-400 transition"
//               >
//                 Team ▾
//               </button>

//               {openDropdown === "team" && (
//                 <ul className="absolute top-10 left-0 w-56 bg-white text-black rounded-xl shadow-xl py-2 z-50">
//                   <li><NavLink to="/team/members" className={dropdownLinkClass}>👥 Members</NavLink></li>
//                   <li><NavLink to="/team/invite" className={dropdownLinkClass}>🤝 Invite Member</NavLink></li>
//                   <li><NavLink to="/team/roles" className={dropdownLinkClass}>Roles & Permissions</NavLink></li>
//                 </ul>
//               )}
//             </li>

//             <li>
//               <NavLink to="/calendar" className={navClass}>
//                 Calendar
//               </NavLink>
//             </li>

//             {/* Reports */}
//             <li className="relative">
//               <button
//                 onClick={() => toggleDropdown("reports")}
//                 className="hover:text-cyan-400 transition"
//               >
//                 Reports ▾
//               </button>

//               {openDropdown === "reports" && (
//                 <ul className="absolute top-10 left-0 w-56 bg-white text-black rounded-xl shadow-xl py-2 z-50">
//                   <li><NavLink to="/reports/task" className={dropdownLinkClass}>📊 Task Report</NavLink></li>
//                   <li><NavLink to="/reports/progress" className={dropdownLinkClass}>📈 Progress Report</NavLink></li>
//                   <li><NavLink to="/reports/activity" className={dropdownLinkClass}>Activity Log</NavLink></li>
//                 </ul>
//               )}
//             </li>

//             {/* Settings */}
//             <li className="relative">
//               <button
//                 onClick={() => toggleDropdown("settings")}
//                 className="hover:text-cyan-400 transition"
//               >
//                 ⚙️ Settings ▾
//               </button>

//               {openDropdown === "settings" && (
//                 <ul className="absolute top-10 right-0 w-56 bg-white text-black rounded-xl shadow-xl py-2 z-50">
//                   <li><NavLink to="/profile" className={dropdownLinkClass}>Profile</NavLink></li>
//                   <li><NavLink to="/settings/account" className={dropdownLinkClass}>Account Settings</NavLink></li>
//                   <li><NavLink to="/settings/notifications" className={dropdownLinkClass}>Notifications</NavLink></li>
//                   <li><NavLink to="/logout" className={dropdownLinkClass}>Logout</NavLink></li>
//                 </ul>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { 
  FiHome, 
  FiFolder, 
  FiCheckSquare, 
  FiUsers, 
  FiCalendar, 
  FiBarChart2, 
  FiSettings,
  FiChevronDown,
  FiBell,
  FiUser,
  FiMenu
} from "react-icons/fi";
import Toggle from "./Toggle";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRefs = useRef({});

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown] && 
          !dropdownRefs.current[openDropdown].contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        if (isSidebarOpen) closeSidebar();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isSidebarOpen]);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-cyan-600 dark:text-cyan-400"
        : "text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
    }`;

  const dropdownButtonClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-200 ${
      isActive
        ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 font-medium"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400"
    }`;

  const dropdownMenuClass = "absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50";

  const navItems = [
    {
      id: "projects",
      label: "Projects",
      icon: FiFolder,
      links: [
        { to: "/projects", label: "All Projects" },
        { to: "/projects/create", label: "Create Project" },
        { to: "/projects/my", label: "My Projects" },
        { to: "/projects/archived", label: "Archived" }
      ]
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: FiCheckSquare,
      links: [
        { to: "/tasks", label: "All Tasks" },
        { to: "/tasks/my", label: "My Tasks" },
        { to: "/tasks/completed", label: "Completed" },
        { to: "/tasks/pending", label: "Pending" }
      ]
    },
    {
      id: "team",
      label: "Team",
      icon: FiUsers,
      links: [
        { to: "/team/members", label: "Members" },
        { to: "/team/invite", label: "Invite" },
        { to: "/team/roles", label: "Roles" }
      ]
    }
  ];

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 transition-colors duration-300">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Menu Icon & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={openSidebar}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
                aria-label="Open menu"
              >
                <FiMenu size={20} />
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm font-bold">TF</span>
                </div>
                <h1 className="text-lg sm:text-xl font-semibold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  TaskForge
                </h1>
              </div>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-1">
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400"
                      }`
                    }
                  >
                    <FiHome size={16} />
                    <span>Home</span>
                  </NavLink>
                </li>

                {navItems.map((item) => (
                  <li 
                    key={item.id} 
                    className="relative"
                    ref={(el) => (dropdownRefs.current[item.id] = el)}
                  >
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                        openDropdown === item.id
                          ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400"
                      }`}
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                      <FiChevronDown 
                        size={14} 
                        className={`transition-transform duration-200 ${
                          openDropdown === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdown === item.id && (
                      <ul className={dropdownMenuClass}>
                        {item.links.map((link) => (
                          <li key={link.to}>
                            <NavLink
                              to={link.to}
                              className={dropdownButtonClass}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {link.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}

                <li>
                  <NavLink 
                    to="/calendar" 
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400"
                      }`
                    }
                  >
                    <FiCalendar size={16} />
                    <span>Calendar</span>
                  </NavLink>
                </li>

                <li 
                  className="relative"
                  ref={(el) => (dropdownRefs.current["reports"] = el)}
                >
                  <button
                    onClick={() => toggleDropdown("reports")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                      openDropdown === "reports"
                        ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400"
                    }`}
                  >
                    <FiBarChart2 size={16} />
                    <span>Reports</span>
                    <FiChevronDown 
                      size={14} 
                      className={`transition-transform duration-200 ${
                        openDropdown === "reports" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "reports" && (
                    <ul className={dropdownMenuClass}>
                      <li><NavLink to="/reports/task" className={dropdownButtonClass} onClick={() => setOpenDropdown(null)}>Task Report</NavLink></li>
                      <li><NavLink to="/reports/progress" className={dropdownButtonClass} onClick={() => setOpenDropdown(null)}>Progress</NavLink></li>
                      <li><NavLink to="/reports/activity" className={dropdownButtonClass} onClick={() => setOpenDropdown(null)}>Activity Log</NavLink></li>
                    </ul>
                  )}
                </li>
              </ul>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Toggle />
              
              <button className="relative p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <FiBell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Settings Dropdown */}
              <li 
                className="relative list-none hidden sm:block"
                ref={(el) => (dropdownRefs.current["settings"] = el)}
              >
                <button
                  onClick={() => toggleDropdown("settings")}
                  className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-7 h-7 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">JD</span>
                  </div>
                  <FiChevronDown 
                    size={14} 
                    className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                      openDropdown === "settings" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === "settings" && (
                  <ul className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <li><NavLink to="/profile" className={dropdownButtonClass} onClick={() => setOpenDropdown(null)}>Profile</NavLink></li>
                    <li><NavLink to="/settings/account" className={dropdownButtonClass} onClick={() => setOpenDropdown(null)}>Account</NavLink></li>
                    <li><NavLink to="/settings/notifications" className={dropdownButtonClass} onClick={() => setOpenDropdown(null)}>Notifications</NavLink></li>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <li><NavLink to="/logout" className={dropdownButtonClass} onClick={() => setOpenDropdown(null)}>Logout</NavLink></li>
                  </ul>
                )}
              </li>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
};

export default Navbar;