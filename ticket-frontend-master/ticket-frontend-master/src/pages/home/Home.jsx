import React from 'react';

const HomePage = () => {
    return (
        <div className="bg-blue-50  py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex gap-10 flex-col">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Welcome to IT<span className='text-blue-500 mx-3'>
                        Ticket
                    </span>
                        Solution</h1>
                    <p className="text-lg text-gray-600">Manage all your IT issues efficiently with our ticketing system.</p>
                </div>
                <div className="flex h-[300px] justify-center gap-6">
                    <div className="mb-4 sm:mb-0 sm:mr-4 ">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5b3BSlbVwtsEhHB6jKOilcIGZ1MX9wDitmmxn4cfY7w&s" alt="ticket" className="object-cover h-[300px]" />
                    </div>
                    <div className='flex justify-start flex-col'>
                        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                        <ul className="list-none flex gap-3 flex-col  text-lg text-gray-700">
                            <li>Submit new tickets easily</li>
                            <li>Track the status of your tickets in real-time</li>
                            <li>Communicate with IT support staff</li>
                            <li>Receive notifications on ticket updates</li>
                            <li>View historical ticket data for analytics</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
