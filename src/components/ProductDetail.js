import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import "react-carousel/lib/carousel.css";
import { IconButton } from "@mui/material";
import { Add, Remove, Favorite, FavoriteBorder } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(() => {
    const storedQuantity = JSON.parse(localStorage.getItem('cart'))?.find(i=>i.id===Number(id))?.quantity || 1;
    return storedQuantity;
  });

  const removeQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? --prevQuantity : prevQuantity));
  }

  const addQuantity = () => {
    setQuantity((prevQuantity) =>  ++prevQuantity)
  }
  // const toggleFavorite = () => {
  //   setProduct((prevProduct) => ({ ...prevProduct, isLiked: !prevProduct.isLiked }));
  // };
  useEffect(() => {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setRating(res.data.rating);
        })
        .catch((err) => {
          console.log(err);
        }); 
  }, [id]);
  

  const handleThumbnailClick = (index) => {
    setActiveStep(index);
  };
  const addToCart = () => {
    const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingCartItem = existingCartItems.find(item => item.id === product.id);
  
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      setQuantity(existingCartItem.quantity);
    } else {
      existingCartItems.push({ ...product, quantity });
      setQuantity(quantity);

    }
  
    localStorage.setItem('cart', JSON.stringify(existingCartItems));
  };
  
  const toggleFavorite = () => {
    const updatedProduct = { ...product, isLiked: !product.isLiked };
    setProduct(updatedProduct);
  
    const existingFavItems = JSON.parse(localStorage.getItem('favorites')) || [];
  
    if (updatedProduct.isLiked === false) {
      // Remove the item from favorites if isLiked is false
      const updatedFavItems = existingFavItems.filter((item) => item.id !== product.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavItems));
    } else {
      // Add or update the item in favorites
      const existingItemIndex = existingFavItems.findIndex((item) => item.id === product.id);
  
      if (existingItemIndex !== -1) {
        existingFavItems[existingItemIndex] = updatedProduct;
      } else {
        existingFavItems.push(updatedProduct);
      }
  
      localStorage.setItem('favorites', JSON.stringify(existingFavItems));
    }
  };
  
  return (
    <div className="product-details-container">
      <div className="flex">
        <div className="thumbnails-container flex-col">
          {product.images &&
            product.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${activeStep === index ? "active-thumbnail" : ""
                  }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
            ))}
        </div>
        <div className="main-image-container flex w-full h-96">
          <img
            src={product.images && product.images[activeStep]}
            alt={`Product ${activeStep + 1}`}
          />
        </div>
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="brand">Brand: {product.brand}</p>
          <p className="rating flex items-center">
            <span className="text-base">{rating}</span>
            <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
          </p>
          <p className="deal-of-the-day">Deal of the Day</p>
          <p className="discount">-{product.discountPercentage}% <span><span className="money-symbol">₹</span><span>{product.price}</span></span></p>
          <div className="buttons-container">
            <div className="flex justify-between align-center">
              <p>quantity</p>
              <div className="border-2">
                <IconButton onClick={removeQuantity}>
                  <Remove />
                </IconButton>
                <span>{quantity}</span>
                <IconButton onClick={addQuantity}>
                  <Add />
                </IconButton>
              </div>
            </div>
            <div className="flex justify-center items-center border-2 mt-2">
              <Button variant="text"><Link to={`/cart`} onClick={addToCart}>Add To Cart</Link> </Button>
            </div>
            <div className="flex justify-center items-center border-2 mt-2" onClick={toggleFavorite}>
              <IconButton>
                {product.isLiked ? (
                  <Favorite color="error" />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
              <span>Faviourite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
