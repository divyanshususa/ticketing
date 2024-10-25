import React, { useState } from 'react';
import Axios from '../../Axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userData } from '../../app/slices/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user' // Default user type
  });
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Determine the type of user
      const userType = formData.userType;

      // Construct login data based on user type
      let loginData;
      let endpoint;
      if (userType === 'company') {
        loginData = {
          company_email: formData.email,
          company_password: formData.password
        };
        endpoint = "/api/company/login"; // Replace with the actual company login endpoint
      } else {
        loginData = {
          email: formData.email,
          password: formData.password
        };
        endpoint = "/api/login"; // Replace with the actual user login endpoint
      }

      // Send login data to the corresponding endpoint
      const response = await Axios.post(endpoint, loginData, {
        headers: {
          "Content-Type": "application/json",
          // Authorization : "Bearer "
        },
        // withCredentials: true,
      });
      console.log('Response:', response.data);
      localStorage.setItem("token", response?.data?.token)
      userType === 'company' ? navigate("/company") : userType !== 'company' && response.data.isAdmin === true ? navigate("/admin") : navigate("/user")
      // Handle successful response from the server
      dispatch(userData(response?.data?.user))
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">User Type</label>
            <div className="mt-2 flex justify-between">
              <div className="flex items-center">
                <input
                  id="user"
                  name="userType"
                  type="radio"
                  value="user"
                  checked={formData.userType === 'user'}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor="user" className="ml-3">
                  User
                </label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  id="company"
                  name="userType"
                  type="radio"
                  value="company"
                  checked={formData.userType === 'company'}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor="company" className="ml-3">
                  Company
                </label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
