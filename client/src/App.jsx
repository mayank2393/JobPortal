import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Home from "./components/Home.jsx";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/Browse.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import useGetAllJobs from "./hooks/useGetAllJobs.jsx";
import Companies from "./components/admin/Companies.jsx";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path: "/browse",
    element:<Browse/>
  },
  {
    path: "/profile",
    element:<Profile/>
  },
  {
    path: "/description/:id",
    element:<JobDescription/>
  },

  // admin routes
  {
    path:"/admin/companies",
    element:<Companies/>
  }
]);
function App() {
  useGetAllJobs();
  return (
    <div className="h-screen">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
