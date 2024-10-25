import Axios from "../../Axios";
import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { GoIssueClosed, GoIssueOpened } from "react-icons/go";
import Widgets from "../../components/widgets/Widgets";
import { MdOutlineNoAccounts } from "react-icons/md";

const UserDashboard = () => {
  const [data, setData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const token = localStorage.getItem("token");
  const fetchDashboardData = async () => {
    try {
      // Set up Axios instance with credentials option to include cookies
      const res = await axios.get(
        "/api/dashboard/userDashboardData",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        }
      );
      // Return response data
      console.log(res?.data);
      setDashboardData(res?.data);
      //   dispatch(allUsers(res?.data?.users))
      //   dispatch(allCompany(res?.data?.companys))
    } catch (error) {
      console.error("Error fetching data:", error);
      // return null;
    }
  };
  const fetchData = async () => {
    try {
      // Set up Axios instance with credentials option to include cookies
      const res = await Axios.get("/api/getTickets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });
      // Return response data
      console.log(res?.data?.ticket);
      setData(res?.data?.ticket);
    } catch (error) {
      console.error("Error fetching data:", error);
      // return null;
    }
  };
  useEffect(() => {
    fetchData();
    fetchDashboardData();
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <span className="text-xl font-bold">Ticketing Support</span>
        {/* <button onClick={showModal} className='bg-blue-600 p-2 rounded-md uppercase text-white '>create tickets</button> */}
      </div>
      <div className="flex justify-between">
        <Widgets
          title="Assigned Tickets"
          number={dashboardData?.assigned_tickets}
          Icon={<MdOutlineNoAccounts />}
          color="red"
        />

        <Widgets
          title="resolved tickets"
          number={dashboardData?.resolved_Tickets}
          Icon={<GoIssueClosed />}
          color="green"
        />
        <Widgets
          title="remaining tickets"
          number={dashboardData?.remaining_tickets}
          Icon={<GoIssueOpened />}
          color="orange"
        />
      </div>
      <div>
        {data.length >= 0 ? (
          <Table data={data} type="user" />
        ) : (
          <h1>No tickets assigned yet</h1>
        )}
        {/* <Table data={data} /> */}
      </div>
    </>
  );
};

export default UserDashboard;
