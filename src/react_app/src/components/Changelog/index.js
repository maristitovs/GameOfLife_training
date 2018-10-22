import React from "react";
import "./styles.css";

const columns = ["#", "Isolation", "Live", "Over Population", "Reproduction"];
const Header = () => (
  <tr>
    {columns.map((data, headIndex) => (
      <th key={headIndex}>{data}</th>
    ))}
  </tr>
);
const TableRow = ({ counterIterations }) =>
  counterIterations.map((iteration, index) => (
    <tr key={index}>
      {Object.keys(iteration).map((key, keyIndex) => (
        <td key={keyIndex}> {iteration[key]}</td>
      ))}
    </tr>
  ));

const Changelog = ({ counterIterations }) => {
  return (
    <table id="changelog">
      <thead>
        <Header />
      </thead>
      <tbody>
        <TableRow counterIterations={counterIterations} />
      </tbody>
    </table>
  );
};

export default Changelog;
