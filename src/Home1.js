import React, { useRef } from 'react';


import video from './video/video.mp4';
import Products from './Components/User/Products';


function Home() {
  const productsRef = useRef(null);

  const handleShopNowClick = () => {
    // Scroll to the "products" section when the "Shop now" button is clicked
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
<div className="h-screen relative">
  
  <video
    className="absolute top-0 left-0 w-full h-full object-cover filter "
    src={video}
    loop
    muted
    autoPlay
  ></video>
 
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
    <div className="text-center text-white">
      <h1 className="text-4xl font-semibold">Welcome to Our Bloom Beauty Shop</h1>
      <p className="mt-4 text-lg">Discover the latest trends in beauty and wellness.</p>
     
      <button
            onClick={handleShopNowClick}
            className="mt-8 inline-block px-6 py-3 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out"
          >
            Shop now
          </button>
    </div>
  </div>
</div>
<div id='products' ref={productsRef} className=''>
<Products />
</div>

    </>
  )
}
export default Home