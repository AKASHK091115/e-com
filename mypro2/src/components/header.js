import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="bg-purple-custom text-white text-center py-5"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>AK Enterprises</h1>
      <p className="lead">Your Trusted Partner in Excellence</p>
    </motion.header>
  );
};

export default Header;
