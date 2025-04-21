import React from "react";

const OrderHistory = () => {
  return (
    <div className="w-100 p-4">
      <h1>Your Order History</h1>
      <hr />
      <h3>PURCHASED</h3>
      <hr />

      <div className="vstack gap-3"> 
        <div className="vstack gap-2">
          <label className="label" htmlFor="search">
            Search
          </label>
          <div className="d-flex">
            <input
              className="form-control"
              type="text"
              placeholder="Product name..."
              id="search"
            />
            <button className="btn btn-outline-info" type="button">
              Search
            </button>
          </div>
        </div>

        <div className="vstack gap-2">
          <label className="label" htmlFor="sort">
            Sorted by
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="sort"
          >
            <option value="">Select an option</option>
            <option value="1">All Orders</option>
            <option value="2">Newest first</option>
            <option value="3">Oldest first</option>
          </select>
        </div>

        <div className="vstack gap-2">
          <label htmlFor="date">Date</label>
          <div className="input-group">
            <span className="input-group-text" id="addon-wrapping">
              Date
            </span>
            <input
              type="date"
              className="form-control"
              placeholder="Enter a Date..."
              aria-label="Date"
              aria-describedby="addon-wrapping"
              id="date" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;