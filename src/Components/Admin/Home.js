import React, { useState } from 'react';
import Navbar from './Navbar';
import NewProduct from './NewProduct';
import Clients from './Clients';
import Products from './Products';
import Orders from './Orders';
import Create_Accounts from './Create_Accounts';
import ProductAnalytics from './Products_analytics';
import OrdersAnalytics from './OrdersAnalytics';



function Home({  onLogout, authUser }) {

    const [selectedSection, setSelectedSection] = useState('products');

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };


    
    return (

        <div class="min-h-screen flex flex-col">
            <header class="flex flex-shrink-0">
                <div class="flex-shrink-0 px-4 py-3 bg-gray-800 w-64">
                    <button class="flex items-center  w-full">
                        <img class="h-8 w-8 rounded-full object-cover"
                            src="https://static.vecteezy.com/system/resources/previews/004/191/138/original/beauty-and-personal-care-glyph-icon-makeup-and-skincare-decorative-cosmetics-e-commerce-department-online-shopping-categories-silhouette-symbol-negative-space-isolated-illustration-vector.jpg" alt=""
                        />

                        <svg class=" ml-auto h-6 w-6  stroke-current text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M16 10l-4 4-4-4" stroke="4A5568" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div class="flex-1 flex bg-gray-700 px-6 items-center justify-between">
                    <nav>
                        <a href="#"
                            class="hover:bg-gray-600 rounded-lg  bg-gray-800 inline-block text-sm font-medium text-white px-3 py-2 leading-none">MailBox</a>
                        <a href="#"
                            class="ml-2 hover:bg-gray-600 rounded-lg inline-block text-sm font-medium text-white px-3 py-2 leading-none">Customers</a>
                        <a href="#"
                            class="hover:bg-gray-600 rounded-lg inline-block text-sm font-medium text-white px-3 py-2 leading-none">Reporting</a>
                        <a href="#"
                            class="hover:bg-gray-600 rounded-lg inline-block text-sm font-medium text-white px-3 py-2 leading-none">Manage</a>
                    </nav>
                    <div class="flex items-center">

                        <NewProduct />
                      
                        <button class="ml-6 text-gray-400 hover:text-gray-200">
                            <i class="fa fa-bell-o h-5 w-5 fill-current" aria-hidden="true" style={{ color: '#fff' }}></i>
                        </button>
                        <span class="relative">
                        <button class="ml-6 text-green-500 hover:text-green-500">
                            <i 
                             class="focus:bg-white h-8  focus:text-gray-900 focus:placeholder-gray-700 pl-10 pr-4 py-2 leading-none block w-full bg-gray-900 rounded-lg text-sm placeholder-gray-400 text-white"
                               
                           
                                style={{ color: '#fff' }}>{authUser.email} {authUser.id}</i>
                                
                        </button>
                        </span>
                        <button class="ml-6 text-green-500 hover:text-green-500">
                            <i class="fa fa-question-circle-o h-5 w-5 fill-current" aria-hidden="true"
                                style={{ color: '#fff' }}>{onLogout}</i>
                        </button>
                    </div>
                </div>
            </header>
            <div class="flex-1 flex overflow-x-hidden">
                <div class="sm:w-64 md:w-1/4 lg:w-1/5 p-6 bg-gray-100 overflow-y-auto">
                    <Navbar selectedSection={selectedSection} handleSectionChange={handleSectionChange} />
                </div>
                <div className="flex-1 p-6">
                    {selectedSection === 'products' && <Products />}
                    {selectedSection === 'orders' && <Orders />}
                    {selectedSection === 'clients' && <Clients />}
                    {selectedSection === 'accounts' && <Create_Accounts />}
                    {selectedSection === 'productsanalytics' && <ProductAnalytics />}
                    {selectedSection === 'invoicesanalytics' && <OrdersAnalytics />}
                </div>

            </div>
        </div>

    );
}

export default Home;