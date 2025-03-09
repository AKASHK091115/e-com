import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import the Bootstrap CSS
import { motion } from 'framer-motion'; // Import motion for animations

const Awards = () => {
  return (
    <>
      <div className="container py-5">
        <h1 className="text-center text-primary fw-bold mb-4">
          Here Are a Few Awards
        </h1>
        <p className="text-center lead text-muted">
          Here you can list the awards or recognition you have received over time.
        </p>

        <div className="row row-cols-1 row-cols-md-2 g-4">
          {/* Card 1 */}
          <div className="col">
            <div className="card">
              <div className="row g-0">
                {/* Left Column: Image */}
                <div className="col-md-8">
                  <img
                    src="/card.jpg"
                    alt="Award 1"
                    className="card-img-top"
                    style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                  />
                </div>
                {/* Right Column: Card Body */}
                <div className="col-md-4 d-flex justify-content-end align-items-center">
                  <div className="card-body">
                    <h5 className="card-title">Award 1</h5>
                    <p className="card-text">Achievement in 2012</p>
                    <motion.button
                      className="btn btn-primary"
                      whileHover={{ scale: 1.1 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col">
            <div className="card">
              <div className="row g-0">
                {/* Left Column: Image */}
                <div className="col-md-8">
                  <img
                    src="/card.jpg"
                    alt="Award 2"
                    className="card-img-top"
                    style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                  />
                </div>
                {/* Right Column: Card Body */}
                <div className="col-md-4 d-flex justify-content-end align-items-center">
                  <div className="card-body">
                    <h5 className="card-title">Award 2</h5>
                    <p className="card-text">Achievement in 2015</p>
                    <motion.button
                      className="btn btn-primary"
                      whileHover={{ scale: 1.1 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Awards;
