import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
const CreateTickets = ({ isModalOpen, setIsModalOpen, fetchData }) => {
  const [formData, setFormData] = useState({
    title: "",
     priority: "",
    description: "",
    image: null,
  });
  const token = localStorage.getItem("token")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    let formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
        formDataToSend.append("priority", formData.priority);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.image);
    console.log(formDataToSend, formData)
    try {

      const response = await axios.post(
        "http://localhost:5000/api/ticket/generateTicket",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true
        }
      );
      console.log('Form submitted successfully:', response.data);
      alert("your ticket created successfully");
      fetchData()
      // Clear form fields after successful submission
      setFormData({
        title: '',
        priority:'',
        description: '',
        image: null,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleOk = () => {
    handleSubmit()
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Ticket"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
          {/* <h2 className="text-xl font-semibold mb-4">Submit Form</h2> */}
          <form>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priority:
              </label>

              <select
                id="priority"
                name="priority" // Add name attribute
                value={formData.priority} // Set value from state
                onChange={handleChange} // Update state on change
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            {/* <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Submit</button> */}
          </form>
        </div>
      </Modal>
    </>
  );
};
export default CreateTickets;