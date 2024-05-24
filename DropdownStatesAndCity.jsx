import React, { useState } from "react";

// Sample data for states and cities
const data = {
  California: ["Los Angeles", "San Francisco", "San Diego"],
  Texas: ["Houston", "Dallas", "Austin"],
  Florida: ["Miami", "Orlando", "Tampa"],
};

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label>
        {label}:
        <select value={value} onChange={onChange}>
          <option value="">Select a {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

const App = () => {
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setCities(data[state] || []);
    setSelectedCity(""); // Reset the city when state changes
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <Dropdown
        label="State"
        options={Object.keys(data)}
        value={selectedState}
        onChange={handleStateChange}
      />
      <Dropdown
        label="City"
        options={cities}
        value={selectedCity}
        onChange={handleCityChange}
      />
    </div>
  );
};

export default App;
