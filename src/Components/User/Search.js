import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

function Search({ onSearchChange, onCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories when the component mounts
    fetch("https://bloom-beauty.onrender.com/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setAllCategories(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const handleChosenCategory = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    onCategory(selectedCategory); 
  };

  const handleSearchTerm = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    onSearchChange(searchTerm); 
  };

  return (
    <div className="flex items-center justify-center sticky py-7">
      <div className="relative w-[35rem]">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchTerm}
          className="rounded-lg w-full border-2 p-3 pr-10 outline-blue-600"
        />
        <button className="absolute right-3 top-3">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      <select
          name="category"
          id="dropdown"
          className="rounded-md p-4 outline-none ml-4"
          onChange={handleChosenCategory}
          
          value={selectedCategory}
        >
          <option value="all">All Categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
    </div>
  );
}

export default Search;
