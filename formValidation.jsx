import React, { useState } from "react";

function useValidation(data) {
  const isValid =
    data.name.trim() !== "" &&
    data.age.trim() !== "" &&
    data.rollNo.trim() !== "";
  return isValid;
}

function FormWithValidation() {
  const [formData, setFormData] = useState({ name: "", age: "", rollNo: "" });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message when user starts typing in the field
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!useValidation(formData)) {
      const errors = {};
      // Check which fields are empty and set error messages
      if (formData.name.trim() === "") {
        errors.name = "Name is required";
      }
      if (formData.age.trim() === "") {
        errors.age = "Age is required";
      }
      if (formData.rollNo.trim() === "") {
        errors.rollNo = "Roll No is required";
      }
      setFormErrors(errors);
      return;
    }

    console.log("Submitted data:", formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <span>{formErrors.name}</span>}
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
          {formErrors.age && <span>{formErrors.age}</span>}
        </div>
        <div>
          <label>Roll No:</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleInputChange}
          />
          {formErrors.rollNo && <span>{formErrors.rollNo}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormWithValidation;
