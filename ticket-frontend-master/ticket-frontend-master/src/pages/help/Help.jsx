import React from 'react';

const Help = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white  rounded-md p-6 max-w-md">
        <h2 className="text-xl font-bold mb-4">Need Help with Ticket Management?</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions or need assistance with our ticket management system, please don't hesitate to reach out to us.
        </p>
        <p className="text-gray-700 mb-4">
          You can contact our support team at <span className="text-blue-500">support@susalabs.com</span> for any technical issues, feature requests, or general inquiries.
        </p>
        <p className="text-gray-700 mb-4">
          Additionally, you can explore our documentation and knowledge base for helpful articles and tutorials on using our platform effectively.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Help;
