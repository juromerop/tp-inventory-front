"use client";

import React, { ChangeEvent } from "react";

import { useState, useEffect } from "react";

interface Product {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  quantity: number;
  date: string;
  url: string;
  location: string;
  id_p: number;
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

  const handleCreateCategory = async (event: {
    preventDefault: () => void;
  }) => {
    // Prevent the default form submit action
    event.preventDefault();

    if (isNaN(editedQuantity) || editedQuantity < 0) {
      alert("Please enter a number greater than 0");
      return;
    }

    const response = await fetch(
      "http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/Product",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: product.id_p, quantity: editedQuantity }),
      }
    );

    if (!response.ok) {
      alert("Error updating product");
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
          src={product.url}
          alt="Product"
          className="h-full w-1/3 object-cover rounded-md shadow-xl"
        />
        <div className="ml-4 text-center">
          <h2 className="text-md font-bold">{product.name}</h2>
          <p className="text-md pt-2">
            {product.category} - {product.subcategory}
          </p>
          <p className="text-md pt-2 font-extralight">
            {product.quantity} units
          </p>
          <p className="text-md pt-2 font-extralight">{product.location}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10 overflow-auto">
          <div className="bg-gray-600 p-4 rounded-lg shadow-lg text-white max-w-lg w-full max-h-full overflow-auto relative">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {product.name}
            </h2>
            <img
              src={product.url}
              alt="Product"
              className="h-64 w-full object-cover mb-4 rounded-md"
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
            <p className="text-md pt-2">
              Located in <span className="font-bold">{product.location}</span>
            </p>
            {isEditing ? (
              <button
                className="absolute bottom-4 right-4 text-green-500"
                onClick={handleCreateCategory}
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
  const [allProducts, setProducts] = useState<Product[]>([]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [newLocation, setNewLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);

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

  useEffect(() => {
    fetch(
      "http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/Product"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  async function handleSearchFilter(
    categoryFilter: string,
    subcategoryFilter: string
  ) {
    console.log(categoryFilter, subcategoryFilter);
    console.log(
      `http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/Product?categoryId=${categoryFilter}&subcategoryId=${subcategoryFilter}`
    );
    const response = await fetch(
      `http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/Product?categoryId=${categoryFilter}&subcategoryId=${subcategoryFilter}`
    );

    if (!response.ok) {
      alert("Error fetching products");
      return;
    }

    const data = await response.json();
    setProducts(data);
    setCategoryFilter("");
    setSubcategoryFilter("");
  }

  async function handleSearchInput() {
    const response = await fetch(
      `http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/Product?query=${searchTerm}`
    );

    if (!response.ok) {
      alert("Error fetching products");
      return;
    }

    const data = await response.json();
    setProducts(data);
    setSearchTerm("");
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleCreateProduct = async (event: { preventDefault: () => void }) => {
    // Prevent the default form submit action
    event.preventDefault();

    if (
      newName.trim() === "" ||
      newQuantity <= 0 ||
      isNaN(newQuantity) ||
      newLocation.trim() === "" 
    //   newCategory.trim() === "" ||
    //   selectedFile === null ||
    //   selectedFile === undefined
    ) {
      alert("Please fill all fields");
      return;
    }

    // First, upload the image
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    const response = await fetch(
      "http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/Storage",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      alert("Error uploading image");
      return;
    }
    else {
        alert("Image uploaded successfully");
    }

    const { url, nameFile } = await response.json();

    console.log(url, nameFile);
    console.log(newName, newDescription, newQuantity, newLocation, newCategory, newSubcategory, url, nameFile);
    console.log(categoryFilter, subcategoryFilter);

    // Then, create the product
    const productResponse = await fetch(
      "http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/Product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          description: newDescription,
          quantity: newQuantity,
          location: newLocation,
          category: categoryFilter,
          subcategory: parseInt(subcategoryFilter),
          url: url,
          nameFile: nameFile,
        }),
      }
    );

    if (!productResponse.ok) {
      alert("Error creating product");
      return;
    }

    setNewName("");
    setNewDescription("");
    setNewQuantity(0);
    setNewLocation("");
    setSelectedFile(null);
    setCategoryFilter("");
    setSubcategoryFilter("");
    alert("Product created successfully");
    window.location.reload();
  };

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
        <button
          className="ml-2 p-2 bg-gray-500 rounded text-withe"
          onClick={handleSearchInput}
        >
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
            <button
              className="p-2 bg-gray-500 rounded text-white"
              onClick={() => {
                handleSearchFilter(categoryFilter, subcategoryFilter);
              }}
            >
              Search
            </button>
          </div>
        </div>
      )}
      {/* {products.map((product, index) => (
        <Card key={index} product={product} />
      ))} */}
      {allProducts.map((product, index) => (
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
              <label className="block flex items-center">
                Name:
                <input
                  type="text"
                  className="w-[70%] ml-auto p-2 h-8 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </label>
              <label className="block flex items-center">
                Description:
                <input
                  type="text"
                  className="w-[70%] ml-auto p-2 h-12 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </label>
              <label className="block flex items-center">
                Category:
                <select
                  className="w-[70%] ml-auto p-2 h-8 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((category: Category) => (
                    <option
                      key={category.idCategory}
                      value={category.idCategory}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block flex items-center">
                Subcategory:
                <select
                  className="w-[70%] ml-auto p-2 h-8 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={subcategoryFilter}
                  onChange={(e) => setSubcategoryFilter(e.target.value)}
                >
                  <option value="">Select a subcategory</option>
                  {subcategories.map((subcategory: Subcategory) => (
                    <option
                      key={subcategory.idSubCategory}
                      value={subcategory.idSubCategory}
                    >
                      {subcategory.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block flex items-center">
                Quantity:
                <input
                  type="number"
                  className="w-[70%] ml-auto p-2 h-8 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                />
              </label>
              <label className="block flex items-center">
                Location:
                <input
                  type="text"
                  className="w-[70%] ml-auto p-2 h-8 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </label>
              <label className="block flex items-center">
                Photo:
                <input
                  type="file"
                  accept="image/*"
                  className="w-[70%] ml-auto p-2 h-12 border border-gray-300 rounded mt-1 bg-white text-black"
                  onChange={handleFileChange}
                />
              </label>
              <button
                className="w-full p-2 rounded bg-green-500 text-white"
                type="submit"
                onClick={handleCreateProduct}
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
