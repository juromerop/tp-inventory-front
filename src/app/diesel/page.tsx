"use client";
import React, { useState, useEffect } from "react";

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
      className={`mb-6 p-4 rounded-lg bg-gray-600 w-56 text-center ${
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
      <p className="text-sm text-gray-200 mt-2">
        Truck: {transaction.truckNumber}
      </p>
      <p className="text-sm text-gray-400 mt-2">{transaction.date}</p>
    </div>
  );
}

export default function DieselView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [gallons, setGallons] = useState("");
  const [truckNumber, setTruckNumber] = useState("");
  const [dieselData, setDieselData] = useState([]);
  const [dieselReserve, setDieselReserve] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !type || !gallons || !truckNumber) {
      alert("Please fill all fields.");
      return;
    }

    const response = await fetch(
      "http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/diesel",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: name,
          added: type === "add",
          quantity: parseFloat(gallons),
          truckNumber: truckNumber,
        }),
      }
    );

    if (response.ok) {
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetch(
      "http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/diesel"
    )
      .then((response) => response.json())
      .then((data) => {
        setDieselData(
          data.map((item: { user: any; added: any; quantity: any; created_at: any; truckNumber: any; }) => {
            const date = new Date(item.created_at);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
            return {
              name: item.user,
              type: item.added ? "add" : "remove",
              amount: item.quantity,
              date: formattedDate,
              truckNumber: item.truckNumber,
            };
          })
        )

        setDieselReserve(data[0].total_diesel);
      })
      .catch((error) => console.error("Error fetching diesel data:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white relative">
      <button className="fixed top-0 left-0 m-4 p-2 bg-gray-600 rounded text-white">
        <a href="/menu">Back</a>
      </button>
      <h1 className="mt-[20%] sm:mt-[10%] mb-10">
        <span className="text-4xl font-bold">{dieselReserve}</span>
        <span className="text-lg font-normal"> gallons in reserve</span>
      </h1>
      <div className="flex flex-col items-center">
        {dieselData.map((transaction, index) => (
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
            <h2 className="text-2xl font-bold mb-4 text-center">
              New Transaction
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                Name:
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="block">
                Type:
                <select
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="add">Add</option>
                  <option value="remove">Remove</option>
                </select>
              </label>
              <label className="block">
                Gallons:
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={gallons}
                  onChange={(e) => setGallons(e.target.value)}
                />
              </label>
              <label className="block">
                Truck number:
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={truckNumber}
                  onChange={(e) => setTruckNumber(e.target.value)}
                />
              </label>
              <button
                className="w-full p-2 rounded bg-green-500 text-white"
                type="submit"
              >
                Submit
              </button>
            </form>
            <button
              className="mt-4 text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
