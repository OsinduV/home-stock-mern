import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { TbReportSearch } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {signOutUserSuccess} from "../redux/user/userSlice"

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutUserSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
 
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          
          

          <Link to ="/dashboard?tab=inventory">
          <Sidebar.Item
           active={tab ==="inventory"}
           icon={HiDocumentText}
           as="div"
          >Inventory

          </Sidebar.Item>

          </Link>
          <Link to = "/dashboard?tab=reports">
          <Sidebar.Item 
          active = {tab === "reports"}
          icon={TbReportSearch} 
          className="cursor-pointer"
          as="div"
           >
            Reports
          </Sidebar.Item>
          </Link>
          
          <Link to="/dashboard?tab=notifications">
          <Sidebar.Item 
          active = {tab ==="notifications"}
          icon={IoMdNotifications} 
          className="cursor-pointer" 
          as = "div">
            Notifications
          </Sidebar.Item>
          </Link>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
