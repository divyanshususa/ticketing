
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function AssignTicket() {
  const { tickets, allUsersAvailable } = useSelector(state => state.tickets);
  const [selectedUserIdsMap, setSelectedUserIdsMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page, you can adjust this
  const token = localStorage.getItem("token")
  useEffect(() => {
    // Initialize selectedUserIdsMap with the assigned_to user IDs from the API response
    const initialSelectedUserIdsMap = {};
    tickets.forEach(ticket => {
      initialSelectedUserIdsMap[ticket._id] = ticket?.asigned_to?._id || '';
    });
    setSelectedUserIdsMap(initialSelectedUserIdsMap);
  }, [tickets]);

  const handleAssign = async (ticketId) => {
    const userId = selectedUserIdsMap[ticketId];
    console.log(`Assigning ticket ${ticketId} to user ${userId}`);

    const payload = {
      TicketId: ticketId,
      userId: userId
    };
    console.log(payload)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ticket/asignTicket",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true
        }
      );

      console.log(response);
      alert("Ticket has been assigned,check dashboard");
    } catch (error) {
      console.log("Error while assigning:", error);
    }
  };

  const handleUserChange = (e, ticketId) => {
    const newSelectedUserIdsMap = { ...selectedUserIdsMap, [ticketId]: e.target.value };
    setSelectedUserIdsMap(newSelectedUserIdsMap);
  };

  // Logic to calculate indexes of items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tickets.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resolved Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assign To
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.resolved_status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedUserIdsMap[item._id] || ''}
                  onChange={(e) => handleUserChange(e, item._id)}
                >
                  <option value="">Select User</option>
                  {allUsersAvailable?.map((user) => (
                    <option key={user?._id} value={user?._id}>
                      {user?.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAssign(item._id)}
                  disabled={!selectedUserIdsMap[item._id]}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= tickets.length}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default AssignTicket;
