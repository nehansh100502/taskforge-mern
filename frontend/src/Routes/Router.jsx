import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout";
import Projects from "../pages/user/Projects/Projects";

export const myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <h1>Home</h1> },

      // // Projects
      { path: "projects", element: <Projects /> },
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
