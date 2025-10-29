import { createBrowserRouter } from "react-router-dom";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Auth Pages
import SignInPage from "../pages/auth/SignInPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OTPVerification from "../pages/auth/OTPVerification";
import ResetPassword from "../pages/auth/ResetPassword";

// Dashboard Pages
import DashboardOverview from "../pages/dashboardpages/DashboardOverview/DashboardOverview";
import Profile from "../pages/dashboardpages/personalinformation/Profile";
import EditProfile from "../pages/dashboardpages/personalinformation/EditProfile";
import TermsAndConditions from "../pages/dashboardpages/terms/TermsAndConditions";
import EditTermsAndConditions from "../pages/dashboardpages/terms/EditTermsAndConditions";
import PrivacyPolicy from "../pages/dashboardpages/privacypolicy/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/dashboardpages/privacypolicy/EditPrivacyPolicy";
import AboutUs from "../pages/dashboardpages/about/AboutUs";
import EditAbout from "../pages/dashboardpages/about/EditAbout";
import AllNotifications from "../pages/dashboardpages/notification/AllNotifications";
import AllUsers from "../pages/dashboardpages/user/AllUsers";
import Payment from "../pages/dashboardpages/payment/Payment";
import Providers from "../pages/dashboardpages/providers/Providers";
import Categories from "../pages/dashboardpages/categories/Categories";
import Withdraw from "../pages/dashboardpages/withdraw/Withdraw";
import Support from "../pages/dashboardpages/support/Support";
import Faq from "@/pages/dashboardpages/faq/Faq";
import Setting from "@/pages/dashboardpages/setting/Settings";
import ProvidersAccount from "@/pages/dashboardpages/providers/ProvidersAccount";
import ProvidersBilling from "@/pages/dashboardpages/providers/ProvidersBilling";
import UserAccount from "@/pages/dashboardpages/user/UserAccount";
import QuickChat from "@/pages/dashboardpages/quickchat/QuickChat";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/forgotpass",
    element: <ForgotPassword />,
  },
  {
    path: "/otpverification",
    element: <OTPVerification />,
  },
  // {
  //   path: "/resetPassword",
  //   element: <ResetPassword />,
  // },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "notifications", element: <AllNotifications /> },
      { path: "users", element: <AllUsers /> },
      { path: "users/useraccount", element: <UserAccount /> },
      { path: "payment", element: <Payment /> },
      { path: "providers", element: <Providers /> },
      { path: "providers/provideraccount", element: <ProvidersAccount /> },
      { path: "providers/providerbilling", element: <ProvidersBilling /> },
      { path: "categories", element: <Categories /> },
      { path: "withdraw", element: <Withdraw /> },
      { path: "quickchat", element: <QuickChat /> },
      { path: "support", element: <Support /> },

      // Settings Routes
      { path: "settings", element: <Setting /> },
      { path: "settings/profile", element: <Profile /> },
      { path: "settings/resetPassword", element: <ResetPassword />},
      { path: "settings/editpersonal", element: <EditProfile /> },
      { path: "settings/terms", element: <TermsAndConditions /> },
      { path: "settings/editterms", element: <EditTermsAndConditions /> },
      { path: "settings/privacy", element: <PrivacyPolicy /> },
      { path: "settings/editprivacy", element: <EditPrivacyPolicy /> },
      { path: "settings/faq", element: <Faq /> },
      { path: "settings/editabout", element: <EditAbout /> },
    ],
  },
]);

export default routes;
