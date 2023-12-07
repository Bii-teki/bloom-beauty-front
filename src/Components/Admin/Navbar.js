import React from 'react';

function Navbar({ selectedSection, handleSectionChange }) {
    return (
        <nav className="h-3/4 overflow-y-auto bg-gray-800 text-white sticky top-12">
        <div className="p-4">
            <h2 className="font-semibold text-xl uppercase tracking-wide mb-4">MailBoxes</h2>
    
            {/* MailBoxes Sections */}
            <div className="mb-4">
                {["products", "clients", "orders", "accounts"].map((section) => (
                    <a
                        key={section}
                        href="#"
                        onClick={() => handleSectionChange(section)}
                        className={`flex items-center justify-between py-2 px-4 text-sm font-medium ${selectedSection === section ? 'bg-white text-black' : 'hover:bg-gray-700'
                            } rounded-lg mb-2`}
                    >
                        <span className="flex items-center">
                            {section === "products" && <i className="h-6 w-6 fa fa-envelope-o fill-current mr-2" aria-hidden="true"></i>}
                            {section === "clients" && <i className="h-6 w-6 fa fa-flag-o fill-current mr-2" aria-hidden="true"></i>}
                            {section === "orders" && <i className="h-6 w-6 fa fa-pencil-square-o fill-current mr-2" aria-hidden="true"></i>}
                            {section === "accounts" && <i className="h-6 w-6 fa fa-pencil-square-o fill-current mr-2" aria-hidden="true"></i>}
                            <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                        </span>
                    </a>
                ))}
            </div>
    
            {/* Analytics Section */}
            <div>
                <h2 className="font-semibold text-xl uppercase tracking-wide mb-4">Analytics</h2>
                {["productsanalytics", "invoicesanalytics", "bugs"].map((section) => (
                    <a
                        key={section}
                        href="#"
                        onClick={() => handleSectionChange(section)}
                        className={`flex items-center justify-between py-2 px-4 text-sm font-medium ${selectedSection === section ? 'bg-gray-600' : 'hover:bg-gray-700'
                            } rounded-lg mb-2`}
                    >
                        <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                    </a>
                ))}
            </div>
        </div>
    </nav>
    
    );
}

export default Navbar;