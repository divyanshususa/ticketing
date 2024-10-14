import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Table = ({ data, type = "admin" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priorityFilter, setPriorityFilter] = useState(""); // Priority filter state
  const [fromDate, setFromDate] = useState(""); // From date filter state
  const [toDate, setToDate] = useState(""); // To date filter state
  const [companyFilter, setCompanyFilter] = useState(""); // Company filter state
  const itemsPerPage = 8;

  // Filter data based on priority, date range, and company name
  const filteredData = data.filter((item) => {
    const matchesPriority = priorityFilter
      ? item.priority === priorityFilter
      : true;
    const matchesDateRange =
      fromDate && toDate
        ? new Date(item.created_at) >= new Date(fromDate) &&
          new Date(item.resolved_at) <= new Date(toDate)
        : true;
    const matchesCompany = companyFilter
      ? item?.company_name?.company_name === companyFilter
      : true;

    return matchesPriority && matchesDateRange && matchesCompany;
  });

  // Calculate average response time (in days)
  const averageResponseTime = () => {
    const resolvedTickets = filteredData.filter((item) => item.resolved_at);
    const totalResponseTime = resolvedTickets.reduce((total, item) => {
      const createdAt = new Date(item.created_at);
      const resolvedAt = new Date(item.resolved_at);
      return total + Math.abs((resolvedAt - createdAt) / (1000 * 60 * 60 * 24)); // in days
    }, 0);
    return resolvedTickets.length > 0
      ? (totalResponseTime / resolvedTickets.length).toFixed(2)
      : 0;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(filteredData.length / itemsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Only render the filters and average response time for admin users */}
      {type === "admin" && (
        <>
          <div className="flex justify-between mb-4">
            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border p-2"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Date Range Filter */}
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border p-2"
              placeholder="From Date"
            />
            <h2>From</h2>

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border p-2"
              placeholder="To Date"
            />

            {/* Company Name Filter */}
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="border p-2"
            >
              <option value="">All Companies</option>
              {[
                ...new Set(
                  data.map((item) => item?.company_name?.company_name)
                ),
              ].map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created at
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resolved Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resolved at
            </th>
            {type === "user" ? (
              <th className="px-6 py-4 whitespace-nowrap">Image</th>
            ) : (
              <th className="px-6 py-4 whitespace-nowrap">Assigned to</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item?.company_name?.company_name || "Company not available"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.priority}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(item.created_at).toDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.resolved_status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.resolved_at
                  ? new Date(item.resolved_at).toDateString()
                  : "Not yet"}
              </td>
              {type === "user" ? (
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    style={{ color: "purple", textDecoration: "underline" }}
                    to={item.image}
                    target="_blank"
                  >
                    image Link
                  </Link>
                </td>
              ) : (
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.asigned_to?.name || "Not assigned yet"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
          }
          className="px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          Next
        </button>
      </div>

      {/* Display average response time only for admin users */}
      {type === "admin" && (
        <div className="mt-4">
          <span className="text-lg font-bold">
            Average Response Time: {averageResponseTime()} days
          </span>
        </div>
      )}
    </div>
  );
};

export default Table;
