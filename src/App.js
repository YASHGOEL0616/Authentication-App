import ContextProvider from "./context";
import Navbar from "./Components/Navbar/navbar";
import SignIn from "./Pages/SignIn/signIn";
import SignUp from "./Pages/SignUp/signUp";
import Homepage from "./Pages/HomePage/home"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SecuredPage from "./Pages/SecuredPage/securedPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: < Homepage/>,
          
        },
        {
          path: "signin",
          element: < SignIn/>,
          
        },
        {
          path: "signup",
          element: < SignUp/>,
          
        },
        {
          path: "secured-page",
          element: < SecuredPage/>,
          
        },
      ],
    },
  ]);
  return (
    <ContextProvider>
      <ToastContainer/>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
