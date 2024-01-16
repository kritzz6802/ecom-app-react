import React, { useState } from 'react';
import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Rating from '@mui/material/Rating';

function AddToCart() {
  const [activeTab, setActiveTab] = useState('cart');
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [favoriteItems, setFavoriteItems] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const items = activeTab === 'cart' ? cartItems : favoriteItems;

  return (
    <>
      <div className='shadow-md w-9/12 border-2 m-6'>
        <div className='flex -mt-16 w-full'>
          <div
            className={`py-4 px-6 border cursor-pointer ${activeTab === 'cart' ? 'bg-orange-500 text-white' : ''}`}
            onClick={() => handleTabChange('cart')}
          >
            Cart
          </div>
          <div
            className={`py-4 px-6 border cursor-pointer ${activeTab === 'favorite' ? 'bg-orange-500 text-white' : ''}`}
            onClick={() => handleTabChange('favorite')}
          >
            Favourite
          </div>
        </div>
        <div className="cart-card w-full p-3">
          <div className="cart-info flex gap-4 p-4 border-t-2">
            <div className='mr-auto'>Product</div>
            <div className="flex justify-between align-center flex-col ml-auto">
              Quantity
            </div>
            <p className="discount text-xl font-semibold text-gray-800 ml-auto">
              <span className="text-green-500">Price</span>
            </p>
          </div>
        </div>
        {items.map((datas) => (
          <div className="cart-card w-full p-3" key={datas.id}>
            <div className="cart-info flex gap-4 p-4 border-t-2">
              <img
                className='w-40 h-40 rounded-md'
                src={datas.thumbnail}
                alt={`Product img`}
              />
              <div className='w-1/3'>
                <h2 className="product-title text-xl font-semibold mb-2">{datas.title}</h2>
                <p className="cart-product-description text-gray-600 mb-2">{datas.description}</p>
                <p className="brand text-gray-700">Brand: {datas.brand}</p>
                <p className="rating flex items-center text-gray-700">
                  <span className="text-base mr-1">{datas.rating}</span>
                  <Rating name="half-rating-read" value={datas.rating} precision={0.5} readOnly />
                </p>
              </div>
              {activeTab!=="favorite"?
               <div className="buttons-container">
               <div className="flex justify-between align-center flex-col">
                 <div className="quantity-controls border-2 p-2 rounded-md">
                   <IconButton>
                     <Remove />
                   </IconButton>
                   <span className="mx-2">{datas.quantity}</span>
                   <IconButton>
                     <Add />
                   </IconButton>
                 </div>
                 <div className="remove-button flex justify-center items-center border-2 mt-2 p-2 rounded-md cursor-pointer hover:bg-gray-100">
                   <span className="text-red-500">Remove</span>
                 </div>
               </div>
             </div>:
              <div className="buttons-container">
              <div className="flex justify-between align-center flex-col">
                <div className="quantity-controls border-2 p-2 ml-4 rounded-md">
                  <span className="mx-2">Add to Cart</span>
                </div>
              </div>
            </div>
              }
             
              <p className="discount text-xl font-semibold text-gray-800 ml-auto">
                <span className="text-green-500">₹{datas.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AddToCart;
