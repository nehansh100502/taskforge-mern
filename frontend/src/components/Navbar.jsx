
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

  
  // const handleLogout = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem('userInfo'));
  
  //     await fetch('http://localhost:8000/api/auth/logout', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  
  //   logout();          // 🔥 removes localStorage
  //   navigate('/login'); // 🔥 redirect
  // };
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
                    <li><NavLink to= "/logout" className={dropdownButtonClass} onClick={() => setOpenDropdown(null)}>Logout</NavLink></li>
                   
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