import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // You might want to show a confirmation modal to the user here
    const confirmed = window.confirm('Are you sure you want to log out?');
  
    if (confirmed) {
      try {
        // Assuming onLogout returns a promise indicating the success of the logout
        await onLogout();
  
        // Show toast notification on successful logout
        toast.success('Logged out successfully', {
          position: 'top-center',
          autoClose: 3000, // 2 seconds
          hideProgressBar: true,
        });
  
        // Redirect after a delay (e.g., 2 seconds)
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        // Handle errors during logout, if needed
        console.error('Logout failed:', error.message);
      }
    } else {
      // If the user cancels, redirect to '/products'
      navigate('/products');
    }
  };
  

  const handleCancel = () => {
    // Redirect to '/products' immediately when the user clicks cancel
    navigate('/products');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md p-4 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Logout Page</h2>
        <div className="bg-blue-100 p-4 rounded-md">
          <p className="text-blue-800">Are you sure you want to log out?</p>
          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
            >
              Logout
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
