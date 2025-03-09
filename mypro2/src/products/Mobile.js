import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Mobile = () => {
  const navigate = useNavigate();

  const mob = () => {
    navigate("/products");
  };

  const products = [
    { id: 1, name: "Apple iPhone", brand: "Apple", manufacturer: "Apple", price: 999, image: "/apple.jpg" },
    { id: 2, name: "Vivo Phone", brand: "Vivo", manufacturer: "China", price: 499, image: "/vivo.jpg" },
    { id: 3, name: "Samsung Galaxy", brand: "Samsung", manufacturer: "Samsung", price: 799, image: "/samsung.jpg" },
    { id: 4, name: "OnePlus Phone", brand: "OnePlus", manufacturer: "OnePlus", price: 699, image: "/oneplus.jpg" },
    { id: 5, name: "Xiaomi Phone", brand: "Xiaomi", manufacturer: "China", price: 399, image: "/card.jpg" },
    { id: 6, name: "Realme Phone", brand: "Realme", manufacturer: "China", price: 299, image: "/apple.jpg" },
  ];

  const addToWishlist = async (productId, productName, price, image) => {
    try {
      const response = await axios.post("http://localhost:3002/cart", {
        productId,
        productName,
        price,
        image,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error adding product to wishlist");
    }
  };

  const handleWishlist = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const { id, name, price, image } = product;
      addToWishlist(id, name, price, image);
    } else {
      console.error("Product not found");
    }
  };

  const handleBuy = async (productId) => {
    // Find the product details
    const product = products.find((p) => p.id === productId);
    
    if (product) {
      const { id, name, price, image } = product;
  
      try {
        // Call placeOrders to send the data to the backend
        const response = await axios.post("http://localhost:3002/orders", {
          productId: id,
          productName: name,
          price,
          image,
        });
        alert(response.data.message); // Show message from the backend
      } catch (error) {
        console.error(error);
        alert("Error placing the order");
      }
    } else {
      console.error("Product not found");
    }
  };
  

  return (
    <>
      {/* Back Button */}
      <button className="btn btn-primary w-auto" onClick={mob}>
        Back
      </button>

      <div className="row mt-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={product.image}
                className="card-img-top img-fluid"
                alt="Product Image"
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div className="card-header">
                <h5>Product Details</h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p>
                  <strong>Manufacturer:</strong> {product.manufacturer}
                </p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
              </div>
              <div className="d-flex flex-column gap-2 mt-2">
                <button
                  className="btn btn-danger buy-btn"
                  onClick={() => handleBuy(product.id)}
                >
                  Buy
                </button>
                <button
                  className="btn btn-success wishlist-btn"
                  onClick={() => handleWishlist(product.id)}
                >
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
  .card {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    background-color: #ffffff;
    transform: scale(1);
  }

  .card:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .card-header {
    padding: 15px;
    background-color: #f7f7f7;
    border-bottom: 1px solid #e0e0e0;
  }

  .card-header h5 {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .card-body {
    padding: 20px;
  }

  .card-body p {
    font-size: 15px;
    line-height: 1.6;
    color: #666;
  }

  .buy-btn,
  .wishlist-btn {
    padding: 12px 18px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease-in-out;
  }

  .buy-btn {
    background-color: #e74c3c;
    color: white;
  }

  .buy-btn:hover {
    background-color: #c0392b;
    transform: translateY(-3px);
  }

  .wishlist-btn {
    background-color: #2ecc71;
    color: white;
  }

  .wishlist-btn:hover {
    background-color: #27ae60;
    transform: translateY(-3px);
  }

  .d-flex .gap-2 {
    display: flex;
    gap: 15px;
    margin-top: 15px;
  }

  .card-footer {
    padding: 10px 20px;
    text-align: center;
    background-color: #f7f7f7;
    border-top: 1px solid #e0e0e0;
  }

  .card-footer p {
    font-size: 14px;
    color: #aaa;
  }
`}</style>

    </>
  );
};

export default Mobile;
