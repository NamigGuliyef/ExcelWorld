import { Route, Routes } from "react-router";
import FreeResources from "@/pages/FreeResources";
import About from "@/pages/About";
import Signin from "@/pages/Singin";
import Signup from "@/pages/Signup";
import ForgetPassword from "@/pages/ForgetPassword";
import Shop from "@/pages/Shop";
import SingleShop from "@/pages/SingleShop";
import Blog from "@/pages/Blog";
import HomePage from "@/pages/HomePage";
import SingleBlog from "@/pages/SingleBlog";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import UserProtectedRoute from "./UserProtectedRoute/UserProtectedRoute";

import AdminMainPage from "@/Admin/AdminPages/AdminMainPage";
import AdminBlogsPage from "@/Admin/AdminPages/AdminBlogsPage";
import AdminSingleBlogPage from "@/Admin/AdminPages/AdminSingleBlogPage";
import AdminEditBlogPage from "@/Admin/AdminPages/AdminEditBlogPage";
import AdminCreateBlogPage from "@/Admin/AdminPages/AdminCreateBlogPage";
import AdminContactsPage from "@/Admin/AdminPages/AdminContactsPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminHomePage from "@/Admin/AdminPages/AdminHomePage";
import AdminCreateCardPage from "@/Admin/AdminPages/AdminCreateCardPage";
import PastInPictures from "@/pages/PastInPictures";
import AdminUsefullLinksPage from "@/Admin/AdminPages/AdminUsefullLinksPage";
import AdminCreateUsefulLinksPage from "@/Admin/AdminPages/AdminCreateUsefulLinksPage";
import AdminResourcesPage from "@/Admin/AdminPages/AdminResourcesPage";
import AdminCreateResourcePage from "@/Admin/AdminPages/AdminCreateResourcePage";
import AdminUsersPage from "@/Admin/AdminPages/AdminUsersPage";
import AdminSingleUserPage from "@/Admin/AdminPages/AdminSingleUserPage";
import RecoveryPassword from "@/pages/RecoveryPassword";
import AdminEditResourcesPage from "@/Admin/AdminPages/AdminEditResourcesPage";
import AdminEditUsefullLinksPage from "@/Admin/AdminPages/AdminEditUsefullLinksPage";

import UserSettings from "@/pages/UserSettings";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/free-resources" element={<FreeResources />} />

        <Route path="/about" element={<About />} />

        <Route path="/signin" element={<Signin />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/recovery-password" element={<RecoveryPassword />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/blogs" element={<Blog />} />

        <Route path="/past-in-pictures" element={<PastInPictures />} />

        <Route path="/blogs/:bId" element={<SingleBlog />} />

        <Route path="/:shopType/:shopId" element={<SingleShop />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          {/* Main Page Routes */}

          <Route path="/admin" element={<AdminMainPage />} />

          <Route path="/admin/blogs" element={<AdminBlogsPage />} />

          <Route path="/admin/contacts" element={<AdminContactsPage />} />

          <Route path="/admin/home-page" element={<AdminHomePage />} />

          <Route
            path="/admin/useful-links"
            element={<AdminUsefullLinksPage />}
          />

          <Route path="/admin/resources" element={<AdminResourcesPage />} />

          <Route path="/admin/users" element={<AdminUsersPage />} />

          {/* Create Page Routes */}

          <Route
            path="/admin/blogs/create-blog"
            element={<AdminCreateBlogPage />}
          />

          <Route
            path="/admin/home-page/create-card"
            element={<AdminCreateCardPage />}
          />

          <Route
            path="/admin/useful-links/create-link"
            element={<AdminCreateUsefulLinksPage />}
          />

          <Route
            path="/admin/resources/create-resource"
            element={<AdminCreateResourcePage />}
          />

          {/* Single Page Routes */}

          <Route path="/admin/blogs/:bId" element={<AdminSingleBlogPage />} />

          <Route path="/admin/users/:uId" element={<AdminSingleUserPage />} />

          {/* Edit Page Routes */}

          <Route
            path="/admin/blogs/edit/:bId"
            element={<AdminEditBlogPage />}
          />

          <Route
            path="/admin/edit-useful-links/:uId"
            element={<AdminEditUsefullLinksPage />}
          />

          <Route
            path="/admin/edit-resources/:rId"
            element={<AdminEditResourcesPage />}
          />
        </Route>

        <Route element={<UserProtectedRoute />}>
          {/* User Info Page */}

          <Route path="/user-settings" element={<UserSettings />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
