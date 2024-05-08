import React, {
  useState,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";

// Form context
const FormContext = createContext();

// Form component
function Form() {
  const { formData, setFormData, onSubmit } = useContext(FormContext);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [setFormData]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit(formData);
      setFormData({ name: "", age: "" }); // Reset form after submission
    },
    [formData, onSubmit, setFormData]
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
  const [formData, setFormData] = useState({ name: "", age: "" });

  const handleFormSubmit = useCallback((formData) => {
    setTableData((prevData) => [...prevData, formData]);
  }, []);

  const formContextValue = useMemo(
    () => ({ formData, setFormData, onSubmit: handleFormSubmit }),
    [formData, handleFormSubmit]
  );

  return (
    <div>
      <h1>Form and Table</h1>
      <FormContext.Provider value={formContextValue}>
        <Form />
      </FormContext.Provider>
      <Table data={tableData} />
    </div>
  );
}

export default App;
