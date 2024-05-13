import React from 'react';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-5">TransPabon</h1>
      <div className="flex flex-col items-center">
        <button 
          className="mb-4 px-4 py-2 bg-blue-700 text-white text-xl font-normal rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        >
          <a href="/diesel">Diesel Management</a>
        </button>
        <button 
          className="px-4 py-2 bg-blue-700 text-white text-xl font-normal rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        >
          <a href="/inventory">Inventory Management</a>
        </button>
      </div>
    </div>
  );
}