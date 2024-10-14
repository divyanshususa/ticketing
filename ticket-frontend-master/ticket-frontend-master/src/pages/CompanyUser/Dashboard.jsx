import React, { useEffect, useState } from 'react'
import Widgets from '../../components/widgets/Widgets'
import Table from '../../components/Table/Table'
import { GoIssueOpened } from "react-icons/go";
import { GoIssueClosed } from "react-icons/go";
import { MdOutlineNoAccounts } from "react-icons/md";
import axios from 'axios';
import CreateTickets from './CreateTickets';
const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const toggleModal = () => {
    //     setIsModalOpen(prevState => !prevState);
    // };
    const [data2, setData2] = useState([])
    const [dashboardData, setDashboardData] = useState([])
    const token = localStorage.getItem("token")
    const fetchData = async () => {
        try {
            // Set up Axios instance with credentials option to include cookies
            const res = await axios.get(
              "http://localhost:5000/api/ticket/getCompanyTicket",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                // withCredentials: true,
              }
            );
            // Return response data
            console.log(res?.data?.data)
            setData2(res?.data?.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // return null;
        }
    };
    const fetchDashboardData = async () => {
        try {
            // Set up Axios instance with credentials option to include cookies
            const res = await axios.get(
              "http://localhost:5000/api/dashboard/companyDashboardData",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
              }
            );
            // Return response data
            console.log(res?.data)
            setDashboardData(res?.data);
            //   dispatch(allUsers(res?.data?.users))
            //   dispatch(allCompany(res?.data?.companys))
        } catch (error) {
            console.error('Error fetching data:', error);
            // return null;
        }
    };
    useEffect(() => {
        fetchData()
        fetchDashboardData()
    }, [])
    return (
        <>
            {
                data2.length >= 0 ? (<><div className='flex justify-between'>
                    <span className='text-xl font-bold'>Ticketing Support</span>
                    <button onClick={showModal} className='bg-blue-600 p-2 rounded-md uppercase text-white '>create tickets</button>
                </div>
                    <div className='flex justify-between'>
                        <Widgets title="remaining tickets" number={dashboardData.remaining_tickets} Icon={<MdOutlineNoAccounts />} color="red" />
                        <Widgets title="resolved" number={dashboardData.resolved_Tickets} Icon={<GoIssueClosed />} color="green" />
                        <Widgets title="open" number={dashboardData.open_tickets === null ? 0 : dashboardData.open_tickets} Icon={<GoIssueOpened />} color="orange" />
                    </div>
                    <div>
                        <Table data={data2} />
                    </div>
                    {isModalOpen && <CreateTickets fetchData={fetchData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}</>) : (
                    <h2>Loading....</h2>
                )
            }

        </>
    )
}

export default Dashboard