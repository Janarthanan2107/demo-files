import React, { useState, useMemo, useCallback } from "react";

// Form component
function Form({ onSubmit }) {
  const [formData, setFormData] = useState({ name: "", age: "" });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit(formData);
      setFormData({ name: "", age: "" }); // Reset form after submission
    },
    [formData, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

// Table component
function Table({ data }) {
  const memoizedData = useMemo(
    () =>
      data.map((row, index) => (
        <tr key={index}>
          <td>{row.name}</td>
          <td>{row.age}</td>
        </tr>
      )),
    [data]
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>{memoizedData}</tbody>
    </table>
  );
}

// App component
function App() {
  const [tableData, setTableData] = useState([]);

  const handleFormSubmit = useCallback((formData) => {
    setTableData((prevData) => [...prevData, formData]);
  }, []);

  return (
    <div>
      <h1>Form and Table</h1>
      <Form onSubmit={handleFormSubmit} />
      <Table data={tableData} />
    </div>
  );
}

export default App;
