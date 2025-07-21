import { useEffect, useContext, Suspense, lazy } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
// import { currentUser } from "./api";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import AdminPage from "./components/Admin/AdminPage";
import { demoUser } from "./constants";

const Profile = lazy(() => import("./components/Profile/Profile"));
const EditProfile = lazy(() => import("./components/Profile/EditProfile"));
/////////////////Orders
const Orders = lazy(() => import("./components/Orders/Orders"));
const SingleOrder = lazy(() => import("./components/Orders/SingleOrder"));
const AddOrder = lazy(() => import("./components/Orders/AddOrder"));
const EditOrder = lazy(() => import("./components/Orders/EditOrder"));

////////////
const Home = lazy(() => import("./components/Home"));
const Nav = lazy(() => import("./components/Nav"));
const Signin = lazy(() => import("./components/Signin"));
const Signup = lazy(() => import("./components/Signup"));
const Menu = lazy(() => import("./components/Menu"));
const ForgotPassword = lazy(() =>
  import("./components/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./components/ForgotPassword/ResetPassword")
);
const ErrorComponent = lazy(() => import("./components/Error"));
const App = () => {
  const {
    user,
    setUser,
    isAuth,
    isAdmin,
    setIsAuth,
    setIsAdmin,
    setIsLoading,
    isLoading,
    setFilters,
    filters,
  } = useContext(UserContext);
  // console.log(isAuth);
  // console.log("userApp", user);
  let location = useLocation();
  // console.log("location", location.pathname);
  const route = location.pathname.split("/")[1];

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("nannyTkn"));
    // console.log(token);

    // if (token) {
    //   setIsLoading(true);
    //   currentUser(token)
    //     .then((res) => {
    //       // console.log("res.data", res.data);
    //       setUser(res.data);

    //       setIsAuth(true);
    //       if (res.data.purpose === "admin") {
    //         setIsAdmin(true);
    //       }
    //       setIsLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setIsLoading(false);
    //     });
    // }
    setUser(demoUser);
  }, [setIsLoading, setUser, route]);

  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <ToastContainer />
      <Routes>
        {/* <Route
          path="/"
          element={user ? <Navigate to="/orders" /> : <Home />}
          exact
        /> */}

        {/* <Route
            path="/profile/:id"
            element={
              <UserRoute>
                <Profile />
              </UserRoute>
            }
          /> */}

        <Route element={<AdminRoute />}>
          <Route element={<AdminPage />} path="/admin" />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<Profile />} path="/profile/:id" />
          <Route path="/edit-profile/:id" element={<EditProfile />} />

          <Route path="/addOrder" element={<AddOrder />} />
          <Route path="/editOrder/:id" element={<EditOrder />} />
        </Route>

        {/* <Route path="/profile/:id" element={<Profile />} /> */}
        {/* <UserRoute path="/profile/:id" element={<Profile />} /> */}
        <Route path="/error" element={<ErrorComponent />} />
        <Route path="/" element={<Orders />} />
        <Route path="/order/:id" element={<SingleOrder />} />
        <Route
          path="/signin"
          element={user ? <Navigate to="/orders" /> : <Signin />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/orders" /> : <Signup />}
        />
        <Route
          path="/forgotPassword"
          element={user ? <Navigate to="/orders" /> : <ForgotPassword />}
        />
        <Route
          path="/resetPassword"
          element={user ? <Navigate to="/orders" /> : <ResetPassword />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Menu />
      {/* <section className="xl:padding-l wide:padding-r padding-b">
          <Hero />
        </section> */}
      {/* <section className="padding">
          <PopularProducts />
        </section>
        <section className="padding">
          <SuperQuality />
        </section>
        <section className="padding-x py-10">
          <Services />
        </section>
        <section className="padding">
          <SpecialOffer />
        </section>
        <section className="bg-pale-blue padding">
          <CustomerReviews />
        </section>
        <section className="padding-x sm:py-32 py-16 w-full">
          <Subscribe />
        </section>
        <section className="flex justify-center items-center  p-8 bg-black">
          <Footer />
        </section> */}
    </Suspense>
  );
};

export default App;
//Photo by Kampus Production: https://www.pexels.com/photo/woman-in-red-dress-playing-with-a-girl-wearing-pink-shirt-and-red-bucket-hat-8954862/
