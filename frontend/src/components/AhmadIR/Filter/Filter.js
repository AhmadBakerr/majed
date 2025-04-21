import React, { useEffect, useState } from "react";
import "./FilterStyle.css";
import axios from "axios";

const sortedByOptions = [
  { label: "Price (high to low)", value: "highToLow" },
  { label: "Price (low to high)", value: "lowToHigh" },
];

const fetchBrands = async () => {
  try {
    const response = await axios.get("http://localhost:3000/saveBrands");
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

const Filter = ({ onSortChange }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const initializeBrands = async () => {
      const brandData = await fetchBrands();
      setBrands(brandData);
    };
    initializeBrands();
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    onSortChange(event.target.value);
  };

  return (
    <div id="cont">
      <form id="form-one " className="form column">
        {sortedByOptions.map(({ label, value }) => (
          <div key={value} className="input-group" style={{ marginBottom: "10px" }}>
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="radio"
                name="sortedBy"
                value={value}
                aria-label={`Radio button for ${label}`}
                onChange={handleSortChange}
              />
            </div>
            <input
              type="text"
              className="form-control"
              value={label}
              aria-label={`Text input with radio button for ${label}`}
              readOnly
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default Filter;
