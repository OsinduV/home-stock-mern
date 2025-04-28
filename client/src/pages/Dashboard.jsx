import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashInventory from "../components/DashInventory";
import DashReports from "../components/DashReports";
import DashNotifications from "../components/DashNotifications";
import DashCategory from "../components/DashCategory";
import DashAddInventory from "../components/DashAddInventory";


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
}, [location.search]);


return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
         <DashSidebar /> 
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* inventory */}
      {tab ==='inventory'&&<DashInventory/>}
      {/* addinventory */}
       {tab ==='add-inventory'&&<DashAddInventory/>} 
      {/* category */}
      {tab ==='category'&&<DashCategory/>}
      {/* reports */}
      {tab ==='reports'&&<DashReports/>}
      {/* notication*/}
      {tab ==='notifications'&&<DashNotifications/>}

    </div>
  );
}
