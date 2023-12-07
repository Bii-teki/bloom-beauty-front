import React, { useState, useEffect } from 'react';

function Filter() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);

  useEffect(() => {
   
    const fetchCategories = async () => {
      const categoriesData = await fetch('https://bloom-beauty.onrender.com/categories');
      const categoriesJson = await categoriesData.json();
      setCategories(categoriesJson);
    };

    const fetchBrands = async () => {
      const brandsData = await fetch('https://bloom-beauty.onrender.com/brands');
      const brandsJson = await brandsData.json();
      setBrands(brandsJson);
    };

    const fetchPriceRanges = async () => {      
      const priceRangesData = await fetch('https://bloom-beauty.onrender.com/categories');
      const priceRangesJson = await priceRangesData.json();
      setPriceRanges(priceRangesJson);
    };

    fetchCategories();
    fetchBrands();
    fetchPriceRanges();
  }, []);

  const filterProducts = () => {
    const filteredProducts = products.filter((product) => {
      return (
        (!selectedCategory || product.category === selectedCategory) &&
        (!selectedBrand || product.brand === selectedBrand) &&
        (!selectedPriceRange || product.priceRange === selectedPriceRange)
      );
    });
    
    setProducts(filteredProducts);
  };

  return (
    <div className="w-full md:w-2/3 shadow p-5 rounded-lg bg-white">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
      >
        <option value="">All Brands</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

      <select
        value={selectedPriceRange}
        onChange={(e) => setSelectedPriceRange(e.target.value)}
        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
      >
        <option value="">All Price Ranges</option>
        {priceRanges.map((priceRange) => (
          <option key={priceRange.id} value={priceRange.id}>
            {priceRange.name}
          </option>
        ))}
      </select>

      <button
        onClick={filterProducts}
        className="px-4 py-2 bg-gray-100 hover-bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
      >
        Apply Filters
      </button>

   
      {products.map((product) => (
        <div key={product.id}>
         
        </div>
      ))}
    </div>
  );
}

export default Filter;
