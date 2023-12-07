import React, { useState, useEffect } from 'react';
import { useAPIContext } from '../../Components/Data/apiContextData';
import View from './View';
import Update from "./Update"
import DeletePost from './DeletePost';
function Products() {
    const { products, loading } = useAPIContext();



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [currentProductId, setCurrentProductId] = useState(null);


    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.p_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [products, searchTerm]);


    const handleViewClick = (productId) => {
        setIsModalOpen(true);
        setCurrentProductId(productId)
        setModalType("view");
    };

    const handleUpdateClick = (productId) => {
        setIsModalOpen(true);
        setCurrentProductId(productId)
        setModalType("update");
    };


    const handleDeleteClick = (productId) => {
        console.log(productId);
        setIsModalOpen(true);
        setCurrentProductId(productId)
        setModalType("delete");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalType("");
    }
    const deleteProduct = (id) => {
        const new_products = filteredProducts.filter(product => product.id !== id)
        setFilteredProducts(new_products)
    }

    const addProduct = (data) => {
        const new_products = [data, ...filteredProducts]
        setFilteredProducts(new_products)
    }

    const updateProduct = (id, updatedData) => {
        const updatedProducts = filteredProducts.map(product => {
            if (product.id === id) {
                return { ...product, ...updatedData };
            }
            return product;
        });
    
        // Move the updated product to the top
        const updatedProductsWithMovedProduct = [
            updatedProducts.find(product => product.id === id),
            ...updatedProducts.filter(product => product.id !== id)
        ];
    
        setFilteredProducts(updatedProductsWithMovedProduct);
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }


    return (

        <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                <div class="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
                    <div>
                        <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Action button</span>
                            Action
                            <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                                </li>
                            </ul>
                            <div class="py-1">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                            </div>
                        </div>
                    </div>
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />

                    </div>
                </div>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                    <thead className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Image Url
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Brand
                            </th>
                            <th scope="col" class="px-6 py-3">
                                View
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Update
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                                    <div class="pl-3">
                                        <div class="text-base font-semibold">{product.p_name}
                                        </div>

                                    </div>
                                </th>
                                <td class="px-6 py-4">
                                    {product.image}
                                </td>
                                <td class="px-6 py-4">
                                    $ {product.price}
                                </td>
                                <td class="px-6 py-4">
                                    {product.category}
                                </td>
                                <td class="px-6 py-4">
                                    {product.brand}
                                </td>
                                <td class="px-6 py-4">
                                    <button
                                        type="button"
                                        className="px-3 py-1.5 bg-blue-500 text-white font-medium rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        onClick={() => handleViewClick(product.id)}
                                    >
                                        View
                                    </button>
                                </td>
                                <td class="px-6 py-4">
                                    <button
                                        type="button"
                                        onClick={() => handleUpdateClick(product.id)}
                                        className="px-3 py-1.5 bg-green-500 text-white font-medium rounded-md text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        Update
                                    </button>
                                </td>
                                <td class="px-6 py-4">

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteClick(product.id)}
                                        className="px-3 py-1.5 bg-red-500 text-white font-medium rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {isModalOpen && modalType === "view" && (
                            <View product_id={currentProductId} onClose={handleCloseModal} />
                        )}
                        {isModalOpen && modalType === "update" && (
                            <Update product_id={currentProductId} onClose={handleCloseModal} updateProduct={updateProduct} />
                        )}
                        {isModalOpen && modalType === "delete" && (
                            <DeletePost product_id={currentProductId} onClose={handleCloseModal} deleteProduct={deleteProduct} />
                        )}

                    </tbody>
                </table>
            </div>

        </div>
    )
}



export default Products;