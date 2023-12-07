import React, { useState, useEffect } from 'react';

function Filter(props) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);

  useEffect(() => {
    // Fetch categories, brands, and price ranges from your API endpoints
    // You should replace these with actual API calls
    const fetchCategories = async () => {
      // Replace with API call to fetch categories
      const categoriesData = await fetch('your_category_endpoint');
      const categoriesJson = await categoriesData.json();
      setCategories(categoriesJson);
    };

    const fetchBrands = async () => {
      // Replace with API call to fetch brands
      const brandsData = await fetch('your_brand_endpoint');
      const brandsJson = await brandsData.json();
      setBrands(brandsJson);
    };

    const fetchPriceRanges = async () => {
      // Replace with API call to fetch price ranges
      const priceRangesData = await fetch('your_price_endpoint');
      const priceRangesJson = await priceRangesData.json();
      setPriceRanges(priceRangesJson);
    };

    fetchCategories();
    fetchBrands();
    fetchPriceRanges();
  }, []);

  const filterProducts = () => {
    // Implement product filtering based on selectedCategory, selectedBrand, and selectedPriceRange
    // You should replace this with actual API call to fetch products with selected filters
    const filteredProducts = products.filter((product) => {
      return (
        (!selectedCategory || product.category === selectedCategory) &&
        (!selectedBrand || product.brand === selectedBrand) &&
        (!selectedPriceRange || product.priceRange === selectedPriceRange)
      );
    });
    // Update the filtered product list in your component state
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
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
      >
        Apply Filters
      </button>

      {/* Additional filters go here */}
      
      {/* Display filtered products */}
      {products.map((product) => (
        <div key={product.id}>
          {/* Render product details */}
        </div>
      ))}
    </div>
  );
}

export default Filter;
