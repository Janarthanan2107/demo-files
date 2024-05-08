import React, { useState, useRef } from "react";

function useValidation(data) {
  const isValid = data.every(
    (row) =>
      row.name.trim() !== "" &&
      row.age.trim() !== "" &&
      row.rollNo.trim() !== ""
  );
  return isValid;
}

function tableValidation() {
  const [data, setData] = useState([{ name: "", age: "", rollNo: "" }]);
  const rowRefs = useRef([]);

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleEnterPress = (index, field, event) => {
    if (event.key === "Enter") {
      if (field === "age") {
        const newData = [...data];
        newData.push({ name: "", age: "", rollNo: "" });
        setData(newData);
        setTimeout(() => {
          if (rowRefs.current[index + 1] && rowRefs.current[index + 1].name) {
            rowRefs.current[index + 1].name.focus();
          }
        }, 0);
      } else if (
        field === "name" &&
        rowRefs.current[index] &&
        rowRefs.current[index].rollNo
      ) {
        rowRefs.current[index].rollNo.focus();
      } else if (
        field === "rollNo" &&
        rowRefs.current[index] &&
        rowRefs.current[index].age
      ) {
        rowRefs.current[index].age.focus();
      }
    }
  };

  const handleDeleteRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleSubmit = () => {
    if (!useValidation(data)) {
      alert("Please fill all fields before submitting.");
      return;
    }
    console.log("Submitted data:", data);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Age</th>
            <th></th> {/* Delete column */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  onKeyPress={(e) => handleEnterPress(index, "name", e)}
                  ref={(input) =>
                    (rowRefs.current[index] = {
                      ...rowRefs.current[index],
                      name: input,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.rollNo}
                  onChange={(e) =>
                    handleInputChange(index, "rollNo", e.target.value)
                  }
                  onKeyPress={(e) => handleEnterPress(index, "rollNo", e)}
                  ref={(input) =>
                    (rowRefs.current[index] = {
                      ...rowRefs.current[index],
                      rollNo: input,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.age}
                  onChange={(e) =>
                    handleInputChange(index, "age", e.target.value)
                  }
                  onKeyPress={(e) => handleEnterPress(index, "age", e)}
                  ref={(input) =>
                    (rowRefs.current[index] = {
                      ...rowRefs.current[index],
                      age: input,
                    })
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default tableValidation;
