import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons

const TodosTable = () => {
  const [todos, setTodos] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchTodos(first, rows);
  }, [first, rows]);

  const fetchTodos = (start, limit) => {
    setLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`
    )
      .then((response) => {
        setTotalRecords(parseInt(response.headers.get("x-total-count"), 10)); // Total records from headers
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const imgTemplate = (d) => {
    return (
      <>
        <img
          src={d.thumbnailUrl}
          style={{ width: "4rem", cursor: "pointer" }}
          onClick={() => setSelectedImage(d)}
        />
      </>
    );
  };

  const dialogFooter = (
    <div>
      <Button label="Close" onClick={() => setSelectedImage(null)} />
    </div>
  );

  return (
    <div>
      <DataTable value={todos} loading={loading}>
        <Column header="Image" body={imgTemplate}></Column>
        <Column field="id" header="ID"></Column>
        <Column field="title" header="Title"></Column>
      </DataTable>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        rowsPerPageOptions={[10, 20, 50]}
        onPageChange={onPageChange}
      />
      <Dialog
        header="Image"
        visible={!!selectedImage}
        footer={dialogFooter}
        onHide={() => setSelectedImage(null)}
      >
        {selectedImage && (
          <>
            <p>{selectedImage.title}</p>
            <img src={selectedImage.url} style={{ width: "8rem" }} />
          </>
        )}
      </Dialog>
    </div>
  );
};

export default TodosTable;
