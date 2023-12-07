import React, { useState, useEffect } from 'react';


function Clients() {


    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients]=useState([])

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

   
    useEffect(() => {
        const filtered = clients.filter((client) =>
        client.first_name.toLowerCase().includes(searchTerm.toLowerCase()) 
        // || client.role
        );
        setFilteredClients(filtered);
    }, [clients, searchTerm]);


    useEffect(() => {
        fetch('https://bloom-beauty.onrender.com/clients')
            .then((response) => response.json())
            .then((data) => {
                setClients(data);

            })
            .catch((error) => {
                console.error('Error fetching clients:', error);

            });
    }, []);


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
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
                    <thead className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Telephone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Role
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
                        {filteredClients.map((client) => (
                            <tr key={client.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                                    <div class="pl-3">
                                        <div class="text-base font-semibold">{client.first_name} {client.last_name}
                                        </div>

                                    </div>
                                </th>
                                <td class="items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {client.email}
                                </td>
                                <td class="items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {client.telephone}
                                </td>
                                <td class="items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {client.role}
                                </td>
                                <td class="items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <button
                                        type="button"
                                        className="px-3 py-1.5 bg-blue-500 text-white font-medium rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    // onClick={() => handleViewClick(product.id)}
                                    >
                                        View
                                    </button>
                                </td>
                                <td class="items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <button
                                        type="button"
                                        // onClick={() => handleUpdateClick(product.id)}
                                        className="px-3 py-1.5 bg-green-500 text-white font-medium rounded-md text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        Update
                                    </button>
                                </td>
                                <td class="items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                                    <button
                                        type="button"
                                        // onClick={() => handleDeleteClick(product.id)}
                                        className="px-3 py-1.5 bg-red-500 text-white font-medium rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </div>
    )
}



export default Clients;