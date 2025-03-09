import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Custom CSS for additional styling (explained below)

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders from the backend
        const response = await axios.get("http://localhost:3002/orders");
        setOrders(response.data); // Set the fetched orders in the state
        setLoading(false); // Turn off loading state
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders.");
        setLoading(false); // Turn off loading even in error case
      }
    };

    fetchOrders(); // Call the function to fetch orders
  }, []); // Empty dependency array to fetch once on mount

  if (loading) {
    return <div className="text-center">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center">You have no orders yet.</div>
      ) : (
        <div className="table-responsive"> {/* Makes table responsive */}
          <table className="table table-hover table-striped custom-table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price (Rs)</th>
                <th scope="col">Ordered On</th>
                <th scope="col">Image</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product_name}</td>
                  <td>{order.price} Rs</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>
                    <img
                      src={order.image_url}
                      alt={order.product_name}
                      className="table-image"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
