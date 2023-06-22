import React, { useEffect, useState } from "react";
import CardListComponent from "./CardListComponent";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [sortedBy, setSortedBy] = useState(null);
  const [isDescending, setIsDescending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isCardListView, setIsCardListView] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://coralmango.com/api/react-test");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (property) => {
    if (sortedBy === property) {
      setIsDescending(!isDescending);
    } else {
      setSortedBy(property);
      setIsDescending(false);
    }
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    setIsFiltered(value !== "");
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const sortedData = [...data].sort((a, b) => {
    if (isDescending) {
      return b[sortedBy] > a[sortedBy] ? 1 : -1;
    }
    return a[sortedBy] > b[sortedBy] ? 1 : -1;
  });

  const renderedData = isFiltered ? filteredData : sortedData;

  return (
    <div className="container">
      <div className="toggle">
        <div className="message">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
      />
      {isFiltered && (
        <div className="info-banner">Viewing filtered results !</div>
      )}
      </div>
      <div>
        <button className="button" onClick={() => setIsCardListView(!isCardListView)}>
          Toggle View
        </button>
      </div>
      </div>
      {isCardListView ? (
        <CardListComponent data={renderedData} />
      ) : (
      <table border=".5px">
        <thead >
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {renderedData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default TableComponent;
