import Axios from "../../Axios";
import React, { useEffect, useState } from "react";
import Widgets from "../../components/widgets/Widgets";
import { MdOutlineNoAccounts } from "react-icons/md";
import { GoIssueClosed, GoIssueOpened } from "react-icons/go";
import Table from "../../components/Table/Table";
import { useDispatch } from "react-redux";
import { allCompany, allTicket, allUsers } from "../../app/slices/ticketsSlice";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const fetchData = async () => {
    try {
      // Set up Axios instance with credentials option to include cookies
      const res = await Axios.get(
        "/api/ticket/getAdminTicket",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        }
      );
      // Return response data
      console.log(res?.data?.data);
      dispatch(allTicket(res?.data?.data));
      setData(res?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // return null;
    }
  };
  const fetchDashboardData = async () => {
    try {
      // Set up Axios instance with credentials option to include cookies
      const res = await Axios.get(
        "/api/dashboard/adminDashboardData",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // Return response data
      console.log(res?.data);
      setDashboardData(res?.data);
      dispatch(allUsers(res?.data?.users));
      dispatch(allCompany(res?.data?.companys));
    } catch (error) {
      console.error("Error fetching data:", error);
      // return null;
    }
  };
  useEffect(() => {
    fetchData();
    fetchDashboardData();
    // console.log(dashboardData.tickets)
  }, []);
  return (
    <>
      {data.length >= 0 ? (
        <>
          {" "}
          <div className="flex justify-between">
            <span className="text-xl font-bold">Admin Dashboard</span>
            {/* <button onClick={showModal} className='bg-blue-600 p-2 rounded-md uppercase text-white '>create tickets</button> */}
          </div>
          <div className="flex justify-between">
            <Widgets
              title="remaining Tickets"
              number={dashboardData?.remaining_tickets}
              Icon={<MdOutlineNoAccounts />}
              color="red"
            />
            <Widgets
              title="resolved Tickets"
              number={dashboardData?.resolved_Tickets}
              Icon={<GoIssueClosed />}
              color="green"
            />
            <Widgets
              title="Technical Users"
              number={dashboardData?.users?.length - 1}
              Icon={<GoIssueOpened />}
              color="orange"
            />
            <Widgets
              title="Company Registered"
              number={dashboardData?.companys?.length}
              Icon={<GoIssueOpened />}
              color="orange"
            />
          </div>
          <div>
            <Table data={data} />
          </div>
        </>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
};

export default AdminDashboard;
