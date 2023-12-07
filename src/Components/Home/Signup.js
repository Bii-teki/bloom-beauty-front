import React from "react";
import { Link } from "react-router-dom";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  telephone: Yup.string().required("Telephone is required"),
  ph_address: Yup.string().required("Address is required"),
  city_town: Yup.string().required("City is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: Yup.number().required("Role is required"),
});

const initialValues = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  telephone: "",
  ph_address: "",
  city_town: "",
  password: "",
  role: "2", 
};

const SignUp = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitted values:", values);
    fetch("https://bloom-beauty.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'User registered successfully') {
          console.log("Success:", data);
          toast.success('Account created successfully!');
          resetForm();
        } else {
          

          toast.error('Invalid credentials');
        return;
        }
      })
      
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while creating account.");
      });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-96 md:w-1/2 xl:w-1/2 h-screen">
          {/* <div className='ml-8 mt-8 w-24'>
              <img src="https://static.vecteezy.com/system/resources/previews/004/191/138/original/beauty-and-personal-care-glyph-icon-makeup-and-skincare-decorative-cosmetics-e-commerce-department-online-shopping-categories-silhouette-symbol-negative-space-isolated-illustration-vector.jpg" alt="" class="w-full h-full object-cover" />
            </div> */}
            {/* <div className='ml-48 mt-32 w-3/5'> */}
              <img src="https://media.istockphoto.com/id/1463013729/photo/online-registration-form-for-modish-form-filling.webp?s=2048x2048&w=is&k=20&c=3ZAV9DqSymZphCLXFNP-2QjOlzdPyQLApCQdqKA46Zc=" 
               alt=""
               className="w-full h-full object-cover"
                />
            {/* </div> */}
          </div>
          <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/2 h-screen px-2 lg:px-16 xl:px-12 flex items-center justify-center">
            <div className="w-full mr-64 ml-24">
              <h1 className="text-xl md:text-2xl font-bold leading-tight mb-4 mt-12">Account SignUp</h1>
              <div className="flex">
                <div className="mr-4">
                <label className="block text-gray-700">First Name</label>
                <Field type="text" name="first_name" placeholder="Enter First Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="off" required />
                <ErrorMessage name="first_name" component="div" className="text-red-500" />
                </div>
                <div>
                <label className="block text-gray-700">Last Name</label>
                <Field type="text" name="last_name" placeholder="Enter Last Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="off" required />
                <ErrorMessage name="last_name" component="div" className="text-red-500" />
                </div>
              </div>
              <div>                
                <Field as="select" hidden name="role" id="role" className="w-full px-32 py-3 rounded-lg bg-gray-200 mt-2 border focus-border-blue-500 focus-bg-white focus-outline-none">
                 <option value="2">User</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-500" />
              </div>
             
              <div>
                <label className="block text-gray-700">Username</label>
                <Field type="text" name="username" placeholder="Enter Username" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="off" required />
                <ErrorMessage name="username" component="div" className="text-red-500" />
              </div>
              <div>
                <label className="block text-gray-700 mt-4">Email Address</label>
                <Field type="email" name="email" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="off" required />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="flex mt-6">
              <div className="mr-4">
                <label className="block text-gray-700">Telephone</label>
                <Field type="number" name="telephone" placeholder="Enter Telephone" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="off" required />
                <ErrorMessage name="telephone" component="div" className="text-red-500" />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <Field type="text" name="ph_address" placeholder="Enter Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="off" required />
                <ErrorMessage name="ph_address" component="div" className="text-red-500" />
              </div>
              </div>
              <div>
                <label className="block text-gray-700 mt-4">City</label>
                <Field type="text" name="city_town" placeholder="Enter City" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="off" required />
                <ErrorMessage name="city_town" component="div" className="text-red-500" />
              </div>
              <div>
                <label className="block text-gray-700 mt-4">Password</label>
                <Field type="password" name="password" placeholder="Enter Password" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus-border-blue-500 focus-bg-white focus-outline-none" required />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus-bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
                Sign Up
              </button>
              <ToastContainer />
              <hr className="my-6 border-gray-300 w-full" />
              <div className="mt-4">
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Form>
    </Formik>
  );
};

export default SignUp;