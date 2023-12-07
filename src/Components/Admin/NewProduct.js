import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  p_name: Yup.string().required('Product Name is required'),
  image: Yup.string().url('Invalid URL').required('Image URL is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be an integer'),
    price: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be an integer'),
  description: Yup.string(),
  brand: Yup.string(),
  category: Yup.string(),
});

function NewProduct(addProject) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

 
  const handleSubmit = (values, { resetForm }) => {
    console.log('Submitted values:', values);
  
    fetch("https://bloom-beauty.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.error("Error:", data.errors);
          alert("Error adding the project.");
        } 
         
        try {
          addProject(data);
          console.log("Success:", data);
        alert("Project added successfully!");
        resetForm({
          p_name: '',
          image: '',
          quantity: '',
          price: '',
          description: '',
          brand: '',
          category: '',
        });
        } catch (error) {
          console.error("Error resetting form:", error);
          }
          
        
      });
  }
  
  return (
    <div>
<button
  onClick={toggleModal}
  className="mr-4 text-white bg-blue-700 hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus-ring-blue-800"
  type="button"
>
  <div className="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5 mr-2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    Add Product
  </div>
</button>



      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-75 bg-gray-400">
          <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
      


            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Product</h3>     <button
  onClick={toggleModal}
  className="absolute top-3 right-2.5 text-red-500 border border-red-500 hover:border-red-700 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:border-red-600 dark:text-red-300 transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300"
>
  <svg
    className="w-3 h-3"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
  </svg>
  <span className="sr-only">Close modal</span>
</button>

              <Formik
                initialValues={{
                  p_name: '',
                  image: '',
                  quantity: '',
                  price: '',
                  description: '',
                  brand: '',
                  category: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <div>
                      <label htmlFor="p_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Product Name
                      </label>
                      <Field
                        type="text"
                        name="p_name"
                        id="p_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Product Name"
                        required
                      />
                      <ErrorMessage name="p_name" component="div" className="text-red-500" />
                    </div>
                    <div>
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Image URL
                      </label>
                      <Field
                        type="text"
                        name="image"
                        id="image"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Image URL"
                        required
                      />
                      <ErrorMessage name="image" component="div" className="text-red-500" />
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Quantity
                      </label>
                      <Field
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="1......9"
                        required
                      />
                      <ErrorMessage name="quantity" component="div" className="text-red-500" />
                    </div>
                    <div>
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Price
                      </label>
                      <Field
                        type="number"
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="1......9"
                        required
                      />
                      <ErrorMessage name="price" component="div" className="text-red-500" />
                    </div>
                    <div>
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        id="description"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                      />
                    </div>
                    <div>
                      <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Brand
                      </label>
                      <Field
                        type="text"
                        name="brand"
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Category
                      </label>
                      <Field
                        type="text"
                        name="category"
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                    </div>
                    <div className="flex justify-between"></div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus-ring-blue-800"
                    >
                      Add New
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewProduct;
