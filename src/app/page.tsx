import React from 'react';

export default function Home() {

  // const handleButtonClick = () => {
  //   if (keycode === 'Pabon1205-') {
  //     history.push('/menu');
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-5 text-center justify-center">Enter your keycode</h1>
      <div className="flex flex-col items-center">
        <input 
          className="mb-4 px-3 py-2 text-black text-center font-semibold text-xl bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-64"
          type="text" 
          placeholder="Keycode"
        />
        <button 
          className="px-4 py-2 bg-blue-700 text-white text-xl font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <a href="/menu">Send</a>
        </button>
      </div>
    </div>
  );
}