import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import CreateEmployee from "../pages/CreateEmployee";
import EditEmployee from "../pages/EditEmployee";
import NotFound from "../pages/NotFound";
import AllEmployee from "../pages/AllEmployee";
import ProtectedRoute from "./ProtectedRoute";
export const routes = createBrowserRouter([
  {
    path: "/", 
    element: <Layout />,
    children: [
      {
        path: "/",

        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/create",
        element: (
          <ProtectedRoute>
             <CreateEmployee />
          </ProtectedRoute>
        ),
      },
      {
        path: "all",
        element: (
         < ProtectedRoute>
         <AllEmployee />
         </ProtectedRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <ProtectedRoute>
            <EditEmployee />,

          </ProtectedRoute>
        )
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

