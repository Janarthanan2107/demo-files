import React, { useState } from 'react';

// Sample data for states and cities
const data = {
  'California': ['Los Angeles', 'San Francisco', 'San Diego'],
  'Texas': ['Houston', 'Dallas', 'Austin'],
  'Florida': ['Miami', 'Orlando', 'Tampa'],
};

const App = () => {
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setCities(data[state] || []);
  };

  return (
    <div>
      <label>
        State:
        <select value={selectedState} onChange={handleStateChange}>
          <option value="">Select a state</option>
          {Object.keys(data).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>

      <label>
        City:
        <select>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default App;
