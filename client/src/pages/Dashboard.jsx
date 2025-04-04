import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import ShoppingList from '../pages/ShoppingList';
import DashUsers from "../components/DashUsers";
import DashboardComp from "../components/DashboardComp";
import { useSelector } from "react-redux";
export default function Dashboard() {
    const { currentUser } = useSelector((state) => state.user);
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
  <div className="flex flex-col min-h-screen md:flex-row">
    <div className="md:w-56">
      {/* Sidebar */}
      <DashSidebar />
    </div>
    {/* profile... */}

    
    {tab === "profile" && <DashProfile />}
    {tab === "shopping-list" && <ShoppingList />}

    {/* users */}

    {tab === "users" && <DashUsers />}

    {/* users */}

    {tab === "dash" && <DashboardComp />}
    
  </div>
);
}
