import React, { useState } from 'react';
import Search from './Search';
import Filters from '../Filters';
import ReactPaginate from 'react-paginate';
import Cart from '../Cart/Cart';
import { useAPIContext } from '../Data/apiContextData';
import Services from './Services';

function Products({ login, user }) {
  const { products, loading } = useAPIContext();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (loading) {
    return <div>Loading...</div>;
  }

  const pageCount = Math.ceil(products.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

  const addToCart = (productId) => {
    setCurrentProductId(productId);
    setCart([...cart, productId]);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory === 'all') {
        return true;
      } else {
        return product.category === selectedCategory;
      }
    })
    .filter((product) => {
      if (!searchTerm) {
        return true;
      } else {
        return product.p_name.toLowerCase().includes(searchTerm.toLowerCase()) ||  product.category.toLowerCase().includes(searchTerm.toLowerCase())
      }
    });

  const displayedProducts = filteredProducts.slice(offset, offset + itemsPerPage);

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <div className=" h-2/4">
      <Services />
      <div className="flex items-center justify-between">      
        <div className='ml-96'>        
          
          <Search onSearchChange={handleSearchChange} onCategory={handleCategoryChange} />
        </div>
    <div className="flex items-center md:mr-12">
  <div style={{ position: "relative" }}>
    <img
      onClick={openCart}
      className="w-12 h-12 cursor-pointer"
      src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-add-to-cart-vector-icon-png-image_313447.jpg"
      alt="cart"
    />
    <div className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs'>
      {cart.length}
    </div>
  </div>
</div>
      </div>
      <div className="flex gap-4 ml-10 mr-10 ">
        <div className="flex  ml-6 flex-wrap -mx-4 " >   
          {displayedProducts.map((product) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4" key={product.id}> 
              <div className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white h-96 rounded-xl bg-clip-border">
                  <img
                    src={product.image}
                    className="object-cover w-full h-full"
                    alt={product.p_name}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {product.p_name}
                    </p>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      ${product.price}
                    </p>
                  </div>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {product.description.substring(0, 50)}
                  </p>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => addToCart(product.id)}
                    className="bg-transparent border-2 border-black rounded-full px-3 py-2 
                     text-md hover-bg-black hover-text-white 
                     block w-full select-none  bg-blue-gray-900/10  text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover-scale-105 focus-scale-105 focus-opacity-[0.85] active-scale-100 active-opacity-[0.85] disabled-pointer-events-none disabled-opacity-50 disabled-shadow-none"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>
          ))}  
          
        </div>

        <div className="fixed inset-y-0 right-0 z-50 flex flex-col items-end p-4">
          <div className="relative p-4 rounded-lg shadow-lg">

            <div className="max-h-screen  overflow-y-auto">
              {cartOpen && (
                <Cart cart={cart} user={user} products={products} onlogin={login} setCart={setCart} closeCart={closeCart} />
              )}
            </div>
          </div>
        </div>

      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="flex space-x-4 justify-center p-4"
          subContainerClassName="pages pagination"
          activeClassName="bg-blue-500 text-white"
          pageClassName="bg-gray-200 p-2 rounded-full"
          previousClassName="bg-gray-200 p-2 rounded-full"
          nextClassName="bg-gray-200 p-2 rounded-full"
        />
      </div>
    </div>
  );
}

export default Products;
