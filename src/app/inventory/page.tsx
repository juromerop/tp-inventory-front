"use client";
import { strict } from "assert";
import React from "react";

import { useState, useEffect } from "react";

interface Product {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  quantity: number;
  date: string;
  imageUrl: string;
}

interface Category {
  idCategory: string;
  title: string;
}

interface Subcategory {
  idSubCategory: string;
  title: string;
}

function Card({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(product.quantity);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedQuantity(product.quantity);
  };

  const handleConfirmClick = () => {
    if (editedQuantity < 0) {
      alert("You can't have a negative quantity");
      return;
    }

    product.quantity = editedQuantity;
    setIsEditing(false);
  };

  return (
    <>
      <div
        className={
          "mb-6 p-4 rounded-lg bg-gray-600 w-80 relative flex items-center cursor-pointer"
        }
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={product.imageUrl}
          alt="Product"
          className="h-full w-1/3 object-cover rounded-md shadow-xl"
        />
        <div className="ml-4 text-center">
          <h2 className="text-md font-bold">{product.name}</h2>
          <p className="text-md pt-3">
            {product.category} - {product.subcategory}
          </p>
          <p className="text-md pt-4 font-extralight">
            {product.quantity} units
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10 overflow-auto">
          <div className="bg-gray-600 p-4 rounded-lg shadow-lg text-white max-w-lg w-full max-h-full overflow-auto relative">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {product.name}
            </h2>
            <img
              src={product.imageUrl}
              alt="Product"
              className="h-64 w-full object-cover mb-4"
            />
            <p className="text-lg">
              {product.category} - {product.subcategory}
            </p>
            {isEditing ? (
              <input
                className="w-[20%] p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                type="number"
                min={product.quantity}
                value={editedQuantity}
                onChange={(e) => setEditedQuantity(parseInt(e.target.value))}
              />
            ) : (
              <p className="text-md pt-2 font-extralight">
                {product.quantity} units
              </p>
            )}
            <p className="text-md pt-2">{product.description}</p>
            {isEditing ? (
              <button
                className="absolute bottom-4 right-4 text-green-500"
                onClick={handleConfirmClick}
              >
                Confirm
              </button>
            ) : (
              <button
                className="absolute bottom-4 right-4 text-blue-500"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
            <button
              className="mt-4 text-red-500"
              onClick={() => {
                setIsModalOpen(false);
                setIsEditing(false);
              }}
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch(
      "http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/category"
    )
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (categoryFilter !== "") {
      fetch(
        `http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/subcategory/${categoryFilter}`
      )
        .then((response) => response.json())
        .then((data) => setSubcategories(data));
    } else {
      setSubcategories([]);
    }
  }, [categoryFilter]);

  const products: Product[] = [
    {
      name: "Mouse Logitech G502 Hero",
      description:
        "Mouse gamer Logitech G502 Hero con sensor Hero 16K y 11 botones programables.",
      category: "Pc y perifericos",
      subcategory: "Mouse",
      quantity: 10,
      date: "2022-01-01",
      imageUrl:
        "https://tp-inventory-images.s3.us-east-2.amazonaws.com/IMG_8306.jpg",
    },
    {
      name: "Gafas filtro azul",
      description:
        "Gafas con filtro azul para proteger tus ojos de la luz azul de las pantallas.",
      category: "Cuidado personal",
      subcategory: "Salud visual",
      quantity: 20,
      date: "2022-02-02",
      imageUrl:
        "https://tp-inventory-images.s3.us-east-2.amazonaws.com/IMG_8307.jpg",
    },
    {
      name: "Gafas filtro azul",
      description:
        "Gafas con filtro azul para proteger tus ojos de la luz azul de las pantallas.",
      category: "Cuidado personal",
      subcategory: "Salud visual",
      quantity: 20,
      date: "2022-02-02",
      imageUrl:
        "https://tp-inventory-images.s3.us-east-2.amazonaws.com/IMG_8307.jpg",
    },
    {
      name: "Gafas filtro azul",
      description:
        "Gafas con filtro azul para proteger tus ojos de la luz azul de las pantallas.",
      category: "Cuidado personal",
      subcategory: "Salud visual",
      quantity: 20,
      date: "2022-02-02",
      imageUrl:
        "https://tp-inventory-images.s3.us-east-2.amazonaws.com/IMG_8307.jpg",
    },
    {
      name: "Gafas filtro azul",
      description:
        "Gafas con filtro azul para proteger tus ojos de la luz azul de las pantallas.",
      category: "Cuidado personal",
      subcategory: "Salud visual",
      quantity: 20,
      date: "2022-02-02",
      imageUrl:
        "https://tp-inventory-images.s3.us-east-2.amazonaws.com/IMG_8307.jpg",
    },
  ];
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || product.category === categoryFilter) &&
      (subcategoryFilter === "" || product.subcategory === subcategoryFilter)
    );
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <button className="fixed top-0 left-0 m-4 p-2 bg-gray-600 rounded text-white">
        <a href="/menu">Back</a>
      </button>
      <h1 className="text-2xl font-bold mb-5 mt-8">Inventory</h1>
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-white text-black"
        />
        <button className="ml-2 p-2 bg-gray-500 rounded bg-white text-withe">
          Go
        </button>
      </div>
      <button
        className="mb-4 p-2 bg-gray-600 rounded text-white text-sm"
        onClick={() => setIsSearchMenuOpen(!isSearchMenuOpen)}
      >
        {isSearchMenuOpen ? "Hide" : "Show"} Advanced Search
      </button>
      {isSearchMenuOpen && (
        <div className="mb-4 space-y-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
          >
            <option value="">All Categories</option>
            {categories.map((category: Category) => (
              <option key={category.idCategory} value={category.idCategory}>
                {category.title}
              </option>
            ))}
          </select>
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
            disabled={categoryFilter === ""}
          >
            <option value="">All Subcategories</option>
            {subcategories.map((subcategory: Subcategory) => (
              <option
                key={subcategory.idSubCategory}
                value={subcategory.idSubCategory}
              >
                {subcategory.title}
              </option>
            ))}
          </select>
          <div className="flex justify-center">
            <button className="p-2 bg-gray-500 rounded text-white">
              Search
            </button>
          </div>
        </div>
      )}
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
                  onChange={(event) =>
                    setSelectedFile(event.target.files?.[0] || null)
                  }
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
