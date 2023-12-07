import React, { useState, useEffect } from 'react';

function Orders() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://bloom-beauty.onrender.com/invoices')
      .then((response) => response.json())
      .then((data) => {
        setInvoices(data);
        setFilteredInvoices(data);
      });
  }, []);

  const handleSearch = () => {
    const filtered = invoices.filter((invoice) =>
      invoice.user_details &&
      (invoice.user_details.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toString().includes(searchTerm))
    );
    setFilteredInvoices(filtered);
  };

  return (
    <div>
      <main className="bg-gray-100 min-h-screen py-10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Order Invoices</h1>
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search by Name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72"
              />
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  User: {invoice.user_details ? invoice.user_details.username : 'Unknown User'}
                </h2>
                <p className="text-gray-600 mb-2">Date: {invoice.created_at}</p>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Products:</h3>
                  {invoice.products.map((product) => (
                    <div key={product.id} className="mb-1">
                      <p>{product.product_name}</p>
                      <p className="text-gray-600">Price: ${product.price}</p>
                      <p className="text-gray-600">Category: {product.category}</p>
                    </div>
                  ))}
                </div>
                <button className="bg-indigo-500 text-white px-3 py-2 rounded-md mt-3 hover:bg-indigo-600">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orders;