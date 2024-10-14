import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'user'
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Conditional form submission based on user type
    const postData = formData.userType === 'company'
      ? {
        company_email: formData.email,
        company_name: formData.username,
        company_password: formData.password
      }
      : {
        name: formData.username,
        email: formData.email,
        password: formData.password
      };
    try {
      let endpoint;
      if (formData.userType === 'company') {
        endpoint = "http://localhost:5000/api/company/register"; // Replace 'YOUR_COMPANY_API_ENDPOINT' with the endpoint for company registration
      } else {
        endpoint = "http://localhost:5000/api/register"; // Replace 'YOUR_USER_API_ENDPOINT' with the endpoint for user registration
      }

      const response = await axios.post(endpoint, postData);
      console.log('Response:', response.data);
      // Handle successful response from the server
      navigate("/login")
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
    // Handle form submission, e.g., send data to server
  };

  return (
    <div className=" bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
