import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/App.css'
const Nav = ({isLoggedIn}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-purple-custom">
      <div className="collapse navbar-collapse ">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link text-white" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/products">
              Product
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/awards">
              Awards
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/offers">
              Offers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/cart">
              Carts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/orders">
              Orders
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
