// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import DashSidebar from '../components/DashSidebar';
// import DashProfile from '../components/DashProfile';
// import DashInventory from "../components/DashInventory";
// import DashReports from "../components/DashReports";
// import DashNotifications from "../components/DashNotifications";
// import DashCategory from "../components/DashCategory";
// import DashAddInventory from "../components/DashAddInventory";

// export default function Dashboard() {
//     const { currentUser } = useSelector((state) => state.user);
//   const location = useLocation();
//   const [tab, setTab] = useState("");

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const tabFromUrl = urlParams.get("tab");
//     if (tabFromUrl) {
//       setTab(tabFromUrl);
//     }
// }, [location.search]);

// return (
//     <div className='min-h-screen flex flex-col md:flex-row'>
//       <div className='md:w-56'>
//         {/* Sidebar */}
//          <DashSidebar />
//       </div>
//       {/* profile... */}
//       {tab === 'profile' && <DashProfile />}
//       {/* inventory */}
//       {tab ==='inventory'&&<DashInventory/>}
//       {/* addinventory */}
//        {tab ==='add-inventory'&&<DashAddInventory/>}
//       {/* category */}
//       {tab ==='category'&&<DashCategory/>}
//       {/* reports */}
//       {tab ==='reports'&&<DashReports/>}
//       {/* notication*/}
//       {tab ==='notifications'&&<DashNotifications/>}

//     </div>
//     {/* profile... */}

//     {tab === "profile" && <DashProfile />}
//     {tab === "shopping-list" && <ShoppingList />}

//     {/* users */}

//     {tab === "users" && <DashUsers />}

//     {/* users */}

//     {tab === "dash" && <DashboardComp />}

//   </div>
// );
// }

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // <-- you missed this import!

import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

import DashInventory from "../components/DashInventory";
import DashReports from "../components/DashReports";
import DashCategory from "../components/DashCategory";
import DashAddInventory from "../components/DashAddInventory";
import ShoppingList from "../pages/ShoppingList";
import DashUsers from "../components/DashUsers";
import DashboardComp from "../components/DashboardComp";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user); // <-- you missed importing useSelector

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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>

      {/* Main Content Area */}

        {tab === "inventory" && <DashInventory />}
        {tab === "add-inventory" && <DashAddInventory />}
        {tab === "category" && <DashCategory />}
        {tab === "reports" && <DashReports />}
  
      {tab === "profile" && <DashProfile />}

      {tab === "shopping-list" && <ShoppingList />}

      {tab === "users" && <DashUsers />}

      {tab === "dash" && <DashboardComp />}
    </div>
  );
}
