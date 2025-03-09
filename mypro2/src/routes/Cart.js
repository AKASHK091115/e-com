import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item for purchase

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3002/cart");
        setCartItems(response.data);  // Set the cart items in state
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };

    fetchCartItems();
  }, []);

  // Function to remove item from the cart
  const removeFromCart = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/cart/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
      alert(response.data.message);
    } catch (error) {
      console.error("Error removing product from cart", error);
      alert("Error removing product from cart");
    }
  };

  // Function to handle buying item
  const buyItem = (item) => {
    setSelectedItem(item); // Set the item to be bought
    setShowModal(true); // Show the modal
  };

  // Function to handle payment and show success message
  const handlePayment = async (paymentMethod) => {
    if (paymentMethod === "Cash On Delivery") {
      try {
        const response = await axios.post("http://localhost:3002/buy", {
          productId: selectedItem.id,
        });
  
        alert(response.data.message); // Show success message
        setCartItems(cartItems.filter((item) => item.id !== selectedItem.id)); // Remove item from cart state
        closeModal(); // Close the modal
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Error placing order");
      }
    } else {
      alert(`Payment successful via ${paymentMethod}`);
      closeModal(); // Close modal after payment
    }
  };
  

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null); // Reset the selected item
  };

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price || 0), 0);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center">Your cart is empty</div>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-8">
                      {/* Image of the product */}
                      <img
                        src={item.image_url} // Replace with actual image URL
                        alt={item.product_name}
                        className="card-img-top"
                        style={{ width: "100%", height: "250px", objectFit: "contain" }}
                      />
                    </div>
                    <div className="col-md-4 d-flex justify-content-end align-items-center">
                      <div className="card-body">
                        <h5 className="card-title">{item.product_name}</h5>
                        <p className="card-text">Price: {item.price} Rs</p>
                        {/* Remove from cart button with margin */}
                        <motion.button
                          className="btn btn-danger me-3" // Add margin-end for gap
                          whileHover={{ scale: 1.1 }}
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </motion.button>
                        <br />
                        <br />
                        <motion.button
                          className="btn btn-primary"
                          whileHover={{ scale: 1.1 }}
                          onClick={() => buyItem(item)}
                        >
                          Buy Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="text-center mt-4">
          <h4>Total: {calculateTotal()} Rs</h4>
          <motion.button
            className="btn btn-success"
            whileHover={{ scale: 1.1 }}
            onClick={() => alert("Proceeding to checkout...")}
          >
            Proceed to Checkout
          </motion.button>
        </div>
      )}

      {/* Modal for payment options */}
      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Payment Options</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Proceeding to buy: <strong>{selectedItem.product_name}</strong></p>
                <p>Price: {selectedItem.price} Rs</p>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handlePayment("Cash On Delivery")}
                  >
                    Cash On Delivery
                  </button>
                  <button
                    className="btn btn-warning ms-2"
                    onClick={() => handlePayment("Credit Card")}
                  >
                    Pay via Credit Card
                  </button>
                  <button
                    className="btn btn-success ms-2"
                    onClick={() => handlePayment("UPI")}
                  >
                    Pay via UPI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
