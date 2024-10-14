import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-bold mb-4">Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4 flex justify-between w-[70%]">
          <label className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <span className="text-gray-900">{user?.name ? user?.name : user?.company_name ? user?.company_name : "name"}</span>
        </div>
        <div className="mb-4 flex justify-between w-[70%]">
          <label className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <span className="text-gray-900">{user?.email ? user?.email : user?.company_email ? user?.company_email : "email"}</span>
        </div>
        <div className="mb-4 flex justify-between w-[70%]">
          <label className="block text-gray-700 font-bold mb-2">
            Role:
          </label>
          <span className="text-gray-900">{user?.role ? user?.role : "company"}</span>
        </div>
        {/* Additional profile information can be added here */}
      </div>
    </div>
  );
};

export default Profile;
