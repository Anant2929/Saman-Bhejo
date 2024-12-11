import Cookies from 'js-cookie';
import React,{useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../Home/Home.jsx";
import ParcelRegistration from "../Parcels/ParcelRegistration.jsx"
import ParcelTracking from '../Tracking/Tracking.jsx';
import CarriersList from '../Parcels/CarrierList.jsx';
import ParcelAcceptanceForm from '../Notification/ReciverConfirmationMessage.jsx';
import { useAuth } from '../../context/AuthContext'; // Import the Auth context
import UserProfile from '../Profile/UserProfile.jsx';
import Logout from '../Auth/Logout.jsx';
import AllNotification from '../Notification/Notification.jsx'
import UserParcels from '../Profile/UserParcels.jsx';
import ParcelInfoDisplay from '../Parcels/ParcelnfoDisplay.jsx';
export default function AppRoutes() {
  const { token, setToken } = useAuth();

  useEffect(() => {
    // Check if token exists in context; if not, check Cookies and set if available
    if (!token) {
      const gettoken = Cookies.get('token');
      console.log("Token from cookies: ", gettoken);

      // Set token in context if found in cookies
      if (gettoken) {
        setToken(gettoken);  // This should automatically save in localStorage
      }
    }
  }, [token, setToken]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Layout />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/user/login" />} />
        <Route path="/user/login" element={token ? <Navigate to="/home" /> : <Layout />} />
        <Route path="/oAuth/auth/google" element={token ? <Navigate to="/home" /> : <Layout />} />
        <Route path="/parcel/details" element={ token ? <ParcelRegistration/> : <Navigate to="/home" />} />
        <Route path="/trackingStatus" element={token ? <ParcelTracking /> : <Layout /> } />
        <Route path="/userProfile" element={token ? <UserProfile /> : <Layout /> } />
        <Route path="/home/receiverConfirm" element={ token ? <ParcelAcceptanceForm /> : <Layout /> } />
        <Route path="/home/parcel/CarriersList" element={token ? <CarriersList /> : <Navigate to="/home" /> } />
        <Route path ="/home/notification" element = {<AllNotification/>}/>
        <Route path ="/userProfile/parcels" element = {token ? <UserParcels/> : <Navigate to="/home" />}/>
        <Route path ="/userProfile/parcels/specificParcels" element = {token ? <ParcelInfoDisplay /> : <UserParcels />}/>
             {/* Renders the parcel notification modal */}
      </Routes>
    </BrowserRouter>
  );
}
