import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { Men } from "../pages/Men";
// import Singlecardwomen from "./Singlecard";
import Singlecardmen from "./Singlecardmen";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import { Cart } from "../pages/Cart";
import AdminProduct from "./Admin/AdminProduct";
import AdminManageProduct from "./Admin/AdminAddProduct";
import AdminEdit from "./Admin/AdminEditProduct";
import ManageUsers from "./Admin/ManageUsers";
import AdminLogin from "./Admin/AdminLogin";
import Admin from "../pages/Admin";
import UserInfo from "../pages/UserInfo";
import History from "@/pages/History";
import ManageUserCart from "./Admin/ManageUsersCart";
import Chatbox from "./chatbox/ChatBox";
function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/men" element={<Men />} />
      <Route path="/chatbox" element={<Chatbox open={true} />} />

      {/* <Route path="/" element={<HomePage />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route path="/men/:id" element={<Singlecardmen />} />
      <Route path="/women/:id" element={<Singlecardwomen />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/history" element={<History />} />
      <Route
        path="/checkout"
        element={
          // <PrivateRoutes>
            <Checkout />
          // </PrivateRoutes>
        }
      />
      <Route path="/payment" element={<Payment />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<AdminProduct />}></Route>
      <Route path="/manageProduct" element={<AdminManageProduct />}></Route>
      <Route path="/editProduct/:productId" element={<AdminEdit />}></Route>
      <Route path="/users" element={<ManageUsers />}></Route>
      <Route path="/userscart" element={<ManageUserCart />}></Route>
      {/* <Route path="/adminLogin" element={<AdminLogin />}></Route> */}
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/userinfo" element={<UserInfo />}></Route>
    </Routes>
  );
}

export default MainRoutes;
