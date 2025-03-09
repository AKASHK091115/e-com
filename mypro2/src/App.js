import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./navbar/nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import Register from "./Register/Register";
import Login from "./login/Login";
import axios from "axios";
import Dress from "./products/Dress";
const Offers = React.lazy(() => import("../src/routes/Offers"));
const Awards = React.lazy(() => import("../src/routes/Awards"));
const Cart = React.lazy(() => import("../src/routes/Cart"));
const Orders = React.lazy(() => import("../src/routes/orders"));
const LandingPage=React.lazy(() => import("../src/components/LandingPage"))
const Product = React.lazy(() => import("../src/routes/Product"));
const Carousel=React.lazy(() => import("../src/components/Carousel"))
const Mobile=React.lazy(()=>import("../src/products/Mobile"))
const FallingCubes = ({ cubeCount = 50 }) => {
  const [cubes, setCubes] = useState([]);

  useEffect(() => {
    const generatedCubes = Array.from({ length: cubeCount }, (_, index) => ({
      id: index,
      size: Math.random() * 30 + 20,
      left: Math.random() * 100 + "%",
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    }));
    setCubes(generatedCubes);
  }, [cubeCount]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          style={{
            width: `${cube.size}px`,
            height: `${cube.size}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
            position: "absolute",
            top: "-60px",
            left: cube.left,
            borderRadius: "10px",
          }}
          animate={{
            y: "100vh",
            rotate: [0, 360],
          }}
          transition={{
            duration: cube.duration,
            delay: cube.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn","true");
  };

  const addToCart = async (productId, productName, price, image) => {
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
      alert("Error adding product to cart");
    }
  };

  const placeOrders = async (productId, productName, price, image) => {
    try {
      const response = await axios.post("http://localhost:3002/orders", {
        productId,
        productName,
        price,
        image,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error placing the order");
    }
  };

  // Products array
  const products = [
    { id: 1, name: "Product 1", price: 50, image: "/images.jpg", description: "Description of product 1" },
    { id: 2, name: "Product 2", price: 20, image: "/shirt.jpg", description: "Description of product 2" },
    { id: 3, name: "Product 3", price: 30, image: "/logo192.png", description: "Description of product 3" },
    { id: 4, name: "Product 4", price: 40, image: "/vivo.jpg", description: "Description of product 4" },
    { id: 5, name: "Product 5", price: 60, image: "/samsung.jpg", description: "Description of product 5" },
    { id: 6, name: "Product 6", price: 70, image: "/oneplus.jpg", description: "Description of product 6" },
  ];

  return (
    <Router>
      <FallingCubes cubeCount={100} />
      <div className="container-fluid p-0">
        {isLoggedIn ? (
          <>
            <motion.header
  className="bg-purple-custom text-white text-center py-5"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  style={{ position: "relative" }} // Make the header the reference point for positioning
>
  <h1>AK Enterprises</h1>
  <p className="lead">Your Trusted Partner in Excellence</p>
  
  <motion.button
    className="btn btn-light btn-lg"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={handleLogout}
    style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      zIndex: 10, // Ensure the button is above other elements
    }}
  >
    Logout
  </motion.button>
  <div className="ak1 bg-gradient">
    <Nav />
  </div>
</motion.header>
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    className="container mt-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 className="text-center mb-4">Featured Products</h2>
                    <Carousel />
                    <div className="row">
                      {/* Loop over the products and create product cards */}
                      {products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                          <motion.div
                            initial={{ x: -200 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.8 }}
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Adding shadow effect on hover
                            }}
                          >
                            <div className="card">
                              <div className="row g-0">
                                <div className="col-md-8">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="card-img-top"
                                    style={{ width: "100%", height: "250px", objectFit: "contain" }}
                                  />
                                </div>
                                <div className="col-md-4 d-flex justify-content-end align-items-center">
                                  <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Price: {product.price} Rs</p>
                                    <motion.button
                                      className="btn btn-primary"
                                      whileHover={{ scale: 1.1 }}
                                      onClick={() => addToCart(product.id, product.name, product.price, product.image)}
                                    >
                                      Wishlist
                                    </motion.button>
                                    <br />
                                    <br />
                                    <motion.button
                                      className="btn btn-primary"
                                      whileHover={{ scale: 1.1 }}
                                      onClick={() => placeOrders(product.id, product.name, product.price, product.image)}
                                    >
                                      Buy
                                    </motion.button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                }
              />
              <Route
                path="/offers"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Offers />
                  </React.Suspense>
                }
              />
              <Route
                path="/awards"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Awards />
                  </React.Suspense>
                }
              />
              <Route
                path="/cart"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Cart />
                  </React.Suspense>
                }
              />
              <Route
                path="/orders"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Orders />
                  </React.Suspense>
                }
              />
               <Route
                path="/products"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Product />
                  </React.Suspense>
                }
              />
              <Route
                path="/products/mobile"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Mobile />
                  </React.Suspense>
                }
              />
              <Route
                path="/products/dress"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Dress />
                  </React.Suspense>
                }
              />

            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="*" element={<LandingPage onLoginSuccess={handleLoginSuccess} />} />
              <Route
                path="/login"
                element={<Login onLoginSuccess={handleLoginSuccess} />}
              />
              <Route
                path="/register"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Register />
                  </React.Suspense>
                }
              />
            </Routes>
          </>
        )}

        <motion.footer
          className="bg-dark text-white text-center py-4 mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container">
            <p className="mb-0">© 2024 AK Enterprises. All rights reserved.</p>
          </div>
        </motion.footer>
      </div>
    </Router>
  );
}

export default App;
