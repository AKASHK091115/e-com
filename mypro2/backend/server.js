const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require('cors');
const { OAuth2Client } = require("google-auth-library");
const app = express();
const PORT = 3002;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const CLIENT_ID = "168632945330-9nh6hfqmk0d6oont2p0i60gbfuaele20.apps.googleusercontent.com"; // Replace with your client ID
const client = new OAuth2Client(CLIENT_ID);
// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'akash', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Login route (unchanged)
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  const query = 'SELECT * FROM users WHERE name = ? AND password = ?';

  db.query(query, [name, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      res.status(200).json({ 
        message: 'Login successful', 
        user: { 
          cust_id: results[0].cust_id, 
          name: results[0].name 
        } 
      });
    } else {
      res.status(401).json({ message: 'Invalid name or password' });
    }
  });
});
app.post('/register', (req, res) => {
  const { name, password,mobile } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  
  // Check if the username already exists
  const checkQuery = 'SELECT * FROM users WHERE name = ?';

  db.query(checkQuery, [name], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const cust_id = Math.floor(100000 + Math.random() * 900000);
    // Insert the new user into the database
    const insertQuery = 'INSERT INTO users (name, password,mobile,cust_id) VALUES (?, ?,?,?)';

    db.query(insertQuery, [name, password,mobile,cust_id], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(200).json({ message: 'Registration successful' });
    });
  });
});


// Add item to cart (unchanged)
app.post('/cart', (req, res) => {
  const { productName, price,image} = req.body;

  // Check if required data is provided
  if (!productName || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // SQL query to insert data into the cart table
  const query = 'INSERT INTO cart (product_name, price,image_url) VALUES (?, ?,?)';
  const values = [ productName, price,image];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into cart:', err);
      return res.status(500).json({ message: 'Error adding product to cart' });
    }

    res.status(200).json({ message: 'Product added to cart successfully' });
  });
});
app.post('/orders', (req, res) => {
  const { productName, price,image} = req.body;

  // Check if required data is provided
  if (!productName || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // SQL query to insert data into the cart table
  const query = 'INSERT INTO orders (product_name, price,image_url) VALUES (?, ?,?)';
  const values = [ productName, price,image];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into cart:', err);
      return res.status(500).json({ message: 'Error adding product to cart' });
    }

    res.status(200).json({ message: 'Product added to cart successfully' });
  });
});

// Fetch cart items for a user
app.get('/cart', (req, res) => {
  // SQL query to fetch all cart items
  const query = 'SELECT * FROM cart';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).json({ message: 'Error fetching cart items' });
    }

    res.status(200).json(results);  // Return the cart items as JSON
  });
});
app.get('/orders', (req, res) => {
  // SQL query to fetch all cart items
  const query = 'SELECT * FROM  orders';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).json({ message: 'Error fetching cart items' });
    }

    res.status(200).json(results);  // Return the cart items as JSON
  });
});

// Remove item from cart
app.delete('/cart/:productId', (req, res) => {
  const productId = req.params.productId;

  // SQL query to delete the product from the cart
  const query = 'DELETE FROM cart WHERE id = ?';

  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Error removing product from cart:', err);
      return res.status(500).json({ message: 'Error removing product from cart' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    res.status(200).json({ message: 'Product removed from cart successfully' });
  });
});
app.post('/buy', (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  // Query to fetch the product details from the cart table
  const fetchQuery = 'SELECT * FROM cart WHERE id = ?';
  db.query(fetchQuery, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching product from cart:', err);
      return res.status(500).json({ message: 'Error fetching product details' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const { product_name, price, image_url } = results[0];

    // Query to insert the product into the orders table
    const insertQuery = 'INSERT INTO orders (product_name, price, image_url) VALUES (?, ?, ?)';
    db.query(insertQuery, [product_name, price, image_url], (insertErr) => {
      if (insertErr) {
        console.error('Error adding product to orders:', insertErr);
        return res.status(500).json({ message: 'Error placing order' });
      }

      // Query to remove the product from the cart table
      const deleteQuery = 'DELETE FROM cart WHERE id = ?';
      db.query(deleteQuery, [productId], (deleteErr) => {
        if (deleteErr) {
          console.error('Error removing product from cart:', deleteErr);
          return res.status(500).json({ message: 'Error removing product from cart' });
        }

        res.status(200).json({ message: 'Order placed successfully' });
      });
    });
  });
});
app.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token with Google's OAuth2 client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Make sure this matches your client ID
    });

    const payload = ticket.getPayload();
    const { email, name } = payload; // Extract only name and email

    console.log("Google User Info:", { email, name });

    // Insert into database
    const sql = "INSERT INTO google (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?";
    db.query(sql, [name, email, name], (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        return res.status(500).json({ message: "Database insertion failed" });
      }

      console.log("Database insertion successful:", result);
      res.status(200).json({
        message: "Login successful",
      });
    });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
