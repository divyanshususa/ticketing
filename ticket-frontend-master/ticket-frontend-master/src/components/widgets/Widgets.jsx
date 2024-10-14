import React from 'react';

const Widgets = ({ title, number, Icon, color }) => {
    // console.log(title, number, Icon, color)
    return (
        <div className="bg-gray-100 border w-80 shadow my-4 p-4">
            <div className="flex items-center justify-around">
                <div className={`w-16 h-16 flex justify-center items-center text-3xl rounded-full ${color === "orange" ? "bg-orange-400" : color === "red" ? "bg-red-400" : "bg-green-400"}`}>
                    {Icon}
                </div>
                <div>
                    <h1 className="text-lg font-bold lowercase">{title}</h1>
                    <h1 className="text-lg text-gray-700">{number}</h1>
                </div>
            </div>
        </div >
    );
}

export default Widgets;
