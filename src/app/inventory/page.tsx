"use client";
import { strict } from "assert";
import React from "react";

import { useState } from 'react';

interface Product {
  name: string;
  description: string;
  category: "category1" | "category2";
  subcategory: "subcategory1" | "subcategory2";
  quantity: number;
  date: string;
  imageUrl: string;
}

function Card({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={"mb-6 p-4 rounded-lg bg-gray-600 w-96 relative flex cursor-pointer"} 
        onClick={() => setIsModalOpen(true)}
      >
        <img 
          src={product.imageUrl} 
          alt="Product"
          className="h-full w-1/3 object-cover" 
        />
        <div className="ml-4 text-center">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-lg pt-3">
            {product.category} - {product.subcategory}
          </p>
          <p className="text-md pt-3 font-extralight">{product.quantity} units</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10 overflow-auto">
          <div className="bg-gray-600 p-4 rounded-lg shadow-lg text-white max-w-lg w-full max-h-full overflow-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">{product.name}</h2>
            <img 
              src={product.imageUrl} 
              alt="Product"
              className="h-64 w-full object-cover mb-4" 
            />
            <p className="text-lg">
              {product.category} - {product.subcategory}
            </p>
            <p className="text-md pt-2 font-extralight">{product.quantity} units</p>
            <p className="text-md pt-2">{product.description}</p>
            <button
              className="mt-4 text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default function InventoryView() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const products: Product[] = [
    {
      name: "Mouse Logitech G502 Hero",
      description: "Mouse gamer Logitech G502 Hero con sensor Hero 16K y 11 botones programables.",
      category: "Pc y perifericos",
      subcategory: "Mouse",
      quantity: 10,
      date: "2022-01-01",
      imageUrl: "https://tp-inventory-images.s3.us-east-2.amazonaws.com/IMG_8306.jpg", 
    },
    {
      name: "Product 2",
      description: "Description 2",
      category: "category2",
      subcategory: "subcategory2",
      quantity: 20,
      date: "2022-02-02",
      imageUrl: "https://tp-inventory-images.s3.us-east-2.amazonaws.com/IMG_8306.jpg", 
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <button className="fixed top-0 left-0 m-4 p-2 bg-gray-600 rounded text-white">
        <a href="/menu">Back</a>
      </button>
      <h1 className="text-4xl font-bold mb-5">Inventory</h1>
      {products.map((product, index) => (
        <Card key={index} product={product} />
      ))}
      <button
        className="fixed bottom-0 right-0 m-4 p-2 bg-green-500 rounded text-white"
        onClick={() => setIsModalOpen(true)}
      >
        Add Product
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10 overflow-auto">
          <div className="bg-gray-600 p-4 rounded-lg shadow-lg text-white max-w-lg w-full max-h-full overflow-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">New Product</h2>
            <form className="space-y-4">
              <label className="block">
                Name:
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                />
              </label>
              <label className="block">
                Description:
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                />
              </label>
              <label className="block">
                Category:
                <select className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black">
                  <option value="add">Non category</option>
                  <option value="remove">Remove</option>
                </select>
              </label>
              <label className="block">
                Subcategory:
                <select className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black">
                  <option value="add">Non subcategory</option>
                  <option value="remove">Remove</option>
                </select>
              </label>
              <label className="block">
                Quantity:
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                />
              </label>
              <label className="block">
                Photo:
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
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
