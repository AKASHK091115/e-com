import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Mobile from "../products/Mobile";

const Product = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample products array (in real cases, this might be fetched from an API)
  const products = [
    { id: 1, name: "Product 1", description: "This is a great product that you will love!", imgUrl: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Product 2", description: "Explore the amazing features of this product.", imgUrl: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Product 3", description: "High-quality, durable, and reliable product.", imgUrl: "https://via.placeholder.com/300x200" },
    { id: 4, name: "Product 4", description: "This product will meet all your expectations.", imgUrl: "https://via.placeholder.com/300x200" },
    { id: 5, name: "Product 5", description: "Innovative and highly rated product by users.", imgUrl: "https://via.placeholder.com/300x200" },
    { id: 6, name: "Product 6", description: "Sleek design and top-notch features.", imgUrl: "https://via.placeholder.com/300x200" }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Trending Products</h1>
        <p className="text-center mb-4">Search by category</p>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search for products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown for categories */}
        <div className="dropdown mb-4">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Category
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a className="dropdown-item" href="/products/mobile">Mobile</a></li>
            <li><a className="dropdown-item" href="/products/Dress">Dress</a></li>
            <li><a className="dropdown-item" href="/products/Headset">Headset</a></li>
          </ul>
        </div>

        {/* Product Cards */}
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={product.imgUrl}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <a href="#" className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No products found for your search.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
