import Home from "./views/Home";
import CreateBlog from "./views/CreateBlog";
import Blog from "./views/Blog";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Register from "./views/Register";

const routes = [
  {
    name: "Home",
    canBeIncludedOnHeader: true,
    path: "/",
    element: <Home />,
  },
  {
    name: "Create Blog",
    canBeIncludedOnHeader: true,
    path: "/blog/create",
    element: <CreateBlog />,
  },
  {
    name: "Blog",
    canBeIncludedOnHeader: false,
    path: "/blog/:articleId",
    element: <Blog />,
  },
  {
    name: "Profile",
    canBeIncludedOnHeader: false,
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    name: "Register",
    canBeIncludedOnHeader: true,
    path: "/register",
    element: <Register />,
  },
  {
    name: "Login",
    canBeIncludedOnHeader: true,
    path: "/login",
    element: <Login />,
  },
];

export default routes;
