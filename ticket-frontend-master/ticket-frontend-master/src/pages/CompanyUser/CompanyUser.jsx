import React, { useState } from 'react';
import Sidebar from '../../components/CompanySideBar/Sidebar';
import { Outlet } from 'react-router-dom';
const CompanyUser = () => {

  return (
    <div className='flex'>
       <Sidebar/>
    </div>
  );
};

export default CompanyUser;
