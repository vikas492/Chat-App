import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";    // adjust relative paths if needed
import SignUp from "./components/signUp";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/register",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default router;
