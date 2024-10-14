


import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import { MdDashboard } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userData } from '../../app/slices/userSlice';
import { allCompany, allTicket, allUsers } from '../../app/slices/ticketsSlice';

const { Content, Sider } = Layout;

const Sidebar = () => {
    const navigate = useNavigate(); // Access navigate function from react-router-dom
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const logoutHandler = async () => {
        try {
            let endpoint = 'https://ticket-backend-gy6j.onrender.com/api/logout';
            const response = await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                // withCredentials: true,
            });
            console.log(response.data);
            dispatch(userData(''))
            dispatch(allUsers(''))
            dispatch(allCompany(''))
            dispatch(allTicket(''))
            localStorage.clear()
            navigate("/"); // Navigate to "/" after logout
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <Layout>
            <Sider
                className='h-full'
                style={{ height: "100vh" }}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <Menu onClick={({ key }) => {
                    console.log(key)
                    if (key === "signout") {
                        logoutHandler();
                    } else {
                        navigate(key);
                    }
                }}
                    theme="dark" mode="inline" defaultSelectedKeys={['']} items={
                        [
                            {
                                key: '',
                                icon: <MdDashboard />,
                                label: "dashboard"
                            },
                            {
                                key: 'assign-tickets',
                                icon: <IoTicket />,
                                label: "Assign Tickets"
                            },
                            {
                                key: 'profile',
                                icon: <CgProfile />,
                                label: "profile"
                            },
                            {
                                key: 'signout',
                                icon: <CiLogout />,
                                label: "Logout",
                                danger: true
                            },
                        ]
                    } />
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: '20px 16px',
                    }}
                >
                   
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Sidebar;

