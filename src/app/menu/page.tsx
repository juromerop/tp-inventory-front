import React from "react";
import logo from "../../../public/tpLogo2.jpg";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="bg-white p-2 rounded-md mb-16">
        <img
          src={logo.src}
          alt="TransPabon Logo"
          className="w-64 h-36"
        />
      </div>

      <div className="flex flex-col items-center">
        <button className="mb-4 px-4 py-2 bg-blue-800 text-white text-xl font-normal rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64">
          <a href="/diesel">Diesel Management</a>
        </button>
        <button className="px-4 py-2 bg-blue-800 text-white text-xl font-normal rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64">
          <a href="/inventory">Inventory Management</a>
        </button>
        <button className="px-4 py-2 mt-4 bg-blue-800 text-white text-xl font-normal rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64">
          <a href="/create">Create Categories</a>
        </button>
      </div>
    </div>
  );
}
