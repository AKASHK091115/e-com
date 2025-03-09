import React from 'react';
const Offers = () => {
  const handle = () => {
    alert('claimed successfully');
  };

  return (
    <>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Special Offers</h2>
      <div className="row">
        {/* Offer 1 */}
        <div className="col-md-4">
          <div className="card">
            <img src="/logo192.png" alt="Offer" className="card-img-top" objectFit="contain" />
            <div className="card-body">
              <h5 className="card-title">Offer 1</h5>
              <p className="card-text">Details about Offer 1.</p>
              <button className="btn btn-success" onClick={handle}>
                Claim Offer
              </button>
            </div>
          </div>
        </div>

        {/* Offer 2 */}
        <div className="col-md-4">
          <div className="card">
            <img src="/logo192.png" alt="Offer" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Offer 2</h5>
              <p className="card-text">Details about Offer 2.</p>
              <button className="btn btn-success" onClick={handle}>
                Claim Offer
              </button>
            </div>
          </div>
        </div>

        {/* Offer 3 */}
        <div className="col-md-4">
          <div className="card">
            <img src="/card.jpg" alt="Offer" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Card</h5>
              <p className="card-text">claim 25% offer if you have card.</p>
              <button className="btn btn-success" onClick={handle}>
                Claim Offer
              </button>
            </div>
          </div>
        </div>

        {/* Offer 4 - Correctly placed outside Offer 3 */}
        <div className="col-md-4">
          <div className="card">
            <img src="/logo192.png" alt="Offer" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Offer 4</h5>
              <p className="card-text">Details about Offer 4.</p>
              <button className="btn btn-success" onClick={handle}>
                Claim Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Offers;
