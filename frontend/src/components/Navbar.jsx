import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "text-cyan-400 font-semibold"
      : "text-white hover:text-cyan-400 transition";

  const dropdownLinkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-2 bg-slate-100 text-cyan-600 font-medium"
      : "block px-4 py-2 hover:bg-slate-100";

  return (
    <header className="bg-slate-900 text-white shadow-lg px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-cyan-400">TaskForge</h1>

        <nav>
          <ul className="flex items-center gap-8 font-medium">
            <li>
              <NavLink to="/" className={navClass}>
                Dashboard
              </NavLink>
            </li>

            {/* Projects */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("projects")}
                className="hover:text-cyan-400 transition"
              >
                Projects ▾
              </button>

              {openDropdown === "projects" && (
                <ul className="absolute top-10 left-0 w-56 bg-white text-black rounded-xl shadow-xl py-2 z-50">
                  <li><NavLink to="/projects" className={dropdownLinkClass}>📁 All Projects</NavLink></li>
                  <li><NavLink to="/projects/create" className={dropdownLinkClass}>📌 Create Project</NavLink></li>
                  <li><NavLink to="/projects/my" className={dropdownLinkClass}>My Projects</NavLink></li>
                  <li><NavLink to="/projects/archived" className={dropdownLinkClass}>Archived Projects</NavLink></li>
                </ul>
              )}
            </li>

            {/* Tasks */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("tasks")}
                className="hover:text-cyan-400 transition"
              >
                Tasks ▾
              </button>

              {openDropdown === "tasks" && (
                <ul className="absolute top-10 left-0 w-56 bg-white text-black rounded-xl shadow-xl py-2 z-50">
                  <li><NavLink to="/tasks" className={dropdownLinkClass}>📝 All Tasks</NavLink></li>
                  <li><NavLink to="/tasks/my" className={dropdownLinkClass}>📋 My Tasks</NavLink></li>
                  <li><NavLink to="/tasks/completed" className={dropdownLinkClass}>Completed Tasks</NavLink></li>
                  <li><NavLink to="/tasks/pending" className={dropdownLinkClass}>Pending Tasks</NavLink></li>
                </ul>
              )}
            </li>

            {/* Team */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("team")}
                className="hover:text-cyan-400 transition"
              >
                Team ▾
              </button>

              {openDropdown === "team" && (
                <ul className="absolute top-10 left-0 w-56 bg-white text-black rounded-xl shadow-xl py-2 z-50">
                  <li><NavLink to="/team/members" className={dropdownLinkClass}>👥 Members</NavLink></li>
                  <li><NavLink to="/team/invite" className={dropdownLinkClass}>🤝 Invite Member</NavLink></li>
                  <li><NavLink to="/team/roles" className={dropdownLinkClass}>Roles & Permissions</NavLink></li>
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/calendar" className={navClass}>
                Calendar
              </NavLink>
            </li>

            {/* Reports */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("reports")}
                className="hover:text-cyan-400 transition"
              >
                Reports ▾
              </button>

              {openDropdown === "reports" && (
                <ul className="absolute top-10 left-0 w-56 bg-white text-black rounded-xl shadow-xl py-2 z-50">
                  <li><NavLink to="/reports/task" className={dropdownLinkClass}>📊 Task Report</NavLink></li>
                  <li><NavLink to="/reports/progress" className={dropdownLinkClass}>📈 Progress Report</NavLink></li>
                  <li><NavLink to="/reports/activity" className={dropdownLinkClass}>Activity Log</NavLink></li>
                </ul>
              )}
            </li>

            {/* Settings */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("settings")}
                className="hover:text-cyan-400 transition"
              >
                ⚙️ Settings ▾
              </button>

              {openDropdown === "settings" && (
                <ul className="absolute top-10 right-0 w-56 bg-white text-black rounded-xl shadow-xl py-2 z-50">
                  <li><NavLink to="/profile" className={dropdownLinkClass}>Profile</NavLink></li>
                  <li><NavLink to="/settings/account" className={dropdownLinkClass}>Account Settings</NavLink></li>
                  <li><NavLink to="/settings/notifications" className={dropdownLinkClass}>Notifications</NavLink></li>
                  <li><NavLink to="/logout" className={dropdownLinkClass}>Logout</NavLink></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;