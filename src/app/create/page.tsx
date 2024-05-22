"use client";
import { time, timeLog } from "console";
import React, { useEffect, useState } from "react";
import bg from "../../../public/TpBg.svg";

interface Category {
  idCategory: string;
  title: string;
}

interface Subcategory {
  idSubCategory: string;
  title: string;
}

export default function CreateView() {
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showSubcategoryPopup, setShowSubcategoryPopup] = useState(false);
  const [categories, setCategories] = useState<
    { title: string; idCategory: number }[]
  >([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState({
    idCategory: "",
    title: "",
  });

  useEffect(() => {
    fetch(
      "http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/category"
    )
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCreateCategory = async (event: {
    preventDefault: () => void;
  }) => {
    // Prevent the default form submit action
    event.preventDefault();

    if (newCategory.trim() === "") {
      alert("Please enter a category name");
      return;
    }

    const response = await fetch(
      "http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/category",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newCategory }),
      }
    );

    if (!response.ok) {
      alert("Error creating category");
      return;
    }

    setNewCategory("");
    alert("Category created successfully");
    window.location.reload();
  };

  const handleCreateSubcategory = async (event: {
    preventDefault: () => void;
  }) => {
    // Prevent the default form submit action
    event.preventDefault();

    if (
      newSubcategory.title.trim() === "" ||
      newSubcategory.idCategory.trim() === ""
    ) {
      alert("The name and category are required");
      return;
    }

    const response = await fetch(
      "http://tp-loadbalancer-831349791.us-east-1.elb.amazonaws.com/api/subcategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newSubcategory.title,
          idCategory: newSubcategory.idCategory,
        }),
      }
    );

    if (!response.ok) {
      alert("Error creating subcategory");
      return;
    }

    setNewSubcategory({ idCategory: "", title: "" });
    alert("Subcategory created successfully");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <img src={bg.src} alt="TransPabon Logo" className="w-72" /> */}
      <button className="fixed top-0 left-0 m-4 p-2 bg-gray-600 rounded text-white ">
        <a href="/menu">Back</a>
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold  py-2 px-4 rounded mb-3 w-48"
        onClick={() => setShowCategoryPopup(true)}
      >
        Create Category
      </button>
      {showCategoryPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-gray-600 p-4 rounded-lg shadow-lg text-white max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              New Category
            </h2>
            <form className="space-y-4">
              <label className="block">
                Name:
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </label>
              <button
                className="w-full p-2 rounded bg-green-500 text-white"
                type="submit"
                onClick={handleCreateCategory}
              >
                Submit
              </button>
            </form>
            <button
              className="mt-4 text-red-500"
              onClick={() => setShowCategoryPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white w-48 font-bold py-2 px-4 rounded"
        onClick={() => setShowSubcategoryPopup(true)}
      >
        Create Subcategory
      </button>
      {showSubcategoryPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-gray-600 p-4 rounded-lg shadow-lg text-white max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              New Subcategory
            </h2>
            <form className="space-y-4">
              <label className="block">
                Name:
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={newSubcategory.title}
                  onChange={(e) =>
                    setNewSubcategory({
                      ...newSubcategory,
                      title: e.target.value,
                    })
                  }
                />
              </label>
              <label className="block">
                Category:
                <select
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-black"
                  value={newSubcategory.idCategory}
                  onChange={(e) =>
                    setNewSubcategory({
                      ...newSubcategory,
                      idCategory: e.target.value,
                    })
                  }
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option
                      key={category.idCategory}
                      value={category.idCategory}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="w-full p-2 rounded bg-green-500 text-white"
                type="submit"
                onClick={handleCreateSubcategory}
              >
                Submit
              </button>
            </form>
            <button
              className="mt-4 text-red-500"
              onClick={() => setShowSubcategoryPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
