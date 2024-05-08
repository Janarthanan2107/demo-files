import React, { useState } from "react";

function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null);
        // Convert file to base64
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
          setFileData(reader.result);
        };
      } else {
        setFile(null);
        setFileData(null);
        setError("Please select a valid image file (JPEG, PNG, or GIF).");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if file is selected
    if (file) {
      // Process the file (e.g., upload to server)
      console.log("File uploaded:", fileData);
      // Reset the form
      setFile(null);
      setFileData(null);
      setError(null);
    } else {
      setError("Please select a file before submitting.");
    }
  };

  return (
    <div>
      <h2>File Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FileUploadForm;
