'use client';
import React, { useState } from "react";

interface Transaction {
  name: string;
  type: "add" | "remove";
  amount: number;
  date: string;
  truckNumber: number;
}

function Card({ transaction }: { transaction: Transaction }) {
  return (
    <div
      className={`mb-6 p-4 rounded-lg bg-gray-600 w-64 ${
        transaction.type === "add"
          ? "border-green-500 shadow-green"
          : "border-red-500 shadow-red"
      }`}
    >
      <h2 className="text-xl font-bold">{transaction.name}</h2>
      <p className="text-lg mt-2">
        {transaction.type === "add" ? "+" : "-"}
        {transaction.amount} gallons
      </p>
        <p className="text-sm text-gray-200 mt-2">Truck: {transaction.truckNumber}</p>
      <p className="text-sm text-gray-400 mt-2">{transaction.date}</p>
    </div>
  );
}

export default function DieselView() {
  const dieselReserve = 100.5;
  const transactions: Transaction[] = [
    { name: "John Doe", type: "add", amount: 10.3, date: "2022-01-01", truckNumber: 1876 },
    { name: "Jane Doe", type: "remove", amount: 5.2, date: "2022-01-02", truckNumber: 8977 },
    { name: "John Doe", type: "add", amount: 10.3, date: "2022-01-01", truckNumber: 1876 },
    { name: "Jane Doe", type: "remove", amount: 5.2, date: "2022-01-02", truckNumber: 8977 },
    { name: "John Doe", type: "add", amount: 10.3, date: "2022-01-01", truckNumber: 1876 },
    { name: "Jane Doe", type: "remove", amount: 5.2, date: "2022-01-02", truckNumber: 8977 },
    { name: "John Doe", type: "add", amount: 10.3, date: "2022-01-01", truckNumber: 1876 },
    { name: "Jane Doe", type: "remove", amount: 5.2, date: "2022-01-02", truckNumber: 8977 },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white relative">
      <button
        className="fixed top-0 left-0 m-4 p-2 bg-gray-600 rounded text-white"
      >
        <a href="/menu">Back</a>
      </button>
      <h1 className="mt-[20%] sm:mt-[10%] mb-10">
        <span className="text-4xl font-bold">{dieselReserve}</span>
        <span className="text-lg font-normal"> gallons in reserve</span>
      </h1>
      <div className="flex flex-col items-center">
        {transactions.map((transaction, index) => (
          <Card key={index} transaction={transaction} />
        ))}
      </div>
      <button
        className="fixed bottom-0 right-0 m-4 p-2 bg-green-500 rounded text-white"
        onClick={() => setIsModalOpen(true)}
      >
        Add Transaction
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-gray-600 p-4 rounded-lg shadow-lg text-white max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">New Transaction</h2>
          <form className="space-y-4">
            <label className="block">
              Name: 
              <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black" />
            </label>
            <label className="block">
              Type: 
              <select className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black">
                <option value="add">Add</option>
                <option value="remove">Remove</option>
              </select>
            </label>
            <label className="block">
              Gallons: 
              <input type="number" className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black" />
            </label>
            <label className="block">
              Truck number: 
              <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black" />
            </label>
            <button className="w-full p-2 rounded bg-green-500 text-white" type="submit">
              Submit
            </button>
          </form>
          <button className="mt-4 text-red-500" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </div>
      </div>
      )}
    </div>
  );
}