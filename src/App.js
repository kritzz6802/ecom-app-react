import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";

import "./index.css";
import AddToCart from "./components/AddToCart";

// function HomePage() {
//   return <div className="page">🏠 Page</div>;
// }

function NotFoundPage() {
  return <div className="page">🧐 Page</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* <div>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/apple" className="link">
          Apple
        </Link>
        <Link to="/applet" className="link">
          Applet
        </Link>
        <Link to="/test" className="link">
          Test
        </Link>
      </div> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<AddToCart />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
