import React from "react";
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
  role: "1", 
};



const Create_Acounts = () => {
  const handleSubmit = (values, { resetForm }) => {
   
    console.log("Submitted values:", values);
    console.log("Role value:", values.role);
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
          alert("Account created successfully!");
          resetForm();
        } else {
          console.error("Error:", data.message);
          alert("Error in creating account.");
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
        <section className="flex flex-col border  md:flex-row h-screen items-center">
          <div className="bg-white  w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/2 h-screen px-2 lg:px-16 xl:px-12 items-center justify-center">
            <div className="w-full  mr-64 ml-24">
              <h1 className="text-xl md:text-2xl font-bold leading-tight mb-4 mt-12">Account SignUp</h1>
              <div className="flex">
                <div className="mr-4">
                  <label className="block text-gray-700">First Name</label>
                  <Field
                    type="text"
                    name="first_name"
                    placeholder="Enter First Name"
                    className="w-full px-14 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus-bg-white focus-outline-none"
                    autoFocus
                    autoComplete="off"
                    required
                  />
                  <ErrorMessage name="first_name" component="div" className="text-red-500" />
                </div>
                <div>
                  <label className="block text-black">Last Name</label>
                  <Field
                    type="text"
                    name="last_name"
                    placeholder="Enter Last Name"
                    className="w-full px-14 py-3 rounded-lg bg-gray-200 mt-2 border focus-border-blue-500 focus-bg-white focus-outline-none"
                    autoFocus
                    autoComplete="off"
                    required
                  />
                  <ErrorMessage name="last_name" component="div" className="text-red-500" />
                </div>
              </div>
              <div className="flex mt-6">
              <div className="mr-4">
                <label className="block text-black">Username</label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className="w-full px-14 py-3 rounded-lg bg-gray-200 mt-2 border focus-border-blue-500 focus-bg-white focus-outline-none"
                  autoFocus
                  autoComplete="off"
                  required
                />
                <ErrorMessage name="username" component="div" className="text-red-500" />
              </div>
              <div>
                <label className="block text-black ">Email Address</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  className="w-full px-14 py-3 rounded-lg bg-gray-200 mt-2 border focus-border-blue-500 focus-bg-white focus-outline-none"
                  autoFocus
                  autoComplete="off"
                  required
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              </div>
              <div className="flex mt-6">
                <div className="mr-4">
                  <label className="block text-black">Telephone</label>
                  <Field
                    type="number"
                    name="telephone"
                    placeholder="Enter Telephone"
                    className="w-full px-14 py-3 rounded-lg bg-gray-200 mt-2 border focus-border-blue-500 focus-bg-white focus-outline-none"
                    autoFocus
                    autoComplete="off"
                    required
                  />
                  <ErrorMessage name="telephone" component="div" className="text-red-500" />
                </div>
                <div>
                  <label className="block text-black">Address</label>
                  <Field
                    type="text"
                    name="ph_address"
                    placeholder="Enter Address"
                    className="w-full px-14 py-3 rounded-lg bg-gray-200 mt-2 border focus-border-blue-500 focus-bg-white focus-outline-none"
                    autoFocus
                    autoComplete="off"
                    required
                  />
                  <ErrorMessage name="ph_address" component="div" className="text-red-500" />
                </div>
              </div>
              <div className="flex mt-6">
              <div className="mr-4">
                <label className="block text-black mt-4">City</label>
                <Field
                  type="text"
                  name="city_town"
                  placeholder="Enter City"
                  className="w-full px-14 py-3 rounded-lg bg-gray-200 mt-2 border focus-border-blue-500 focus-bg-white focus-outline-none"
                  autoFocus
                  autoComplete="off"
                  required
                />
                <ErrorMessage name="city_town" component="div" className="text-red-500" />
              </div>
              <div>
                <label className="block text-black mt-4">Role</label>
                <Field as="select" name="role" id="role" className="w-full px-32 py-3 rounded-lg bg-gray-200 mt-2 border focus-border-blue-500 focus-bg-white focus-outline-none">
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                  <option value="3">Finance</option>
                  <option value="4">Manager</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-500" />
              </div>
              </div>
              <div>
                <label className="block text-black mt-4">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus-border-blue-500 focus-bg-white focus-outline-none"
                  required
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>



              <div className="text-right mt-2">
                <a href="#" className="text-sm font-semibold text-gray-700 hover-text-blue-700 focus-text-blue-700">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="w-full block bg-indigo-500 hover-bg-indigo-400 focus-bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
                Create Account
              </button>
              <hr className="my-6 border-gray-300 w-full" />
            </div>
          </div>
        </section>
      </Form>
    </Formik>
  );
};

export default Create_Acounts;
