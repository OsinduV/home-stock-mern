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
import { BiSolidCategory } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signOutUserSuccess } from "../redux/user/userSlice";
import { FaShoppingBasket } from "react-icons/fa";

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
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}

          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=inventory">
            <Sidebar.Item
              active={tab === "inventory"}
              icon={HiDocumentText}
              as="div"
            >
              Inventory
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=shopping-list">
            <Sidebar.Item
              active={tab === "shopping-list"}
              icon={FaShoppingBasket}
              as="div"
            >
              Shopping-List
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>

          <Link to="/dashboard?tab=add-inventory">
            <Sidebar.Item
              active={tab === "addinventory"}
              icon={HiDocumentText}
              as="div"
            >
              ADD Inventory
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=category">
            <Sidebar.Item
              active={tab === "category"}
              icon={BiSolidCategory}
              className="cursor-pointer"
              as="div"
            >
              Category
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=reports">
            <Sidebar.Item
              active={tab === "reports"}
              icon={TbReportSearch}
              className="cursor-pointer"
              as="div"
            >
              Reports
            </Sidebar.Item>
          </Link>

          {/* <Link to="/dashboard?tab=notifications">
          <Sidebar.Item 
          active = {tab ==="notifications"}
          icon={IoMdNotifications} 
          className="cursor-pointer" 
          as = "div">
            Notifications
          </Sidebar.Item>
          </Link> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
