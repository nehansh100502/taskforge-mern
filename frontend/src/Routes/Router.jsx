import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout";
import UserDashboard from '../pages/user/UserDashboard.jsx'
import CreateProject from '../pages/user/Projects/CreateProject.jsx'
import CreateTask from '../components/CreateTask.jsx'
import InviteMember from '../components/InviteMember.jsx'



export const myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <UserDashboard/> },
      {path:"/projects/create", element:<CreateProject /> },
      {path:"/tasks/create", element:<CreateTask />},
    {path:"/team/invite", element:<InviteMember />},

      // // Projects
      // { path: "projects", element: <Projects /> },
      // { path: "projects/create", element: <CreateProject /> },
      // { path: "projects/my", element: <MyProjects /> },
      // { path: "projects/archived", element: <ArchivedProjects /> },

      // // Tasks
      // { path: "tasks", element: <AllTasks /> },
      // { path: "tasks/my", element: <MyTasks /> },
      // { path: "tasks/completed", element: <CompletedTasks /> },
      // { path: "tasks/pending", element: <PendingTasks /> },

      // // Team
      // { path: "team/members", element: <Members /> },
      // { path: "team/invite", element: <InviteMember /> },
      // { path: "team/roles", element: <RolesPermissions /> },

      // // Calendar
      // { path: "calendar", element: <Calendar /> },

      // // Reports
      // { path: "reports/task", element: <TaskReport /> },
      // { path: "reports/progress", element: <ProgressReport /> },
      // { path: "reports/activity", element: <ActivityLog /> },

      // // Settings
      // { path: "profile", element: <Profile /> },
      // { path: "settings/account", element: <AccountSettings /> },
      // { path: "settings/notifications", element: <Notifications /> },
      // { path: "logout", element: <Logout /> },
    ],
  },
]);
