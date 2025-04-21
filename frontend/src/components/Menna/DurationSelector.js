import './DurationSelector.css';
import React, { useState, useEffect } from 'react';

function DurationSelector({ prices, onPriceChange }) {
  const [selectedDuration, setSelectedDuration] = useState('day');
  const durations = [
    { label: '1 Day', value: 'day', price: prices.pricePerDay },
    { label: '1 Week', value: 'week', price: prices.pricePerWeek },
    { label: '1 Month', value: 'month', price: prices.pricePerMonth }
  ];

  useEffect(() => {
    const initialPrice = durations.find(d => d.value === selectedDuration)?.price;
    onPriceChange(initialPrice);
  }, [prices, selectedDuration, onPriceChange]);

  const handleSelection = (duration) => {
    setSelectedDuration(duration.value);
    onPriceChange(duration.price);
  };
  return (
    <div className="duration-selector">
      <div className="btn-group ss" role="group" aria-label="Duration Selector">
        {durations.map((duration) => (
          <button
            key={duration.value}
            type="button"
            className={`btn ss ${selectedDuration === duration.value ? 'btn btn-dark ss' : 'btn-outline ss'}`}
            onClick={() => handleSelection(duration)}
          >
            {duration.label}
          </button>
        ))}
      </div>
      <div className="price-display aa">₪{durations.find(d => d.value === selectedDuration)?.price}</div>
    </div>
  );
}


export default DurationSelector;
