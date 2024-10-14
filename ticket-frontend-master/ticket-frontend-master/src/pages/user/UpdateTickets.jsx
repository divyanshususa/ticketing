
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UpdateTickets = () => {
  const [data, setData] = useState([]);
  const [resolvedAt, setResolvedAt] = useState('');
  const [resolvedStatusMap, setResolvedStatusMap] = useState({});
  const [resolvedDescriptionMap, setResolvedDescriptionMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Number of items per page
  const token = localStorage.getItem("token")
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getTickets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });
      setData(res.data.ticket);
      // Initialize resolvedStatusMap and resolvedDescriptionMap with empty values for each ticket
      const initialResolvedStatusMap = {};
      const initialResolvedDescriptionMap = {};
      res.data.ticket.forEach(ticket => {
        initialResolvedStatusMap[ticket._id] = ticket.resolved_status || '';
        initialResolvedDescriptionMap[ticket._id] = ticket.resolved_description || '';
      });
      setResolvedStatusMap(initialResolvedStatusMap);
      setResolvedDescriptionMap(initialResolvedDescriptionMap);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleResolve = async (ticketId) => {
    try {
      const payload = {
        ticketId,
        resolved_status: resolvedStatusMap[ticketId],
        resolved_description: resolvedDescriptionMap[ticketId]
      };
      // Example of how to send the payload to the backend
      const response = await axios.post(
        "http://localhost:5000/api/resolvedTicket",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        }
      );
      console.log(response);

      // For demonstration purpose, just logging the payload
      console.log("Resolved Ticket Payload:", payload);
      alert("ticket resolved")
      // Reset the state after resolving the ticket
      setResolvedAt('');
      setResolvedStatusMap(prevMap => {
        const updatedMap = { ...prevMap };
        delete updatedMap[ticketId];
        return updatedMap;
      });
      setResolvedDescriptionMap(prevMap => {
        const updatedMap = { ...prevMap };
        delete updatedMap[ticketId];
        return updatedMap;
      });
      fetchData();
    } catch (error) {
      console.error('Error resolving ticket:', error);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
  };

  // Handlers for resolving status and description
  const handleResolvedStatusChange = (ticketId, status) => {
    setResolvedStatusMap(prevMap => ({
      ...prevMap,
      [ticketId]: status
    }));
  };

  const handleResolvedDescriptionChange = (ticketId, description) => {
    setResolvedDescriptionMap(prevMap => ({
      ...prevMap,
      [ticketId]: description
    }));
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resolved Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resolved Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map(ticket => (
            <tr key={ticket._id}>
              <td className="px-6 py-4 whitespace-nowrap">{ticket.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  className="border border-gray-300 p-1 rounded"
                  value={resolvedStatusMap[ticket._id]}
                  onChange={(e) => handleResolvedStatusChange(ticket._id, e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="yes">Resolved</option>
                  <option value="no">Unresolved</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  className="border border-gray-300 p-1 rounded"
                  value={resolvedDescriptionMap[ticket._id] || ''}
                  onChange={(e) => handleResolvedDescriptionChange(ticket._id, e.target.value)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleResolve(ticket._id)}
                >
                  Resolved
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination mt-4">
        <button
          onClick={paginatePrev}
          disabled={currentPage === 1}
          className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-l ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
          Previous
        </button>
        <button
          onClick={paginateNext}
          disabled={indexOfLastItem >= data.length}
          className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-r ${indexOfLastItem >= data.length ? 'cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UpdateTickets;
