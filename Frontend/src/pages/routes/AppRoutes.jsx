import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../Home/Home.jsx";
import ParcelRegistration from "../Parcels/ParcelRegistration.jsx";
import ParcelTracking from "../Tracking/Tracking.jsx";
import ParcelAcceptanceForm from "../Notification/ReciverConfirmationMessage.jsx";
import { useAuth } from "../../context/AuthContext"; // Import the Auth context
import UserProfile from "../Profile/UserProfile.jsx";
import AllNotification from "../Notification/Notification.jsx";
import UserParcels from "../Profile/UserParcels.jsx";
import ParcelInfoDisplay from "../Parcels/ParcelnfoDisplay.jsx";
import CarrierRegistration from "../Carrier/CarrierRegistration.jsx";
import ParcelList from "../Carrier/ParcelList.jsx";
import CarrierParcelDetails from "../Carrier/CarrierParcelDetails";
import EditProfile from "../Profile/EditProfile.jsx";
import MyParcel from "../Carrier/MyParcel.jsx";
import AboutPage from "../About/About.jsx";
import Contact from "../Contact/Contact.jsx";
import Pricing from "../Pricing/Pricing.jsx"
import Payment from "../Parcels/Payment.jsx"

export default function AppRoutes() {
  const { token, setToken } = useAuth();

  useEffect(() => {
    // Check if token exists in context; if not, check Cookies and set if available
    if (!token) {
      const gettoken = Cookies.get("token");

      // Set token in context if found in cookies
      if (gettoken) {
        setToken(gettoken); // This should automatically save in localStorage
      }
    }   
  }, [token, setToken]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Layout />}
        />
        <Route
          path="/about"
          element={token ? <AboutPage /> : <Layout />}
        />
        <Route
          path="/pricing"
          element={token ? <Pricing /> : <Layout />}
        />
         <Route
          path="/contact"
          element={token ? <Contact /> : <Layout />}
        />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/user/login" />}
        />
        <Route
          path="/user/login"
          element={token ? <Navigate to="/home" /> : <Layout />}
        />
        <Route
          path="/oAuth/auth/google"
          element={token ? <Navigate to="/home" /> : <Layout />}
        />
        <Route
          path="/parcel/details"
          element={token ? <ParcelRegistration /> : <Navigate to="/home" />}
        />
        <Route
          path="/trackingStatus"
          element={token ? <ParcelTracking /> : <Layout />}
        />
        <Route
          path="/userProfile"
          element={token ? <UserProfile /> : <Layout />}
        />
        <Route
          path="/home/carrierDetails"
          element={token ? <CarrierRegistration /> : <Layout />}
        />
        <Route
          path="/home/carrierDetails/parcelList"
          element={token ? <ParcelList /> : <Layout />}
        />
        <Route
          path="/home/carrierDetails/parcelList/specificParcelDetails"
          element={token ? <CarrierParcelDetails /> : <Layout />}
        />
        <Route
          path="/home/receiverConfirm"
          element={token ? <ParcelAcceptanceForm /> : <Layout />}
        />
        <Route
          path="/notifications"
          element={token ? <AllNotification /> : <Layout />}
        />
        <Route
          path="/userProfile/parcels"
          element={token ? <UserParcels /> : <Navigate to="/home" />}
        />
        <Route
          path="/userProfile/edit-profile"
          element={token ? <EditProfile /> : <Navigate to="/home" />}
        />
        <Route
          path="/userProfile/parcels/specificParcels"
          element={token ? <ParcelInfoDisplay /> : <UserParcels />}
        />
        <Route
          path="/home/carrierDetails/parcelList/myParcel"
          element={token ? <MyParcel /> : <ParcelList />}
        />
        <Route
        
        path="/home/parcel/payment"
        element={token ? <Payment /> : <ParcelList />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}
