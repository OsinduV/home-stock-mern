import React, { useEffect, useState } from "react";
import { HiArrowNarrowUp, HiOutlineUserGroup } from "react-icons/hi";
import { useSelector } from "react-redux";
import { PDFReportButtonAdmin } from "./PDFReportButtonAdmin"; // Import your PDF component
import { ExcelReportButtonExcelAdmin } from "./ExcelReportButtonExcelAdmin"; // Import your Excel component

const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {/* Stats Card */}
        <div className="flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-800 md:w-72">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 uppercase text-md">Total User</h3>
              <p>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="p-3 text-5xl text-white bg-teal-600 rounded-full shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>

        {/* Report Buttons Section */}
        {currentUser.isAdmin && users.length > 0 && (
          <div className="flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-800 md:w-72">
            <h3 className="text-gray-500 uppercase text-md">Export Reports</h3>
            <div className="flex flex-col gap-3">
              <PDFReportButtonAdmin
                users={users}
                currentUser={currentUser}
                className="w-full"
              />
              <ExcelReportButtonExcelAdmin
                users={users}
                currentUser={currentUser}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardComp;
