import "./App.css";
import React from "react";
import Papa from "papaparse";

import { useState } from "react";

function App() {
  const [parsedData, setParsedData] = useState([]);

  const [tableRows, setTableRows] = useState([]);

  const [values, setValues] = useState([]);

  const [todos, setTodos] = React.useState([]);

  const url = "https://www.sportchek.ca/";

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        const rowsAway = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsAway.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setParsedData(results.data);

        setTableRows(rowsAway[0]);

        setValues(valuesArray);
      },
    });

    fetchTodos();
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" name="file" accept=".csv" onChange={changeHandler} />
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
